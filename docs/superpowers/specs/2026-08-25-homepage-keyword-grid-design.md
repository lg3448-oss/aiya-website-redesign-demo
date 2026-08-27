# Homepage Keyword Grid Design

## Goal

Make the keyword grids inside every Products and Services tab on the homepage easier to scan and ensure their final row is fully visible within the section.

## Scope

- Apply one shared presentation rule to the `category-offerings` grids rendered for all homepage Product and Service categories.
- Remove the secondary description beneath every keyword from the rendered homepage grid item.
- Keep each item clickable and preserve its existing destination and hover/focus affordance.
- Increase the keyword title's size and weight so it becomes the sole visual focus.
- Reduce vertical padding, row spacing, and line height enough for the complete grid to fit without clipping on supported desktop and mobile viewports.
- Preserve the category heading, introductory paragraph, artwork, selectors, overview link, navigation menus, and all detail pages.

## Implementation Direction

Update the shared homepage offering renderer so it creates only a title and arrow for each item. Adjust only the shared `category-offerings` styles, including the existing mobile rule, rather than adding category-specific overrides.

## Acceptance Criteria

1. No homepage Product or Service keyword item contains a secondary `small` description.
2. Keyword titles are visibly larger and bolder than before.
3. Every offering in every Product and Service tab remains present and clickable.
4. The last keyword row is fully visible at the tested desktop and mobile viewport sizes.
5. Existing detail-page and mega-menu descriptions remain unchanged.

## Verification

- Add a source-level regression assertion for the shared renderer before changing production code.
- Run the complete existing validation suite.
- Exercise every homepage Product and Service tab in a real browser at desktop and mobile sizes and check for clipping or overflow.
