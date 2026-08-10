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
