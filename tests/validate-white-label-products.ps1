$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$read = @{}
foreach ($name in @('catalog.js', 'service-pages.js', 'index.html', 'i18n.js')) {
  $path = Join-Path $root $name
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing required source file: $name" }
  $read[$name] = Get-Content -LiteralPath $path -Raw -Encoding UTF8
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
  $read[$page] = Get-Content -LiteralPath $path -Raw -Encoding UTF8
}

$catalog = $read['catalog.js']
$servicePages = $read['service-pages.js']
$homepage = $read['index.html']
$i18n = $read['i18n.js']
$allCatalogSource = "$catalog`n$servicePages"

function Get-JsObjectBlock {
  param([string]$source, [string]$key)
  if ($key -eq '') { $start = $source.IndexOf('{') }
  else {
    $keyIndex = $source.IndexOf("key: '$key'")
    if ($keyIndex -lt 0) { $keyIndex = $source.IndexOf('key: "' + $key + '"') }
    if ($keyIndex -lt 0) { return '' }
    $start = $source.LastIndexOf('{', $keyIndex)
  }
  if ($start -lt 0) { return '' }
  $depth = 0
  $quote = [char]0
  $escaped = $false
  for ($i = $start; $i -lt $source.Length; $i++) {
    $char = $source[$i]
    if ($quote -ne [char]0) {
      if ($escaped) { $escaped = $false; continue }
      if ($char -eq [char]92) { $escaped = $true; continue }
      if ($char -eq $quote) { $quote = [char]0 }
      continue
    }
    if ($char -eq [char]39 -or $char -eq [char]34) { $quote = $char; continue }
    if ($char -eq [char]123) { $depth++ }
    if ($char -eq [char]125) {
      $depth--
      if ($depth -eq 0) { return $source.Substring($start, $i - $start + 1) }
    }
  }
  return ''
}

function Get-JsProfileBlock {
  param([string]$source, [string]$title)
  $start = $source.IndexOf("'$title': {")
  if ($start -lt 0) { $start = $source.IndexOf('"' + $title + '": {') }
  if ($start -lt 0) { return '' }
  return Get-JsObjectBlock ($source.Substring($start)) ''
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
  if (-not (Test-Path -LiteralPath (Join-Path $root $asset))) { throw "Missing interface asset file: $asset" }
  if ($allCatalogSource -notmatch [regex]::Escape($asset)) { throw "Missing interface asset contract: $asset" }
}

$integrationBlock = Get-JsObjectBlock $allCatalogSource 'integration'
if (-not $integrationBlock) { throw 'Missing Integration category definition.' }
if ($integrationBlock -match 'AIYA CRM|CRM Systems') { throw 'Integration capabilities must not contain AIYA CRM or CRM Systems.' }

$whiteLabelBlock = Get-JsObjectBlock $allCatalogSource 'white-label'
if (-not $whiteLabelBlock) { throw 'Missing White Label category definition.' }
$capabilitiesMatch = [regex]::Match($whiteLabelBlock, 'capabilities:\s*\[([^\]]+)\]')
if (-not $capabilitiesMatch.Success) { throw 'White Label category is missing its capability list.' }
$actualTitles = @([regex]::Matches($capabilitiesMatch.Groups[1].Value, '["'']([^"'']+)["'']') | ForEach-Object { $_.Groups[1].Value })
if (($actualTitles -join '|') -ne (($expectedOfferings | ForEach-Object Title) -join '|')) { throw 'White Label capability order or membership is incorrect.' }
$assetByTitle = @{
  'AIYA Marketing' = 'assets/aiya-marketing-interface.jpg'
  'AIYA Online Order' = 'assets/aiya-online-order-interface.jpg'
  'AIYA Travel Ticketing' = 'assets/aiya-travel-ticketing-interface.jpg'
}
foreach ($offering in $expectedOfferings) {
  $profile = Get-JsProfileBlock $servicePages $offering.Title
  if (-not $profile) { throw "Missing offering profile: $($offering.Title)." }
  if ($profile -notmatch ('url:\s*["'']' + [regex]::Escape($offering.Url) + '["'']')) { throw "Wrong URL in profile: $($offering.Title)." }
  if ($assetByTitle.ContainsKey($offering.Title)) {
    $pageHtml = $read[$offering.Url]
    if ($pageHtml -notmatch [regex]::Escape($assetByTitle[$offering.Title])) { throw "Wrong interface asset on page: $($offering.Title)." }
  }
}

foreach ($page in @('index.html') + $canonicalPages) {
  $html = if ($page -eq 'index.html') { $homepage } else { $read[$page] }
  if ($html -match '(?i)(?:href|src)\s*=\s*["'']/') {
    throw "Canonical page uses an absolute href/src path: $page"
  }
}

$zhStart = $i18n.IndexOf('const zh = {')
$koStart = $i18n.IndexOf('const ko = {')
if ($zhStart -lt 0 -or $koStart -lt 0) { throw 'Missing Chinese or Korean translation dictionary.' }
$zh = $i18n.Substring($zhStart, $koStart - $zhStart)
$ko = $i18n.Substring($koStart)
$decode = { param([string]$base64) [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($base64)) }
$exactTranslations = @{
  'AIYA Marketing' = @{ zh = (&$decode 'QUlZQSDokKXplIA='); ko = (&$decode 'QUlZQSDrp4jsvIDtjIU=') }
  'AIYA Online Order' = @{ zh = (&$decode 'QUlZQSDlnKjnur/ngrnljZU='); ko = (&$decode 'QUlZQSDsmKjrnbzsnbgg7KO866y4') }
  'AIYA Travel Ticketing' = @{ zh = (&$decode 'QUlZQSDml4XooYznpajliqE='); ko = (&$decode 'QUlZQSDsl6ztlokg7Yuw7LyT7YyF') }
  'AIYA CRM' = @{ zh = (&$decode 'QUlZQSDlrqLmiLflhbPns7vnrqHnkIY='); ko = 'AIYA CRM' }
  'AIYA Gaming' = @{ zh = (&$decode 'QUlZQSDmuLjmiI/ns7vnu58='); ko = (&$decode 'QUlZQSDqsozsnbTrsI0=') }
  'AIYA ERP' = @{ zh = (&$decode 'QUlZQSDkvIHkuJrotYTmupDnrqHnkIY='); ko = 'AIYA ERP' }
}
foreach ($offering in $expectedOfferings) {
  $key = [regex]::Escape($offering.Title)
  $translationPattern = '["'']' + $key + '["'']\s*:\s*["''][^"'']+["'']'
  foreach ($language in @(@{ Name = 'Chinese'; Code = 'zh'; Source = $zh }, @{ Name = 'Korean'; Code = 'ko'; Source = $ko })) {
    $translation = [regex]::Match($language.Source, $translationPattern)
    if (-not $translation.Success) { throw "Missing $($language.Name) translation for $($offering.Title)." }
    $value = [regex]::Match($translation.Value, ':\s*["'']([^"'']+)["'']').Groups[1].Value
    if ($value -ne $exactTranslations[$offering.Title][$language.Code]) { throw "Incorrect $($language.Name) translation for $($offering.Title)." }
  }
}

Write-Output 'White-label product structural contract passed.'
