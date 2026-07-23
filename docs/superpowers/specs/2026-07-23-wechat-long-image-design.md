# AIYA WeChat Long Image Design

## Goal

Convert `Image (6).jpg` through `Image (11).jpg` into one clean WeChat Official Account long image. Use `Image (12).jpg` as the reference for a simple, readable single-column article layout.

## Content Rules

- Preserve every unique Chinese and English paragraph.
- Preserve the AIYA logo, exhibition information, exhibitor introduction, product names, product descriptions, brand marks, and product images.
- Remove duplicated headings, paragraphs, logos, and product imagery caused by overlap between screenshots.
- Remove browser chrome, tabs, controls, WeChat follow/share controls, and other screenshot UI.
- Do not rewrite, summarize, translate, or regenerate the supplied text.

## Reading Order

1. AIYA exhibition information and call to action
2. Exhibitor introduction
3. PAX IM30
4. Ingenico AXIUM SX7000
5. Clover Flex

## Layout

- One continuous 1080 px-wide JPG.
- White article background.
- Single centered content column with comfortable side margins.
- Retain the source artwork's blue borders and exhibition visual elements where they belong to the article.
- Use consistent vertical spacing between sections.
- Keep text and product images at a mobile-readable scale inspired by `Image (12).jpg`.
- No repeated footer bar between sections.

## Production Method

Use deterministic cropping, cleanup, scaling, and compositing so the original text remains pixel-accurate. Do not use generative rewriting for text-heavy source areas.

## Validation

- Compare every source screenshot against the final long image.
- Confirm all unique content appears once.
- Confirm duplicated overlaps and browser/WeChat UI are absent.
- Confirm the image is exactly 1080 px wide and opens correctly as a JPG.
- Inspect the final at full resolution for seams, clipped text, and inconsistent spacing.

