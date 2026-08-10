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
$mobileProfile = Join-Path $tempRoot "aiya-mega-mobile-browser-$runId"
$mobileStdout = Join-Path $tempRoot "aiya-mega-mobile-browser-$runId.html"
$mobileStderr = Join-Path $tempRoot "aiya-mega-mobile-browser-$runId.log"

$resolvedRoot = [IO.Path]::GetFullPath($root).TrimEnd('\')
$resolvedTempRoot = [IO.Path]::GetFullPath($tempRoot).TrimEnd('\')
if ([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($fixture)) -ne $resolvedRoot) {
  throw "Refusing fixture path outside repository root: $fixture"
}
@($profile, $stdout, $stderr, $mobileProfile, $mobileStdout, $mobileStderr) | ForEach-Object {
  if ([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($_)) -ne $resolvedTempRoot) {
    throw "Refusing test path outside temp root: $_"
  }
  if ([IO.Path]::GetFileName($_) -notlike "*$runId*") {
    throw "Refusing test path without unique run id: $_"
  }
}

function Receive-CdpMessage {
  param([System.Net.WebSockets.ClientWebSocket]$Socket)

  $buffer = New-Object byte[] 1048576
  $stream = New-Object System.IO.MemoryStream
  try {
    do {
      $segment = [ArraySegment[byte]]::new($buffer)
      $result = $Socket.ReceiveAsync($segment, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
      $stream.Write($buffer, 0, $result.Count)
    } until ($result.EndOfMessage)
    [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json
  }
  finally {
    $stream.Dispose()
  }
}

function Invoke-Cdp {
  param(
    [System.Net.WebSockets.ClientWebSocket]$Socket,
    [int]$Id,
    [string]$Method,
    [hashtable]$Parameters = @{}
  )

  $payload = @{ id = $Id; method = $Method; params = $Parameters } | ConvertTo-Json -Compress -Depth 12
  $bytes = [Text.Encoding]::UTF8.GetBytes($payload)
  $Socket.SendAsync(
    [ArraySegment[byte]]::new($bytes),
    [Net.WebSockets.WebSocketMessageType]::Text,
    $true,
    [Threading.CancellationToken]::None
  ).GetAwaiter().GetResult() | Out-Null
  do {
    $message = Receive-CdpMessage -Socket $Socket
  } until ($message.id -eq $Id)
  if ($message.error) {
    throw "$Method failed: $($message.error.message)"
  }
  $message.result
}

$runner = @'
<script>
(async () => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const destination = type => document.querySelector(`[data-mega-link="${type}"]`);
  const trigger = type => document.querySelector(`[data-mega-trigger="${type}"]`);
  const root = type => document.querySelector(`[data-mega-menu="${type}"]`);
  const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
  const closeOutside = () => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  const clickWithoutNavigation = link => {
    link.addEventListener('click', event => event.preventDefault(), { once: true });
    link.click();
  };
  const focusOutside = () => document.querySelector('.main-nav > a[href="#company"]').focus();
  const pointerEnter = (element, pointerType = 'mouse') => {
    element.dispatchEvent(new PointerEvent('pointerenter', { pointerType, bubbles: false }));
  };
  const openFromClosed = type => {
    closeOutside();
    focusOutside();
    pointerEnter(destination(type));
    assert(trigger(type).getAttribute('aria-expanded') === 'true', `${type} hover must open its menu`);
  };

  try {
    const expectedProducts = [
      ['AIYA Commerce', 'products/aiya-commerce.html'],
      ['AIYA Revenue', 'products/aiya-revenue.html'],
      ['AIYAPad', 'products/aiya-pad.html'],
      ['AIYARobot', 'products/aiya-robot.html'],
      ['AIYAScan', 'products/aiya-scan.html'],
      ['AIYA Marketing', 'products/aiya-marketing.html']
    ];
    const expectedServices = [
      ['Strategy & Experience', 'services/strategy-experience.html'],
      ['Software Engineering', 'services/software-engineering.html'],
      ['Integration & Automation', 'services/integration-automation.html'],
      ['Cloud & Operations', 'services/cloud-operations.html'],
      ['Growth', 'services/growth.html']
    ];
    const desktopContact = document.querySelector('.main-nav > a[href="#contact"]');
    const desktopContactCta = document.querySelector('.header-cta[href="#contact"]');
    assert(getComputedStyle(desktopContact).display === 'none', 'desktop Contact tab must be hidden');
    assert(getComputedStyle(desktopContactCta).display !== 'none', 'desktop Talk to our team CTA must remain visible');
    assert(destination('products')?.getAttribute('href') === '#products', 'Products text must target its homepage section');
    assert(destination('services')?.getAttribute('href') === '#services', 'Services text must target its homepage section');
    assert(document.querySelectorAll('[data-mega-item]').length === 11, 'must render eleven menu items');
    document.querySelectorAll('.mega-menu-detail').forEach(detail => {
      assert(detail.childElementCount === 1, 'each menu must render one detail subtree');
    });
    assert(document.querySelectorAll('.mega-menu-footer').length === 2, 'both menu footers must use the integrated footer class');

    closeOutside();
    focusOutside();
    pointerEnter(destination('products'));
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
    pointerEnter(destination('products'));
    document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'outside-focused Escape must close a hover-opened menu');
    assert(document.activeElement === destination('products'), 'outside-focused Escape must restore the open menu destination focus');

    focusOutside();
    destination('products').focus();
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'focus alone must open the menu');
    closeOutside();

    openFromClosed('products');
    clickWithoutNavigation(destination('products'));
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'Products text click must close its open menu');

    closeOutside();
    pointerEnter(destination('products'));
    root('products').dispatchEvent(new PointerEvent('pointerleave', { bubbles: false }));
    await wait(100);
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'pointer leave must not close before 200ms');
    root('products').dispatchEvent(new PointerEvent('pointerenter', { bubbles: false }));
    await wait(125);
    assert(trigger('products').getAttribute('aria-expanded') === 'true', 'pointer re-entry must cancel delayed close');
    closeOutside();

    pointerEnter(destination('products'));
    root('products').dispatchEvent(new PointerEvent('pointerleave', { bubbles: false }));
    await wait(225);
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'pointer leave must close after 200ms');

    openFromClosed('products');
    pointerEnter(root('products').querySelector('[data-mega-item="pad"]'));
    assert(root('products').dataset.activeItem === 'pad', 'left-item hover must select its item');
    root('products').querySelector('[data-mega-item="robot"]').focus();
    assert(root('products').dataset.activeItem === 'robot', 'left-item focus must select its item');
    pointerEnter(root('products').querySelector('[data-mega-item="scan"]'));
    assert(root('products').dataset.activeItem === 'scan', 'left-item hover must select its item');

    const productItems = [...root('products').querySelectorAll('[data-mega-item]')];
    assert(
      JSON.stringify(productItems.map(item => item.textContent)) === JSON.stringify(expectedProducts.map(([label]) => label)),
      'rendered products must match approved labels and order'
    );
    expectedProducts.forEach(([label, expectedHref], index) => {
      assert(productItems[index].tagName === 'A', `${label} menu item must be an anchor`);
      assert(productItems[index].getAttribute('href') === expectedHref, `${label} menu item must navigate directly`);
      pointerEnter(productItems[index]);
      const detail = root('products').querySelector('.mega-menu-detail');
      assert(detail.querySelector('h3').textContent === label, `product detail title must match ${label}`);
      assert(detail.querySelector('a').getAttribute('href') === expectedHref, `${label} must link to ${expectedHref}`);
    });

    closeOutside();
    openFromClosed('products');
    const serviceTrigger = trigger('services');
    pointerEnter(destination('services'));
    assert(serviceTrigger.getAttribute('aria-expanded') === 'true', 'hovering Services must open its menu');
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'opening services must close products');

    root('services').querySelector('[data-mega-item].active').focus();
    root('services').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert(serviceTrigger.getAttribute('aria-expanded') === 'false', 'Escape must close the open menu');
    assert(document.activeElement === destination('services'), 'Escape must restore destination focus');

    openFromClosed('products');
    closeOutside();
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'outside pointerdown must close the menu');

    openFromClosed('products');
    pointerEnter(root('products').querySelector('[data-mega-item="pad"]'));
    const productDestination = root('products').querySelector('.mega-menu-detail a');
    assert(productDestination.getAttribute('href') === 'products/aiya-pad.html', 'product destination must use the AIYAPad detail URL');
    clickWithoutNavigation(productDestination);
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'destination click must close the menu');

    openFromClosed('services');
    const serviceItems = [...root('services').querySelectorAll('[data-mega-item]')];
    assert(
      JSON.stringify(serviceItems.map(item => item.textContent)) === JSON.stringify(expectedServices.map(([label]) => label)),
      'rendered service groups must match approved labels and order'
    );
    expectedServices.forEach(([label, expectedHref], index) => {
      assert(serviceItems[index].tagName === 'A', `${label} menu item must be an anchor`);
      assert(serviceItems[index].getAttribute('href') === expectedHref, `${label} menu item must navigate directly`);
      pointerEnter(serviceItems[index]);
      const detail = root('services').querySelector('.mega-menu-detail');
      assert(detail.querySelector('h3').textContent === label, `service detail title must match ${label}`);
      assert(detail.querySelector('a').getAttribute('href') === expectedHref, `${label} must link to ${expectedHref}`);
      assert(detail.childElementCount === 1, `${label} must keep one detail subtree`);
    });

    pointerEnter(root('services').querySelector('[data-mega-item="engineering"]'));
    clickWithoutNavigation(root('services').querySelector('.mega-menu-detail a'));
    assert(serviceTrigger.getAttribute('aria-expanded') === 'false', 'service destination must close the menu');

    openFromClosed('products');
    const lastItem = root('products').querySelector('[data-mega-item="marketing"]');
    lastItem.focus();
    const detail = root('products').querySelector('.mega-menu-detail');
    const observer = new MutationObserver(() => {});
    observer.observe(detail, { childList: true });
    lastItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const replacements = observer.takeRecords().filter(record => record.type === 'childList').length;
    observer.disconnect();
    assert(replacements === 1, `ArrowDown must replace detail once, observed ${replacements}`);
    assert(root('products').dataset.activeItem === 'commerce', 'ArrowDown must wrap from last to first');
    root('products').querySelector('[data-mega-item="commerce"]').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    assert(root('products').dataset.activeItem === 'marketing', 'ArrowUp must wrap from first to last');
    assert(detail.childElementCount === 1, 'arrow selection must preserve one detail subtree');

    openFromClosed('products');
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

$mobileRunner = @'
<script>
(async () => {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const destination = type => document.querySelector(`[data-mega-link="${type}"]`);
  const trigger = type => document.querySelector(`[data-mega-trigger="${type}"]`);
  const root = type => document.querySelector(`[data-mega-menu="${type}"]`);
  const activeRoot = () => document.querySelector('.nav-menu-item.open');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
  const clickWithoutNavigation = link => {
    link.addEventListener('click', event => event.preventDefault(), { once: true });
    link.click();
  };
  const pointerEnter = element => {
    element.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'touch', bubbles: false }));
  };
  const openNavigation = () => {
    if (!mainNav.classList.contains('open')) navToggle.click();
    assert(mainNav.classList.contains('open'), 'hamburger must open the mobile navigation');
    assert(navToggle.getAttribute('aria-expanded') === 'true', 'hamburger ARIA state must become true');
  };

  try {
    assert(window.innerWidth === 390 && window.innerHeight === 667, `mobile test must run at 390x667; observed ${window.innerWidth}x${window.innerHeight}`);
    const mobileContact = document.querySelector('.main-nav > a[href="#contact"]');
    const mobileContactCta = document.querySelector('.header-cta[href="#contact"]');
    assert(getComputedStyle(mobileContact).display !== 'none', 'mobile Contact tab must remain visible');
    assert(getComputedStyle(mobileContactCta).display === 'none', 'mobile Talk to our team CTA must remain hidden');
    assert(
      JSON.stringify([...root('products').querySelectorAll('[data-mega-item]')].map(button => button.textContent)) ===
        JSON.stringify(['AIYA Commerce', 'AIYA Revenue', 'AIYAPad', 'AIYARobot', 'AIYAScan', 'AIYA Marketing']),
      'mobile product order must match the approved order'
    );
    assert(root('products').dataset.activeItem === 'commerce', 'mobile product default must be AIYA Commerce');
    assert(root('services').dataset.activeItem === 'strategy', 'mobile service default must be Strategy & Experience');

    openNavigation();
    clickWithoutNavigation(destination('products'));
    assert(!mainNav.classList.contains('open'), 'Products text must close the mobile navigation and scroll');

    openNavigation();
    trigger('services').click();
    pointerEnter(root('services').querySelector('[data-mega-item="engineering"]'));
    assert(document.querySelectorAll('.nav-menu-item.open').length === 1, 'only one mobile top-level nested menu may be open');
    assert(activeRoot().querySelectorAll('.mega-menu-item.active').length === 1, 'the open mobile menu must have one active nested item');
    assert(activeRoot().querySelector('.mega-menu-detail').childElementCount === 1, 'the open mobile menu must have one active detail subtree');
    assert(root('services').dataset.activeItem === 'engineering', 'mobile service test must select a non-default detail');
    const serviceDestination = root('services').querySelector('.mega-menu-detail a');
    assert(serviceDestination.getAttribute('href') === 'services/software-engineering.html', 'mobile service destination must use its detail URL');
    clickWithoutNavigation(serviceDestination);
    assert(!mainNav.classList.contains('open'), 'dynamic service destination must close the mobile navigation');
    assert(navToggle.getAttribute('aria-expanded') === 'false', 'dynamic service destination must collapse hamburger ARIA state');
    assert(trigger('services').getAttribute('aria-expanded') === 'false', 'dynamic service destination must close its mega menu');

    openNavigation();
    trigger('products').click();
    pointerEnter(root('products').querySelector('[data-mega-item="pad"]'));
    const productDestination = root('products').querySelector('.mega-menu-detail a');
    assert(productDestination.getAttribute('href') === 'products/aiya-pad.html', 'mobile product destination must use its detail URL');
    clickWithoutNavigation(productDestination);
    assert(!mainNav.classList.contains('open'), 'dynamic product destination must close the mobile navigation');
    assert(navToggle.getAttribute('aria-expanded') === 'false', 'dynamic product destination must collapse hamburger ARIA state');
    assert(trigger('products').getAttribute('aria-expanded') === 'false', 'dynamic product destination must close its mega menu');
    await wait(0);

    openNavigation();
    trigger('services').click();
    pointerEnter(root('services').querySelector('[data-mega-item="engineering"]'));
    const navStyle = getComputedStyle(mainNav);
    assert(navStyle.overflowY === 'auto', `mobile navigation overflow-y must be auto; observed ${navStyle.overflowY}`);
    assert(navStyle.maxHeight === '599px', `mobile navigation max-height must equal the viewport below the header; observed ${navStyle.maxHeight}`);
    assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'mobile document must have zero horizontal overflow');
    const maximumScrollTop = mainNav.scrollHeight - mainNav.clientHeight;
    assert(maximumScrollTop > 0, 'an expanded mobile nested menu must create a reachable nav scroll range');
    mainNav.scrollTop = maximumScrollTop;
    await wait(0);
    assert(Math.abs(mainNav.scrollTop - maximumScrollTop) <= 1, 'mobile navigation must reach the end of its scroll height');
    const navRect = mainNav.getBoundingClientRect();
    const contactRect = mainNav.querySelector('a[href="#contact"]').getBoundingClientRect();
    assert(contactRect.top >= navRect.top - 1 && contactRect.bottom <= navRect.bottom + 1, 'Contact must be reachable inside the mobile nav scroll container');

    clickWithoutNavigation(root('services').querySelector('.mega-menu-detail a'));
    await wait(0);
    document.body.dataset.megaMobileTest = 'PASS';
  } catch (error) {
    document.body.dataset.megaMobileTest = `FAIL: ${error.message}`;
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

  $mobileFixtureHtml = $html.Replace($scriptTag, "$scriptTag`r`n$mobileRunner")
  [IO.File]::WriteAllText($fixture, $mobileFixtureHtml, [Text.UTF8Encoding]::new($false))

  $portReservation = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, 0)
  $portReservation.Start()
  $mobilePort = ([Net.IPEndPoint]$portReservation.LocalEndpoint).Port
  $portReservation.Stop()
  $mobileArguments = @(
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-crash-reporter',
    '--disable-breakpad',
    "--user-data-dir=`"$mobileProfile`"",
    '--remote-debugging-address=127.0.0.1',
    "--remote-debugging-port=$mobilePort",
    'about:blank'
  )
  $mobileProcess = Start-Process -FilePath $chrome -ArgumentList $mobileArguments -WindowStyle Hidden -PassThru -RedirectStandardOutput $mobileStdout -RedirectStandardError $mobileStderr
  $mobileSocket = $null
  try {
    $targets = $null
    for ($attempt = 0; $attempt -lt 30 -and -not $targets; $attempt++) {
      try {
        $targets = Invoke-RestMethod "http://127.0.0.1:$mobilePort/json/list"
      }
      catch {
        Start-Sleep -Milliseconds 100
      }
    }
    if (-not $targets) {
      throw "Mobile Chrome DevTools endpoint did not start: $(Get-Content -Raw -LiteralPath $mobileStderr)"
    }

    $page = $targets | Where-Object type -eq 'page' | Select-Object -First 1
    $mobileSocket = [Net.WebSockets.ClientWebSocket]::new()
    $mobileSocket.ConnectAsync([Uri]$page.webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult() | Out-Null
    $id = 1
    Invoke-Cdp -Socket $mobileSocket -Id $id -Method 'Emulation.setDeviceMetricsOverride' -Parameters @{
      width = 390
      height = 667
      deviceScaleFactor = 1
      mobile = $true
      screenWidth = 390
      screenHeight = 667
    } | Out-Null
    $id++
    Invoke-Cdp -Socket $mobileSocket -Id $id -Method 'Page.navigate' -Parameters @{ url = $fixtureUri } | Out-Null

    $mobileResult = ''
    for ($attempt = 0; $attempt -lt 30 -and -not $mobileResult; $attempt++) {
      Start-Sleep -Milliseconds 100
      $id++
      $evaluation = Invoke-Cdp -Socket $mobileSocket -Id $id -Method 'Runtime.evaluate' -Parameters @{
        expression = "document.body?.dataset.megaMobileTest || ''"
        returnByValue = $true
      }
      $mobileResult = [string]$evaluation.result.value
    }
    if (-not $mobileResult) {
      throw 'The mobile browser test did not publish a result.'
    }
    if ($mobileResult -ne 'PASS') {
      throw $mobileResult
    }
  }
  finally {
    if ($mobileSocket) {
      try {
        $id++
        Invoke-Cdp -Socket $mobileSocket -Id $id -Method 'Browser.close' | Out-Null
      }
      catch {
      }
      $mobileSocket.Dispose()
    }
    if ($mobileProcess -and -not $mobileProcess.HasExited) {
      if (-not $mobileProcess.WaitForExit(3000)) {
        Stop-Process -Id $mobileProcess.Id -Force
        $mobileProcess.WaitForExit()
      }
    }
  }
}
finally {
  if (Test-Path -LiteralPath $fixture) {
    Remove-Item -LiteralPath $fixture -Force
  }
  @($stdout, $stderr, $mobileStdout, $mobileStderr) | ForEach-Object {
    if (Test-Path -LiteralPath $_) {
      for ($attempt = 0; $attempt -lt 10; $attempt++) {
        try {
          Remove-Item -LiteralPath $_ -Force -ErrorAction Stop
          break
        }
        catch {
          if ($attempt -eq 9) { throw }
          Start-Sleep -Milliseconds 100
        }
      }
    }
  }
  @($profile, $mobileProfile) | ForEach-Object {
    if (Test-Path -LiteralPath $_) {
      Remove-Item -LiteralPath $_ -Recurse -Force
    }
  }
}

@($fixture, $profile, $stdout, $stderr, $mobileProfile, $mobileStdout, $mobileStderr) | ForEach-Object {
  if (Test-Path -LiteralPath $_) {
    throw "Test artifact was not removed: $_"
  }
}
Write-Output 'PASS: mega-menu browser interactions and artifact cleanup satisfied.'
