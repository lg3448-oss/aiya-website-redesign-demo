$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path -LiteralPath $chrome)) { throw "Google Chrome is required: $chrome" }

$runId = [guid]::NewGuid().ToString('N')
$fixture = Join-Path $root ".homepage-keyword-test-$runId.html"
$tempRoot = [IO.Path]::GetTempPath()
$artifacts = [Collections.Generic.List[string]]::new()
$artifacts.Add($fixture)

$runner = @'
<script>
(() => {
  try {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    const checkTabs = (selector, gridSelector, stageSelector) => {
      document.querySelectorAll(selector).forEach(tab => {
        tab.click();
        const grid = document.querySelector(gridSelector);
        const stage = document.querySelector(stageSelector);
        const links = [...grid.querySelectorAll(':scope > a')];
        const tabName = tab.textContent.trim();
        assert(links.length > 0, `${tabName} has no keyword links`);
        assert(grid.querySelectorAll('small').length === 0, `${tabName} still renders secondary copy`);
        links.forEach(link => {
          const title = link.querySelector('strong');
          assert(title && title.textContent.trim(), `${tabName} has a missing keyword title`);
          assert(link.getAttribute('href'), `${title.textContent.trim()} lost its destination`);
          assert(parseFloat(getComputedStyle(title).fontSize) >= 14, `${title.textContent.trim()} is not prominent enough`);
        });
        const lastBox = links.at(-1).getBoundingClientRect();
        const stageBox = stage.getBoundingClientRect();
        assert(lastBox.bottom <= stageBox.bottom + 1, `${tabName} clips its final row`);
      });
    };

    checkTabs('.product-selector [data-product-category]', '#product-offerings', '#product-stage');
    checkTabs('.service-selector [data-service]', '#service-offerings', '.service-stage');
    assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'horizontal overflow detected');
    document.body.dataset.homepageKeywordTest = 'PASS';
  } catch (error) {
    document.body.dataset.homepageKeywordTest = `FAIL: ${error.message}`;
  }
})();
</script>
'@

try {
  $source = Get-Content -Raw -LiteralPath (Join-Path $root 'index.html')
  [IO.File]::WriteAllText($fixture, $source.Replace('</body>', "$runner`r`n</body>"), [Text.UTF8Encoding]::new($false))

  foreach ($viewport in @(
    @{ Name = 'desktop'; Size = '1440,1000' },
    @{ Name = 'mobile'; Size = '390,844' }
  )) {
    $profile = Join-Path $tempRoot "aiya-keyword-profile-$runId-$($viewport.Name)"
    $stdout = Join-Path $tempRoot "aiya-keyword-output-$runId-$($viewport.Name).html"
    $stderr = Join-Path $tempRoot "aiya-keyword-error-$runId-$($viewport.Name).log"
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
      '--virtual-time-budget=1800',
      '--dump-dom',
      ([uri]::new($fixture).AbsoluteUri)
    )
    $process = Start-Process -FilePath $chrome -ArgumentList $arguments -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
    if ($process.ExitCode -ne 0) { throw "Chrome failed [$($viewport.Name)]: $(Get-Content -Raw -LiteralPath $stderr)" }
    $dom = Get-Content -Raw -LiteralPath $stdout
    $result = [regex]::Match($dom, 'data-homepage-keyword-test="([^"]+)"')
    if (-not $result.Success) { throw "No browser result [$($viewport.Name)]" }
    if ($result.Groups[1].Value -ne 'PASS') { throw "[$($viewport.Name)] $($result.Groups[1].Value)" }
  }
}
finally {
  foreach ($artifact in $artifacts) {
    if (Test-Path -LiteralPath $artifact) { Remove-Item -LiteralPath $artifact -Recurse -Force }
  }
}

Write-Output 'PASS: all homepage Product and Service keyword grids are prominent and fully visible.'
