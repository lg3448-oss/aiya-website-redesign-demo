$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path -LiteralPath $chrome)) { throw "Google Chrome is required: $chrome" }

$runId = [guid]::NewGuid().ToString('N')
$tempRoot = [IO.Path]::GetTempPath()
$artifacts = [Collections.Generic.List[string]]::new()
$pages = @(
  'index.html',
  'products/aiya-commerce.html',
  'services/software-engineering.html',
  'solutions/retail.html',
  'news.html',
  'signin.html'
)
$viewports = @(
  @{ Name = 'desktop'; Size = '1440,1000' },
  @{ Name = 'mobile'; Size = '390,844' }
)

function Invoke-KoreanBrowserCheck {
  param(
    [string]$Page,
    [hashtable]$Viewport,
    [switch]$Fallback
  )

  $sourcePath = Join-Path $root $Page
  $sourceDirectory = Split-Path -Parent $sourcePath
  $fixture = Join-Path $sourceDirectory ".korean-language-test-$runId.html"
  $profile = Join-Path $tempRoot "aiya-korean-profile-$runId-$($Viewport.Name)-$([IO.Path]::GetFileNameWithoutExtension($Page))-$([int]$Fallback.IsPresent)"
  $stdout = Join-Path $tempRoot "aiya-korean-output-$runId-$([guid]::NewGuid().ToString('N')).html"
  $stderr = Join-Path $tempRoot "aiya-korean-error-$runId-$([guid]::NewGuid().ToString('N')).log"
  $artifacts.Add($fixture)
  $artifacts.Add($profile)
  $artifacts.Add($stdout)
  $artifacts.Add($stderr)

  $isHome = $Page -eq 'index.html'
  $runner = @"
<script>
(() => {
  try {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    const params = new URLSearchParams(location.search);
    const selectors = [...document.querySelectorAll('.language-selector')];
    const visibleSelectors = selectors.filter(selector => getComputedStyle(selector).display !== 'none');

    if (params.get('fallback') === '1') {
      assert(window.aiyaI18n?.language === 'en', 'unsupported language did not fall back to English');
      assert(document.documentElement.lang === 'en', 'fallback document language is not English');
      assert(document.querySelector('.language-switch')?.textContent.includes('English'), 'fallback selector label is not English');
      document.body.dataset.koreanI18nTest = 'PASS';
      return;
    }

    if (params.get('probe') === 'keep' && params.get('lang') !== 'ko') {
      assert(window.aiyaI18n?.language === 'en', 'English selection was not persisted');
      assert(params.get('probe') === 'keep', 'non-language query parameter was lost');
      assert(location.hash === '#company', 'URL hash was lost');
      assert(document.querySelector('.language-switch')?.textContent.includes('English'), 'English selector label is wrong');
      document.body.dataset.koreanI18nTest = 'PASS';
      return;
    }

    assert(window.aiyaI18n?.language === 'ko', 'lang=ko was not selected');
    assert(document.documentElement.lang === 'ko', 'document language is not Korean');
    assert(selectors.length > 0, 'language selector is missing');
    assert(visibleSelectors.length === 1, 'exactly one responsive language selector must be visible');
    const selector = visibleSelectors[0];
    const trigger = selector.querySelector('.language-switch');
    const menu = selector.querySelector('.language-menu');
    assert(trigger?.textContent.includes('\uD55C\uAD6D\uC5B4'), 'active language label is wrong');
    assert(menu, 'language menu is missing');
    assert([...menu.querySelectorAll('[data-language]')].map(item => item.dataset.language).join(',') === 'en,zh,ko', 'language options are incomplete');
    assert(menu.querySelector('[data-language="ko"]')?.getAttribute('aria-current') === 'true', 'Korean option is not marked active');
    assert(/[\uAC00-\uD7AF]/.test(document.body.textContent), 'Korean page copy is missing');
    assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'horizontal overflow detected');

    trigger.click();
    assert(trigger.getAttribute('aria-expanded') === 'true' && !menu.hidden, 'selector did not open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert(trigger.getAttribute('aria-expanded') === 'false' && menu.hidden, 'Escape did not close selector');

    if ($($isHome.ToString().ToLowerInvariant())) {
      trigger.click();
      menu.querySelector('[data-language="en"]').click();
      return;
    }

    document.body.dataset.koreanI18nTest = 'PASS';
  } catch (error) {
    document.body.dataset.koreanI18nTest = 'FAIL: ' + error.message;
  }
})();
</script>
"@

  $source = [IO.File]::ReadAllText($sourcePath, [Text.Encoding]::UTF8)
  [IO.File]::WriteAllText($fixture, $source.Replace('</body>', "$runner`r`n</body>"), [Text.UTF8Encoding]::new($false))

  $fixtureUri = [uri]::new($fixture).AbsoluteUri
  if ($Fallback) {
    $url = "$fixtureUri`?lang=fr&fallback=1"
  } elseif ($isHome) {
    $url = "$fixtureUri`?lang=ko&probe=keep#company"
  } else {
    $url = "$fixtureUri`?lang=ko"
  }

  $arguments = @(
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-crash-reporter',
    '--disable-breakpad',
    "--user-data-dir=`"$profile`"",
    "--window-size=$($Viewport.Size)",
    '--virtual-time-budget=3000',
    '--dump-dom',
    $url
  )
  $process = Start-Process -FilePath $chrome -ArgumentList $arguments -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
  if ($process.ExitCode -ne 0) { throw "Chrome failed for $Page [$($Viewport.Name)]: $(Get-Content -Raw -LiteralPath $stderr)" }
  $dom = [IO.File]::ReadAllText($stdout, [Text.Encoding]::UTF8)
  $result = [regex]::Match($dom, 'data-korean-i18n-test="([^"]+)"')
  if (-not $result.Success) {
    $diagnostic = if ($dom.Length -gt 1600) { $dom.Substring($dom.Length - 1600) } else { $dom }
    throw "No browser result for $Page [$($Viewport.Name)]. DOM tail: $diagnostic"
  }
  if ($result.Groups[1].Value -ne 'PASS') { throw "$Page [$($Viewport.Name)]: $($result.Groups[1].Value)" }
}

try {
  foreach ($page in $pages) {
    foreach ($viewport in $viewports) {
      Invoke-KoreanBrowserCheck -Page $page -Viewport $viewport
    }
  }
  Invoke-KoreanBrowserCheck -Page 'index.html' -Viewport $viewports[0] -Fallback
}
finally {
  foreach ($artifact in ($artifacts | Select-Object -Unique)) {
    if (Test-Path -LiteralPath $artifact) { Remove-Item -LiteralPath $artifact -Recurse -Force }
  }
}

Write-Output 'PASS: Korean localization and three-language selector work across page families and viewports.'
