# AIYA WeChat Long Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce one 1080 px-wide WeChat Official Account long JPG containing every unique article element from `Image (6).jpg` through `Image (11).jpg`.

**Architecture:** Crop the common article viewport from each screenshot, align the six crops using their measured vertical scroll offsets, and composite them into one continuous source-resolution canvas. Scale the assembled canvas once to 1080 px width to preserve the original text pixels, then validate dimensions and visually inspect the seams.

**Tech Stack:** Python 3, Pillow, deterministic raster cropping/compositing.

## Global Constraints

- Preserve every unique Chinese and English paragraph.
- Preserve all article logos, exhibition information, brand marks, and product images.
- Remove duplicated screenshot overlap.
- Remove browser chrome and repeated WeChat follow/share footer controls.
- Do not rewrite or regenerate any supplied text.
- Output one 1080 px-wide JPG.
- Content order must be exhibition information, exhibitor introduction, PAX IM30, Ingenico AXIUM SX7000, then Clover Flex.

---

### Task 1: Build the deterministic stitcher

**Files:**
- Create: `tools/build_wechat_long_image.py`
- Create: `output/wechat/aiya-wechat-long-image.jpg`

**Interfaces:**
- Consumes: `C:\Users\Work Station 303\Downloads\Image (6).jpg` through `Image (11).jpg`.
- Produces: a 1080 px-wide RGB JPEG and console output reporting its dimensions.

- [ ] **Step 1: Add source validation**

The script must open all six images, require widths of 2880 px, and fail with a named path if any source is missing or has an unexpected size.

- [ ] **Step 2: Crop the common article viewport**

Crop every source with:

```python
ARTICLE_BOX = (760, 80, 2120, 1650)
```

This removes the browser bar, outside margins, and fixed WeChat footer while preserving the 1360×1570 article viewport.

- [ ] **Step 3: Align the six successive views**

Use the measured vertical scroll offsets:

```python
SCROLL_OFFSETS = [0, 1072, 2056, 3088, 3872, 4820]
```

Create a white 1360×6390 canvas and paste the crops at these offsets in source order. Later crops overwrite only their pixel-aligned overlap; no blending or generated pixels are permitted.

- [ ] **Step 4: Scale and save once**

Resize the completed canvas to 1080×5074 with `Image.Resampling.LANCZOS`, convert to RGB, and save:

```text
output/wechat/aiya-wechat-long-image.jpg
```

Use JPEG quality 95, subsampling 0, and optimize enabled.

- [ ] **Step 5: Run the stitcher**

Run:

```powershell
py tools\build_wechat_long_image.py
```

Expected output:

```text
Created output\wechat\aiya-wechat-long-image.jpg (1080x5074)
```

---

### Task 2: Validate content and presentation

**Files:**
- Inspect: `output/wechat/aiya-wechat-long-image.jpg`
- Modify if alignment correction is required: `tools/build_wechat_long_image.py`

**Interfaces:**
- Consumes: the Task 1 output.
- Produces: verified final delivery asset.

- [ ] **Step 1: Validate technical properties**

Open the result with Pillow and assert mode `RGB`, width `1080`, height `5074`, and a non-empty file.

- [ ] **Step 2: Inspect at original resolution**

Use `view_image` with original detail. Verify:

- Browser controls are absent.
- WeChat follow/share footer controls are absent.
- AIYA exhibition information appears once.
- Exhibitor introduction appears once.
- PAX IM30 appears once and is complete.
- Ingenico AXIUM SX7000 appears once and is complete.
- Clover Flex appears once and is complete.
- No line of text or product image is clipped at a seam.

- [ ] **Step 3: Correct only measured seam errors**

If a seam repeats or skips content, adjust only the corresponding value in `SCROLL_OFFSETS`, rebuild, and repeat the dimension and visual checks.

- [ ] **Step 4: Commit**

```powershell
git add tools/build_wechat_long_image.py output/wechat/aiya-wechat-long-image.jpg
git commit -m "feat: create AIYA WeChat long image"
```

