# Responsive Contact Navigation Design

## Goal

Remove the duplicate desktop contact destination while preserving an obvious contact route on mobile.

## Root cause

The homepage header renders both a Contact navigation tab and a Talk to our team call-to-action, and both link to `#contact`. On mobile, the call-to-action is hidden, so the Contact tab is currently the only visible contact destination.

## Approved behavior

- Desktop widths above 760px show Talk to our team as the only header contact entry.
- The Contact tab remains present in the navigation markup but is hidden on desktop.
- Mobile widths at or below 760px show Contact inside the expanded navigation because Talk to our team remains hidden.
- Both entries continue to link to `#contact` in their respective layouts.
- The contact section, scene navigation dot, and detail-page Let's Talk buttons remain unchanged.

## Implementation

- Add a focused class to the homepage Contact navigation anchor.
- Hide that class by default and restore it inside the existing `max-width: 760px` navigation media query.
- Extend static and browser validators to check the desktop/mobile visibility contract.
- Do not remove the Contact anchor or add JavaScript branching.

## Verification

- Confirm the new visibility test fails before the CSS change.
- Confirm desktop computed style hides Contact while Talk to our team remains visible.
- Confirm mobile computed style shows Contact while Talk to our team is hidden.
- Run the full validator suite and keep the change local without pushing GitHub.
