$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path -LiteralPath $chrome)) { throw "Google Chrome is required: $chrome" }

$pages = @(
  @{ Path = 'products/aiya-commerce.html'; Title = 'AIYA Commerce'; Capabilities = 6 },
  @{ Path = 'products/aiya-marketing.html'; Title = 'AIYA Marketing'; Capabilities = 3 },
  @{ Path = 'services/software-engineering.html'; Title = 'Software Engineering'; Capabilities = 3 },
  @{ Path = 'services/growth.html'; Title = 'Growth'; Capabilities = 3 }
)
$viewports = @(
  @{ Name = 'desktop'; Size = '1440,1000' },
  @{ Name = 'mobile'; Size = '390,844' }
)
$runId = [guid]::NewGuid().ToString('N')
$tempRoot = [IO.Path]::GetTempPath()
$artifacts = [Collections.Generic.List[string]]::new()

$runnerTemplate = @'
<script>
const publishDetailTest = () => {
  try {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    assert(document.querySelector('#detail-title').textContent === '__EXPECTED_TITLE__', 'title was not rendered');
    assert(document.querySelector('#detail-capabilities').children.length === __EXPECTED_CAPABILITIES__, 'capability count is wrong');
    assert(document.querySelector('#detail-deliverables').children.length >= 3, 'deliverables were not rendered');
    assert(document.querySelector('#detail-use-cases').children.length >= 3, 'use cases were not rendered');
    assert(getComputedStyle(document.body).overflowY !== 'hidden', 'detail page cannot scroll');
    assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'horizontal overflow detected');
    const menuRoot = type => document.querySelector(`[data-mega-menu="${type}"]`);
    const menuLink = type => document.querySelector(`[data-mega-link="${type}"]`);
    const menuToggle = type => document.querySelector(`[data-mega-trigger="${type}"]`);
    const pointerEnter = element => element.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse', bubbles: false }));
    assert(document.querySelectorAll('[data-mega-item]').length === 11, 'detail page must render eleven mega-menu items');
    assert(menuLink('products').getAttribute('href') === '../index.html#products', 'detail Products text must return to homepage Products');
    assert(menuLink('services').getAttribute('href') === '../index.html#services', 'detail Services text must return to homepage Services');
    if (window.innerWidth > 760) {
      pointerEnter(menuLink('products'));
      assert(menuToggle('products').getAttribute('aria-expanded') === 'true', 'desktop detail Products hover must open its menu');
      const pad = menuRoot('products').querySelector('[data-mega-item="pad"]');
      assert(pad.getAttribute('href') === '../products/aiya-pad.html', 'detail product item must use parent-relative URL');
      pointerEnter(pad);
      assert(pad.querySelector('strong').textContent === 'AIYAPad', 'detail menu must expose the product name directly');
      assert(pad.querySelector('small').textContent.length > 0, 'detail menu must expose a product description directly');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      assert(menuToggle('products').getAttribute('aria-expanded') === 'false', 'Escape must close detail mega menu');
    } else {
      const navToggle = document.querySelector('.nav-toggle');
      const mainNav = document.querySelector('.main-nav');
      assert(getComputedStyle(navToggle).display !== 'none', 'detail mobile hamburger must be visible');
      navToggle.click();
      assert(mainNav.classList.contains('open'), 'detail mobile hamburger must open navigation');
      menuToggle('services').click();
      assert(menuToggle('services').getAttribute('aria-expanded') === 'true', 'detail mobile Services arrow must expand menu');
      assert(menuRoot('services').querySelector('[data-mega-item="engineering"]').getAttribute('href') === '../services/software-engineering.html', 'detail service item must use parent-relative URL');
      assert(getComputedStyle(mainNav.querySelector('.nav-contact')).display !== 'none', 'detail mobile Contact must be visible');
      assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'expanded detail navigation must not overflow horizontally');
    }
    document.body.dataset.detailBrowserTest = 'PASS';
  } catch (error) {
    document.body.dataset.detailBrowserTest = 'FAIL: ' + error.message;
  }
};
publishDetailTest();
</script>
'@

try {
  foreach ($page in $pages) {
    $source = Join-Path $root $page.Path
    $sourceDirectory = Split-Path $source -Parent
    $fixture = Join-Path $sourceDirectory ".detail-browser-test-$runId.html"
    $artifacts.Add($fixture)
    $html = Get-Content -Raw -LiteralPath $source
    $runner = $runnerTemplate.Replace('__EXPECTED_TITLE__', $page.Title).Replace('__EXPECTED_CAPABILITIES__', [string]$page.Capabilities)
    $fixtureHtml = $html.Replace('</body>', "$runner`r`n</body>")
    [IO.File]::WriteAllText($fixture, $fixtureHtml, [Text.UTF8Encoding]::new($false))

    foreach ($viewport in $viewports) {
      $token = "$runId-$($viewport.Name)-$([IO.Path]::GetFileNameWithoutExtension($page.Path))"
      $profile = Join-Path $tempRoot "aiya-detail-profile-$token"
      $stdout = Join-Path $tempRoot "aiya-detail-output-$token.html"
      $stderr = Join-Path $tempRoot "aiya-detail-error-$token.log"
      $artifacts.Add($profile)
      $artifacts.Add($stdout)
      $artifacts.Add($stderr)
      $arguments = @(
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-crash-reporter',
        '--disable-breakpad',
        "--user-data-dir=`"$profile`"",
        "--window-size=$($viewport.Size)",
        '--virtual-time-budget=1500',
        '--dump-dom',
        ([uri]::new($fixture).AbsoluteUri)
      )
      $process = Start-Process -FilePath $chrome -ArgumentList $arguments -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
      if ($process.ExitCode -ne 0) { throw "Chrome failed for $($page.Path) [$($viewport.Name)]: $(Get-Content -Raw -LiteralPath $stderr)" }
      $dom = Get-Content -Raw -LiteralPath $stdout
      $result = [regex]::Match($dom, 'data-detail-browser-test="([^"]+)"')
      if (-not $result.Success) { throw "No browser result for $($page.Path) [$($viewport.Name)]" }
      if ($result.Groups[1].Value -ne 'PASS') { throw "$($page.Path) [$($viewport.Name)]: $($result.Groups[1].Value)" }
    }
  }
}
finally {
  foreach ($artifact in $artifacts) {
    if (Test-Path -LiteralPath $artifact) { Remove-Item -LiteralPath $artifact -Recurse -Force }
  }
}

foreach ($artifact in $artifacts) {
  if (Test-Path -LiteralPath $artifact) { throw "Test artifact was not removed: $artifact" }
}

Write-Output 'PASS: representative detail pages render without desktop or mobile overflow.'
