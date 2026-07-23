# AIYA Layout and Kiosk Refresh Design

## Goal

Improve readability, use more of the available screen width, simplify the
homepage, move the partner marquee to the contact scene, introduce AIYA Kiosk
as the featured product, and remove layout overlaps on desktop and mobile.

## Approved Scope

1. Increase desktop navigation text from 14px to 16px and the header
   "Talk to our team" CTA from 12px to 15px.
2. Increase other body, UI, and dense text by about 1–2px on desktop and about
   1px on mobile where space allows.
3. Remove the complete set of three homepage slide controls and their progress
   lines. Keep the three hero messages rotating automatically every seven
   seconds.
4. Increase the desktop content width from 1180px to approximately 1320px while
   retaining safe side margins. Do not force the mobile layout wider.
5. Move the complete partner-logo marquee from the homepage to the bottom of
   the contact scene, immediately above the copyright footer.
6. Remove sentence-ending periods from all primary scene headings. Normal
   punctuation in body copy remains unchanged.
7. Replace the current featured online-ordering presentation with AIYA Kiosk.
8. Rebrand the supplied kiosk image:
   - retain the kiosk hardware form;
   - change the red accent to AIYA orange;
   - replace the side label with "AIYA KIOSK";
   - replace the Russian screen with an English restaurant ordering interface;
   - remove unrelated third-party branding.
9. Present four kiosk capabilities:
   - Self-Service Ordering
   - Customizable Menu
   - Integrated Payments
   - POS Order Sync
10. Review all ten scenes at 1440×900 desktop and 390×844 mobile dimensions.
    Fix text/image overlap, clipped content, overlapping buttons, and horizontal
    overflow.

## Layout Approach

Use a balanced expansion rather than a near-edge full-width layout. Centralize
the desktop content width at approximately 1320px and reuse that measurement
for the header, scenes, headings, footers, and moved partner marquee. Preserve
the current full-screen scene structure and existing visual direction.

Font increases should be applied through the existing readability tokens and
targeted header rules. Large headings should only grow where the approved
content still fits the scene; preventing overlap takes priority over making an
already-large heading larger.

## Featured Product

The existing featured-product scene keeps its two-column structure but changes
from Clover-focused online ordering to AIYA Kiosk. The left column introduces
the kiosk and its four confirmed capabilities. The right column uses the
AIYA-branded kiosk image. The image must remain contained within its column at
both tested viewports and must never cover copy.

## Partner Marquee

Move the existing markup instead of rebuilding it. Preserve the current logo
order, continuous animation, hover pause, duplicate track accessibility, and
reduced-motion behavior. The contact scene reserves vertical space for the
marquee above the footer on desktop and mobile.

## Verification

- Extend the existing PowerShell contract test before production changes.
- Confirm the old hero controls are absent while the three hero slides and
  automatic timer remain.
- Confirm the partner marquee appears only in the contact scene.
- Confirm the Kiosk copy and four capabilities are present and the old
  Clover-focused featured-product copy is absent.
- Confirm primary headings do not end with periods.
- Run the full existing validation script.
- Capture and inspect all scenes at 1440×900 and 390×844, with special attention
  to hero, products, services, featured product, and contact.

## Out of Scope

- Changing the remaining product, service, company, result, or case-study
  content
- Replacing partner companies or logos
- Adding new pages or backend form processing
- Changing the seven-second hero rotation interval
