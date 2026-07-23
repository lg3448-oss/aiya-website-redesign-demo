# AIYA Two-Level Cascading Mega Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accessible desktop mega menus and mobile nested accordions in which one first-panel selection dynamically controls one second-panel detail view.

**Architecture:** Preserve the static site's existing three-file structure. Add semantic menu shells to `index.html`, store product and service menu content in `script.js`, and use one controller to render and manage the active detail panel for Products or Services. Extend the existing mobile navigation and product activation functions rather than adding a second navigation system.

**Tech Stack:** Semantic HTML5, plain CSS, vanilla JavaScript, PowerShell contract tests, headless Chrome screenshots.

## Global Constraints

- Preserve the existing homepage, logo, header placement, sections, colors, products, full-screen scenes, and hash navigation.
- Products and Services must be true two-level cascading menus.
- The right panel must display only the active left-panel item's details.
- Never render all categories and all detailed links together in one static dropdown.
- Desktop menu proportions must remain approximately 35% left and 65% right.
- Desktop closing delay must be between 150 and 250 ms; opening transition must be between 150 and 220 ms.
- Only one desktop mega menu or mobile top-level accordion may be open at a time.
- Service data must contain exactly five primary groups and 14 unique detail labels.
- Product order must remain AIYAPOS, AIYAPad, AIYARobot, AIYAScan, AIYA Marketing.
- Product destination actions must close the menu, scroll to `#products`, and activate the selected product.
- Mobile navigation must remain free of horizontal overflow.
- No new dependencies or build tooling.

---

### Task 1: Define the semantic menu contract

**Files:**
- Modify: `tests/validate-demo.ps1`
- Modify: `index.html:15-29`

**Interfaces:**
- Consumes: Existing `.site-header`, `.main-nav`, `.nav-toggle`, and hash navigation.
- Produces: `.nav-menu-item[data-mega-menu]`, `.mega-trigger`, `.mega-menu`, `.mega-menu-list`, `.mega-menu-detail`, and `.mega-menu-footer` elements consumed by `script.js`.

- [ ] **Step 1: Add failing structural tests**

Append assertions to `tests/validate-demo.ps1` that require two menu triggers, their ARIA relationships, and one detail region per menu:

```powershell
@('products', 'services') | ForEach-Object {
  $name = $_
  if ($html -notmatch "class=[`"'][^`"']*mega-trigger[^`"']*[`"'][^>]+data-mega-trigger=[`"']$name[`"'][^>]+aria-haspopup=[`"']true[`"'][^>]+aria-expanded=[`"']false[`"'][^>]+aria-controls=[`"']mega-$name[`"']") {
    throw "Missing accessible $name mega-menu trigger."
  }
  $menu = [regex]::Match($html, "(?s)<div[^>]+id=[`"']mega-$name[`"'][^>]+class=[`"'][^`"']*mega-menu[^`"']*[`"'].*?</div>\s*</div>\s*</div>").Value
  if (-not $menu) { throw "Missing $name mega-menu shell." }
}
if (([regex]::Matches($html, 'class="mega-menu-detail"')).Count -ne 2) {
  throw 'Each mega menu must expose exactly one dynamic detail region.'
}
if ($html -notmatch 'View All Products' -or $html -notmatch 'View All Services') {
  throw 'Mega-menu footer links are missing.'
}
```

- [ ] **Step 2: Run the contract test and confirm failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: FAIL with `Missing accessible products mega-menu trigger.`

- [ ] **Step 3: Replace the two plain navigation links with semantic menu shells**

Keep Home, Company, and Contact as anchors. For Products and Services, use this shape:

```html
<div class="nav-menu-item" data-mega-menu="products">
  <button class="mega-trigger" type="button" data-mega-trigger="products"
    aria-haspopup="true" aria-expanded="false" aria-controls="mega-products">Products</button>
  <div class="mega-menu" id="mega-products" data-menu-panel="products" hidden>
    <div class="mega-menu-inner">
      <div class="mega-menu-list" aria-label="AIYA products"></div>
      <div class="mega-menu-detail" aria-live="polite"></div>
    </div>
    <a class="mega-menu-footer" href="#products">View All Products <span>→</span></a>
  </div>
</div>
```

Repeat the same shell for Services using `services`, `mega-services`, `AIYA service categories`, and `#services`.

- [ ] **Step 4: Run the contract test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: PASS through the new semantic assertions and preserve the existing final PASS.

- [ ] **Step 5: Commit**

```powershell
git add index.html tests/validate-demo.ps1
git commit -m "feat: add accessible mega menu shells"
```

---

### Task 2: Add dynamic menu data and desktop interaction

**Files:**
- Modify: `tests/validate-demo.ps1`
- Modify: `script.js:36-59`
- Modify: `script.js:96-130`

**Interfaces:**
- Consumes: `products`, `activateProduct(key)`, and the Task 1 menu shell data attributes.
- Produces: `megaMenuData`, `renderMegaList(type)`, `selectMegaItem(type, key, options)`, `openMegaMenu(type)`, and `closeMegaMenu(options)`.

- [ ] **Step 1: Add failing behavior and data tests**

Add exact required service labels and controller signatures to `tests/validate-demo.ps1`:

```powershell
$serviceGroups = @(
  'Integration & Connectivity',
  'Payments & FinTech',
  'AI & Automation',
  'Cloud & Enterprise',
  'Digital Development'
)
$serviceDetails = @(
  'API Integrations',
  'Data Connectivity',
  'Payment APIs',
  'FinTech Solutions',
  'Secure Payment Processing',
  'AI Software Solutions',
  'Artificial Intelligence',
  'Automation',
  'Workflow Automation',
  'Cloud Technologies',
  'Enterprise Solutions',
  'Scalable Software Platforms',
  'Digital Transformation',
  'Modern Software Development'
)
$serviceGroups | ForEach-Object {
  if (([regex]::Matches($js, [regex]::Escape("'$_'"))).Count -ne 1) {
    throw "Service group must appear once in menu data: $_"
  }
}
$serviceDetails | ForEach-Object {
  if (([regex]::Matches($js, [regex]::Escape("'$_'"))).Count -ne 1) {
    throw "Service detail must appear once in menu data: $_"
  }
}
@(
  'function renderMegaList',
  'function selectMegaItem',
  'function openMegaMenu',
  'function closeMegaMenu'
) | ForEach-Object {
  if ($js -notmatch [regex]::Escape($_)) { throw "Missing mega-menu controller: $_" }
}
if ($js -match 'mega-menu-detail[^;]*querySelectorAll') {
  throw 'The detail panel must be replaced dynamically, not populated with every category.'
}
```

- [ ] **Step 2: Run the contract test and confirm failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: FAIL on the first missing service group.

- [ ] **Step 3: Define the menu datasets**

Reuse the existing `products` object for product preview content. Add `megaMenuData` with product keys in the approved order and the five service records:

```javascript
const megaMenuData = {
  products: {
    defaultKey: 'pos',
    items: ['pos', 'pad', 'robot', 'scan', 'marketing'].map(key => ({
      key,
      label: products[key].title,
      eyebrow: products[key].kicker,
      description: products[key].description,
      image: products[key].image
    }))
  },
  services: {
    defaultKey: 'integration',
    items: [
      {
        key: 'integration',
        label: 'Integration & Connectivity',
        description: 'Connect platforms, business data, and customer experiences through reliable integrations.',
        links: ['API Integrations', 'Data Connectivity']
      },
      {
        key: 'payments',
        label: 'Payments & FinTech',
        description: 'Build secure payment experiences and financial technology that support modern commerce.',
        links: ['Payment APIs', 'FinTech Solutions', 'Secure Payment Processing']
      },
      {
        key: 'ai',
        label: 'AI & Automation',
        description: 'Apply practical intelligence and automation to workflows, decisions, and daily operations.',
        links: ['AI Software Solutions', 'Artificial Intelligence', 'Automation', 'Workflow Automation']
      },
      {
        key: 'cloud',
        label: 'Cloud & Enterprise',
        description: 'Create resilient cloud foundations and enterprise platforms designed to scale.',
        links: ['Cloud Technologies', 'Enterprise Solutions', 'Scalable Software Platforms']
      },
      {
        key: 'digital',
        label: 'Digital Development',
        description: 'Modernize customer and operational experiences with purposeful software development.',
        links: ['Digital Transformation', 'Modern Software Development']
      }
    ]
  }
};
```

- [ ] **Step 4: Render only the active detail**

Implement `renderMegaList(type)` so it creates left-panel buttons, and implement `selectMegaItem(type, key, { focus = false } = {})` so it:

```javascript
function selectMegaItem(type, key, { focus = false } = {}) {
  const root = document.querySelector(`[data-mega-menu="${type}"]`);
  const item = megaMenuData[type].items.find(candidate => candidate.key === key);
  if (!root || !item) return;

  root.dataset.activeItem = key;
  root.querySelectorAll('[data-mega-item]').forEach(button => {
    const selected = button.dataset.megaItem === key;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected && focus) button.focus();
  });

  const detail = root.querySelector('.mega-menu-detail');
  detail.replaceChildren(buildMegaDetail(type, item));
}
```

`buildMegaDetail('products', item)` returns the selected product image, eyebrow, name, description, and a `View Product →` anchor with `data-product-destination="<key>"`. `buildMegaDetail('services', item)` returns the selected group title, description, and only that item's `links`, each pointing to the existing `#services` destination.

- [ ] **Step 5: Add desktop open, close, pointer, keyboard, and outside-click state**

Use one `openMenuType`, one `closeTimer`, and a 200 ms delay:

```javascript
let openMenuType = null;
let megaCloseTimer;
const megaCloseDelay = 200;

function openMegaMenu(type) {
  window.clearTimeout(megaCloseTimer);
  document.querySelectorAll('[data-mega-menu]').forEach(root => {
    const open = root.dataset.megaMenu === type;
    root.classList.toggle('open', open);
    root.querySelector('.mega-trigger').setAttribute('aria-expanded', String(open));
    root.querySelector('.mega-menu').hidden = !open;
  });
  openMenuType = type;
}

function closeMegaMenu({ restoreFocus = false } = {}) {
  const trigger = openMenuType
    ? document.querySelector(`[data-mega-trigger="${openMenuType}"]`)
    : null;
  document.querySelectorAll('[data-mega-menu]').forEach(root => {
    root.classList.remove('open');
    root.querySelector('.mega-trigger').setAttribute('aria-expanded', 'false');
    root.querySelector('.mega-menu').hidden = true;
  });
  openMenuType = null;
  if (restoreFocus) trigger?.focus();
}
```

Wire trigger hover/focus/click, root pointer enter/leave, left-item hover/focus/click, Up/Down navigation, Escape, outside pointerdown, unrelated navigation clicks, and final destination clicks. Prevent the trigger click from following a hash because it is a button.

For `[data-product-destination]`, call `activateProduct(key)` before the existing global hash-navigation listener scrolls to `#products`.

- [ ] **Step 6: Run the contract test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: `PASS: AIYA presentation contract satisfied.`

- [ ] **Step 7: Commit**

```powershell
git add script.js tests/validate-demo.ps1
git commit -m "feat: add dynamic mega menu behavior"
```

---

### Task 3: Style desktop cascade and mobile nested accordion

**Files:**
- Modify: `tests/validate-demo.ps1`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `.open`, `[hidden]`, `[aria-selected]`, `.mega-menu-inner`, product/service detail classes, and the existing `@media(max-width:760px)` breakpoint.
- Produces: A desktop 35/65 cascading panel and a single-column mobile accordion with visible focus and overflow protection.

- [ ] **Step 1: Add failing style-contract tests**

Append:

```powershell
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
```

- [ ] **Step 2: Run the contract test and confirm failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: FAIL with `Desktop mega menu must use the approved 35/65 cascade.`

- [ ] **Step 3: Add desktop layout and visual states**

Add focused rules at the end of `styles.css`:

```css
.nav-menu-item{height:100%;display:flex;align-items:center;position:relative}
.mega-trigger{height:100%;border:0;background:none;padding:0;color:#332f2b;font:inherit;font-size:16px;font-weight:700;cursor:pointer;position:relative}
.mega-trigger::after{content:"";position:absolute;left:50%;right:50%;bottom:17px;height:2px;background:var(--orange);transition:250ms}
.nav-menu-item.open .mega-trigger::after,.mega-trigger:hover::after{left:0;right:0}
.mega-menu{position:fixed;z-index:60;top:var(--header-h);left:max(48px,calc((100vw - 1320px)/2));right:max(48px,calc((100vw - 1320px)/2));max-height:calc(100svh - var(--header-h) - 24px);overflow:auto;background:#f8f4ec;border:1px solid rgba(55,39,24,.12);box-shadow:0 24px 65px rgba(55,39,24,.16);opacity:0;transform:translateY(-6px);transition:opacity 180ms ease,transform 180ms ease}
.nav-menu-item.open .mega-menu{opacity:1;transform:none}
.mega-menu-inner{display:grid;grid-template-columns:minmax(0,35%) minmax(0,65%);min-width:0}
.mega-menu-list{padding:24px;border-right:1px solid var(--line)}
.mega-menu-detail{min-width:0;padding:32px 38px}
.mega-menu-item{width:100%;min-height:52px;border:0;border-bottom:1px solid var(--line);background:transparent;text-align:left;font-size:15px;font-weight:750;cursor:pointer}
.mega-menu-item.active{color:var(--orange)}
.mega-trigger:focus-visible,.mega-menu-item:focus-visible,.mega-menu a:focus-visible{outline:3px solid rgba(241,90,36,.42);outline-offset:3px}
.mega-menu-footer{min-height:52px;padding:0 28px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;font-size:14px;font-weight:850}
```

Product detail uses a two-column text/image layout with `min-width:0`, `object-fit:contain`, and a constrained image height. Services use a readable description and vertical link list without card clutter.

- [ ] **Step 4: Add the mobile accordion presentation**

Within the final mobile media query, override the desktop panel:

```css
@media(max-width:760px){
  .nav-menu-item{height:auto;display:block}
  .mega-trigger{width:100%;min-height:48px;text-align:left;font-size:16px}
  .mega-trigger::after{display:none}
  .mega-menu{position:static;max-width:100%;max-height:min(62svh,560px);overflow:auto;border:0;border-top:1px solid var(--line);box-shadow:none;transform:none;background:rgba(255,255,255,.3)}
  .mega-menu-inner{grid-template-columns:1fr}
  .mega-menu-list{padding:8px 0;border-right:0}
  .mega-menu-item{min-height:48px;padding:0 14px}
  .mega-menu-detail{padding:18px 14px;border-top:1px solid var(--line)}
  .mega-product-detail{grid-template-columns:1fr}
  .mega-product-detail img{max-height:180px}
  .mega-menu-footer{padding:0 14px}
}
```

The JavaScript continues to enforce one active nested item; CSS simply presents the same single active detail beneath the first-panel list.

- [ ] **Step 5: Run the contract test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: `PASS: AIYA presentation contract satisfied.`

- [ ] **Step 6: Commit**

```powershell
git add styles.css tests/validate-demo.ps1
git commit -m "style: present responsive cascading menus"
```

---

### Task 4: Browser verification and screenshot evidence

**Files:**
- Modify if defects are found: `index.html`
- Modify if defects are found: `styles.css`
- Modify if defects are found: `script.js`
- Create: `screenshots/mega-services-default.png`
- Create: `screenshots/mega-services-ai.png`
- Create: `screenshots/mega-products.png`
- Create: `screenshots/mega-mobile-nested.png`

**Interfaces:**
- Consumes: The completed desktop and mobile interaction.
- Produces: Visual evidence for the four required acceptance states.

- [ ] **Step 1: Run all static verification**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
git diff --check
```

Expected: contract PASS and no whitespace errors.

- [ ] **Step 2: Launch the site in headless Chrome with remote debugging**

Use an isolated profile inside the workspace and open the local `index.html` at 1440×1000. Connect through Chrome DevTools Protocol, click or focus `data-mega-trigger="services"`, and assert:

```javascript
document.querySelector('[data-mega-menu="services"]').classList.contains('open')
document.querySelector('[data-mega-menu="services"] .mega-menu-detail').innerText.includes('Integration & Connectivity')
document.querySelectorAll('[data-mega-menu="services"] .mega-menu-detail').length === 1
```

Expected: all expressions return `true`.

- [ ] **Step 3: Capture the default Services state**

Save the 1440×1000 screenshot as:

```text
screenshots/mega-services-default.png
```

Verify the left panel has five groups and the right panel shows only API Integrations and Data Connectivity.

- [ ] **Step 4: Capture a changed Services state**

Activate `AI & Automation`, then assert the right panel contains its four details and does not contain `API Integrations`. Save:

```text
screenshots/mega-services-ai.png
```

- [ ] **Step 5: Capture Products and verify destination behavior**

Open Products, activate AIYAPad, save:

```text
screenshots/mega-products.png
```

Click `View Product →` and assert:

```javascript
document.querySelector('#product-stage').dataset.product === 'pad'
document.querySelector('[data-mega-menu="products"]').classList.contains('open') === false
window.location.hash === '#products'
```

Expected: all expressions return `true`.

- [ ] **Step 6: Capture and validate mobile nested navigation**

Resize to 390×844, open the hamburger, expand Services, then select Payments & FinTech. Save:

```text
screenshots/mega-mobile-nested.png
```

Assert:

```javascript
document.documentElement.scrollWidth === document.documentElement.clientWidth
document.querySelectorAll('.nav-menu-item.open').length === 1
```

Expected: both expressions return `true`.

- [ ] **Step 7: Inspect all screenshots**

Open each PNG and verify:

- No label is covered by an image or adjacent panel.
- The panel remains inside the viewport.
- The desktop split reads as approximately 35/65.
- Only one category's details are visible.
- Focus, hover, and active states remain legible.
- Mobile content wraps without horizontal overflow.

If a defect is found, add a narrowly scoped regression assertion to `tests/validate-demo.ps1`, reproduce the failure, patch the responsible file, and rerun Steps 1–7.

- [ ] **Step 8: Commit the verified result**

```powershell
git add index.html styles.css script.js tests/validate-demo.ps1 screenshots/mega-services-default.png screenshots/mega-services-ai.png screenshots/mega-products.png screenshots/mega-mobile-nested.png
git commit -m "test: verify cascading mega menus"
```

