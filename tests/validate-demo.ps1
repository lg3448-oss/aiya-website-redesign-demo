$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$html = Get-Content (Join-Path $root 'index.html') -Raw
$css = Get-Content (Join-Path $root 'styles.css') -Raw
$js = Get-Content (Join-Path $root 'script.js') -Raw
$catalogPath = Join-Path $root 'catalog.js'
if (-not (Test-Path -LiteralPath $catalogPath)) {
  throw 'Missing shared catalog.js.'
}
$catalog = Get-Content -LiteralPath $catalogPath -Raw

$expectedProducts = @(
  @{ Key = 'commerce'; Label = 'AIYA Commerce'; Url = 'products/aiya-commerce.html' },
  @{ Key = 'revenue'; Label = 'AIYA Revenue'; Url = 'products/aiya-revenue.html' },
  @{ Key = 'pad'; Label = 'AIYAPad'; Url = 'products/aiya-pad.html' },
  @{ Key = 'robot'; Label = 'AIYARobot'; Url = 'products/aiya-robot.html' },
  @{ Key = 'scan'; Label = 'AIYAScan'; Url = 'products/aiya-scan.html' },
  @{ Key = 'marketing'; Label = 'AIYA Marketing'; Url = 'products/aiya-marketing.html' }
)
$expectedServices = @(
  @{ Key = 'strategy'; Label = 'Strategy & Experience'; Url = 'services/strategy-experience.html' },
  @{ Key = 'engineering'; Label = 'Software Engineering'; Url = 'services/software-engineering.html' },
  @{ Key = 'integration'; Label = 'Integration & Automation'; Url = 'services/integration-automation.html' },
  @{ Key = 'cloud'; Label = 'Cloud & Operations'; Url = 'services/cloud-operations.html' },
  @{ Key = 'growth'; Label = 'Growth'; Url = 'services/growth.html' }
)

if ($html -notmatch '<script src="catalog\.js"></script>\s*<script src="script\.js"></script>') {
  throw 'catalog.js must load immediately before script.js.'
}

$sceneIds = @(
  'home',
  'capabilities',
  'kiosk',
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

$megaMenuArrow = [string]([char]0x00E2) + [char]0x2020 + [char]0x2019
$megaMenus = @(
  @{
    Type = 'products'
    Label = 'Products'
    Id = 'mega-products'
    ListLabel = 'Products menu'
    FooterHref = '#products'
    FooterLabel = 'View All Products ' + $megaMenuArrow
  }
  @{
    Type = 'services'
    Label = 'Services'
    Id = 'mega-services'
    ListLabel = 'Services menu'
    FooterHref = '#services'
    FooterLabel = 'View All Services ' + $megaMenuArrow
  }
)

foreach ($menu in $megaMenus) {
  $contract = '<div class="nav-menu-item" data-mega-menu="' + $menu.Type + '">\s*' +
    '<div class="mega-trigger-group">\s*' +
    '<a class="mega-trigger" data-mega-link="' + $menu.Type + '" href="' + [regex]::Escape($menu.FooterHref) + '">' + $menu.Label + '</a>\s*' +
    '<button class="mega-toggle" type="button" data-mega-trigger="' + $menu.Type + '" aria-label="Toggle ' + $menu.Type + ' menu" aria-haspopup="true" aria-expanded="false" aria-controls="' + $menu.Id + '"><span aria-hidden="true">⌄</span></button>\s*' +
    '</div>\s*' +
    '<div class="mega-menu" id="' + $menu.Id + '" data-menu-panel="' + $menu.Type + '" hidden>\s*' +
    '<div class="mega-menu-inner">\s*' +
    '<ul class="mega-menu-list" aria-label="' + $menu.ListLabel + '">\s*</ul>\s*' +
    '<div class="mega-menu-detail" aria-live="polite">\s*</div>\s*' +
    '<a class="mega-menu-footer" href="' + [regex]::Escape($menu.FooterHref) + '">' + [regex]::Escape($menu.FooterLabel) + '</a>\s*' +
    '</div>\s*</div>\s*</div>'
  if ($html -notmatch ('(?s)' + $contract)) {
    throw "$($menu.Label) mega menu must contain the required empty accessible shell."
  }
}
if (([regex]::Matches($html, '<div class="mega-menu-detail" aria-live="polite">\s*</div>')).Count -ne 2) {
  throw 'Mega menus must contain exactly two empty live detail panels.'
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
if ($html -match 'class="hero-controls"') {
  throw 'Hero slide controls and progress lines must be removed.'
}
if ($js -notmatch 'setInterval\(\(\)\s*=>\s*showHero\(activeSlide\s*\+\s*1\),\s*7000\)') {
  throw 'The three hero messages must continue rotating every seven seconds.'
}
$heroSection = [regex]::Match($html, '(?s)<section class="scene hero"[^>]*>.*?</section>').Value
$contactSection = [regex]::Match($html, '(?s)<section class="scene contact"[^>]*>.*?</section>').Value
if ($contactSection -notmatch '(?s)<div class="partner-marquee".*?<footer>') {
  throw 'The partner marquee must sit in the contact scene above the footer.'
}
if ($heroSection -match '<div class="partner-marquee"') {
  throw 'The partner marquee must no longer appear in the hero.'
}
@(
  'AIYA Kiosk',
  'Self-Service Ordering',
  'Customizable Menu',
  'Integrated Payments',
  'POS Order Sync'
) | ForEach-Object {
  if ($html -notmatch [regex]::Escape($_)) {
    throw "Missing approved kiosk content: $_"
  }
}
if ($html -match 'Online Ordering\.' -or $html -match 'Connected to Clover\.') {
  throw 'The old featured online-ordering heading is still present.'
}
if (-not (Test-Path (Join-Path $root 'assets\aiya-kiosk.png'))) {
  throw 'Missing AIYA Kiosk product image.'
}
$primaryHeadings = [regex]::Matches($html, '(?s)<h[12][^>]*>(.*?)</h[12]>')
foreach ($heading in $primaryHeadings) {
  $plainText = [regex]::Replace($heading.Groups[1].Value, '<[^>]+>', '').Trim()
  if ($plainText.EndsWith('.')) {
    throw "Primary heading still ends with a period: $plainText"
  }
}
if ($css -notmatch '--frame:min\(1320px,calc\(100vw - 96px\)\)') {
  throw 'The desktop frame must expand to 1320px.'
}
if ($css -notmatch '\.main-nav a\s*\{[^}]*font-size\s*:\s*16px') {
  throw 'Main navigation must be 16px.'
}
if ($css -notmatch '\.header-cta\s*\{[^}]*font-size\s*:\s*15px') {
  throw 'Header CTA must be 15px.'
}
if ($css -notmatch '\.contact \.button\s*\{[^}]*font-size\s*:\s*16px') {
  throw 'Contact CTA must use 16px text.'
}
if ($html -match 'vertical-tagline') {
  throw 'Vertical primary text is prohibited.'
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
  '--text-dense:12px',
  '--text-small:13px',
  '--text-ui:14px'
) | ForEach-Object {
  if ($css -notmatch [regex]::Escape($_)) { throw "Missing readability token: $_" }
}
@('pos', 'online', 'order', 'reserve', 'gift') | ForEach-Object {
  if ($html -match "data-product=[`"']$([regex]::Escape($_))[`"']" -or $js -match "(?m)^\s*$([regex]::Escape($_))\s*:" -or $catalog -match "key:\s*[`"']$([regex]::Escape($_))[`"']") {
    throw "Removed top-level product is still present: $_"
  }
}
if ($html -match '(?i)AIYAPOS') {
  throw 'AIYAPOS must be removed from the public homepage.'
}
if (([regex]::Matches($html, '<a[^>]+data-product=')).Count -ne $expectedProducts.Count) {
  throw "Products must contain exactly $($expectedProducts.Count) direct links."
}
if (([regex]::Matches($html, '<a[^>]+data-service=')).Count -ne $expectedServices.Count) {
  throw "Services must contain exactly $($expectedServices.Count) direct links."
}
@('BUSINESS PLATFORMS', 'AIYA PRODUCTS') | ForEach-Object {
  if ($html -notmatch [regex]::Escape($_)) { throw "Missing Product group label: $_" }
}
foreach ($item in $expectedProducts + $expectedServices) {
  if ($catalog -notmatch "key:\s*[`"']$([regex]::Escape($item.Key))[`"']") { throw "Missing catalog key: $($item.Key)" }
  if ($catalog -notmatch [regex]::Escape($item.Label)) { throw "Missing catalog label: $($item.Label)" }
  if ($catalog -notmatch [regex]::Escape($item.Url)) { throw "Missing catalog URL: $($item.Url)" }
  if ($html -notmatch "href=[`"']$([regex]::Escape($item.Url))[`"']") { throw "Missing homepage destination: $($item.Url)" }
}
if ($html -notmatch 'id="product-stage"\s+data-product="commerce"') {
  throw 'AIYA Commerce must be the default product.'
}
if ($html -match 'id="product-description"[^>]*>[^<]*Gift Card') {
  throw 'AIYA Gift Card must be nested under Marketing, not buried in its description.'
}
if ($html -notmatch 'data-product="marketing"[^>]*>.*?</a>\s*<div class="product-subitem" id="marketing-subitem"[^>]*>.*?AIYA Gift Card') {
  throw 'AIYA Gift Card must render as a child title below AIYA Marketing.'
}
if ($css -notmatch '\.product-layout \.product-stage\s*\{[^}]*column-gap\s*:\s*30px' -or $css -notmatch '\.product-object img\s*\{[^}]*max-width\s*:\s*100%') {
  throw 'Product copy and imagery must have a protected non-overlapping layout.'
}
if ($css -notmatch '\.product-meta p\s*\{[^}]*font-size\s*:\s*14px' -or $css -notmatch '\.selector-list a span\s*\{[^}]*font-size\s*:\s*14px') {
  throw 'Product descriptions and selector labels remain too small.'
}
if ($js -notmatch 'activateProduct') {
  throw 'Product selector behavior is missing.'
}
if ($js -notmatch 'activateService') {
  throw 'Service selector behavior is missing.'
}

@(
  'function renderMegaList',
  'function selectMegaItem',
  'function openMegaMenu',
  'function closeMegaMenu'
) | ForEach-Object {
  if ($js -notmatch [regex]::Escape($_)) { throw "Missing mega-menu controller: $_" }
}
if ($js -notmatch "link\.className\s*=\s*'mega-menu-item'" -or $js -notmatch 'link\.href\s*=\s*item\.url') {
  throw 'Rendered mega-menu controls must receive the class that provides their layout and interaction styling.'
}
if ($js -match 'mega-menu-detail[^;]*querySelectorAll') {
  throw 'The detail panel must be replaced dynamically, not populated with every category.'
}

if ($css -notmatch '\.mega-menu-inner\s*\{[^}]*grid-template-columns\s*:\s*minmax\(0,35%\)\s+minmax\(0,65%\)') {
  throw 'Desktop mega menu must use the approved 35/65 cascade.'
}
if ($css -notmatch 'transition\s*:\s*opacity\s+180ms') {
  throw 'Mega-menu opening transition must be 180ms.'
}
if ($css -notmatch '\.mega-trigger:focus-visible' -or $css -notmatch '\.mega-menu-item:focus-visible') {
  throw 'Mega-menu keyboard focus must be visible.'
}
if ($css -notmatch '(?s)@media\(max-width:760px\).*?\.mega-menu-inner\s*\{[^}]*grid-template-columns\s*:\s*1fr') {
  throw 'Mobile mega menus must become a single-column nested accordion.'
}
if ($css -notmatch '(?s)@media\(max-width:760px\).*?\.mega-menu\s*\{[^}]*max-width\s*:\s*100%') {
  throw 'Mobile mega menus must protect against horizontal overflow.'
}
if ($css -notmatch '\.mega-menu-footer\s*\{[^}]*grid-column\s*:\s*1\s*/\s*-1') {
  throw 'Mega-menu footer links must span both cascade columns.'
}
if ($css -notmatch '@starting-style\s*\{[^}]*\.nav-menu-item\.open\s+\.mega-menu\s*\{[^}]*opacity\s*:\s*0[^}]*transform\s*:\s*translateY\(-6px\)') {
  throw 'Mega-menu opening must paint from its initial opacity and transform.'
}
if ($css -notmatch '(?s)@media\(prefers-reduced-motion:reduce\).*?\.mega-menu\s*\{[^}]*transition\s*:\s*none') {
  throw 'Reduced-motion mode must disable the mega-menu transition.'
}
if ($css -notmatch '(?s)@media\(max-width:760px\).*?\.main-nav\s*\{[^}]*max-height\s*:\s*calc\(100svh\s*-\s*var\(--header-h\)\)[^}]*overflow-y\s*:\s*auto') {
  throw 'Mobile navigation must be constrained and vertically scrollable below the header.'
}
if ($js -match 'tags:\s*\["Payment APIs"' -or $js -match 'tags:\s*\[[^\]]*"Automation"') {
  throw 'Mega-menu work must not retain unrelated quote-only service data changes.'
}

Write-Output 'PASS: AIYA presentation contract satisfied.'
