$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$read = @{}
foreach ($name in @('catalog.js', 'service-pages.js', 'index.html', 'i18n.js')) {
  $path = Join-Path $root $name
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing required source file: $name" }
  $read[$name] = Get-Content -LiteralPath $path -Raw
}

$expectedOfferings = @(
  @{ Title = 'AIYA Marketing'; Url = 'products/aiya-marketing.html' },
  @{ Title = 'AIYA Online Order'; Url = 'products/aiya-online-order.html' },
  @{ Title = 'AIYA Travel Ticketing'; Url = 'products/aiya-travel-ticketing.html' },
  @{ Title = 'AIYA CRM'; Url = 'services/crm-systems.html' },
  @{ Title = 'AIYA Gaming'; Url = 'products/aiya-gaming.html' },
  @{ Title = 'AIYA ERP'; Url = 'products/aiya-erp.html' }
)

$canonicalPages = $expectedOfferings.Url
foreach ($page in $canonicalPages) {
  $path = Join-Path $root $page
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing canonical page: $page" }
  $read[$page] = Get-Content -LiteralPath $path -Raw
}

$catalog = $read['catalog.js']
$servicePages = $read['service-pages.js']
$homepage = $read['index.html']
$i18n = $read['i18n.js']
$allCatalogSource = "$catalog`n$servicePages"

foreach ($offering in $expectedOfferings) {
  $title = [regex]::Escape($offering.Title)
  $url = [regex]::Escape($offering.Url)
  $offeringPattern = 'title:\s*["'']' + $title + '["''][\s\S]{0,400}url:\s*["'']' + $url + '["'']'
  if ($allCatalogSource -notmatch $offeringPattern) {
    throw "Missing offering contract: $($offering.Title) -> $($offering.Url)"
  }
}

$serviceOrder = @('engineering', 'integration', 'white-label', 'growth')
$servicePositions = foreach ($key in $serviceOrder) {
  $match = [regex]::Match($homepage, ('data-service=["'']' + [regex]::Escape($key) + '["'']'))
  if (-not $match.Success) { throw "Missing homepage service category: $key" }
  $match.Index
}
for ($i = 1; $i -lt $servicePositions.Count; $i++) {
  if ($servicePositions[$i] -le $servicePositions[$i - 1]) { throw 'Homepage service category order is incorrect.' }
}

$interfaceAssets = @(
  'assets/aiya-marketing-interface.jpg',
  'assets/aiya-online-order-interface.jpg',
  'assets/aiya-travel-ticketing-interface.jpg'
)
foreach ($asset in $interfaceAssets) {
  if ($allCatalogSource -notmatch [regex]::Escape($asset)) { throw "Missing interface asset contract: $asset" }
}

$integrationBlock = [regex]::Match($allCatalogSource, '(?ms)key:\s*["'']integration["''][\s\S]*?(?=^\s*\},?\s*$)').Value
if (-not $integrationBlock) { throw 'Missing Integration category definition.' }
if ($integrationBlock -match 'AIYA CRM|CRM Systems') { throw 'Integration capabilities must not contain AIYA CRM or CRM Systems.' }

$whiteLabelBlock = [regex]::Match($allCatalogSource, '(?ms)key:\s*["'']white-label["''][\s\S]*?(?=^\s*\},?\s*$)').Value
if (-not $whiteLabelBlock) { throw 'Missing White Label category definition.' }
foreach ($offering in $expectedOfferings) {
  $count = ([regex]::Matches($whiteLabelBlock, [regex]::Escape($offering.Title))).Count
  if ($count -ne 1) { throw "White Label category must contain $($offering.Title) exactly once (found $count)." }
}

foreach ($page in $canonicalPages) {
  $html = $read[$page]
  if ($html -match '(?i)(?:href|src)\s*=\s*["'']/') {
    throw "Canonical page uses an absolute href/src path: $page"
  }
}

$zhStart = $i18n.IndexOf('const zh = {')
$koStart = $i18n.IndexOf('const ko = {')
if ($zhStart -lt 0 -or $koStart -lt 0) { throw 'Missing Chinese or Korean translation dictionary.' }
$zh = $i18n.Substring($zhStart, $koStart - $zhStart)
$ko = $i18n.Substring($koStart)
foreach ($offering in $expectedOfferings) {
  $key = [regex]::Escape($offering.Title)
  $translationPattern = '["'']' + $key + '["'']\s*:\s*["''][^"'']+["'']'
  if ($zh -notmatch $translationPattern) { throw "Missing Chinese translation for $($offering.Title)." }
  if ($ko -notmatch $translationPattern) { throw "Missing Korean translation for $($offering.Title)." }
}

Write-Output 'White-label product structural contract passed.'
