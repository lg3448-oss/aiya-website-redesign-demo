# AIYA Layout and Kiosk Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enlarge the site typography and usable width, simplify the hero, move the partner marquee, replace the featured product with AIYA Kiosk, and remove desktop/mobile content overlaps.

**Architecture:** Preserve the current static HTML/CSS/vanilla JavaScript structure and full-screen scene system. Change the existing contract test first, then make surgical HTML, JavaScript, asset, and CSS updates. Finish with full-scene Chrome screenshots at the two approved viewport sizes.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, PowerShell validation, Chrome headless screenshots, AI image editing.

## Global Constraints

- Desktop navigation is 16px and the header CTA is 15px.
- Other dense, small, and body text grows by about 1–2px on desktop and about 1px on mobile where space permits.
- Desktop content width is approximately 1320px with safe side margins.
- The three hero messages continue rotating every seven seconds without visible controls.
- The partner marquee appears only on the contact scene, immediately above the footer.
- Primary scene headings do not end with periods.
- AIYA Kiosk shows exactly four approved capability labels.
- All ten scenes must be inspected at 1440×900 and 390×844.
- Preserve unrelated products, services, cases, and contact information.

---

### Task 1: Update the presentation contract first

**Files:**
- Modify: `tests/validate-demo.ps1`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, `script.js`, and `assets/aiya-kiosk.png`
- Produces: a failing contract that precisely describes the approved result

- [ ] **Step 1: Replace the obsolete scene and partner requirements**

Change the scene list entry from:

```powershell
'online-ordering',
```

to:

```powershell
'kiosk',
```

Delete the old assertions requiring Clover to be central, the partner marquee to
live in the hero, the partner strip to sit below the hero brand line, 14px
navigation, 12px header UI text, and the old fixed heading scale.

- [ ] **Step 2: Add the new behavior assertions**

Add these checks after the three-slide count:

```powershell
if ($html -match 'class="hero-controls"') {
  throw 'Hero slide controls and progress lines must be removed.'
}
if ($js -notmatch 'setInterval\(\(\)\s*=>\s*showHero\(activeSlide\s*\+\s*1\),\s*7000\)') {
  throw 'The three hero messages must continue rotating every seven seconds.'
}
if ($html -notmatch '(?s)<section class="scene contact"[^>]*>.*?<div class="partner-marquee".*?<footer>') {
  throw 'The partner marquee must sit in the contact scene above the footer.'
}
if ($html -match '(?s)<section class="scene hero"[^>]*>.*?<div class="partner-marquee".*?</section>') {
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
```

- [ ] **Step 3: Run the contract and verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: FAIL because the page still contains `online-ordering` and has no
`kiosk` scene.

- [ ] **Step 4: Commit the failing contract**

```powershell
git add tests/validate-demo.ps1
git commit -m "test: define kiosk and layout refresh contract"
```

---

### Task 2: Create the AIYA-branded kiosk asset

**Files:**
- Create: `assets/aiya-kiosk.png`

**Interfaces:**
- Consumes: the user-supplied kiosk hardware image
- Produces: a publication-ready transparent or white-background product image
  referenced by the featured-product scene

- [ ] **Step 1: Read and use the image generation skill**

Use the supplied kiosk image as the reference and apply this exact edit brief:

```text
Preserve the full kiosk hardware, camera, screen, payment terminal, pedestal,
base, angle, and realistic product-photo lighting. Change the red trim to AIYA
orange (#f15a24). Replace the vertical side text with “AIYA KIOSK”. Remove all
FoodBox Logic, Russian, Visa, and unrelated third-party branding. Replace the
screen with a polished English restaurant self-ordering interface using AIYA
orange, showing menu categories, food item cards, an order summary, and a clear
checkout button. Keep a clean transparent or pure-white background. Do not crop
the base or top of the kiosk. Do not add people, scenery, extra devices, or
floating text outside the kiosk.
```

- [ ] **Step 2: Place the generated PNG at the required interface path**

Save the edited result exactly as:

```text
assets/aiya-kiosk.png
```

- [ ] **Step 3: Inspect the asset**

Open `assets/aiya-kiosk.png` and verify:

- the complete kiosk is visible;
- only AIYA branding remains;
- the interface is English;
- the trim is AIYA orange;
- no text is malformed;
- the background can blend into the website.

- [ ] **Step 4: Commit the asset**

```powershell
git add assets/aiya-kiosk.png
git commit -m "feat: add AIYA Kiosk product visual"
```

---

### Task 3: Update the HTML and preserve automatic hero rotation

**Files:**
- Modify: `index.html`
- Modify: `script.js`

**Interfaces:**
- Consumes: `assets/aiya-kiosk.png`
- Produces: the new kiosk scene, simplified hero, moved partner marquee, and
  period-free primary headings

- [ ] **Step 1: Remove the hero controls from `index.html`**

Delete the complete block:

```html
<div class="hero-controls" aria-label="Hero slides">
  <button class="active" type="button" aria-label="AI and software"><i></i><span>AI + Software</span></button>
  <button type="button" aria-label="Payments and APIs"><i></i><span>Payments + APIs</span></button>
  <button type="button" aria-label="Enterprise platforms"><i></i><span>Enterprise Platforms</span></button>
</div>
```

Move the existing `partner-marquee` block out of the hero without changing its
two tracks or logo order.

- [ ] **Step 2: Replace the featured-product scene**

Change the progress link from `#online-ordering` to `#kiosk`, then replace the
old ordering section with:

```html
<section class="scene ordering kiosk" id="kiosk" data-scene="03">
  <div class="ordering-copy">
    <div class="eyebrow"><span></span> FEATURED PRODUCT</div>
    <h2>AIYA Kiosk<br><em>Self-Service Made Simple</em></h2>
    <p>A streamlined self-ordering system that helps restaurants serve guests faster, reduce ordering friction, and keep every order connected.</p>
    <div class="ordering-features">
      <span>Self-Service Ordering</span>
      <span>Customizable Menu</span>
      <span>Integrated Payments</span>
      <span>POS Order Sync</span>
    </div>
    <a class="text-link" href="#contact">Explore AIYA Kiosk <span>→</span></a>
  </div>
  <div class="ordering-visual kiosk-visual">
    <img src="assets/aiya-kiosk.png" alt="AIYA Kiosk self-service restaurant ordering system">
    <div class="flow-track" aria-label="Kiosk order flow"><span>Guest Order</span><i>→</i><span>Secure Payment</span><i>→</i><span>POS Sync</span></div>
    <small>AIYA Kiosk · Self-service ordering system</small>
  </div>
</section>
```

- [ ] **Step 3: Move the partner marquee into the contact scene**

Insert the unchanged marquee block immediately before:

```html
<footer><img src="assets/logo.png" alt="AIYA Technology System"><span>© 2026 AIYA Technology System, LLC</span><a href="#home">Back to top ↑</a></footer>
```

- [ ] **Step 4: Remove final periods from every primary heading**

Update the visible text inside all `h1` and `h2` elements so the final visible
word is not followed by a period. For example:

```html
<h1>AI-Powered Software<br><em>Built for Real Business</em></h1>
<h2>Connected expertise<br><em>One clear outcome</em></h2>
<h2>Let’s Build<br><em>What Comes Next</em></h2>
```

Do not remove normal periods from paragraphs or `h3` component titles.

- [ ] **Step 5: Remove control-only JavaScript**

Delete:

```javascript
const heroControls = [...document.querySelectorAll('.hero-controls button')];
```

Delete the `heroControls.forEach` work inside `showHero` and delete:

```javascript
heroControls.forEach((button, index) => button.addEventListener('click', () => showHero(index)));
```

Keep both seven-second timer statements unchanged:

```javascript
if (!motionReduced) heroTimer = setInterval(() => showHero(activeSlide + 1), 7000);
```

- [ ] **Step 6: Run the contract**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: FAIL on CSS width or typography because Task 4 has not run yet, not
on the kiosk HTML or hero behavior.

- [ ] **Step 7: Commit the structural changes**

```powershell
git add index.html script.js
git commit -m "feat: feature AIYA Kiosk and simplify hero"
```

---

### Task 4: Expand typography and width without overlap

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: the updated scene markup
- Produces: the approved type scale, 1320px desktop frame, contact marquee
  placement, and overlap-safe responsive layouts

- [ ] **Step 1: Expand the shared desktop frame**

Change:

```css
--frame:min(1180px,calc(100vw - 96px))
```

to:

```css
--frame:min(1320px,calc(100vw - 96px))
```

Replace every desktop occurrence of:

```css
calc((100vw - 1180px)/2)
```

with:

```css
calc((100vw - 1320px)/2)
```

Keep the existing `max(48px, ...)` safety margin and the current tablet/mobile
overrides.

- [ ] **Step 2: Apply the approved type scale**

Replace the readability overrides with:

```css
:root{--text-dense:12px;--text-small:13px;--text-ui:14px}
.main-nav a{font-size:16px}
.header-cta{font-size:15px}
.button,.text-link{font-size:var(--text-ui)}
.hero-slide p{font-size:17px}
.scene-heading>p,.ordering-copy>p,.ecosystem-heading>p,.company-copy p,.contact-copy p{font-size:16px}
.product-meta p,.service-stage p{font-size:15px}
.results-grid p{font-size:13px}
```

Increase primary headings conservatively:

```css
.scene-heading h2,.hero h1,.contact h2,.company h2,.ecosystem h2{font-size:clamp(46px,4.7vw,72px)}
.scene-heading.compact h2{font-size:clamp(40px,3.8vw,60px)}
.hero h1{font-size:clamp(50px,5.2vw,76px)}
.ordering-copy h2{font-size:clamp(47px,4.7vw,70px)}
```

- [ ] **Step 3: Remove obsolete hero-control and hero-marquee spacing**

Delete all `.hero-controls` rules, the `@keyframes progress` rule, and
`.hero-controls` references inside media or reduced-motion rules.

Delete:

```css
.hero{padding-bottom:125px}
```

and the partner-related desktop/short-screen hero padding overrides. Keep the
existing hero image containment rules.

- [ ] **Step 4: Position the marquee in the contact scene**

Use:

```css
.contact{padding-bottom:190px}
.contact .partner-marquee{position:absolute;z-index:8;left:max(48px,calc((100vw - 1320px)/2));right:max(48px,calc((100vw - 1320px)/2));bottom:82px;min-width:0}
```

Retain the existing marquee animation, two-track layout, hover pause, original
logo colors, edge masks, and reduced-motion behavior.

For mobile, use:

```css
@media(max-width:760px){
  .contact{padding-bottom:230px}
  .contact .partner-marquee{left:18px;right:18px;bottom:92px;padding:8px 0 3px}
}
```

- [ ] **Step 5: Add overlap-safe image and grid constraints**

Add:

```css
.hero>*,.capabilities>*,.ordering>*,.why>*,.company>*,.contact>*{min-width:0}
.ordering-visual>img{width:100%;max-width:100%;max-height:68vh;margin-left:0;object-fit:contain}
.kiosk-visual{height:min(68vh,650px);display:grid;grid-template-rows:minmax(0,1fr) auto auto;align-items:center}
.kiosk-visual>img{height:100%;width:100%;object-fit:contain}
```

Replace the mobile absolute product-image layout with:

```css
@media(max-width:760px){
  .product-stage{height:auto;min-height:470px;grid-template-columns:1fr;grid-template-rows:auto minmax(230px,1fr);padding:24px}
  .product-object{position:relative;right:auto;bottom:auto;width:100%;height:230px;opacity:1}
  .product-meta{padding-right:0}
  .ordering-visual>img{width:100%;max-height:42vh;margin:0}
  .kiosk-visual{height:48vh;min-height:360px;margin-top:24px}
}
```

- [ ] **Step 6: Run the contract and verify GREEN**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected:

```text
PASS: AIYA presentation contract satisfied.
```

- [ ] **Step 7: Commit the layout**

```powershell
git add styles.css
git commit -m "style: enlarge type and prevent layout overlap"
```

---

### Task 5: Inspect every scene at both approved viewports

**Files:**
- Create: `screenshots/layout-refresh/desktop-*.png`
- Create: `screenshots/layout-refresh/mobile-*.png`
- Modify if required by evidence: `styles.css`

**Interfaces:**
- Consumes: the completed static site
- Produces: 20 visual verification images and any minimal evidence-driven CSS
  corrections

- [ ] **Step 1: Run both validation passes before screenshots**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
git diff --check
```

Expected: contract PASS and no whitespace errors.

- [ ] **Step 2: Capture every desktop scene**

Use Chrome headless at 1440×900 for:

```text
#home
#capabilities
#kiosk
#products
#services
#ecosystem
#why-aiya
#results
#company
#contact
```

Save them under `screenshots/layout-refresh/desktop-<scene>.png`.

- [ ] **Step 3: Capture every mobile scene**

Capture the same ten hashes at 390×844 and save them under
`screenshots/layout-refresh/mobile-<scene>.png`.

- [ ] **Step 4: Inspect all 20 screenshots**

For each screenshot verify:

- no text is behind an image;
- no heading or button is clipped;
- no horizontal overflow appears;
- the Kiosk image is fully visible and does not cover copy;
- product and service selectors remain readable;
- the contact marquee does not overlap the footer or contact details.

If a defect appears, change only the affected selector in `styles.css`, rerun
both tests, and recapture that scene at both sizes.

- [ ] **Step 5: Run final verification**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
git diff --check
git status --short
```

Expected: contract PASS, no whitespace errors, and only intentional files or
generated verification screenshots present.

- [ ] **Step 6: Commit the verified result**

```powershell
git add index.html styles.css script.js tests/validate-demo.ps1 assets/aiya-kiosk.png screenshots/layout-refresh
git commit -m "feat: complete AIYA layout and kiosk refresh"
```
