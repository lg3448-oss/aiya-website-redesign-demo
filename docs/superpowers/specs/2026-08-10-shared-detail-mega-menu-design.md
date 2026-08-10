# Shared Homepage and Detail Mega Menu Design

## Goal

Make Products and Services on every product and service detail page open the same complete mega menus used on the homepage.

## Root cause

The homepage contains dedicated mega-menu shells and initializes their rendering and interaction logic in `script.js`. The eleven detail pages contain plain text navigation links and load only `catalog.js` plus `detail.js`; they have neither mega-menu markup nor a controller to create it. The missing hover behavior is therefore structural, not an intermittent CSS failure.

## Architecture

- Create one shared `mega-menu.js` controller responsible only for catalog menu rendering and interaction.
- Move the existing homepage mega-menu rendering, preview selection, open/close, pointer, keyboard, Escape, outside-click, and responsive arrow behavior from `script.js` into the shared controller.
- Keep homepage scene scrolling, active-section tracking, and all unrelated homepage behavior in `script.js`.
- Keep detail content rendering in `detail.js`.
- The controller accepts page context so it can prefix catalog URLs and image paths correctly on homepage and one-directory-deep detail pages.
- It exposes `window.initializeAiyaMegaMenus(options)`, where `options.pathPrefix` is `''` on the homepage and `'../'` on detail pages; initialization returns `open`, `close`, and `destroy` controls for the page-specific runtime.
- The homepage keeps its existing mega-menu shells. Detail pages receive the same accessible shells in their header markup and initialize the same controller.

## Navigation behavior

### Desktop

- Hovering Products or Services opens the corresponding full mega menu.
- Focusing either label opens the menu for keyboard users.
- Clicking Products or Services on the homepage scrolls to its homepage section.
- Clicking Products or Services from a detail page returns to `../index.html#products` or `../index.html#services`.
- Hovering or focusing a menu item updates the right-side preview.
- Clicking any menu item row or the preview call to action opens the correct detail page.
- Escape and outside clicks close the menu, and delayed pointer leave remains consistent with the homepage.

### Mobile

- Detail pages adopt the homepage hamburger navigation pattern.
- Products and Services text returns to the matching homepage section.
- The adjacent arrow independently expands or collapses the nested mega menu.
- Contact remains available inside the mobile navigation while the desktop Let's Talk button remains hidden at mobile width.
- Only one nested mega menu may be open at a time, with vertical scrolling and no horizontal overflow.

## Markup and paths

- Every detail page header uses the same navigation classes and data attributes as the homepage: `.main-nav`, `.nav-menu-item`, `.mega-trigger`, `.mega-toggle`, `.mega-menu`, and their existing `data-*` hooks.
- Homepage destinations remain relative to the root, for example `products/aiya-commerce.html` and `assets/aiya-commerce.png`.
- Detail-page destinations receive a `../` prefix, for example `../products/aiya-commerce.html` and `../assets/aiya-commerce.png`.
- View All links on detail pages target `../index.html#products` or `../index.html#services`.
- Existing Home, Company, Contact, and Let's Talk targets remain unchanged.

## Accessibility and error handling

- Preserve `aria-haspopup`, `aria-expanded`, `aria-controls`, menu list labels, live preview regions, keyboard arrow navigation, visible focus, and Escape focus restoration.
- If a requested catalog key or menu root is absent, the shared controller safely skips that item or root rather than breaking unrelated page behavior.
- The page retains usable direct navigation links before JavaScript enhancement.

## Testing

- Extend static validation to require the shared script and accessible mega-menu shells on all eleven detail pages.
- Extend browser validation to open representative product and service detail pages and verify desktop hover, preview selection, direct links, Escape/outside close, and correct `../` paths.
- Verify mobile hamburger, separate arrow expansion, direct item destinations, menu scrolling, and zero horizontal overflow on detail pages.
- Re-run all homepage tests to prove the shared extraction preserves existing behavior.
- Keep all work local and do not push GitHub.
