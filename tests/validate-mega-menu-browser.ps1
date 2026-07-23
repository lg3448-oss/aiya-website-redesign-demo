$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path -LiteralPath $chrome)) {
  throw "Google Chrome is required for this test: $chrome"
}

$runId = [guid]::NewGuid().ToString('N')
$fixture = Join-Path $root ".mega-menu-browser-test-$runId.html"
$tempRoot = [IO.Path]::GetTempPath()
$profile = Join-Path $tempRoot "aiya-mega-browser-$runId"
$stdout = Join-Path $tempRoot "aiya-mega-browser-$runId.html"
$stderr = Join-Path $tempRoot "aiya-mega-browser-$runId.log"

$runner = @'
<script>
(() => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const trigger = type => document.querySelector(`[data-mega-trigger="${type}"]`);
  const root = type => document.querySelector(`[data-mega-menu="${type}"]`);
  const closeOutside = () => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  const focusOutside = () => document.querySelector('.main-nav > a[href="#company"]').focus();
  const activateFromClosed = (type, leadIn) => {
    closeOutside();
    focusOutside();
    const button = trigger(type);
    if (leadIn === 'mouse' || leadIn === 'touch') {
      button.dispatchEvent(new PointerEvent('pointerenter', { pointerType: leadIn, bubbles: false }));
    } else {
      button.focus();
    }
    button.click();
    assert(button.getAttribute('aria-expanded') === 'true', `${leadIn} click from closed must stay open`);
  };

  try {
    assert(document.querySelectorAll('[data-mega-item]').length === 10, 'must render ten menu items');
    document.querySelectorAll('.mega-menu-detail').forEach(detail => {
      assert(detail.childElementCount === 1, 'each menu must render one detail subtree');
    });

    ['mouse', 'touch', 'Enter', 'Space'].forEach(leadIn => activateFromClosed('products', leadIn));

    activateFromClosed('products', 'mouse');
    const serviceTrigger = trigger('services');
    serviceTrigger.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse', bubbles: false }));
    serviceTrigger.click();
    assert(serviceTrigger.getAttribute('aria-expanded') === 'true', 'second menu must remain open after click');
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'opening services must close products');

    root('services').querySelector('[data-mega-item].active').focus();
    root('services').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert(serviceTrigger.getAttribute('aria-expanded') === 'false', 'Escape must close the open menu');
    assert(document.activeElement === serviceTrigger, 'Escape must restore trigger focus');

    activateFromClosed('products', 'mouse');
    closeOutside();
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'outside pointerdown must close the menu');

    activateFromClosed('products', 'mouse');
    root('products').querySelector('[data-product-destination]').click();
    assert(document.querySelector('#product-stage').dataset.product === 'pos', 'product destination must activate its product');
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'destination click must close the menu');

    activateFromClosed('products', 'mouse');
    const activeItem = root('products').querySelector('[data-mega-item].active');
    activeItem.focus();
    const detail = root('products').querySelector('.mega-menu-detail');
    const observer = new MutationObserver(() => {});
    observer.observe(detail, { childList: true });
    activeItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const replacements = observer.takeRecords().filter(record => record.type === 'childList').length;
    observer.disconnect();
    assert(replacements === 1, `ArrowDown must replace detail once, observed ${replacements}`);
    assert(root('products').dataset.activeItem === 'pad', 'ArrowDown must select the next item');
    assert(detail.childElementCount === 1, 'arrow selection must preserve one detail subtree');

    document.body.dataset.megaTest = 'PASS';
  } catch (error) {
    document.body.dataset.megaTest = `FAIL: ${error.message}`;
  }
})();
</script>
'@

try {
  $html = Get-Content -Raw -LiteralPath (Join-Path $root 'index.html')
  $scriptTag = '<script src="script.js"></script>'
  if (-not $html.Contains($scriptTag)) {
    throw 'Could not find the production script tag in index.html.'
  }
  $fixtureHtml = $html.Replace($scriptTag, "$scriptTag`r`n$runner")
  [IO.File]::WriteAllText($fixture, $fixtureHtml, [Text.UTF8Encoding]::new($false))

  $fixtureUri = [uri]::new($fixture).AbsoluteUri
  $arguments = @(
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-crash-reporter',
    '--disable-breakpad',
    "--user-data-dir=`"$profile`"",
    '--virtual-time-budget=1000',
    '--dump-dom',
    $fixtureUri
  )
  $process = Start-Process -FilePath $chrome -ArgumentList $arguments -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
  if ($process.ExitCode -ne 0) {
    throw "Chrome exited with code $($process.ExitCode): $(Get-Content -Raw -LiteralPath $stderr)"
  }

  $dom = Get-Content -Raw -LiteralPath $stdout
  $result = [regex]::Match($dom, 'data-mega-test="([^"]+)"')
  if (-not $result.Success) {
    throw 'The browser test did not publish a result.'
  }
  if ($result.Groups[1].Value -ne 'PASS') {
    throw $result.Groups[1].Value
  }

  Write-Output 'PASS: mega-menu browser interactions satisfied.'
}
finally {
  if (Test-Path -LiteralPath $fixture) {
    Remove-Item -LiteralPath $fixture -Force
  }
}
