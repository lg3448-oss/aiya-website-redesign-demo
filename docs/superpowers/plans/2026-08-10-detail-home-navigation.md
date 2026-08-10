# Detail Page Home Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visible Home tab to all eleven product and service detail pages.

**Architecture:** Preserve the existing static detail-page structure. Extend the shared PowerShell validator with one ordered navigation contract, then add the same Home anchor before Products in each detail page.

**Tech Stack:** Static HTML5 and PowerShell validators.

## Global Constraints

- The ordered detail navigation is Home, Products, Services, Company, Let's Talk.
- Home links to `../index.html#home`.
- Existing destinations, layout, styling, logo behavior, and content remain unchanged.
- Do not introduce JavaScript navigation generation or unrelated refactoring.
- Keep the change local and do not push to GitHub.

---

### Task 1: Detail navigation contract and markup

**Files:**
- Modify: `tests/validate-detail-pages.ps1`
- Modify: `products/aiya-commerce.html`
- Modify: `products/aiya-revenue.html`
- Modify: `products/aiya-pad.html`
- Modify: `products/aiya-robot.html`
- Modify: `products/aiya-scan.html`
- Modify: `products/aiya-marketing.html`
- Modify: `services/strategy-experience.html`
- Modify: `services/software-engineering.html`
- Modify: `services/integration-automation.html`
- Modify: `services/cloud-operations.html`
- Modify: `services/growth.html`

**Interfaces:**
- Consumes: the existing `$pages` table in `tests/validate-detail-pages.ps1`.
- Produces: the same five-link ordered navigation contract on all eleven detail pages.

- [ ] **Step 1: Add the failing ordered-navigation assertion**

Inside the existing `$pages` validation loop, add:

```powershell
$navigation = '<nav class="detail-nav" aria-label="Primary navigation">' +
  '<a href="../index.html#home">Home</a>' +
  '<a href="../index.html#products">Products</a>' +
  '<a href="../index.html#services">Services</a>' +
  '<a href="../index.html#company">Company</a>' +
  '</nav><a class="header-cta" href="../index.html#contact">Let''s Talk <span>↗</span></a>'
if (-not $html.Contains($navigation)) {
  throw "Incomplete or unordered detail navigation: $($page.Path)"
}
```

- [ ] **Step 2: Run the focused validator and verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-detail-pages.ps1
```

Expected: FAIL on `products/aiya-commerce.html` with `Incomplete or unordered detail navigation` because Home is absent.

- [ ] **Step 3: Add the Home anchor to all eleven pages**

Replace the opening of every detail navigation:

```html
<nav class="detail-nav" aria-label="Primary navigation"><a href="../index.html#products">Products</a>
```

with:

```html
<nav class="detail-nav" aria-label="Primary navigation"><a href="../index.html#home">Home</a><a href="../index.html#products">Products</a>
```

- [ ] **Step 4: Run the focused validator and verify GREEN**

Run the Step 2 command. Expected: `Validated 11 detail pages.` and exit code 0.

- [ ] **Step 5: Run the complete regression suite**

```powershell
Get-ChildItem tests/validate-*.ps1 | Sort-Object Name | ForEach-Object {
  powershell -ExecutionPolicy Bypass -File $_.FullName
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
```

Expected: all four validators exit 0, including desktop and mobile Chrome layout checks.

- [ ] **Step 6: Commit locally**

```powershell
git add -- tests/validate-detail-pages.ps1 products/*.html services/*.html
git commit -m "fix: restore Home on detail navigation"
```
