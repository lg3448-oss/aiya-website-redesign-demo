$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$html = Get-Content (Join-Path $root 'index.html') -Raw
$css = Get-Content (Join-Path $root 'styles.css') -Raw
$js = Get-Content (Join-Path $root 'script.js') -Raw

$sceneIds = @(
  'home',
  'capabilities',
  'online-ordering',
  'products',
  'services',
  'ecosystem',
  'why-aiya',
  'results',
  'company',
  'contact'
)

$positions = foreach ($id in $sceneIds) {
  $match = [regex]::Match($html, "<section[^>]+id=[`"']$id[`"']")
  if (-not $match.Success) { throw "Missing scene: $id" }
  $match.Index
}

for ($i = 1; $i -lt $positions.Count; $i++) {
  if ($positions[$i] -le $positions[$i - 1]) { throw 'Scene order is incorrect.' }
}

@('Home', 'Products', 'Services', 'Company', 'Contact') | ForEach-Object {
  if ($html -notmatch ">\s*$([regex]::Escape($_))\s*<") {
    throw "Missing navigation label: $_"
  }
}

@(
  '100 East Broadway 12 FL New York NY 10002',
  '(888)909-6899',
  '(917)915-0189',
  'Sales@aiya.us',
  'yryou@aiya.us'
) | ForEach-Object {
  if ($html -notmatch [regex]::Escape($_)) {
    throw "Missing updated contact detail: $_"
  }
}
@(
  'href="tel:+18889096899"',
  'href="tel:+19179150189"',
  'href="mailto:Sales@aiya.us"',
  'href="mailto:yryou@aiya.us"'
) | ForEach-Object {
  if ($html -notmatch [regex]::Escape($_)) {
    throw "Missing contact link: $_"
  }
}
@('marketing@aiya.us', '888-622-0811', '36-16 Main St', 'Flushing, NY 11354') | ForEach-Object {
  if ($html -match [regex]::Escape($_)) {
    throw "Outdated contact detail is still present: $_"
  }
}

if (([regex]::Matches($html, '<article class="hero-slide(?: active)?"')).Count -ne 3) {
  throw 'Hero must contain exactly three slides.'
}
if ($html -match 'vertical-tagline') {
  throw 'Vertical primary text is prohibited.'
}
if ($html -notmatch 'Clover') {
  throw 'Clover must be central to online ordering.'
}
if ($html -notmatch 'Demo result|Placeholder') {
  throw 'Demo outcomes must be disclosed.'
}
if ($css -match 'writing-mode\s*:\s*vertical') {
  throw 'Vertical writing mode is prohibited.'
}
if ($css -notmatch 'scroll-snap-type\s*:\s*y\s+mandatory') {
  throw 'Desktop scroll snap is missing.'
}
if ($css -notmatch 'height\s*:\s*100svh') {
  throw 'Viewport scene sizing is missing.'
}
if ($css -notmatch 'overflow-x\s*:\s*hidden') {
  throw 'Horizontal overflow protection is missing.'
}
if ($css -notmatch '\.hero-slides\s*\{[^}]*height\s*:\s*auto' -or $css -notmatch '\.hero-slide\.active\s*\{[^}]*position\s*:\s*relative') {
  throw 'The active hero slide must size its container so copy cannot cover the CTA buttons.'
}
if ($html -notmatch '(?s)<section class="scene hero"[^>]*>.*?<div class="partner-marquee".*?</section>') {
  throw 'The partner marquee must live inside the first hero viewport.'
}
if (([regex]::Matches($html, '<div class="partner-track"')).Count -ne 2) {
  throw 'The marquee needs exactly two matching tracks for a seamless loop.'
}
if ($html -notmatch '<div class="partner-track" aria-hidden="true"') {
  throw 'The decorative duplicate logo track must be hidden from assistive technology.'
}
@('Microsoft', 'LINKGroup', 'Siemens', 'Unilever', 'Bloomberg', 'Associated Environmental', 'ALSTOM', 'Allflex') | ForEach-Object {
  if ($html -notmatch ('alt="' + [regex]::Escape($_) + ' logo"')) {
    throw "Missing meaningful logo alternative text: $_"
  }
}
if ($css -notmatch '@keyframes\s+partner-scroll\s*\{[^}]*translate3d\(-50%,0,0\)' -or $css -notmatch 'animation\s*:\s*partner-scroll\s+30s\s+linear\s+infinite') {
  throw 'The partner marquee must use a continuous 30-second linear loop.'
}
if ($css -notmatch '\.partner-window:hover\s+\.partner-motion\s*\{[^}]*animation-play-state\s*:\s*paused') {
  throw 'The partner marquee must pause on hover.'
}
if ($css -notmatch '\.partner-logo\s*\{[^}]*opacity\s*:\s*\.9[^}]*filter\s*:\s*none') {
  throw 'Partner logos must show their approved original colors by default.'
}
if ($css -notmatch '\.partner-marquee\s*\{[^}]*bottom\s*:\s*88px') {
  throw 'The desktop partner strip must sit directly below the hero brand line.'
}
if ($css -notmatch '\.partner-window\s*\{[^}]*(?:-webkit-)?mask-image\s*:\s*linear-gradient') {
  throw 'The partner marquee needs a background-aware edge fade mask.'
}
if ($css -notmatch '(?s)@media\(prefers-reduced-motion:reduce\).*?\.partner-motion\s*\{[^}]*animation\s*:\s*none' -or $css -notmatch '(?s)@media\(prefers-reduced-motion:reduce\).*?\.partner-track\[aria-hidden="true"\]\s*\{[^}]*display\s*:\s*none') {
  throw 'Reduced-motion mode must stop the marquee and suppress its duplicate track.'
}
@('microsoft', 'linkgroup', 'siemens', 'unilever', 'bloomberg', 'associated-environmental', 'alstom', 'allflex') | ForEach-Object {
  if (-not (Test-Path (Join-Path $root "assets\partner-$_.png"))) {
    throw "Missing approved partner logo asset: $_"
  }
}
@(
  '--text-dense:11px',
  '--text-small:12px',
  '--text-ui:12px'
) | ForEach-Object {
  if ($css -notmatch [regex]::Escape($_)) { throw "Missing readability token: $_" }
}
if ($css -notmatch '\.main-nav a\s*\{[^}]*font-size\s*:\s*14px') {
  throw 'Main navigation must be 14px.'
}
if ($css -notmatch '\.header-cta[^}]*font-size\s*:\s*var\(--text-ui\)') {
  throw 'Header CTA must use the 12px UI text token.'
}
if ($css -notmatch 'font-size\s*:\s*clamp\(44px,4\.5vw,68px\)') {
  throw 'The established primary heading scale changed.'
}
@('online', 'order', 'reserve', 'gift') | ForEach-Object {
  if ($html -match "data-product=[`"']$([regex]::Escape($_))[`"']" -or $js -match "(?m)^\s*$([regex]::Escape($_))\s*:") {
    throw "Removed top-level product is still present: $_"
  }
}
if (([regex]::Matches($html, '<button[^>]+data-product=')).Count -ne 5) {
  throw 'Products must contain exactly five top-level choices.'
}
if ($html -notmatch 'id="product-stage"\s+data-product="marketing"') {
  throw 'AIYA Marketing must be the default product.'
}
if ($html -match 'id="product-description"[^>]*>[^<]*Gift Card') {
  throw 'AIYA Gift Card must be nested under Marketing, not buried in its description.'
}
if ($html -notmatch 'data-product="marketing"[^>]*>.*?</button>\s*<div class="product-subitem" id="marketing-subitem"[^>]*>.*?AIYA Gift Card') {
  throw 'AIYA Gift Card must render as a child title below AIYA Marketing.'
}
if ($js -notmatch "marketingSubitem\.hidden\s*=\s*key\s*!==\s*'marketing'") {
  throw 'The AIYA Gift Card child title must follow the Marketing selection state.'
}
if ($css -notmatch '\.product-layout \.product-stage\s*\{[^}]*column-gap\s*:\s*30px' -or $css -notmatch '\.product-object img\s*\{[^}]*max-width\s*:\s*100%') {
  throw 'Product copy and imagery must have a protected non-overlapping layout.'
}
if ($css -notmatch '\.product-meta p\s*\{[^}]*font-size\s*:\s*14px' -or $css -notmatch '\.selector-list button span\s*\{[^}]*font-size\s*:\s*14px') {
  throw 'Product descriptions and selector labels remain too small.'
}
if ($js -notmatch 'activateProduct') {
  throw 'Product selector behavior is missing.'
}
if ($js -notmatch 'activateService') {
  throw 'Service selector behavior is missing.'
}

Write-Output 'PASS: AIYA presentation contract satisfied.'
