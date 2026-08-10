# Shared Homepage and Detail Mega Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give all eleven product and service detail pages the homepage's complete Products and Services mega menus.

**Architecture:** Extract the existing catalog-menu renderer and interaction state into `mega-menu.js`. Both page runtimes call `initializeAiyaMegaMenus({ pathPrefix })`; homepage scrolling stays in `script.js`, while detail rendering stays in `detail.js`.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, PowerShell validators, headless Chrome/CDP.

## Global Constraints

- Homepage layout and current mega-menu behavior remain unchanged.
- Detail pages use the same menu structure, previews, item destinations, keyboard behavior, mobile hamburger, and arrow toggles.
- Homepage uses `pathPrefix: ''`; detail pages use `pathPrefix: '../'`.
- Keep unrelated content and `debug.log` unchanged.
- Keep all work local and do not push GitHub.

---

### Task 1: Shared mega-menu controller

**Files:**
- Create: `mega-menu.js`
- Modify: `index.html`
- Modify: `script.js`
- Modify: `tests/validate-demo.ps1`
- Test: `tests/validate-mega-menu-browser.ps1`

**Interfaces:**
- Consumes: `window.aiyaCatalog.products`, `window.aiyaCatalog.services`, and existing `[data-mega-menu]` shells.
- Produces: `window.initializeAiyaMegaMenus({ pathPrefix: string }): { open(type), close(options), destroy() }`.

- [ ] **Step 1: Add a failing shared-runtime contract test**

Require `mega-menu.js` to exist, require homepage script order:

```html
<script src="catalog.js"></script>
<script src="mega-menu.js"></script>
<script src="script.js"></script>
```

Require `mega-menu.js` to define `window.initializeAiyaMegaMenus`, and require `script.js` to call:

```javascript
const megaMenus = window.initializeAiyaMegaMenus({ pathPrefix: '' });
```

- [ ] **Step 2: Run static validation and verify RED**

Run `powershell -ExecutionPolicy Bypass -File tests/validate-demo.ps1`.
Expected: FAIL because `mega-menu.js` is absent.

- [ ] **Step 3: Move the existing menu state and behavior into `mega-menu.js`**

The shared entry point must use this contract:

```javascript
window.initializeAiyaMegaMenus = ({ pathPrefix = '' } = {}) => {
  const withPrefix = path => `${pathPrefix}${path}`;
  const controller = new AbortController();
  let openMenuType = null;
  let closeTimer;

  // Build data from window.aiyaCatalog, render anchors and previews with
  // withPrefix(item.url) and withPrefix(item.image), bind pointer/keyboard/mobile controls.

  return {
    open: openMegaMenu,
    close: closeMegaMenu,
    destroy() {
      window.clearTimeout(closeTimer);
      controller.abort();
      closeMegaMenu();
    }
  };
};
```

Move `buildMegaDetail`, `selectMegaItem`, `renderMegaList`, open/close state, pointer leave delay, Escape, outside click, and hamburger behavior out of `script.js`. Register shared listeners with `{ signal: controller.signal }` so `destroy()` removes them.

- [ ] **Step 4: Initialize the shared runtime on the homepage**

Insert `mega-menu.js` between the catalog and homepage scripts, call the interface above, and replace direct `closeMegaMenu()` calls in homepage-only code with `megaMenus.close()`.

- [ ] **Step 5: Run homepage validators and verify GREEN**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-demo.ps1
powershell -ExecutionPolicy Bypass -File tests/validate-mega-menu-browser.ps1
```

Expected: both PASS with unchanged homepage interactions.

- [ ] **Step 6: Commit the extraction locally**

```powershell
git add -- mega-menu.js index.html script.js tests/validate-demo.ps1
git commit -m "refactor: share catalog mega menu controller"
```

### Task 2: Detail-page menu shells and paths

**Files:**
- Modify: all six files under `products/*.html`
- Modify: all five files under `services/*.html`
- Modify: `detail.js`
- Modify: `tests/validate-detail-pages.ps1`
- Modify: `tests/validate-detail-browser.ps1`

**Interfaces:**
- Consumes: `window.initializeAiyaMegaMenus({ pathPrefix: '../' })` from Task 1.
- Produces: identical Products and Services shells on all eleven detail pages with root-relative behavior adjusted by `../`.

- [ ] **Step 1: Add failing static detail-page assertions**

For each page require `.nav-toggle`, `#main-nav`, both `[data-mega-menu]` roots, both empty menu lists/live preview panels, detail-page View All destinations, and script order:

```html
<script src="../catalog.js"></script>
<script src="../mega-menu.js"></script>
<script src="../detail.js"></script>
```

Also require `detail.js` to call:

```javascript
window.initializeAiyaMegaMenus({ pathPrefix: '../' });
```

- [ ] **Step 2: Add failing detail browser interaction assertions**

On a representative product page, assert Products hover sets `aria-expanded="true"`, renders six direct item anchors with `../products/...` URLs, changes the right preview on hover/focus, and closes on Escape. At 390×667, assert hamburger visibility, arrow expansion, direct detail URLs, reachable Contact, and zero horizontal overflow.

- [ ] **Step 3: Run detail validators and verify RED**

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-detail-pages.ps1
powershell -ExecutionPolicy Bypass -File tests/validate-detail-browser.ps1
```

Expected: FAIL because detail pages still have plain navigation links.

- [ ] **Step 4: Replace each detail header with the shared shell**

Each page must contain Home, the Products shell, the Services shell, Company, mobile Contact, and the existing desktop Let's Talk CTA. Detail top-level links and View All destinations use `../index.html#...`; menu item URLs and images are prefixed at runtime.

- [ ] **Step 5: Load and initialize the shared controller**

Add `../mega-menu.js` after `../catalog.js` on every detail page and add this after the detail content setup:

```javascript
window.initializeAiyaMegaMenus({ pathPrefix: '../' });
```

- [ ] **Step 6: Run detail validators and verify GREEN**

Run the Step 3 commands. Expected: both PASS.

- [ ] **Step 7: Commit detail integration locally**

```powershell
git add -- detail.js products/*.html services/*.html tests/validate-detail-pages.ps1 tests/validate-detail-browser.ps1
git commit -m "feat: add mega menus to detail pages"
```

### Task 3: Responsive styling and complete regression

**Files:**
- Modify: `styles.css`
- Modify only failing tests from Tasks 1–2 if browser evidence identifies a styling contract mismatch.

**Interfaces:**
- Consumes: shared `.main-nav`, `.nav-menu-item`, and `.mega-menu` markup.
- Produces: desktop and mobile detail headers without legacy `.detail-nav` dependency or overflow.

- [ ] **Step 1: Add or retain failing layout assertions before CSS changes**

Require detail desktop menu panels to use the existing fixed 35/65 layout. Require the mobile detail header to show `.nav-toggle`, hide `.header-cta`, constrain `.main-nav` below the header, show `.nav-contact`, and keep document width equal to viewport width.

- [ ] **Step 2: Remove obsolete detail-nav rules and add scoped detail adjustments**

Remove `.detail-nav` selectors made unused by the new headers. Keep only necessary `.detail-page .site-header` sizing adjustments; use the existing homepage responsive navigation and mega-menu rules for all other behavior.

- [ ] **Step 3: Run every repository validator**

```powershell
Get-ChildItem tests/validate-*.ps1 | Sort-Object Name | ForEach-Object {
  powershell -ExecutionPolicy Bypass -File $_.FullName
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
```

Expected: all validators exit 0.

- [ ] **Step 4: Inspect the final diff and commit**

Run `git diff --check` and confirm only shared navigation, detail headers, styles, and associated tests changed. Then commit any remaining styling/test changes:

```powershell
git add -- styles.css tests/validate-detail-browser.ps1 tests/validate-detail-pages.ps1
git commit -m "fix: align detail mega menu layouts"
```

- [ ] **Step 5: Merge to local main and re-run the complete suite**

Fast-forward merge the verified feature branch, run the Step 3 command on local `main`, clean the owned worktree, and do not push.
