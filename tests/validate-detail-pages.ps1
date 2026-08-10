$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$pages = @(
  @{ Path = 'products/aiya-commerce.html'; Key = 'commerce'; Title = 'AIYA Commerce | AIYA Technology'; Kind = 'product' },
  @{ Path = 'products/aiya-revenue.html'; Key = 'revenue'; Title = 'AIYA Revenue | AIYA Technology'; Kind = 'product' },
  @{ Path = 'products/aiya-pad.html'; Key = 'pad'; Title = 'AIYAPad | AIYA Technology'; Kind = 'product' },
  @{ Path = 'products/aiya-robot.html'; Key = 'robot'; Title = 'AIYARobot | AIYA Technology'; Kind = 'product' },
  @{ Path = 'products/aiya-scan.html'; Key = 'scan'; Title = 'AIYAScan | AIYA Technology'; Kind = 'product' },
  @{ Path = 'products/aiya-marketing.html'; Key = 'marketing'; Title = 'AIYA Marketing | AIYA Technology'; Kind = 'product' },
  @{ Path = 'services/strategy-experience.html'; Key = 'strategy'; Title = 'Strategy & Experience | AIYA Technology'; Kind = 'service' },
  @{ Path = 'services/software-engineering.html'; Key = 'engineering'; Title = 'Software Engineering | AIYA Technology'; Kind = 'service' },
  @{ Path = 'services/integration-automation.html'; Key = 'integration'; Title = 'Integration & Automation | AIYA Technology'; Kind = 'service' },
  @{ Path = 'services/cloud-operations.html'; Key = 'cloud'; Title = 'Cloud & Operations | AIYA Technology'; Kind = 'service' },
  @{ Path = 'services/growth.html'; Key = 'growth'; Title = 'Growth | AIYA Technology'; Kind = 'service' }
)

foreach ($requiredFile in @('catalog.js', 'detail.js', 'styles.css')) {
  if (-not (Test-Path -LiteralPath (Join-Path $root $requiredFile))) {
    throw "Missing shared detail runtime: $requiredFile"
  }
}

foreach ($page in $pages) {
  $fullPath = Join-Path $root $page.Path
  if (-not (Test-Path -LiteralPath $fullPath)) { throw "Missing detail page: $($page.Path)" }
  $html = Get-Content -Raw -LiteralPath $fullPath
  if ($html -notmatch "<title>$([regex]::Escape($page.Title))</title>") { throw "Wrong title: $($page.Path)" }
  if ($html -notmatch "data-detail-kind=`"$($page.Kind)`"") { throw "Wrong kind: $($page.Path)" }
  if ($html -notmatch "data-detail-key=`"$($page.Key)`"") { throw "Wrong key: $($page.Path)" }
  foreach ($id in @('detail-title', 'detail-capabilities', 'detail-deliverables', 'detail-use-cases')) {
    if ($html -notmatch "id=`"$id`"") { throw "Missing #$id in $($page.Path)" }
  }
  if ($html -notmatch '<meta name="description" content="[^"]{40,160}">') { throw "Invalid meta description: $($page.Path)" }
  if ($html -notmatch 'href="../index.html#contact"') { throw "Missing contact CTA: $($page.Path)" }
  if ($html -notmatch '<script src="../catalog.js"></script>\s*<script src="../detail.js"></script>') { throw "Wrong shared script order: $($page.Path)" }
}

$publicFiles = @('index.html', 'script.js', 'catalog.js', 'detail.js', 'styles.css') + $pages.Path
foreach ($path in $publicFiles) {
  $text = Get-Content -Raw -LiteralPath (Join-Path $root $path)
  if ($text -match '(?i)AIYAPOS|Shopify|Stripe') { throw "Forbidden public copy in $path" }
}

$index = Get-Content -Raw -LiteralPath (Join-Path $root 'index.html')
foreach ($page in $pages) {
  $attribute = if ($page.Kind -eq 'product') { 'data-product' } else { 'data-service' }
  $expectedLink = "<$([char]97)[^>]*$attribute=`"$($page.Key)`"[^>]*href=`"$($page.Path)`""
  if ($index -notmatch $expectedLink) {
    throw "Homepage $($page.Kind) name must link directly: $($page.Path)"
  }
}

$styles = Get-Content -Raw -LiteralPath (Join-Path $root 'styles.css')
foreach ($forbiddenUnderlineSelector in @('.mega-trigger.active::after', '.main-nav a.active::after')) {
  if ($styles.Contains($forbiddenUnderlineSelector)) {
    throw "Persistent active underline selector remains: $forbiddenUnderlineSelector"
  }
}

$commerceAsset = 'assets/aiya-commerce.png'
$catalog = Get-Content -Raw -LiteralPath (Join-Path $root 'catalog.js')
if ($catalog -notmatch "key: 'commerce'[\s\S]{0,240}image: '$([regex]::Escape($commerceAsset))'") {
  throw "Commerce catalog entry must use $commerceAsset"
}
if ($index -notmatch "id=`"product-image`" src=`"$([regex]::Escape($commerceAsset))`"") {
  throw "Initial Commerce preview must use $commerceAsset"
}
$commerceAssetPath = Join-Path $root $commerceAsset
if (-not (Test-Path -LiteralPath $commerceAssetPath)) {
  throw "Missing Commerce artwork: $commerceAsset"
}
Add-Type -AssemblyName System.Drawing
$commerceImage = [System.Drawing.Image]::FromFile($commerceAssetPath)
try {
  if ($commerceImage.Width -lt 1200 -or $commerceImage.Height -lt 700) {
    throw "Commerce artwork must be at least 1200x700; observed $($commerceImage.Width)x$($commerceImage.Height)"
  }
}
finally {
  $commerceImage.Dispose()
}

Write-Output "Validated $($pages.Count) detail pages."
