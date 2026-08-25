# Homepage Keyword Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove secondary copy from every homepage Product and Service keyword grid, strengthen the keyword titles, and keep every row fully visible.

**Architecture:** Keep the change inside the existing shared homepage `renderOfferings()` path so every Product and Service tab inherits the rule automatically. Add one focused browser regression script that cycles every selector tab at desktop and mobile widths, then make a surgical JavaScript and CSS change without touching catalog data, mega menus, or detail pages.

**Tech Stack:** HTML5, vanilla JavaScript, CSS, PowerShell, headless Google Chrome

## Global Constraints

- Apply the rule only to homepage `category-offerings` grids.
- Remove each offering's secondary description from rendered homepage markup.
- Preserve every offering title, URL, click target, category introduction, artwork, selector, overview link, mega menu, and detail page.
- Use one shared rule for every Product and Service tab.
- Verify desktop at `1440x1000` and mobile at `390x844`.

---

### Task 1: Add the keyword-grid browser regression

**Files:**
- Create: `tests/validate-homepage-keyword-grid.ps1`

**Interfaces:**
- Consumes: `index.html`, `catalog.js`, `script.js`, `styles.css`, `.product-selector [data-product-category]`, `.service-selector [data-service]`, and `.category-offerings`.
- Produces: a standalone PowerShell validation command with a zero exit code only when every homepage category satisfies the agreed presentation contract.

- [ ] **Step 1: Write the failing browser test**

Create `tests/validate-homepage-keyword-grid.ps1` using the existing temporary-fixture pattern. Inject a runner before `</body>` that runs this check for both selector groups:

```javascript
const checkTabs = (selector, gridSelector) => {
  document.querySelectorAll(selector).forEach(tab => {
    tab.click();
    const grid = document.querySelector(gridSelector);
    const links = [...grid.querySelectorAll(':scope > a')];
    assert(links.length > 0, `${tab.textContent.trim()} has no keyword links`);
    assert(grid.querySelectorAll('small').length === 0, `${tab.textContent.trim()} still renders secondary copy`);
    links.forEach(link => {
      const title = link.querySelector('strong');
      assert(title && title.textContent.trim(), 'keyword title is missing');
      assert(link.getAttribute('href'), `${title.textContent.trim()} lost its destination`);
      assert(parseFloat(getComputedStyle(title).fontSize) >= 14, `${title.textContent.trim()} is not prominent enough`);
    });
    const gridBox = grid.getBoundingClientRect();
    const lastBox = links.at(-1).getBoundingClientRect();
    assert(lastBox.bottom <= gridBox.bottom + 1, `${tab.textContent.trim()} clips its final row`);
  });
};

checkTabs('.product-selector [data-product-category]', '#product-offerings');
checkTabs('.service-selector [data-service]', '#service-offerings');
assert(document.documentElement.scrollWidth === document.documentElement.clientWidth, 'horizontal overflow detected');
```

The PowerShell wrapper must launch Chrome with `--headless=new`, `--window-size=1440,1000` and `--window-size=390,844`, inspect a `data-homepage-keyword-test` result attribute, and remove all temporary fixture/profile/output files in `finally`.

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-homepage-keyword-grid.ps1
```

Expected: FAIL because `renderOfferings()` currently appends a `<small>` description to every keyword link.

- [ ] **Step 3: Commit the failing regression test**

```powershell
git add tests/validate-homepage-keyword-grid.ps1
git commit -m "test: cover homepage keyword grids"
```

---

### Task 2: Simplify and strengthen the shared homepage grids

**Files:**
- Modify: `script.js:42-55`
- Modify: `styles.css:202-212`
- Test: `tests/validate-homepage-keyword-grid.ps1`

**Interfaces:**
- Consumes: `renderOfferings(container, offerings)` where each offering provides `label` and `url`.
- Produces: one clickable `<a>` per offering containing only `<strong>` and the existing decorative arrow `<span>`.

- [ ] **Step 1: Remove secondary nodes from the shared renderer**

Change the renderer body from title + description + arrow to title + arrow:

```javascript
function renderOfferings(container, offerings) {
  container.replaceChildren(...offerings.map(offering => {
    const link = document.createElement('a');
    link.href = offering.url;
    const title = document.createElement('strong');
    title.textContent = offering.label;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '\u2197\uFE0E';
    link.append(title, arrow);
    return link;
  }));
}
```

Do not remove descriptions from `catalog.js`; mega menus and detail experiences still consume them.

- [ ] **Step 2: Apply the shared compact, prominent styling**

Replace the homepage keyword declarations with:

```css
.category-offerings{position:relative;z-index:2;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 10px;margin-top:14px}
.category-offerings a{min-width:0;min-height:39px;padding:9px 26px 9px 0;border-bottom:1px solid var(--line);position:relative;display:flex;align-items:center}
.category-offerings strong{display:block;font-size:15px;font-weight:850;line-height:1.15;letter-spacing:-.015em}
.category-offerings span{position:absolute;right:4px;top:50%;color:var(--orange);font-size:13px;opacity:0;transform:translate(-3px,calc(-50% + 3px));transition:.2s}
.category-offerings a:hover span,.category-offerings a:focus-visible span{opacity:1;transform:translateY(-50%)}
```

Update the existing mobile declaration so the grid stays two columns and uses compact spacing:

```css
@media(max-width:760px){.product-stage{grid-template-columns:1fr}.category-offerings{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 8px;margin-top:10px}.category-offerings a{min-height:36px;padding:8px 20px 8px 0}.category-offerings strong{font-size:14px;line-height:1.12}.category-overview{margin-top:10px}.product-meta{padding-right:0}}
```

- [ ] **Step 3: Run the focused test and verify GREEN**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-homepage-keyword-grid.ps1
```

Expected: PASS at desktop and mobile sizes for every Product and Service tab.

- [ ] **Step 4: Run the complete validation suite**

Run:

```powershell
Get-ChildItem tests -Filter 'validate-*.ps1' | Sort-Object Name | ForEach-Object { & powershell -ExecutionPolicy Bypass -File $_.FullName; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE } }
```

Expected: every validator prints PASS (or its validated page count) and the command exits `0`.

- [ ] **Step 5: Review the production diff and commit**

```powershell
git diff --check
git diff -- script.js styles.css
git add script.js styles.css
git commit -m "fix: clarify homepage keyword grids"
```

- [ ] **Step 6: Verify repository state**

```powershell
git status --short --branch
git log -3 --oneline --decorate
```

Expected: only the pre-existing untracked `debug.log` remains; the implementation commits are on local `main`.
