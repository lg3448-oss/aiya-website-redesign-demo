# Detail Page Home Navigation Design

## Goal

Restore the missing Home tab on every product and service detail page.

## Root cause

All eleven detail pages contain static navigation markup with Products, Services, and Company links only. The logo links to the homepage, but no visible Home navigation item was authored.

## Approved behavior

- Every product and service detail page displays the navigation order: Home, Products, Services, Company, Let's Talk.
- Home is the first text navigation item and links to `../index.html#home`.
- Existing Products, Services, Company, and Let's Talk destinations remain unchanged.
- Existing layout, styling, logo behavior, and detail-page content remain unchanged.

## Implementation

- Add one static Home anchor before Products in each of the six product pages and five service pages.
- Extend the shared detail-page validator to require the complete ordered navigation contract on every page.
- Do not introduce JavaScript navigation generation or unrelated refactoring.

## Verification

- Confirm the new validator fails before the markup change.
- Confirm all eleven detail pages pass after the Home anchors are added.
- Run the full repository validator suite to catch desktop, mobile, layout, and navigation regressions.
- Keep the change local and do not push to GitHub.
