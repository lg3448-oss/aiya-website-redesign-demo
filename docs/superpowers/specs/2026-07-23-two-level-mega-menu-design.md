# AIYA Two-Level Cascading Mega Menu Design

## Goal

Replace the current single-level Products and Services navigation behavior with a true two-level cascading mega menu while preserving the existing homepage, header styling, full-screen sections, product content, color palette, and hash-based navigation.

The defining requirement is that the first panel selects an item and the second panel displays only that item's details. The menu must never render every category and every detailed link together as one static dropdown.

## Confirmed Product Destination Behavior

The demo has no separate product detail pages. A product CTA in the mega menu will therefore:

1. Close the mega menu.
2. Scroll to the existing `#products` section.
3. Activate the selected product in the existing product display.

The menu footer will also retain a `View All Products →` link to the Products section.

## Desktop Structure

Products and Services will remain in their current header positions, but each will become an accessible menu trigger.

Opening either trigger displays a wide two-column panel immediately below the header:

- Left panel: approximately 35% of the menu width.
- Right panel: approximately 65% of the menu width.
- Background: the site's warm off-white.
- Styling: restrained border, shadow, spacing, and transition consistent with the existing visual system.

Only one mega menu may be open at a time.

### Products

The first panel lists the existing products in their current order:

1. AIYAPOS
2. AIYAPad
3. AIYARobot
4. AIYAScan
5. AIYA Marketing

AIYAPOS is active by default. Selecting another product dynamically replaces the right panel with that product's existing category, name, description, image, and valid destination action. AIYA Gift Card remains represented within the existing AIYA Marketing product content rather than becoming a new top-level product.

### Services

The first panel lists these five primary groups:

1. Integration & Connectivity
2. Payments & FinTech
3. AI & Automation
4. Cloud & Enterprise
5. Digital Development

Integration & Connectivity is active by default. The right panel displays only the selected group's description and detailed links:

- Integration & Connectivity: API Integrations; Data Connectivity
- Payments & FinTech: Payment APIs; FinTech Solutions; Secure Payment Processing
- AI & Automation: AI Software Solutions; Artificial Intelligence; Automation; Workflow Automation
- Cloud & Enterprise: Cloud Technologies; Enterprise Solutions; Scalable Software Platforms
- Digital Development: Digital Transformation; Modern Software Development

All 14 detailed service labels appear exactly once in the data model. The rendered menu shows only the active group's subset.

The footer provides `View All Services →`.

## Dynamic Rendering

A shared data-driven controller will manage both menus. Each menu has one first-panel list and one second-panel detail container. Changing the active first-panel item replaces the content of that single detail container.

This structure keeps Products and Services behavior consistent, avoids duplicated state logic, and enforces the cascading requirement by construction.

## Interaction Model

On desktop, a mega menu can open through hover, keyboard focus, or click.

- Moving across the trigger, left panel, and right panel keeps the menu open.
- Leaving the full trigger-and-panel region starts a roughly 200 ms close delay.
- Re-entering before the delay expires cancels the close.
- Hovering or focusing a first-panel item updates the right panel.
- Clicking an unrelated navigation item closes the menu.
- Clicking outside closes the menu.
- Pressing Escape closes the menu and returns focus to its trigger.
- Following a final destination closes the menu.

The opening transition will be approximately 180 ms and will avoid movement that creates a hover gap.

## Keyboard and Accessibility

Products and Services use button semantics with `aria-haspopup`, `aria-expanded`, and `aria-controls`.

First-panel choices use focusable buttons with a visible focus state and an accessible selected state. Enter and Space activate the focused item. Up and Down move among first-panel choices; Escape closes the menu. Ordinary Tab navigation remains available through all actionable elements.

The menu will not trap focus.

## Mobile and Tablet

Below the existing mobile breakpoint, the wide panel becomes a nested accordion inside the current mobile navigation:

1. Tap Products or Services to expand that section.
2. Tap a product or service group to reveal only its details.
3. Expanding one top-level section closes the other.
4. Expanding one primary item collapses its sibling.

Targets will remain comfortably tappable, content will wrap, and the menu will not introduce horizontal overflow.

## Layout Safety

The mega menu will layer below the fixed header and above page content without covering its own labels. Width and height will be constrained to the viewport, with internal scrolling available when necessary. Text, images, and controls will use min-width and overflow rules that prevent overlap at intermediate viewport sizes.

## Verification

Automated checks will verify:

- Both menu triggers and accessible attributes exist.
- The five required service groups and all 14 detail labels exist exactly once in the data.
- Existing product names and order are preserved.
- The implementation uses one active detail region per menu rather than static all-category markup.
- Required open, switch, close, Escape, outside-click, and mobile accordion behaviors are wired.
- Mobile overflow safeguards are present.

Browser validation will capture:

1. Services open with Integration & Connectivity active.
2. Services open with a different group active.
3. Products open with a product preview.
4. Mobile navigation with a nested menu expanded.

