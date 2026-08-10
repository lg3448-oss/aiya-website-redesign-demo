# Responsive Contact Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the duplicate desktop Contact tab while retaining Contact in the mobile menu.

**Architecture:** Keep both existing `#contact` anchors. Add a dedicated class to the nav Contact link, hide it by default, and show it only inside the existing `max-width: 760px` media query.

**Tech Stack:** Static HTML, CSS, PowerShell validators, headless Chrome.

## Global Constraints

- Desktop shows Talk to our team as the only header contact entry.
- Mobile shows Contact in the menu while Talk to our team remains hidden.
- Contact destinations and unrelated page content remain unchanged.
- Keep changes local and do not push GitHub.

---

### Task 1: Responsive contact visibility

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `tests/validate-demo.ps1`
- Modify: `tests/validate-mega-menu-browser.ps1`

**Interfaces:**
- Produces: `.nav-contact` on the homepage Contact anchor with desktop `display:none` and mobile `display:flex`.

- [ ] **Step 1: Add failing static and computed-style tests**

Require `<a class="nav-contact" href="#contact">Contact</a>`, `.nav-contact{display:none}`, and a mobile `.nav-contact{display:flex}` override. In the browser test, assert the Contact link is hidden at desktop width and visible at 390px while `.header-cta` has the inverse visibility.

- [ ] **Step 2: Run focused validators and verify RED**

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate-demo.ps1
powershell -ExecutionPolicy Bypass -File tests/validate-mega-menu-browser.ps1
```

Expected: FAIL because `.nav-contact` and its responsive rules do not exist.

- [ ] **Step 3: Implement the minimal markup and CSS**

```html
<a class="nav-contact" href="#contact">Contact</a>
```

```css
.nav-contact{display:none!important}
@media(max-width:760px){.main-nav .nav-contact{display:flex!important}}
```

- [ ] **Step 4: Run all validators and verify GREEN**

```powershell
Get-ChildItem tests/validate-*.ps1 | Sort-Object Name | ForEach-Object {
  powershell -ExecutionPolicy Bypass -File $_.FullName
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
```

Expected: all validators exit 0, including desktop/mobile browser checks.

- [ ] **Step 5: Commit and merge locally**

```powershell
git add -- index.html styles.css tests/validate-demo.ps1 tests/validate-mega-menu-browser.ps1
git commit -m "fix: remove duplicate desktop contact entry"
```
