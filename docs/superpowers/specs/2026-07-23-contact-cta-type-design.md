# Contact CTA Typography Design

## Goal

Increase the final Contact scene's `Talk to Our Team` button text from 14px to
16px so it is more prominent than the general site buttons.

## Scope

- Add a Contact-specific font-size rule for `.contact .button`.
- Use 16px on both desktop and mobile.
- Preserve the button's current dimensions, colors, spacing, link, and hover
  behavior.
- Do not change the homepage buttons, header CTA, or other text links.

## Verification

- Add a contract assertion for `.contact .button{font-size:16px}` before the
  style change and confirm it fails.
- Apply the single CSS override and confirm the full presentation contract
  passes.
- Capture the Contact scene at 1440×900 and 390×844 and confirm the larger text
  remains centered without clipping.
