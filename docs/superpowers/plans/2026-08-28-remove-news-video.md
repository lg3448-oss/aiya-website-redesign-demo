# Remove News Feature Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the News feature area to the original linked `Under Construction` placeholder while preserving every unrelated website update.

**Architecture:** Add a focused PowerShell regression check for the intended placeholder state, then create an exact Git revert of commit `74a1b739534ff2b0d34be88618b44ecbcced809d`. Verify the four paths touched by that commit match its parent and deploy the resulting `main` branch through GitHub Pages.

**Tech Stack:** Static HTML/CSS, PowerShell validation scripts, Git, GitHub Pages

## Global Constraints

- Revert only commit `74a1b739534ff2b0d34be88618b44ecbcced809d` (`Add video to News feature`).
- Preserve the News hub, article/event/story placeholder pages, navigation, and every earlier or unrelated update.
- Do not add `debug.log` to Git.

---

### Task 1: Restore and validate the News placeholder

**Files:**
- Create: `tests/validate-news-placeholder.ps1`
- Restore through Git revert: `news.html`
- Restore through Git revert: `styles.css`
- Delete through Git revert: `assets/aiya-news-connected-business.mp4`
- Delete through Git revert: `tests/validate-news-feature-video.ps1`

**Interfaces:**
- Consumes: the News feature markup and CSS introduced before commit `74a1b73`
- Produces: a linked `.news-feature-image.news-placeholder` containing `Under Construction`, with no embedded video or video asset

- [ ] **Step 1: Write the failing regression test**

```powershell
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$newsPath = Join-Path $root 'news.html'
$stylesPath = Join-Path $root 'styles.css'
$videoPath = Join-Path $root 'assets/aiya-news-connected-business.mp4'

$news = Get-Content -Raw -LiteralPath $newsPath
$styles = Get-Content -Raw -LiteralPath $stylesPath

if ($news -notmatch '<a class="news-feature-image news-placeholder"[^>]*><span>Under Construction</span><b>01</b></a>') {
  throw 'News feature does not contain the linked Under Construction placeholder.'
}
if ($news -match '<video|news-feature-video|aiya-news-connected-business\.mp4') {
  throw 'News page still contains the removed feature video.'
}
if ($styles -match '\.news-feature-video') {
  throw 'Video-only News CSS still exists.'
}
if (Test-Path -LiteralPath $videoPath) {
  throw 'News feature MP4 still exists.'
}

Write-Output 'News placeholder validation passed.'
```

- [ ] **Step 2: Run the regression test and verify it fails before the revert**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-news-placeholder.ps1`

Expected: FAIL because the current News feature contains the video instead of the linked placeholder.

- [ ] **Step 3: Commit the regression test**

```powershell
git -c core.longpaths=true add tests/validate-news-placeholder.ps1
git -c core.longpaths=true commit -m "test: cover news construction placeholder"
```

- [ ] **Step 4: Revert only the video commit**

Run: `git -c core.longpaths=true revert --no-edit 74a1b739534ff2b0d34be88618b44ecbcced809d`

Expected: a new revert commit restores `news.html` and `styles.css`, and deletes the MP4 and video-only test.

- [ ] **Step 5: Run the regression test and verify it passes**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File tests/validate-news-placeholder.ps1`

Expected: `News placeholder validation passed.`

- [ ] **Step 6: Verify the revert is exact for the four affected paths**

Run: `git -c core.longpaths=true diff --exit-code 74a1b739534ff2b0d34be88618b44ecbcced809d^ -- news.html styles.css assets/aiya-news-connected-business.mp4 tests/validate-news-feature-video.ps1`

Expected: exit code `0` with no diff.

- [ ] **Step 7: Push and verify GitHub Pages**

```powershell
git -c core.longpaths=true push origin main
```

Expected: GitHub Pages completes successfully for the new head commit; the deployed `news.html` contains `Under Construction` and no feature `<video>`.
