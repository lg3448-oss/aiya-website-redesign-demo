# Commerce Visual and Navigation Interaction Design

## Goal

Replace the blurry AIYA Commerce artwork and make Product and Service navigation consistent: hover previews choices, while clicking a destination navigates or scrolls immediately.

## Confirmed behavior

### Desktop navigation

- Hovering **Products** or **Services** opens its mega menu.
- Clicking the top-level **Products** or **Services** label closes the menu and scrolls to the matching homepage section.
- Hovering or focusing a mega-menu item updates the adjacent preview.
- Clicking anywhere on a mega-menu item, including its name, opens that item's detail page.
- The existing preview-panel call to action remains a second route to the same detail page.

### Touch and narrow screens

- Tapping the **Products** or **Services** text scrolls to the matching homepage section.
- A separate adjacent arrow button expands or collapses the corresponding menu.
- Tapping any item in the expanded menu opens its detail page.

### Homepage sections

- Each complete product and service row is an interactive link to its corresponding detail page.
- Keyboard focus remains visible and activates the same destination.

### Navigation underline

- The orange underline represents only the currently hovered, keyboard-focused, or open navigation item.
- Section tracking may continue to change text styling, but it must not leave the underline behind after the pointer moves elsewhere.

## Commerce artwork

- Generate a new high-resolution, landscape AIYA Commerce illustration for the existing product-card image area.
- Match the site's warm cream, dark charcoal, and orange visual system.
- Show a cohesive commerce platform across storefront, checkout, order, inventory, and management interfaces on multiple devices.
- Do not include third-party logos, brand names, watermarks, or readable product names.
- Save the new asset locally in `assets/` and point the Commerce catalog entry to it without modifying unrelated images.

## Implementation boundaries

- Preserve the current overall page composition and mega-menu layout.
- Make the smallest markup, CSS, JavaScript, catalog, and test changes needed.
- Preserve all unrelated user files and the untracked `debug.log`.
- Keep changes local; do not push to GitHub.

## Verification

- Automated tests cover top-level click-to-scroll, item-row navigation, mobile arrow toggling, and underline-state rules.
- Browser checks confirm the new Commerce artwork is sharp and correctly cropped on desktop and mobile.
- Browser checks confirm each Product and Service interaction route works with pointer and keyboard input.
