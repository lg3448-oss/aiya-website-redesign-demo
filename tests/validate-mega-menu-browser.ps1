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

$resolvedRoot = [IO.Path]::GetFullPath($root).TrimEnd('\')
$resolvedTempRoot = [IO.Path]::GetFullPath($tempRoot).TrimEnd('\')
if ([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($fixture)) -ne $resolvedRoot) {
  throw "Refusing fixture path outside repository root: $fixture"
}
@($profile, $stdout, $stderr) | ForEach-Object {
  if ([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($_)) -ne $resolvedTempRoot) {
    throw "Refusing test path outside temp root: $_"
  }
  if ([IO.Path]::GetFileName($_) -notlike "*$runId*") {
    throw "Refusing test path without unique run id: $_"
  }
}

$runner = @'
<script>
(async () => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const trigger = type => document.querySelector(`[data-mega-trigger="${type}"]`);
  const root = type => document.querySelector(`[data-mega-menu="${type}"]`);
  const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
  const closeOutside = () => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  const focusOutside = () => document.querySelector('.main-nav > a[href="#company"]').focus();
  const pointerEnter = (element, pointerType = 'mouse') => {
    element.dispatchEvent(new PointerEvent('pointerenter', { pointerType, bubbles: false }));
  };
  const activatePointerFromClosed = (type, pointerType) => {
    closeOutside();
    focusOutside();
    const button = trigger(type);
    pointerEnter(button, pointerType);
    button.click();
    assert(button.getAttribute('aria-expanded') === 'true', `${pointerType} click from closed must stay open`);
  };
  const activateKeyboardFromClosed = (type, key) => {
    closeOutside();
    focusOutside();
    const button = trigger(type);
    const code = key === ' ' ? 'Space' : key;
    button.focus();
    button.dispatchEvent(new KeyboardEvent('keydown', { key, code, bubbles: true }));
    if (key === 'Enter') button.click();
    button.dispatchEvent(new KeyboardEvent('keyup', { key, code, bubbles: true }));
    if (key === ' ') button.click();
    assert(button.getAttribute('aria-expanded') === 'true', `${key === ' ' ? 'Space' : key} activation from closed must stay open`);
  };

  try {
    const expectedServices = [
      ['Integration & Connectivity', ['API Integrations', 'Data Connectivity']],
      ['Payments & FinTech', ['Payment APIs', 'FinTech Solutions', 'Secure Payment Processing']],
      ['AI & Automation', ['AI Software Solutions', 'Artificial Intelligence', 'Automation', 'Workflow Automation']],
      ['Cloud & Enterprise', ['Cloud Technologies', 'Enterprise Solutions', 'Scalable Software Platforms']],
      ['Digital Development', ['Digital Transformation', 'Modern Software Development']]
    ];
    assert(document.querySelectorAll('[data-mega-item]').length === 10, 'must render ten menu items');
    document.querySelectorAll('.mega-menu-detail').forEach(detail => {
      assert(detail.childElementCount === 1, 'each menu must render one detail subtree');
    });
    assert(document.querySelectorAll('.mega-menu-footer').length === 2, 'both menu footers must use the integrated footer class');

    closeOutside();
    focusOutside();
    pointerEnter(trigger('products'));
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'hover alone must open the menu');
    const openingPanel = root('products').querySelector('.mega-menu');
    const openingTransitions = openingPanel.getAnimations().filter(animation =>
      ['opacity', 'transform'].includes(animation.transitionProperty)
    );
    assert(openingTransitions.length === 2, 'opening must create opacity and transform transitions');
    openingTransitions.forEach(animation => {
      animation.currentTime = Number(animation.effect.getTiming().duration) / 2;
    });
    const intermediateOpeningStyle = getComputedStyle(openingPanel);
    const intermediateOpeningOpacity = Number.parseFloat(intermediateOpeningStyle.opacity);
    assert(
      intermediateOpeningOpacity > 0 && intermediateOpeningOpacity < 1 && intermediateOpeningStyle.transform !== 'none',
      `opening must paint a real intermediate opacity and transform state; observed ${intermediateOpeningStyle.opacity}|${intermediateOpeningStyle.transform}`
    );
    openingTransitions.forEach(animation => animation.finish());
    const finalOpeningStyle = getComputedStyle(openingPanel);
    assert(finalOpeningStyle.opacity === '1', 'opening opacity must finish at 1');
    assert(finalOpeningStyle.transform === 'none', 'opening transform must finish at none');
    closeOutside();

    focusOutside();
    trigger('products').focus();
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'focus alone must open the menu');
    closeOutside();

    activatePointerFromClosed('products', 'mouse');
    trigger('products').click();
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'click on an already-open menu must close it');
    activatePointerFromClosed('products', 'touch');
    activateKeyboardFromClosed('products', 'Enter');
    activateKeyboardFromClosed('products', ' ');

    closeOutside();
    pointerEnter(trigger('products'));
    root('products').dispatchEvent(new PointerEvent('pointerleave', { bubbles: false }));
    await wait(100);
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'pointer leave must not close before 200ms');
    root('products').dispatchEvent(new PointerEvent('pointerenter', { bubbles: false }));
    await wait(125);
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'pointer re-entry must cancel delayed close');
    closeOutside();

    pointerEnter(trigger('products'));
    root('products').dispatchEvent(new PointerEvent('pointerleave', { bubbles: false }));
    await wait(225);
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'pointer leave must close after 200ms');

    trigger('products').click();
    pointerEnter(root('products').querySelector('[data-mega-item="pad"]'));
    assert(root('products').dataset.activeItem === 'pad', 'left-item hover must select its item');
    root('products').querySelector('[data-mega-item="robot"]').focus();
    assert(root('products').dataset.activeItem === 'robot', 'left-item focus must select its item');
    root('products').querySelector('[data-mega-item="scan"]').click();
    assert(root('products').dataset.activeItem === 'scan', 'left-item click must select its item');

    closeOutside();
    activatePointerFromClosed('products', 'mouse');
    const serviceTrigger = trigger('services');
    pointerEnter(serviceTrigger);
    serviceTrigger.click();
    assert(serviceTrigger.getAttribute('aria-expanded') === 'true', 'second menu must remain open after click');
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'opening services must close products');

    root('services').querySelector('[data-mega-item].active').focus();
    root('services').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert(serviceTrigger.getAttribute('aria-expanded') === 'false', 'Escape must close the open menu');
    assert(document.activeElement === serviceTrigger, 'Escape must restore trigger focus');

    activatePointerFromClosed('products', 'mouse');
    closeOutside();
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'outside pointerdown must close the menu');

    activatePointerFromClosed('products', 'mouse');
    pointerEnter(root('products').querySelector('[data-mega-item="pad"]'));
    root('products').querySelector('[data-product-destination]').click();
    assert(document.querySelector('#product-stage').dataset.product === 'pad', 'product destination must activate non-default pad');
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'destination click must close the menu');
    assert(window.location.hash === '#products', 'product destination must navigate to #products');

    activatePointerFromClosed('services', 'mouse');
    const serviceButtons = [...root('services').querySelectorAll('[data-mega-item]')];
    assert(
      JSON.stringify(serviceButtons.map(button => button.textContent)) === JSON.stringify(expectedServices.map(([label]) => label)),
      'rendered service groups must match approved labels and order'
    );
    expectedServices.forEach(([label, expectedLinks], index) => {
      pointerEnter(serviceButtons[index]);
      const detail = root('services').querySelector('.mega-menu-detail');
      const renderedLinks = [...detail.querySelectorAll('a')].map(link => link.textContent);
      assert(detail.querySelector('h3').textContent === label, `service detail title must match ${label}`);
      assert(JSON.stringify(renderedLinks) === JSON.stringify(expectedLinks), `${label} must render only its approved links`);
      assert(detail.childElementCount === 1, `${label} must keep one detail subtree`);
    });

    pointerEnter(root('services').querySelector('[data-mega-item="payments"]'));
    root('services').querySelector('.mega-menu-detail a').click();
    assert(serviceTrigger.getAttribute('aria-expanded') === 'false', 'service destination must close the menu');
    assert(window.location.hash === '#services', 'service destination must navigate to #services');

    activatePointerFromClosed('products', 'mouse');
    const lastItem = root('products').querySelector('[data-mega-item="marketing"]');
    lastItem.focus();
    const detail = root('products').querySelector('.mega-menu-detail');
    const observer = new MutationObserver(() => {});
    observer.observe(detail, { childList: true });
    lastItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const replacements = observer.takeRecords().filter(record => record.type === 'childList').length;
    observer.disconnect();
    assert(replacements === 1, `ArrowDown must replace detail once, observed ${replacements}`);
    assert(root('products').dataset.activeItem === 'pos', 'ArrowDown must wrap from last to first');
    root('products').querySelector('[data-mega-item="pos"]').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    assert(root('products').dataset.activeItem === 'marketing', 'ArrowUp must wrap from first to last');
    assert(detail.childElementCount === 1, 'arrow selection must preserve one detail subtree');

    activatePointerFromClosed('products', 'mouse');
    document.querySelector('.main-nav > a[href="#company"]').click();
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'unrelated navigation must close the menu');
    assert(window.location.hash === '#company', 'unrelated navigation must retain its destination');

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
    '--virtual-time-budget=2000',
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
}
finally {
  if (Test-Path -LiteralPath $fixture) {
    Remove-Item -LiteralPath $fixture -Force
  }
  @($stdout, $stderr) | ForEach-Object {
    if (Test-Path -LiteralPath $_) {
      Remove-Item -LiteralPath $_ -Force
    }
  }
  if (Test-Path -LiteralPath $profile) {
    Remove-Item -LiteralPath $profile -Recurse -Force
  }
}

@($fixture, $profile, $stdout, $stderr) | ForEach-Object {
  if (Test-Path -LiteralPath $_) {
    throw "Test artifact was not removed: $_"
  }
}
Write-Output 'PASS: mega-menu browser interactions and artifact cleanup satisfied.'
