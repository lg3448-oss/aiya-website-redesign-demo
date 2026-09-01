# White Label Products Service Category Design

## Goal

Add a fourth homepage Services category named **White Label Products** between Integration & Automation and Growth. The category presents AIYA-built software that can be customized, branded, and integrated for a client's business. Every offering is directly clickable and has one canonical detail page.

## Category Structure

The active Services order will be:

1. Software Engineering
2. Integration & Automation
3. White Label Products
4. Growth

White Label Products will contain these offerings in this order:

1. AIYA Marketing
2. AIYA Online Order
3. AIYA Travel Ticketing
4. AIYA CRM
5. AIYA Gaming
6. AIYA ERP

CRM Systems will be removed from Integration & Automation and renamed AIYA CRM. It must appear only under White Label Products.

## Canonical Pages and URLs

- White Label Products overview: `services/white-label-products.html`
- AIYA Marketing: reuse `products/aiya-marketing.html`
- AIYA Online Order: create `products/aiya-online-order.html`
- AIYA Travel Ticketing: create `products/aiya-travel-ticketing.html`
- AIYA CRM: reuse `services/crm-systems.html`, changing its displayed title to AIYA CRM
- AIYA Gaming: create `products/aiya-gaming.html`
- AIYA ERP: create `products/aiya-erp.html`

The Services homepage selector and Services mega menu will link to these canonical pages. The existing Products navigation will not be reorganized as part of this change.

## Homepage and Navigation Behavior

The new category will use the existing selector layout and interaction pattern. It will be inserted between Integration & Automation and Growth, with visible numbering `03` and Growth renumbered to `04`.

Selecting White Label Products will show:

- A short description of customizable AIYA-built platforms
- Six directly clickable offering names
- A category overview link to `services/white-label-products.html`

The Services mega menu will show White Label Products as its own group in the same position and will expose the same six links. Existing hover, click, keyboard, desktop, and mobile behavior must remain unchanged.

## Detail Page Content

All new pages will reuse the current product-capability detail template, header, footer, language selector, mega menus, contact call to action, and responsive behavior.

### AIYA Marketing

Keep the existing page and add an interface showcase using the first supplied screenshot. The page will position the product as a customizable marketing operations platform for campaigns, customer engagement, and performance visibility.

### AIYA Online Order

Create a page for branded online ordering, menu and catalog management, customer ordering, payment connection, and order workflow integration. Add the second supplied screenshot as its interface showcase.

### AIYA Travel Ticketing

Create a page for branded route search, schedules, passenger booking, ticket payments, and operator administration. Add the third supplied screenshot as its interface showcase.

### AIYA CRM

Reuse the existing CRM page and describe configurable customer records, sales and service workflows, follow-up automation, reporting, and integrations.

### AIYA Gaming

Describe game experience design, game payment flows, player accounts, virtual coin and token ledger systems, administrative controls, and reporting. The copy will describe technology design and development without presenting AIYA as a financial institution or token issuer.

### AIYA ERP

Describe modular business operations covering orders, inventory, purchasing, finance workflows, internal approvals, reporting, and system integrations.

## Image Treatment

The three supplied screenshots will be used on their assigned detail pages without redesigning their interface content. They may be resized, compressed, and placed inside a consistent device or interface frame so the pages remain visually aligned with the existing AIYA design.

Planned assets:

- `assets/aiya-marketing-interface.jpg`
- `assets/aiya-online-order-interface.jpg`
- `assets/aiya-travel-ticketing-interface.jpg`

Other category and detail visuals will reuse the site's existing neutral platform artwork and monogram treatment; no unrelated image generation is in scope.

## Localization

All new visible copy, navigation labels, metadata, category data, detail-page content, and interface alt text will support:

- English
- Simplified Chinese
- Korean

Language switching must preserve the current page, query string, and hash behavior.

## Compatibility and Validation

The implementation must preserve relative asset and navigation paths so both the GitHub Pages project URL and root-domain hosting remain compatible.

Validation will cover:

- Category order and numbering
- All six offerings present and directly clickable
- CRM absent from Integration & Automation and present only under White Label Products
- Canonical detail pages and overview page resolve correctly
- Correct screenshot assigned to each of the first three products
- English, Chinese, and Korean labels and page content
- Desktop and mobile selector and mega-menu behavior
- No horizontal overflow or clipped content
- GitHub Pages subdirectory-safe paths

## Out of Scope

- Reorganizing the existing Products mega menu
- Building working login, ordering, ticketing, gaming, CRM, or ERP applications
- Changing the supplied screenshot interfaces
- Deploying the separate Amazon S3/CloudFront production environment
