# White Label Products Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fourth Services category named White Label Products with six canonical, localized, directly clickable offerings and three supplied interface screenshots.

**Architecture:** Extend the existing `window.aiyaCatalog.services` and `service-pages.js` profile pipeline so the homepage selector and Services mega menu continue rendering from one source of truth. Reuse the existing AIYA Marketing and CRM pages, create four product detail pages plus one category overview, and add one optional interface-showcase block to the three screenshot-backed pages. Keep all paths relative for both GitHub Pages project hosting and root-domain hosting.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript catalog rendering, PowerShell validation scripts, headless Chrome browser validation.

## Global Constraints

- Services order is Software Engineering, Integration & Automation, White Label Products, Growth.
- White Label Products offering order is AIYA Marketing, AIYA Online Order, AIYA Travel Ticketing, AIYA CRM, AIYA Gaming, AIYA ERP.
- AIYA CRM is removed from Integration & Automation and appears only under White Label Products.
- AIYA Marketing and AIYA CRM reuse their canonical existing pages; no duplicate pages.
- The first three supplied screenshots map to AIYA Marketing, AIYA Online Order, and AIYA Travel Ticketing in that order.
- English, Simplified Chinese, and Korean must be complete.
- Do not reorganize the Products mega menu.
- Do not build functional login, ordering, ticketing, gaming, CRM, or ERP applications.
- Preserve relative asset and navigation paths.
- Preserve the untracked `debug.log` and unrelated work.

---

## File Map

- Modify `catalog.js`: add the White Label Products service category and remove CRM from Integration.
- Modify `service-pages.js`: define the six offering profiles and allow canonical URL overrides.
- Modify `index.html`: add the fourth Services selector button and renumber Growth.
- Modify `styles.css`: support four Services mega-menu columns and the interface showcase.
- Modify `i18n.js`: translate category data, offering data, page copy, and interface showcase labels.
- Modify `products/aiya-marketing.html`: add the supplied marketing interface screenshot section.
- Modify `services/crm-systems.html`: display AIYA CRM through the updated catalog record.
- Create `services/white-label-products.html`: category overview page.
- Create `products/aiya-online-order.html`: online ordering detail page.
- Create `products/aiya-travel-ticketing.html`: travel ticketing detail page.
- Create `products/aiya-gaming.html`: gaming systems detail page.
- Create `products/aiya-erp.html`: ERP detail page.
- Create `assets/aiya-marketing-interface.jpg`: normalized first supplied screenshot.
- Create `assets/aiya-online-order-interface.jpg`: normalized second supplied screenshot.
- Create `assets/aiya-travel-ticketing-interface.jpg`: normalized third supplied screenshot.
- Create `tests/validate-white-label-products.ps1`: structural, content, path, image, and localization validation.
- Create `tests/validate-white-label-browser.ps1`: desktop and mobile browser validation.

---

### Task 1: Define the Structural Contract

**Files:**
- Create: `tests/validate-white-label-products.ps1`
- Read: `catalog.js`
- Read: `service-pages.js`
- Read: `index.html`

**Interfaces:**
- Consumes: static HTML and JavaScript source files.
- Produces: a PowerShell regression test whose exit code is zero only when the approved structure is complete.

- [ ] **Step 1: Write the failing structural test**

The test must read `catalog.js`, `service-pages.js`, `index.html`, `i18n.js`, and all six canonical pages. Use these exact expected values:

```powershell
$expectedOfferings = @(
  @{ Title = 'AIYA Marketing'; Url = 'products/aiya-marketing.html' },
  @{ Title = 'AIYA Online Order'; Url = 'products/aiya-online-order.html' },
  @{ Title = 'AIYA Travel Ticketing'; Url = 'products/aiya-travel-ticketing.html' },
  @{ Title = 'AIYA CRM'; Url = 'services/crm-systems.html' },
  @{ Title = 'AIYA Gaming'; Url = 'products/aiya-gaming.html' },
  @{ Title = 'AIYA ERP'; Url = 'products/aiya-erp.html' }
)
```

Assert that:

```powershell
$serviceOrder = @('engineering', 'integration', 'white-label', 'growth')
$interfaceAssets = @(
  'assets/aiya-marketing-interface.jpg',
  'assets/aiya-online-order-interface.jpg',
  'assets/aiya-travel-ticketing-interface.jpg'
)
```

Also assert that the Integration category capability list does not contain `AIYA CRM` or `CRM Systems`, the White Label category contains each expected offering exactly once, all page files exist, no new HTML `href` or `src` begins with `/`, and `i18n.js` contains Chinese and Korean translations for every new title.

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-white-label-products.ps1
```

Expected: FAIL because `white-label`, its pages, and its assets do not exist.

- [ ] **Step 3: Commit the failing test**

```powershell
git add tests/validate-white-label-products.ps1
git commit -m "test: define white label products structure"
```

---

### Task 2: Add the White Label Catalog Category

**Files:**
- Modify: `catalog.js:119-140`
- Modify: `service-pages.js:87-125`
- Modify: `index.html:168-174`
- Modify: `styles.css:140`
- Test: `tests/validate-white-label-products.ps1`

**Interfaces:**
- Consumes: `window.aiyaCatalog.services` entries with `key`, `title`, `url`, `code`, `kicker`, `image`, and `capabilities`.
- Produces: `window.aiyaCatalog.serviceCategories` entry with key `white-label` and six offerings whose `url` values are canonical.

- [ ] **Step 1: Add the category and move CRM**

Change Integration capabilities to:

```js
capabilities: ['API, Data & Payment Integration', 'AI & Workflow Automation']
```

Insert before Growth:

```js
{
  key: 'white-label', navCategory: 'Build', title: 'White Label Products',
  url: 'services/white-label-products.html', code: 'WLP',
  kicker: 'AIYA-BUILT PLATFORMS', image: 'assets/service-platform.png',
  summary: 'Launch customizable AIYA-built products with your brand, workflows, and connected business systems.',
  capabilities: ['AIYA Marketing', 'AIYA Online Order', 'AIYA Travel Ticketing', 'AIYA CRM', 'AIYA Gaming', 'AIYA ERP'],
  deliverables: ['Brand-ready product experience', 'Configured business workflows', 'Connected data, payments, and operations'],
  useCases: ['Launching a branded digital product', 'Replacing disconnected operating tools', 'Starting from a proven customizable platform']
}
```

- [ ] **Step 2: Define offering profiles and canonical URL overrides**

Add six profiles in `service-pages.js`. Each profile must have `key`, `summary`, `capabilities`, `deliverables`, `useCases`, and optional `url`. Use these URL overrides:

```js
'AIYA Marketing': { key: 'marketing', url: 'products/aiya-marketing.html' },
'AIYA Online Order': { key: 'aiya-online-order', url: 'products/aiya-online-order.html' },
'AIYA Travel Ticketing': { key: 'aiya-travel-ticketing', url: 'products/aiya-travel-ticketing.html' },
'AIYA CRM': { key: 'crm-systems', url: 'services/crm-systems.html' },
'AIYA Gaming': { key: 'aiya-gaming', url: 'products/aiya-gaming.html' },
'AIYA ERP': { key: 'aiya-erp', url: 'products/aiya-erp.html' }
```

Change the mapper to:

```js
url: profile.url || `services/${profile.key}.html`,
```

Rename the existing `CRM Systems` profile key to `AIYA CRM`; retain its current CRM-specific copy.

- [ ] **Step 3: Add the homepage selector button**

Use this exact order and numbering:

```html
<button type="button" data-service="integration"><b>02</b><span>Integration &amp; Automation</span><i>↗︎</i></button>
<button type="button" data-service="white-label"><b>03</b><span>White Label Products</span><i>↗︎</i></button>
<button type="button" data-service="growth"><b>04</b><span>Growth</span><i>↗︎</i></button>
```

- [ ] **Step 4: Fit four desktop mega-menu groups**

Change:

```css
.mega-menu-groups-services{grid-template-columns:repeat(4,minmax(0,1fr));padding-inline:20px}
```

Keep the existing single-column mobile rule unchanged.

- [ ] **Step 5: Run the structural test**

Expected: still FAIL only for missing pages, assets, and localization; category/order/CRM assertions pass.

- [ ] **Step 6: Commit catalog and navigation**

```powershell
git add catalog.js service-pages.js index.html styles.css
git commit -m "feat: add white label products service category"
```

---

### Task 3: Add Canonical Overview and Detail Pages

**Files:**
- Create: `services/white-label-products.html`
- Create: `products/aiya-online-order.html`
- Create: `products/aiya-travel-ticketing.html`
- Create: `products/aiya-gaming.html`
- Create: `products/aiya-erp.html`
- Modify: `products/aiya-marketing.html`
- Modify: `services/crm-systems.html`
- Modify: `styles.css`
- Test: `tests/validate-white-label-products.ps1`

**Interfaces:**
- Consumes: `getCatalogItem('service', 'white-label')`, `getCatalogItem('service-offering', key)`, and `getCatalogItem('product', 'marketing')`.
- Produces: six resolvable canonical pages and one category overview with existing header/menu/detail initialization.

- [ ] **Step 1: Create the category overview**

Copy the established structure of `services/integration-automation.html`, then set:

```html
<meta name="description" content="Launch customizable AIYA-built products with your brand, workflows, and connected business systems.">
<title>White Label Products | AIYA Technology</title>
<body class="detail-page product-capability-page" data-detail-kind="service" data-detail-key="white-label" data-asset-prefix="../">
```

The back link and CTA must point to `../index.html#services`.

- [ ] **Step 2: Create four offering pages**

Copy the established structure of `services/api-data-integration.html`. Use `data-detail-kind="service-offering"` and these keys:

```text
aiya-online-order
aiya-travel-ticketing
aiya-gaming
aiya-erp
```

All back links point to `../services/white-label-products.html`; all CSS and scripts use `../` relative paths and current cache versions.

- [ ] **Step 3: Update the canonical CRM page**

Keep `services/crm-systems.html` and `data-detail-key="crm-systems"`. Change title and metadata to AIYA CRM and change its back link to `white-label-products.html`.

- [ ] **Step 4: Add interface showcase markup to the first three pages**

Add after the capability section on AIYA Marketing, AIYA Online Order, and AIYA Travel Ticketing:

```html
<section class="detail-section interface-showcase reveal-section">
  <div class="detail-section-intro">
    <small>PRODUCT INTERFACE</small>
    <h2>See the product experience</h2>
    <p>A current interface example that can be adapted around brand and workflow requirements.</p>
  </div>
  <figure class="interface-frame">
    <img src="../assets/ASSET_NAME.jpg" alt="PRODUCT_NAME interface example">
  </figure>
</section>
```

- [ ] **Step 5: Style the showcase without changing the screenshots**

Add focused CSS:

```css
.interface-showcase{display:grid;grid-template-columns:minmax(240px,.65fr) minmax(320px,1.35fr);gap:7vw;align-items:center}
.interface-frame{margin:0;padding:clamp(14px,2vw,28px);border:1px solid var(--line);border-radius:28px;background:#fff;box-shadow:0 28px 70px rgba(77,48,24,.12)}
.interface-frame img{display:block;width:100%;max-height:760px;object-fit:contain;border-radius:18px}
@media(max-width:760px){.interface-showcase{grid-template-columns:1fr;gap:30px}.interface-frame{padding:12px;border-radius:20px}.interface-frame img{max-height:620px;border-radius:12px}}
```

- [ ] **Step 6: Run the structural test**

Expected: page existence and canonical URL assertions pass; image and localization assertions still fail.

- [ ] **Step 7: Commit pages and layout**

```powershell
git add services/white-label-products.html services/crm-systems.html products/aiya-marketing.html products/aiya-online-order.html products/aiya-travel-ticketing.html products/aiya-gaming.html products/aiya-erp.html styles.css
git commit -m "feat: add white label product detail pages"
```

---

### Task 4: Add the Three Supplied Interface Assets

**Files:**
- Create: `assets/aiya-marketing-interface.jpg`
- Create: `assets/aiya-online-order-interface.jpg`
- Create: `assets/aiya-travel-ticketing-interface.jpg`
- Test: `tests/validate-white-label-products.ps1`

**Interfaces:**
- Consumes: the three user-supplied screenshots in message order.
- Produces: web-ready JPEG images referenced by the three interface showcase sections.

- [ ] **Step 1: Normalize each supplied screenshot**

Preserve the complete visible interface, original aspect ratio, logos, fields, buttons, and labels. Remove no content. Convert only as needed to RGB JPEG, maximum width 1400 pixels, quality 88, with no upscaling.

- [ ] **Step 2: Verify file identity and dimensions**

Run a local image inspection and confirm each file is non-empty, portrait-oriented, and assigned in the approved order. Expected filenames are exactly the three paths in the file map.

- [ ] **Step 3: Run the structural test**

Expected: image existence and page assignment assertions pass; localization assertions may remain failing.

- [ ] **Step 4: Commit image assets**

```powershell
git add assets/aiya-marketing-interface.jpg assets/aiya-online-order-interface.jpg assets/aiya-travel-ticketing-interface.jpg
git commit -m "feat: add white label product interface previews"
```

---

### Task 5: Add Complete Chinese and Korean Localization

**Files:**
- Modify: `i18n.js`
- Test: `tests/validate-white-label-products.ps1`

**Interfaces:**
- Consumes: the new English category and page strings.
- Produces: translated DOM text plus localized catalog values for `white-label` and its offerings.

- [ ] **Step 1: Add dictionary entries**

Add Chinese and Korean translations for all new titles, metadata text, summaries, capabilities, deliverables, use cases, and interface showcase labels. Required title mappings include:

```js
// Chinese
'White Label Products': '白标产品',
'AIYA Online Order': 'AIYA 在线点单',
'AIYA Travel Ticketing': 'AIYA 旅行票务',
'AIYA CRM': 'AIYA 客户关系管理',
'AIYA Gaming': 'AIYA 游戏系统',
'AIYA ERP': 'AIYA 企业资源管理',

// Korean
'White Label Products': '화이트 라벨 제품',
'AIYA Online Order': 'AIYA 온라인 주문',
'AIYA Travel Ticketing': 'AIYA 여행 티켓팅',
'AIYA CRM': 'AIYA CRM',
'AIYA Gaming': 'AIYA 게이밍',
'AIYA ERP': 'AIYA ERP',
```

- [ ] **Step 2: Add category-specific catalog normalization**

Extend both Chinese and Korean `serviceCategoryUseCases`, `serviceCapabilities`, service code selection, and offering normalization for key `white-label`. Do not let the generic service copy replace the approved AIYA Gaming or AIYA ERP meanings.

Use localized category codes:

```js
// Chinese: white-label -> '白标'
// Korean: white-label -> '제품'
```

- [ ] **Step 3: Run the structural and Korean selector tests**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-white-label-products.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-korean-language-selector.ps1
```

Expected: both PASS.

- [ ] **Step 4: Commit localization**

```powershell
git add i18n.js tests/validate-white-label-products.ps1
git commit -m "feat: localize white label products"
```

---

### Task 6: Add Browser Regression Coverage and Verify

**Files:**
- Create: `tests/validate-white-label-browser.ps1`
- Modify only if the test exposes a defect: files directly responsible for that defect.

**Interfaces:**
- Consumes: the completed local static site.
- Produces: desktop and mobile browser evidence for navigation, page content, screenshots, and layout.

- [ ] **Step 1: Write the browser test before any browser-driven fix**

Use headless Chrome at desktop `1440x1000` and mobile `390x844`. Test English, Chinese, and Korean on:

```text
index.html#services
services/white-label-products.html
products/aiya-marketing.html
products/aiya-online-order.html
products/aiya-travel-ticketing.html
services/crm-systems.html
products/aiya-gaming.html
products/aiya-erp.html
```

Assert:

```js
document.documentElement.scrollWidth <= document.documentElement.clientWidth
document.querySelectorAll('[data-menu-panel="services"] .mega-menu-group').length === 4
document.querySelectorAll('.service-selector [data-service]').length === 4
[...document.querySelectorAll('.interface-frame img')].every(image => image.complete && image.naturalWidth > 0)
```

Also click White Label Products and each offering link, verify CRM is absent from Integration, open the Services menu on desktop and mobile, and verify visible localized labels.

- [ ] **Step 2: Run the browser test and verify RED or PASS**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-white-label-browser.ps1
```

If it fails, record the exact failing assertion and change only the responsible CSS, HTML, or JavaScript.

- [ ] **Step 3: Run the complete relevant verification set**

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-white-label-products.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-white-label-browser.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-korean-language-selector.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-homepage-keyword-grid.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\validate-news-placeholder.ps1
```

Run the existing deployment-path validation with Git Bash:

```powershell
& 'C:\Users\Work Station 303\AppData\Local\Programs\Git\bin\bash.exe' '.\tests\validate-deployment-paths.sh'
```

Expected: every command exits zero. Then run `git diff --check` and confirm only `debug.log` remains untracked.

- [ ] **Step 4: Commit browser coverage and any verified fix**

```powershell
git add tests/validate-white-label-browser.ps1
git commit -m "test: verify white label products in browser"
```

- [ ] **Step 5: Push and verify GitHub Pages**

Push `main`, wait for the Pages workflow for the pushed SHA to complete successfully, then request the live homepage, CSS, three interface assets, overview page, and all six canonical offering pages with cache-busting query parameters. Confirm HTTP 200, relative paths, four Services categories, six White Label offerings, and no CRM under Integration.
