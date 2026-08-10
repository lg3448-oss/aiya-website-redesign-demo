# AIYA Product and Service Detail Pages Design

## Objective

Remove AIYAPOS from the public website and reorganize the existing Products and Services sections into a clear two-level information architecture. The homepage remains an overview. Every listed product and service links directly to its own static detail page.

## Confirmed Decisions

- Keep the current homepage layout, visual language, responsive behavior, and vertical scene structure.
- Remove all public AIYAPOS entries and links from the homepage, mega menu, JavaScript data, and tests.
- Keep AIYAPad, AIYARobot, AIYAScan, and AIYA Marketing. Keep AIYA Gift Card nested under AIYA Marketing.
- Add AIYA Commerce and AIYA Revenue as packaged business platforms.
- Replace the current flat service list with five delivery-capability categories.
- Create six Product detail pages and five Service detail pages as separate static HTML files.
- Use English public-facing copy to match the existing website.
- Do not mention Shopify or Stripe anywhere in public-facing content and do not imply an official partnership.

## Positioning Boundary

AIYA is presented as a software design, development, and integration company. Commerce and revenue capabilities may cover software comparable to leading commerce and payment platforms, but the site must not claim that AIYA itself provides regulated banking, lending, card-network, tax-filing, identity-verification, or money-transmission services.

Where a capability depends on regulated infrastructure, the copy describes custom software, workflows, and third-party integrations. It does not promise that AIYA is the regulated provider.

## Information Architecture

### Products

#### Business Platforms

1. **AIYA Commerce** — `/products/aiya-commerce.html`
   - Online Storefront
   - Custom Checkout
   - Catalog & Inventory
   - Orders & Fulfillment
   - Customer Accounts
   - B2B & Global Commerce

2. **AIYA Revenue** — `/products/aiya-revenue.html`
   - Online & In-Person Payments
   - Billing & Subscriptions
   - Invoicing & Payment Links
   - Platform Payments & Payouts
   - Risk & Identity Workflows
   - Tax & Revenue Reporting Integrations

#### AIYA Products

3. **AIYAPad** — `/products/aiya-pad.html`
   - Table-Side Ordering
   - Menu and Order Access
   - Staff Workflow Support

4. **AIYARobot** — `/products/aiya-robot.html`
   - Delivery Automation
   - Route and Task Support
   - Service Workflow Integration

5. **AIYAScan** — `/products/aiya-scan.html`
   - QR Menu
   - Self-Service Ordering
   - Order and Payment Flow

6. **AIYA Marketing** — `/products/aiya-marketing.html`
   - Growth Strategy
   - Content and Campaigns
   - AIYA Gift Card

### Services

1. **Strategy & Experience** — `/services/strategy-experience.html`
   - Product Strategy
   - UX / UI Design
   - Conversion Optimization

2. **Software Engineering** — `/services/software-engineering.html`
   - Web Development
   - Mobile App Development
   - Enterprise Platforms

3. **Integration & Automation** — `/services/integration-automation.html`
   - API & System Integration
   - Data Connectivity
   - AI & Workflow Automation

4. **Cloud & Operations** — `/services/cloud-operations.html`
   - Cloud Architecture
   - Platform Modernization
   - Performance & Reliability

5. **Growth** — `/services/growth.html`
   - Digital Marketing
   - SEO & Content
   - Campaign Development

## Homepage Design

### Products Section

The existing two-column composition remains unchanged:

- The left stage continues to show the active/featured product visual, name, short description, and monogram.
- The right selector becomes a grouped list of direct links.
- Two small group labels create hierarchy: `BUSINESS PLATFORMS` and `AIYA PRODUCTS`.
- Clicking any product link navigates directly to its detail page. It does not require a second click.
- AIYA Commerce is the default featured item shown in the left stage.
- AIYA Marketing retains a visually indented `AIYA Gift Card` child label.

### Services Section

The existing two-column composition remains unchanged:

- The left selector becomes five direct service links.
- The right stage shows Strategy & Experience as the default summary.
- Each summary includes three short sub-capabilities to make the second level visible before navigation.
- Clicking any service link navigates directly to its detail page.

### Mega Menu

- Products use the same two group labels and six links as the homepage.
- Services use the same five category links as the homepage.
- Each item links directly to its corresponding detail page.
- Keyboard, hover, touch, Escape, and mobile-menu behavior remain consistent with the current implementation.

## Detail Page Template

All eleven pages share one visual system and content structure while retaining unique titles, descriptions, capabilities, metadata, and imagery.

1. **Shared header** — existing AIYA branding and primary navigation.
2. **Breadcrumb/back link** — returns to the matching homepage section.
3. **Hero** — category eyebrow, page title, concise value proposition, and existing-style visual treatment.
4. **Capabilities** — three to six numbered capabilities with short explanations.
5. **What We Build** — concrete development deliverables, written as software and integration work.
6. **Best For** — representative business situations, not invented customer claims.
7. **Contact CTA** — links to the existing contact section on the homepage.
8. **Shared footer** — consistent with the current site.

The template is implemented with shared CSS and shared JavaScript. Each HTML page remains independently indexable and has a unique `<title>` and meta description.

## Visual Direction

- Preserve the existing cream background, orange accent, strong typography, lines, monograms, and restrained technical imagery.
- Add hierarchy through small uppercase group labels, numbering, indentation, and spacing rather than new card-heavy layouts.
- Reuse appropriate existing assets where possible. New imagery is not required for the first implementation.
- Maintain readable type sizes and clear keyboard focus states.
- On mobile, two-column layouts stack in the same order currently used by the homepage.

## Content Rules

- Write concise, original English copy rather than adapting official source sentences.
- Do not publish third-party brand names, performance statistics, customer counts, uptime claims, or unsupported compliance claims.
- Keep Product copy focused on packaged outcomes and modules.
- Keep Service copy focused on the work AIYA performs.
- Avoid repeating the same capability as both a Product module and a Service title.
- When payment, tax, identity, or payout functionality requires external regulated providers, describe AIYA's role as development and integration.

## Implementation Scope

Expected public files and code areas:

- `index.html` — grouped homepage links and removal of AIYAPOS.
- `script.js` — revised Product and Service registries, direct-link mega-menu behavior, and no AIYAPOS data.
- `styles.css` — small hierarchy styles plus shared detail-page styles.
- `products/*.html` — six Product detail pages.
- `services/*.html` — five Service detail pages.
- Existing PowerShell tests — updated expectations for the new structure and URLs.

The unused `assets/product-pos.png` file is not deleted as part of this change. Removing an asset is unnecessary for the public-site requirement and would be a separate cleanup action.

## Validation Criteria

The implementation is complete when:

1. No rendered navigation, homepage section, detail page, or JavaScript registry contains AIYAPOS.
2. The homepage contains exactly six Product links and five Service links in the approved order.
3. All eleven links resolve to existing detail pages without broken assets.
4. The mega menu and homepage use identical names and destinations.
5. Every detail page has unique metadata, a visible page heading, capabilities, deliverables, use cases, and contact CTA.
6. No public page mentions Shopify or Stripe.
7. Desktop and mobile layouts have no clipping, overlap, or unreadable hierarchy.
8. Keyboard navigation and existing mega-menu interactions continue to work.
9. Existing and updated automated checks pass.

## Research Basis

The capability taxonomy was informed by current official commerce and payment-platform materials, including enterprise commerce, B2B, storefront, checkout, global-market, payments, billing, invoicing, platform-payment, risk, identity, tax, and reporting capabilities. These sources guide scope only; their brand names and wording will not appear in the AIYA website.

