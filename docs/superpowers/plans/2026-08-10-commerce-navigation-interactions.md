# Commerce Visual and Navigation Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blurry Commerce artwork and make every Product/Service navigation target behave consistently across desktop, touch, and keyboard input.

**Architecture:** Keep the current static HTML/CSS/JavaScript structure. Split each Products/Services top-level control into a destination link plus a mobile menu-toggle button, render mega-menu choices as real anchors, and leave preview selection driven by pointer/focus. Generate one new local artwork asset and reference it through the existing catalog data.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, PowerShell validation scripts, headless Chrome/CDP, ImageGen-generated PNG.

## Global Constraints

- Preserve the current overall page composition and mega-menu layout.
- Do not include third-party logos, brand names, watermarks, or readable product names in the artwork.
- Preserve unrelated user files, including the untracked `debug.log`.
- Keep changes local; do not push to GitHub.
- Follow red-green-refactor for every production behavior change.

---

### Task 1: Navigation regression tests

**Files:**
- Modify: `tests/validate-mega-menu-browser.ps1`
- Modify: `tests/validate-detail-pages.ps1`

**Interfaces:**
- Consumes: existing `data-mega-menu`, `data-mega-trigger`, `data-mega-item`, and homepage `data-product` / `data-service` hooks.
- Produces: failing browser and static assertions for the new link/toggle contract.

- [ ] **Step 1: Replace the old click-to-toggle expectations with destination-link assertions**

Add browser assertions equivalent to:

```javascript
const destination = type => document.querySelector(`[data-mega-link="${type}"]`);
const toggle = type => document.querySelector(`[data-mega-trigger="${type}"]`);

assert(destination('products').getAttribute('href') === '#products', 'Products must target its homepage section');
assert(destination('services').getAttribute('href') === '#services', 'Services must target its homepage section');
clickWithoutNavigation(destination('products'));
assert(toggle('products').getAttribute('aria-expanded') === 'false', 'top-level destination must close the menu');
```

- [ ] **Step 2: Add assertions that each rendered mega item is a real destination anchor**

```javascript
expectedProducts.forEach(([label, expectedHref], index) => {
  assert(productItems[index].tagName === 'A', `${label} must be an anchor`);
  assert(productItems[index].getAttribute('href') === expectedHref, `${label} must navigate directly`);
});
expectedServices.forEach(([label, expectedHref], index) => {
  assert(serviceItems[index].tagName === 'A', `${label} must be an anchor`);
  assert(serviceItems[index].getAttribute('href') === expectedHref, `${label} must navigate directly`);
});
```

- [ ] **Step 3: Add mobile assertions for separate destination and arrow controls**

```javascript
openNavigation();
clickWithoutNavigation(destination('products'));
assert(!mainNav.classList.contains('open'), 'Products text must scroll/close navigation');
openNavigation();
toggle('products').click();
assert(toggle('products').getAttribute('aria-expanded') === 'true', 'Products arrow must expand its menu');
```

- [ ] **Step 4: Add underline and homepage-link static assertions**

Require `.mega-trigger.active::after` and `.main-nav a.active::after` to be absent from `styles.css`, and verify every homepage product/service selector remains an `<a>` with the expected detail URL.

- [ ] **Step 5: Run the focused tests and verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-detail-pages.ps1
powershell -ExecutionPolicy Bypass -File tests/validate-mega-menu-browser.ps1
```

Expected: FAIL because top-level destinations do not exist separately, mega items are buttons, mobile text still toggles, and active-state underline selectors remain.

### Task 2: Top-level navigation and direct mega-item links

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Modify: `styles.css`
- Test: `tests/validate-mega-menu-browser.ps1`
- Test: `tests/validate-detail-pages.ps1`

**Interfaces:**
- Consumes: `AIYACatalog.products`, `AIYACatalog.services`, and existing `jumpToScene(hash)`.
- Produces: `[data-mega-link]` destination anchors, `[data-mega-trigger]` arrow toggles, and `<a class="mega-menu-item">` detail links.

- [ ] **Step 1: Split each top-level control in `index.html`**

Use this structure for Products and the equivalent Services values:

```html
<div class="mega-trigger-group">
  <a class="mega-trigger" data-mega-link="products" href="#products">Products</a>
  <button class="mega-toggle" type="button" data-mega-trigger="products"
    aria-label="Toggle products menu" aria-haspopup="true" aria-expanded="false"
    aria-controls="mega-products"><span aria-hidden="true">⌄</span></button>
</div>
```

- [ ] **Step 2: Render mega choices as anchors in `script.js`**

Replace the generated button contract with:

```javascript
const link = document.createElement('a');
link.className = 'mega-menu-item';
link.dataset.megaItem = item.key;
link.href = item.href;
link.textContent = item.label;
link.addEventListener('pointerenter', () => selectMegaItem(type, item.key));
link.addEventListener('focus', () => selectMegaItem(type, item.key));
link.addEventListener('click', () => closeNavigation());
```

- [ ] **Step 3: Separate desktop hover from click and mobile expansion**

Bind desktop pointer entry on the whole `[data-mega-menu]` root to `openMegaMenu(type)`. Bind only `.mega-toggle` click to toggling `openMegaMenu(type)` / `closeMegaMenu()`. Bind `.mega-trigger` click through the existing hash-scrolling path and close menus before scrolling.

- [ ] **Step 4: Update styling without changing the overall layout**

Keep the desktop label visually identical, hide `.mega-toggle` above 760px, and on mobile display `.mega-trigger-group` as a two-column row with the label filling available width and a 48px arrow target.

- [ ] **Step 5: Remove persistent active-section underline selectors**

Use hover, focus-visible, and open state only:

```css
.nav-menu-item.open .mega-trigger::after,
.mega-trigger:hover::after,
.mega-trigger:focus-visible::after { left: 0; right: 0; }
```

Retain active text color if desired, but do not draw `::after` for `.active`.

- [ ] **Step 6: Run tests and verify GREEN**

Run both Task 1 commands. Expected: PASS.

- [ ] **Step 7: Commit the navigation fix locally**

```powershell
git add -- index.html script.js styles.css tests/validate-mega-menu-browser.ps1 tests/validate-detail-pages.ps1
git commit -m "fix: make catalog navigation destinations direct"
```

### Task 3: High-resolution Commerce artwork

**Files:**
- Create: `assets/aiya-commerce.png`
- Modify: `catalog.js`
- Modify: `index.html`
- Modify: `tests/validate-detail-pages.ps1`

**Interfaces:**
- Produces: `assets/aiya-commerce.png`, at least 1200px wide, referenced by the Commerce catalog item and initial homepage preview.

- [ ] **Step 1: Add a failing asset-reference and dimension test**

Require both `catalog.js` and the initial `#product-image` source to reference `assets/aiya-commerce.png`. Load the PNG with `System.Drawing.Image` and assert width is at least 1200px and height at least 700px.

- [ ] **Step 2: Run the static test and verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-detail-pages.ps1
```

Expected: FAIL because the new Commerce asset does not exist or is not referenced.

- [ ] **Step 3: Generate the approved artwork**

Generate a high-resolution landscape illustration with this content direction:

```text
Premium editorial 3D product illustration for AIYA Commerce, warm cream studio background,
dark charcoal and vivid orange accents, desktop storefront, mobile checkout, order dashboard,
inventory cards and connected commerce workflow across elegant devices, crisp UI geometry,
no logos, no brand names, no watermark, no readable words, generous negative space,
matching a refined technology consultancy website.
```

Copy the generated result to `assets/aiya-commerce.png` and visually inspect it at original resolution.

- [ ] **Step 4: Update Commerce references**

Set the Commerce `image` field in `catalog.js` and the initial homepage `#product-image` `src` in `index.html` to `assets/aiya-commerce.png`.

- [ ] **Step 5: Run the static test and verify GREEN**

Run the Task 3 test command. Expected: PASS with the new asset dimensions accepted.

- [ ] **Step 6: Commit the artwork locally**

```powershell
git add -- assets/aiya-commerce.png catalog.js index.html tests/validate-detail-pages.ps1
git commit -m "feat: replace Commerce product artwork"
```

### Task 4: Full browser and regression verification

**Files:**
- Modify only if a test exposes a defect in an already-touched file.

**Interfaces:**
- Consumes: completed navigation and artwork changes.
- Produces: evidence that the local site works at desktop and mobile sizes.

- [ ] **Step 1: Run all repository validators**

```powershell
Get-ChildItem tests/validate-*.ps1 | ForEach-Object {
  powershell -ExecutionPolicy Bypass -File $_.FullName
}
```

Expected: every validator prints PASS or a successful validated-page count and exits 0.

- [ ] **Step 2: Run desktop browser checks**

At 1440px width, verify Products/Services hover opens the correct menu, top-level label click reaches its homepage section, every item row has its detail URL, and the underline moves or clears without lingering.

- [ ] **Step 3: Run mobile browser checks**

At 390×667, verify label taps close navigation and reach the section, arrow taps toggle nested menus, item taps target detail pages, and no horizontal overflow appears.

- [ ] **Step 4: Inspect the Commerce visual**

Verify the new image is crisp, not stretched, correctly cropped in the homepage card, and appropriate on the Commerce detail page.

- [ ] **Step 5: Confirm local-only repository state**

```powershell
git status --short
git log --oneline -5
git rev-list --left-right --count origin/main...main
```

Expected: only the user's pre-existing `debug.log` remains untracked; local `main` is ahead of GitHub and nothing is pushed.
