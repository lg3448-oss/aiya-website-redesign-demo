$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path -LiteralPath $chrome)) { throw "Google Chrome is required: $chrome" }

$pages = @(
  @{ Path = 'index.html'; Key = 'homepage' },
  @{ Path = 'services/white-label-products.html'; Key = 'white-label' },
  @{ Path = 'products/aiya-marketing.html'; Key = 'marketing' },
  @{ Path = 'products/aiya-online-order.html'; Key = 'aiya-online-order' },
  @{ Path = 'products/aiya-travel-ticketing.html'; Key = 'aiya-travel-ticketing' },
  @{ Path = 'services/crm-systems.html'; Key = 'crm-systems' },
  @{ Path = 'products/aiya-gaming.html'; Key = 'aiya-gaming' },
  @{ Path = 'products/aiya-erp.html'; Key = 'aiya-erp' }
)
$languages = @('en', 'zh', 'ko')
$viewports = @(
  @{ Name = 'desktop'; Size = '1440,1000' },
  @{ Name = 'mobile'; Size = '390,844' }
)
$runId = [guid]::NewGuid().ToString('N')
$tempRoot = [IO.Path]::GetTempPath()
$artifacts = [Collections.Generic.List[string]]::new()

$runner = @'
<script>
(async () => {
  try {
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    const text = element => (element?.textContent || '').replace(/\s+/g, ' ').trim();
    const assertList = (actual, expected, message) => assert(JSON.stringify(actual) === JSON.stringify(expected), `${message}; expected ${expected.join(' | ')}, observed ${actual.join(' | ')}`);
    const isVisible = element => {
      for (let current = element; current && current !== document.documentElement; current = current.parentElement) {
        const style = getComputedStyle(current);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
      }
      return Boolean(element?.getClientRects().length);
    };
    const language = new URLSearchParams(location.search).get('lang') || 'en';
    const expected = {
      en: {
        category: 'White Label Products',
        labels: ['AIYA Marketing', 'AIYA Online Order', 'AIYA Travel Ticketing', 'AIYA CRM', 'AIYA Gaming', 'AIYA ERP'],
        groups: ['Software Engineering', 'Integration & Automation', 'White Label Products', 'Growth'],
        gaming: [/game (?:experience )?design/i, /game payment/i, /virtual (?:coin|currency|token)/i],
        erp: /enterprise operational workflows/i
      },
      zh: {
        category: '\u767d\u6807\u4ea7\u54c1',
        labels: ['AIYA \u8425\u9500', 'AIYA \u5728\u7ebf\u70b9\u5355', 'AIYA \u65c5\u884c\u7968\u52a1', 'AIYA \u5ba2\u6237\u5173\u7cfb\u7ba1\u7406', 'AIYA \u6e38\u620f\u7cfb\u7edf', 'AIYA \u4f01\u4e1a\u8d44\u6e90\u7ba1\u7406'],
        groups: ['\u8f6f\u4ef6\u5de5\u7a0b', '\u7cfb\u7edf\u96c6\u6210\u4e0e\u81ea\u52a8\u5316', '\u767d\u6807\u4ea7\u54c1', '\u589e\u957f\u670d\u52a1'],
        gaming: [/\u6e38\u620f\u4f53\u9a8c\u8bbe\u8ba1/, /\u6e38\u620f\u652f\u4ed8/, /(?:\u865a\u62df\u5e01|\u4ee3\u5e01)/],
        erp: /\u4f01\u4e1a\u8fd0\u8425\u6d41\u7a0b/
      },
      ko: {
        category: '\ud654\uc774\ud2b8 \ub77c\ubca8 \uc81c\ud488',
        labels: ['AIYA \ub9c8\ucf00\ud305', 'AIYA \uc628\ub77c\uc778 \uc8fc\ubb38', 'AIYA \uc5ec\ud589 \ud2f0\ucf13\ud305', 'AIYA CRM', 'AIYA \uac8c\uc774\ubc0d', 'AIYA ERP'],
        groups: ['\uc18c\ud504\ud2b8\uc6e8\uc5b4 \uc5d4\uc9c0\ub2c8\uc5b4\ub9c1', '\uc5f0\ub3d9 \ubc0f \uc790\ub3d9\ud654', '\ud654\uc774\ud2b8 \ub77c\ubca8 \uc81c\ud488', '\uc131\uc7a5'],
        gaming: [/\uac8c\uc784 \uacbd\ud5d8 \uc124\uacc4/, /\uac8c\uc784 \uacb0\uc81c/, /(?:\uac00\uc0c1 \ucf54\uc778|\ud1a0\ud070)/],
        erp: /\uc5d4\ud130\ud504\ub77c\uc774\uc988 \uc6b4\uc601 \uc6cc\ud06c\ud50c\ub85c/
      }
    }[language];
    const rootUri = '__ROOT_URI__';
    const canonicalPath = path => new URL(path, rootUri).pathname;
    const resolvedUrl = link => new URL(link.getAttribute('href'), location.href);
    const canonicalUrls = ['products/aiya-marketing.html', 'products/aiya-online-order.html', 'products/aiya-travel-ticketing.html', 'services/crm-systems.html', 'products/aiya-gaming.html', 'products/aiya-erp.html'];
    const offeringPages = {
      marketing: { title: expected.labels[0], back: 'services/white-label-products.html' },
      'aiya-online-order': { title: expected.labels[1], back: 'services/white-label-products.html' },
      'aiya-travel-ticketing': { title: expected.labels[2], back: 'services/white-label-products.html' },
      'crm-systems': { title: expected.labels[3], back: 'services/white-label-products.html' },
      'aiya-gaming': { title: expected.labels[4], back: 'services/white-label-products.html' },
      'aiya-erp': { title: expected.labels[5], back: 'services/white-label-products.html' }
    };

    if (__IS_HOME__) {
      await new Promise(resolve => window.setTimeout(resolve, 250));
      assert(location.search === `?lang=${language}`, 'Homepage lang query parameter was not preserved');
      assert(location.hash === '#services', 'Homepage browser URL must retain #services');
    } else {
      await new Promise(resolve => window.setTimeout(resolve, 250));
    }
    assert(window.aiyaI18n?.language === language, `expected ${language} to be active`);
    assert(document.documentElement.scrollWidth <= document.documentElement.clientWidth, 'horizontal overflow detected');

    const detailKey = document.body.dataset.detailKey;
    if (!__IS_HOME__) assert(detailKey === '__PAGE_KEY__', `expected canonical key __PAGE_KEY__, observed ${detailKey}`);
    if (detailKey === 'white-label') {
      assert(text(document.querySelector('#detail-title')) === expected.category, `White Label overview title is wrong; expected ${expected.category}, observed ${text(document.querySelector('#detail-title'))}`);
      const overviewBack = resolvedUrl(document.querySelector('.detail-back'));
      assert(overviewBack.pathname === canonicalPath('index.html') && overviewBack.hash === '#services', 'White Label overview back link is wrong');
      assertList([...document.querySelectorAll('#detail-capabilities li span')].map(text), expected.labels, 'White Label overview offerings are wrong');
    }
    if (offeringPages[detailKey]) {
      const offering = offeringPages[detailKey];
      assert(text(document.querySelector('#detail-title')) === offering.title, `${detailKey} title is wrong`);
      assert(resolvedUrl(document.querySelector('.detail-back')).pathname === canonicalPath(offering.back), `${detailKey} back link is wrong`);
    }

    const interfaces = [...document.querySelectorAll('.interface-frame img')];
    const expectsInterface = ['marketing', 'aiya-online-order', 'aiya-travel-ticketing'].includes(detailKey);
    assert(interfaces.length === (expectsInterface ? 1 : 0), `${detailKey || 'homepage'} has an unexpected interface image`);
    await Promise.all(interfaces.map(image => image.complete ? Promise.resolve() : new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', () => reject(new Error('interface image failed to load')), { once: true });
    })));
    interfaces.forEach(image => assert(image.complete && image.naturalWidth > 0, 'interface image is incomplete'));

    if (detailKey === 'aiya-gaming') {
      document.querySelector('#detail-summary')?.scrollIntoView({ block: 'center' });
      await new Promise(resolve => window.setTimeout(resolve, 250));
      const visibleCopy = [document.querySelector('#detail-summary'), ...document.querySelectorAll('#detail-capabilities span'), ...document.querySelectorAll('#detail-deliverables span')]
        .filter(isVisible)
        .map(text);
      expected.gaming.forEach(coverage => assert(visibleCopy.some(copy => coverage.test(copy)), `Gaming copy is missing ${coverage} from a visible rendered element`));
    }
    if (detailKey === 'aiya-erp') {
      document.querySelector('#detail-summary')?.scrollIntoView({ block: 'center' });
      await new Promise(resolve => window.setTimeout(resolve, 250));
      const visibleCopy = [document.querySelector('#detail-summary'), ...document.querySelectorAll('#detail-capabilities span'), ...document.querySelectorAll('#detail-deliverables span')]
        .filter(isVisible)
        .map(text);
      assert(visibleCopy.some(copy => expected.erp.test(copy)), 'ERP copy does not cover enterprise operational workflows in a visible rendered element');
    }

    const servicesMenu = document.querySelector('[data-mega-menu="services"]');
    const serviceGroups = [...servicesMenu.querySelectorAll('.mega-menu-group')];
    assert(serviceGroups.length === 4, 'Services mega menu must contain exactly four groups');
    assertList(serviceGroups.map(group => group.querySelector('.mega-menu-category').textContent), expected.groups, 'Services mega-menu group order is wrong');
    const whiteLabelGroup = serviceGroups[2];
    assertList([...whiteLabelGroup.querySelectorAll('[data-mega-item]')].map(item => text(item.querySelector('strong'))), expected.labels, 'White Label mega-menu offerings are wrong');
    assertList([...whiteLabelGroup.querySelectorAll('[data-mega-item]')].map(item => resolvedUrl(item).pathname), canonicalUrls.map(canonicalPath), 'White Label mega-menu offering links are wrong');
    assert([...whiteLabelGroup.querySelectorAll('[data-mega-item]')].filter(item => text(item.querySelector('strong')) === expected.labels[3]).length === 1, 'CRM must appear once under White Label');
    assert(!serviceGroups[1].textContent.includes(expected.labels[3]), 'CRM must be absent from Integration');
    assert(resolvedUrl(whiteLabelGroup.querySelector('.mega-menu-overview')).pathname === canonicalPath('services/white-label-products.html'), 'White Label mega-menu overview link is wrong');

    const menuLink = document.querySelector('[data-mega-link="services"]');
    const menuToggle = document.querySelector('[data-mega-trigger="services"]');
    const menuPanel = servicesMenu.querySelector('[data-menu-panel="services"]');
    if (innerWidth > 760) {
      menuLink.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse', bubbles: false }));
    } else {
      document.querySelector('.nav-toggle').click();
      menuToggle.click();
    }
    menuPanel.getAnimations().forEach(animation => animation.finish());
    assert(menuToggle.getAttribute('aria-expanded') === 'true', 'Services menu did not open for the active viewport');
    assert(servicesMenu.classList.contains('open') && !menuPanel.hidden && isVisible(menuPanel), 'Services menu panel is not visibly open');
    assert(document.documentElement.scrollWidth <= document.documentElement.clientWidth, 'opened Services menu has horizontal overflow');

    if (__IS_HOME__) {
      const selectors = [...document.querySelectorAll('.service-selector [data-service]')];
      assertList(selectors.map(selector => selector.dataset.service), ['engineering', 'integration', 'white-label', 'growth'], 'Homepage service selector order is wrong');
      const whiteLabelSelector = selectors[2];
      whiteLabelSelector.click();
      assert(text(document.querySelector('#service-title')) === expected.category, 'Homepage White Label selector did not activate the category');
      assertList([...document.querySelectorAll('#service-offerings strong')].map(text), expected.labels, 'Homepage White Label offerings are wrong');
      assertList([...document.querySelectorAll('#service-offerings a')].map(resolvedUrl).map(url => url.pathname), canonicalUrls.map(canonicalPath), 'Homepage White Label offering links are wrong');
      assert(resolvedUrl(document.querySelector('#service-overview')).pathname === canonicalPath('services/white-label-products.html'), 'Homepage White Label overview link is wrong');
    }

    document.body.dataset.whiteLabelBrowserTest = 'PASS';
  } catch (error) {
    document.body.dataset.whiteLabelBrowserTest = `FAIL: ${error.message}`;
  }
})();
</script>
'@

function Invoke-WhiteLabelBrowserCheck {
  param([hashtable]$Page, [string]$Language, [hashtable]$Viewport)

  $source = Join-Path $root $Page.Path
  $sourceDirectory = Split-Path -Parent $source
  $fixture = Join-Path $sourceDirectory ".white-label-browser-$runId-$($Viewport.Name)-$Language.html"
  $token = "$runId-$($Viewport.Name)-$Language-$([IO.Path]::GetFileNameWithoutExtension($Page.Path))"
  $profile = Join-Path $tempRoot "aiya-white-label-browser-profile-$token"
  $stdout = Join-Path $tempRoot "aiya-white-label-browser-output-$token.html"
  $stderr = Join-Path $tempRoot "aiya-white-label-browser-error-$token.log"
  @($fixture, $profile, $stdout, $stderr) | ForEach-Object { $artifacts.Add($_) }

  $sourceHtml = [IO.File]::ReadAllText($source, [Text.Encoding]::UTF8)
  if (-not $sourceHtml.Contains('</body>')) { throw "Could not inject browser test into $($Page.Path)." }
  $rootUri = ([uri]::new("$root\")).AbsoluteUri
  $pageRunner = $runner.Replace('__IS_HOME__', $(if ($Page.Key -eq 'homepage') { 'true' } else { 'false' })).Replace('__PAGE_KEY__', $Page.Key).Replace('__ROOT_URI__', $rootUri)
  [IO.File]::WriteAllText($fixture, $sourceHtml.Replace('</body>', "$pageRunner`r`n</body>"), [Text.UTF8Encoding]::new($false))

  $arguments = @(
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-crash-reporter',
    '--disable-breakpad',
    '--force-prefers-reduced-motion',
    "--user-data-dir=`"$profile`"",
    "--window-size=$($Viewport.Size)",
    '--virtual-time-budget=2000',
    '--dump-dom',
    $(if ($Page.Key -eq 'homepage') { "$([uri]::new($fixture).AbsoluteUri)?lang=$Language#services" } else { "$([uri]::new($fixture).AbsoluteUri)?lang=$Language" })
  )
  $process = Start-Process -FilePath $chrome -ArgumentList $arguments -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr
  if ($process.ExitCode -ne 0) { throw "Chrome failed for $($Page.Path) [$Language/$($Viewport.Name)]: $(Get-Content -Raw -LiteralPath $stderr)" }
  $dom = [IO.File]::ReadAllText($stdout, [Text.Encoding]::UTF8)
  $result = [regex]::Match($dom, 'data-white-label-browser-test="([^"]+)"')
  if (-not $result.Success) { throw "No browser result for $($Page.Path) [$Language/$($Viewport.Name)]." }
  if ($result.Groups[1].Value -ne 'PASS') { throw "$($Page.Path) [$Language/$($Viewport.Name)]: $($result.Groups[1].Value)" }
}

try {
  foreach ($page in $pages) {
    foreach ($language in $languages) {
      foreach ($viewport in $viewports) {
        Invoke-WhiteLabelBrowserCheck -Page $page -Language $language -Viewport $viewport
      }
    }
  }
}
finally {
  foreach ($artifact in ($artifacts | Select-Object -Unique)) {
    if (Test-Path -LiteralPath $artifact) { Remove-Item -LiteralPath $artifact -Recurse -Force }
  }
}

foreach ($artifact in ($artifacts | Select-Object -Unique)) {
  if (Test-Path -LiteralPath $artifact) { throw "Test artifact was not removed: $artifact" }
}

Write-Output 'PASS: White Label Products browser coverage passed across languages and viewports.'
