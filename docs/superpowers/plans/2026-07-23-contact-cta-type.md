# Contact CTA Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase only the final Contact scene's `Talk to Our Team` button text to 16px.

**Architecture:** Extend the existing PowerShell presentation contract first, confirm the old CSS fails it, then add one Contact-specific CSS override and verify desktop/mobile screenshots.

**Tech Stack:** CSS3, PowerShell validation, Chrome headless screenshots.

## Global Constraints

- `.contact .button` uses `font-size:16px`.
- Homepage buttons, header CTA, colors, spacing, links, and hover behavior remain unchanged.
- The Contact button remains centered and unclipped at 1440×900 and 390×844.

---

### Task 1: Add the failing contract

**Files:**
- Modify: `tests/validate-demo.ps1`

**Interfaces:**
- Consumes: `styles.css`
- Produces: a regression assertion for the Contact-only CTA size

- [ ] **Step 1: Add the assertion**

Insert after the existing header CTA assertion:

```powershell
if ($css -notmatch '\.contact \.button\s*\{[^}]*font-size\s*:\s*16px') {
  throw 'Contact CTA must use 16px text.'
}
```

- [ ] **Step 2: Verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
```

Expected: FAIL with `Contact CTA must use 16px text.`

---

### Task 2: Apply the Contact-only style

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: the failing contract
- Produces: a 16px Contact CTA without global button changes

- [ ] **Step 1: Add the minimal override**

Add to the layout refresh override layer:

```css
.contact .button{font-size:16px}
```

- [ ] **Step 2: Verify GREEN**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
git diff --check
```

Expected: presentation contract PASS and no whitespace errors.

---

### Task 3: Verify both viewports and commit

**Files:**
- Update: `screenshots/layout-refresh/desktop-contact.png`
- Update: `screenshots/layout-refresh/mobile-contact.png`
- Update: `screenshots/layout-refresh/mobile-contact-bottom.png`

**Interfaces:**
- Consumes: the final Contact CTA CSS
- Produces: current visual evidence and a clean committed result

- [ ] **Step 1: Recapture Contact**

Capture the Contact scene at 1440×900 and 390×844 with the existing Chrome CDP
helper. Capture the mobile Contact bottom state as well.

- [ ] **Step 2: Inspect**

Confirm the 16px label is centered, fully visible, and does not change the
button's layout or overlap nearby content.

- [ ] **Step 3: Final verification**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests\validate-demo.ps1
git diff --check
git status --short
```

- [ ] **Step 4: Commit**

```powershell
git add tests/validate-demo.ps1 styles.css screenshots/layout-refresh/desktop-contact.png screenshots/layout-refresh/mobile-contact.png screenshots/layout-refresh/mobile-contact-bottom.png
git commit -m "style: enlarge contact CTA text"
```
