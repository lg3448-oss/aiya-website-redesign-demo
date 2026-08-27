window.aiyaCatalog = {
  productCategories: [
    {
      key: 'payments-commerce', title: 'Payments & Commerce', kicker: 'PAYMENTS · COMMERCE', monogram: 'PAY',
      image: 'assets/aiya-commerce.png', overviewUrl: 'products/aiya-revenue.html',
      summary: 'Accept payments, build checkout experiences, and connect online and in-person commerce.',
      offerings: [
        { title: 'AIYA Payments', description: 'Online payment processing', url: 'products/aiya-revenue.html' },
        { title: 'Payment Operations', description: 'Managed payment workflows', url: 'products/aiya-revenue.html' },
        { title: 'Smart Payment Links', description: 'No-code payment collection', url: 'products/aiya-revenue.html' },
        { title: 'AIYA Checkout', description: 'Custom checkout experiences', url: 'products/aiya-commerce.html' },
        { title: 'Embedded Payment UI', description: 'Flexible payment components', url: 'products/aiya-commerce.html' },
        { title: 'Payment Method Hub', description: 'Connected payment methods', url: 'products/aiya-revenue.html' },
        { title: 'In-Person Payments', description: 'Connected point-of-sale payments', url: 'products/aiya-revenue.html' },
        { title: 'Approval Optimization', description: 'Payment acceptance improvements', url: 'products/aiya-revenue.html' },
        { title: 'Fast Checkout', description: 'Accelerated repeat checkout', url: 'products/aiya-commerce.html' },
        { title: 'Financial Data Connect', description: 'Linked financial account data', url: 'products/aiya-revenue.html' },
        { title: 'Online Storefront', description: 'Custom digital storefronts', url: 'products/aiya-commerce.html' },
        { title: 'Catalog & Inventory', description: 'Connected product operations', url: 'products/aiya-commerce.html' },
        { title: 'Customer Accounts', description: 'Customer identity and history', url: 'products/aiya-commerce.html' },
        { title: 'B2B & Global Commerce', description: 'Business buying across markets', url: 'products/aiya-commerce.html' }
      ]
    },
    {
      key: 'billing-revenue', title: 'Billing & Revenue', kicker: 'BILLING · REVENUE', monogram: 'REV',
      image: 'assets/service-audit.png', overviewUrl: 'products/aiya-revenue.html',
      summary: 'Manage recurring, usage-based, and invoice revenue with connected reporting and finance data.',
      offerings: [
        { title: 'AIYA Billing', description: 'Recurring revenue operations', url: 'products/aiya-revenue.html' },
        { title: 'Usage Billing', description: 'Metered and usage-based billing', url: 'products/aiya-revenue.html' },
        { title: 'Subscription Management', description: 'Subscription lifecycle workflows', url: 'products/aiya-revenue.html' },
        { title: 'AIYA Invoicing', description: 'One-time and recurring invoices', url: 'products/aiya-revenue.html' },
        { title: 'Tax Automation', description: 'Sales tax and VAT integrations', url: 'products/aiya-revenue.html' },
        { title: 'Revenue Accounting', description: 'Revenue recognition workflows', url: 'products/aiya-revenue.html' },
        { title: 'Revenue Analytics', description: 'Custom revenue reporting', url: 'products/aiya-revenue.html' },
        { title: 'Finance Data Pipeline', description: 'Revenue and finance data sync', url: 'products/aiya-revenue.html' }
      ]
    },
    {
      key: 'treasury-finance', title: 'Treasury & Finance', kicker: 'TREASURY · FINANCE', monogram: 'FIN',
      image: 'assets/service-audit.png', overviewUrl: 'products/aiya-revenue.html',
      summary: 'Connect payouts, treasury workflows, financial service APIs, and digital asset infrastructure to business operations.',
      offerings: [
        { title: 'Treasury Operations', description: 'Connected business finance workflows', url: 'products/aiya-revenue.html' },
        { title: 'Global Payouts', description: 'Payouts to third parties', url: 'products/aiya-revenue.html' },
        { title: 'Financial Services API Integration', description: 'Third-party financial service system connectivity', url: 'products/aiya-revenue.html' },
        { title: 'Digital Asset Infrastructure', description: 'Wallet and digital asset systems', url: 'products/aiya-revenue.html' },
        { title: 'Digital Asset Onramp', description: 'Embeddable purchase experiences', url: 'products/aiya-revenue.html' }
      ]
    },
    {
      key: 'platforms-marketplaces', title: 'Platforms & Marketplaces', kicker: 'PLATFORMS · MARKETPLACES', monogram: 'PLT',
      image: 'assets/aiya-commerce.png', overviewUrl: 'products/aiya-commerce.html',
      summary: 'Build payments, financial services, and commerce infrastructure for platforms and marketplaces.',
      offerings: [
        { title: 'AIYA Connect', description: 'Payments for platforms', url: 'products/aiya-revenue.html' },
        { title: 'Embedded Treasury', description: 'Embedded financial service workflows', url: 'products/aiya-revenue.html' },
        { title: 'Marketplace Commerce', description: 'Multi-party commerce operations', url: 'products/aiya-commerce.html' }
      ]
    },
    {
      key: 'trust-business-tools', title: 'Trust & Business Tools', kicker: 'TRUST · DATA · GROWTH', monogram: 'SYS',
      image: 'assets/service-marketing.png', overviewUrl: 'products/aiya-marketing.html',
      summary: 'Protect transactions, verify customers, connect business data, and support product growth.',
      offerings: [
        { title: 'Fraud & Risk', description: 'Fraud prevention workflows', url: 'products/aiya-revenue.html' },
        { title: 'Identity Verification', description: 'Online identity workflows', url: 'products/aiya-revenue.html' },
        { title: 'Product Strategy', description: 'Roadmaps and launch planning', url: 'services/strategy-experience.html' },
        { title: 'Business Launch Systems', description: 'Digital foundations for new ventures', url: 'services/software-engineering.html' },
        { title: 'Sustainability Integrations', description: 'Connected climate and impact data', url: 'services/integration-automation.html' },
        { title: 'Growth Strategy', description: 'Connected acquisition planning', url: 'products/aiya-marketing.html' },
        { title: 'Content & Campaigns', description: 'Creative campaign execution', url: 'products/aiya-marketing.html' },
        { title: 'AIYA Gift Card & Loyalty Points', description: 'Gift balances and repeat-customer rewards', url: 'products/aiya-marketing.html' }
      ]
    }
  ],
  products: [
    {
      key: 'commerce', group: 'Business Platforms', navCategory: 'Commerce', title: 'AIYA Commerce', url: 'products/aiya-commerce.html',
      kicker: 'COMMERCE · OPERATIONS', monogram: 'COM', image: 'assets/aiya-commerce.png',
      summary: 'A unified commerce system connecting customer experience with daily operations.',
      capabilities: ['Online Storefront', 'Custom Checkout', 'Catalog & Inventory', 'Customer Accounts', 'B2B & Global Commerce'],
      deliverables: ['Custom storefronts and headless commerce', 'Checkout and customer-account experiences', 'Catalog and inventory workflows', 'B2B pricing, purchasing, and global-market configuration'],
      useCases: ['Launching a new digital sales channel', 'Replacing disconnected commerce tools', 'Supporting B2C and B2B from one operating model']
    },
    {
      key: 'revenue', group: 'Business Platforms', navCategory: 'Operations', title: 'AIYA Revenue', url: 'products/aiya-revenue.html',
      kicker: 'PAYMENTS · REVENUE', monogram: 'REV', image: 'assets/service-audit.png',
      summary: 'Flexible payment and revenue infrastructure built around the way your business operates.',
      capabilities: ['Online & In-Person Payments', 'Billing & Subscriptions', 'Invoicing & Payment Links', 'Platform Payments & Payouts', 'Risk & Identity Workflows', 'Tax & Revenue Reporting Integrations'],
      deliverables: ['Custom checkout and payment flows', 'Subscription, usage, and invoice workflows', 'Marketplace account, split-payment, and payout integrations', 'Risk, identity, tax, and finance-data integrations'],
      useCases: ['Adding payments to software products', 'Launching recurring or usage-based revenue', 'Connecting revenue data with finance operations']
    },
    {
      key: 'marketing', group: 'AIYA Products', navCategory: 'Marketing', title: 'AIYA Marketing', url: 'products/aiya-marketing.html',
      kicker: 'GROWTH · STRATEGY', monogram: 'MKT', image: 'assets/service-marketing.png',
      summary: 'Digital strategy and creative execution connected to the technology behind the business.',
      capabilities: ['Growth Strategy', 'Content and Campaigns', 'AIYA Gift Card & Loyalty Points'],
      deliverables: ['Digital growth planning', 'Campaign creative and execution', 'Gift-card customer experiences'],
      useCases: ['Launching a new offer', 'Connecting marketing with conversion', 'Building repeat-customer programs']
    }
  ],
  services: [
    {
      key: 'strategy', navCategory: 'Plan', title: 'Strategy & Experience', url: 'services/strategy-experience.html', code: 'S/E', kicker: 'PLAN BEFORE BUILDING', image: 'assets/service-visual-strategy-experience.jpg',
      legacy: true,
      summary: 'Define the right product, customer journey, and interface before development begins.',
      capabilities: ['Product Strategy', 'UX / UI Design', 'Conversion Optimization'],
      deliverables: ['Product requirements and roadmaps', 'User flows and interface systems', 'Prototypes and conversion reviews'],
      useCases: ['Validating a new digital product', 'Redesigning a difficult customer journey', 'Aligning business and engineering teams']
    },
    {
      key: 'engineering', navCategory: 'Build', title: 'Software Engineering', url: 'services/software-engineering.html', code: 'DEV', kicker: 'PURPOSE-BUILT SOFTWARE', image: 'assets/service-visual-software-engineering.jpg',
      summary: 'Plan, design, build, and strengthen reliable digital products on one engineering foundation.',
      capabilities: ['Product & Experience Design', 'Custom Software Development', 'Web & Mobile Development', 'Ecommerce Platform Development', 'Enterprise & Cloud Platforms', 'Performance & Reliability'],
      deliverables: ['Product strategy and experience systems', 'Responsive web and mobile applications', 'Scalable cloud and enterprise platforms'],
      useCases: ['Launching a new digital product', 'Modernizing customer and internal systems', 'Improving platform scale and reliability']
    },
    {
      key: 'integration', navCategory: 'Build', title: 'Integration & Automation', url: 'services/integration-automation.html', code: 'API', kicker: 'CONNECTED OPERATIONS', image: 'assets/service-visual-integration-automation.jpg',
      summary: 'Connect systems and automate repetitive work across the business.',
      capabilities: ['API, Data & Payment Integration', 'AI & Workflow Automation', 'CRM Systems'],
      deliverables: ['Connected APIs and synchronized business data', 'AI-assisted and rule-based workflows', 'Configured customer relationship platforms'],
      useCases: ['Connecting disconnected platforms', 'Reducing repetitive back-office work', 'Organizing sales and customer operations']
    },
    {
      key: 'cloud', navCategory: 'Operate & Grow', title: 'Cloud & Operations', url: 'services/cloud-operations.html', code: 'CLD', kicker: 'READY TO SCALE', image: 'assets/service-visual-cloud-operations.jpg',
      legacy: true,
      summary: 'Modernize the foundation behind critical products and services.',
      capabilities: ['Cloud Architecture', 'Platform Modernization', 'Performance & Reliability'],
      deliverables: ['Cloud-ready application architecture', 'Legacy platform modernization', 'Performance, deployment, and observability improvements'],
      useCases: ['Preparing a product for growth', 'Reducing fragile infrastructure', 'Improving deployment and operational visibility']
    },
    {
      key: 'growth', navCategory: 'Operate & Grow', title: 'Growth', url: 'services/growth.html', code: 'GRW', kicker: 'CONNECTED GROWTH', image: 'assets/service-visual-growth-marketing.jpg',
      summary: 'Bring brand, content, and campaigns together around measurable customer action.',
      capabilities: ['Digital Marketing', 'SEO & Content', 'Campaign Development'],
      deliverables: ['Channel and campaign strategy', 'Search-focused content systems', 'Creative production and campaign execution'],
      useCases: ['Building qualified demand', 'Improving organic discovery', 'Coordinating a product or market launch']
    }
  ],
  solutionCategories: [
    {
      key: 'industries', title: 'By Industry', overviewUrl: 'solutions.html#industries',
      offerings: [
        { key: 'food-hospitality', title: 'Food & Hospitality', description: 'Restaurants, cafes, hotels, venues, and guest experiences.', url: 'solutions/food-hospitality.html', image: 'assets/product-visual-payments-commerce.jpg', headline: 'Connect every guest moment from order to operation.', overview: 'Bring ordering, payments, loyalty, and service workflows into one coordinated experience for food and hospitality teams.', capabilities: ['Omnichannel ordering and booking', 'Connected payments and loyalty', 'Location and service integrations'], outcomes: ['Reduce friction across guest journeys', 'Give teams a shared operational view', 'Support repeatable multi-location growth'], connected: [{ title: 'AIYA Payments', url: 'products/aiya-payments.html' }, { title: 'Online Storefront', url: 'products/online-storefront.html' }, { title: 'CRM Systems', url: 'services/crm-systems.html' }] },
        { key: 'retail', title: 'Retail', description: 'Grocery, convenience, specialty, and consumer retail.', url: 'solutions/retail.html', image: 'assets/product-visual-platforms-marketplaces.jpg', headline: 'Create one retail experience across every channel.', overview: 'Connect storefronts, checkout, inventory signals, and customer engagement without treating online and in-store activity as separate businesses.', capabilities: ['Unified online and in-store commerce', 'Catalog, order, and inventory connections', 'Customer accounts and engagement'], outcomes: ['Deliver consistent customer journeys', 'Reduce disconnected retail operations', 'Turn commerce data into useful action'], connected: [{ title: 'In-Person Payments', url: 'products/in-person-payments.html' }, { title: 'Catalog & Inventory', url: 'products/catalog-inventory.html' }, { title: 'Customer Accounts', url: 'products/customer-accounts.html' }] },
        { key: 'beauty-wellness-fitness', title: 'Beauty, Wellness & Fitness', description: 'Salons, spas, studios, gyms, and membership businesses.', url: 'solutions/beauty-wellness-fitness.html', image: 'assets/service-visual-growth-marketing.jpg', headline: 'Make every appointment, membership, and visit feel connected.', overview: 'Combine booking-ready experiences, recurring revenue, customer relationships, and targeted growth tools for service-based wellness businesses.', capabilities: ['Booking and customer experiences', 'Membership and recurring billing', 'CRM and lifecycle engagement'], outcomes: ['Make repeat visits easier', 'Simplify membership operations', 'Build stronger customer relationships'], connected: [{ title: 'Subscription Management', url: 'products/subscription-management.html' }, { title: 'CRM Systems', url: 'services/crm-systems.html' }, { title: 'Digital Marketing', url: 'services/digital-marketing.html' }] },
        { key: 'healthcare-education', title: 'Healthcare & Education', description: 'Clinics, care providers, schools, and training organizations.', url: 'solutions/healthcare-education.html', image: 'assets/service-visual-software-engineering.jpg', headline: 'Build clearer digital services for people and teams.', overview: 'Create accessible portals, payment flows, and connected administrative workflows for organizations managing sensitive, high-touch experiences.', capabilities: ['Accessible portals and mobile experiences', 'Billing and payment workflows', 'Administrative system integration'], outcomes: ['Reduce manual coordination', 'Improve access to essential services', 'Connect front-office and back-office work'], connected: [{ title: 'Web & Mobile Development', url: 'services/web-mobile-development.html' }, { title: 'AIYA Billing', url: 'products/aiya-billing.html' }, { title: 'API, Data & Payment Integration', url: 'services/api-data-integration.html' }] },
        { key: 'automotive', title: 'Automotive', description: 'Repair, car care, dealerships, parts, and EV services.', url: 'solutions/automotive.html', image: 'assets/service-visual-integration-automation.jpg', headline: 'Connect service operations from booking through payment.', overview: 'Bring customer scheduling, work status, payments, and follow-up into a smoother operating flow for automotive businesses.', capabilities: ['Service booking and status experiences', 'Payments and invoicing', 'Customer and system connectivity'], outcomes: ['Shorten service handoffs', 'Improve customer visibility', 'Keep customer history connected'], connected: [{ title: 'AIYA Invoicing', url: 'products/aiya-invoicing.html' }, { title: 'CRM Systems', url: 'services/crm-systems.html' }, { title: 'AI & Workflow Automation', url: 'services/ai-workflow-automation.html' }] },
        { key: 'home-field-services', title: 'Home & Field Services', description: 'HVAC, plumbing, electrical, construction, and mobile teams.', url: 'solutions/home-field-services.html', image: 'assets/service-visual-cloud-operations.jpg', headline: 'Keep field teams, customers, and office workflows in sync.', overview: 'Connect scheduling, mobile work, estimates, payments, and customer communication around each service job.', capabilities: ['Scheduling and dispatch workflows', 'Mobile tools for field teams', 'Quotes, invoices, and payments'], outcomes: ['Reduce administrative handoffs', 'Give teams current job information', 'Create a more transparent customer experience'], connected: [{ title: 'Web & Mobile Development', url: 'services/web-mobile-development.html' }, { title: 'Payment Links', url: 'products/smart-payment-links.html' }, { title: 'CRM Systems', url: 'services/crm-systems.html' }] },
        { key: 'professional-services', title: 'Professional Services', description: 'Accounting, legal, insurance, real estate, and consulting.', url: 'solutions/professional-services.html', image: 'assets/product-visual-billing-revenue.jpg', headline: 'Turn client work into a clearer digital experience.', overview: 'Bring client intake, collaboration, billing, documents, and relationship management into connected professional workflows.', capabilities: ['Client portals and intake', 'Project and document workflows', 'Billing and relationship management'], outcomes: ['Make client communication easier', 'Reduce repetitive administrative work', 'Improve visibility from inquiry to invoice'], connected: [{ title: 'Enterprise & Cloud Platforms', url: 'services/enterprise-cloud-platforms.html' }, { title: 'AIYA Invoicing', url: 'products/aiya-invoicing.html' }, { title: 'CRM Systems', url: 'services/crm-systems.html' }] },
        { key: 'entertainment', title: 'Entertainment', description: 'Arcades, theaters, recreation, ticketing, and venues.', url: 'solutions/entertainment.html', image: 'assets/product-visual-payments-commerce.jpg', headline: 'Create faster access and richer on-site experiences.', overview: 'Connect ticketing, memberships, in-person payments, and customer engagement for entertainment and recreation businesses.', capabilities: ['Ticketing and digital access', 'On-site commerce and payments', 'Membership and audience engagement'], outcomes: ['Reduce entry and checkout friction', 'Create new recurring revenue options', 'Understand engagement across visits'], connected: [{ title: 'In-Person Payments', url: 'products/in-person-payments.html' }, { title: 'Subscription Management', url: 'products/subscription-management.html' }, { title: 'Content & Campaigns', url: 'products/content-campaigns.html' }] },
        { key: 'manufacturing-wholesale', title: 'Manufacturing & Wholesale', description: 'Manufacturers, distributors, warehousing, and logistics.', url: 'solutions/manufacturing-wholesale.html', image: 'assets/service-visual-cloud-operations.jpg', headline: 'Connect commercial and operational systems end to end.', overview: 'Modernize B2B ordering, inventory, data exchange, and operational visibility across manufacturing and wholesale workflows.', capabilities: ['B2B ordering and account experiences', 'Inventory and system integration', 'Operational data and automation'], outcomes: ['Reduce manual order handling', 'Improve partner and inventory visibility', 'Build a foundation for scalable operations'], connected: [{ title: 'B2B Global Commerce', url: 'products/b2b-global-commerce.html' }, { title: 'API, Data & Payment Integration', url: 'services/api-data-integration.html' }, { title: 'Finance Data Pipeline', url: 'products/finance-data-pipeline.html' }] }
      ]
    },
    {
      key: 'use-cases', title: 'By Use Case', overviewUrl: 'solutions.html#use-cases',
      offerings: [
        { key: 'digital-agentic-commerce', title: 'Digital & Agentic Commerce', description: 'Connect online buying with AI-assisted discovery and action.', url: 'solutions/digital-agentic-commerce.html', image: 'assets/product-visual-payments-commerce.jpg', headline: 'Turn discovery into a connected path to purchase.', overview: 'Bring storefronts, AI-assisted product discovery, checkout, payments, and fulfillment data into a commerce experience built for emerging customer journeys.', capabilities: ['Digital storefront and product discovery', 'AI-assisted commerce experiences', 'Checkout, payment, and fulfillment connections'], outcomes: ['Reduce friction from intent to purchase', 'Keep commerce data connected', 'Prepare customer journeys for new interfaces'], connected: [{ title: 'Online Storefront', url: 'products/online-storefront.html' }, { title: 'AIYA Checkout', url: 'products/aiya-checkout.html' }, { title: 'Customer Accounts', url: 'products/customer-accounts.html' }] },
        { key: 'crypto', title: 'Crypto', description: 'Build digital asset payment and infrastructure experiences.', url: 'solutions/crypto.html', image: 'assets/product-visual-treasury-finance.jpg', headline: 'Connect digital assets with practical product experiences.', overview: 'Design and integrate crypto onramps, digital asset workflows, and payment experiences around a clear customer and operational model.', capabilities: ['Fiat-to-crypto onboarding flows', 'Digital asset infrastructure integration', 'Payment and wallet experience design'], outcomes: ['Make complex flows easier to understand', 'Connect digital assets to existing products', 'Create a flexible foundation for future capabilities'], connected: [{ title: 'Digital Asset Onramp', url: 'products/digital-asset-onramp.html' }, { title: 'Digital Asset Infrastructure', url: 'products/digital-asset-infrastructure.html' }, { title: 'Identity Verification', url: 'products/identity-verification.html' }] },
        { key: 'embedded-finance-payments', title: 'Embedded Finance & Payments', description: 'Add payments and financial capabilities inside digital products.', url: 'solutions/embedded-finance-payments.html', image: 'assets/product-visual-platforms-marketplaces.jpg', headline: 'Make financial capabilities part of the product experience.', overview: 'Embed payment acceptance, connected accounts, payouts, and financial workflows inside the software customers already use.', capabilities: ['Embedded payment experiences', 'Connected account and payout flows', 'Financial feature integration'], outcomes: ['Keep users inside one product journey', 'Create new platform capabilities', 'Connect money movement with operations'], connected: [{ title: 'AIYA Connect', url: 'products/aiya-connect.html' }, { title: 'Embedded Treasury', url: 'products/embedded-treasury.html' }, { title: 'Global Payouts', url: 'products/global-payouts.html' }] },
        { key: 'finance-automation-management', title: 'Finance Automation & Management', description: 'Connect billing, reporting, reconciliation, and financial visibility.', url: 'solutions/finance-automation-management.html', image: 'assets/product-visual-billing-revenue.jpg', headline: 'Replace fragmented finance work with connected flows.', overview: 'Bring billing, invoicing, tax, reporting, and data movement together so finance teams spend less time reconciling disconnected systems.', capabilities: ['Billing and invoice automation', 'Tax and revenue workflows', 'Financial data and reporting connections'], outcomes: ['Reduce repetitive finance tasks', 'Improve operational visibility', 'Create more consistent reporting inputs'], connected: [{ title: 'AIYA Billing', url: 'products/aiya-billing.html' }, { title: 'Revenue Accounting', url: 'products/revenue-accounting.html' }, { title: 'Finance Data Pipeline', url: 'products/finance-data-pipeline.html' }] },
        { key: 'global-business', title: 'Global Business', description: 'Support connected commerce and operations across markets.', url: 'solutions/global-business.html', image: 'assets/product-visual-treasury-finance.jpg', headline: 'Build operations that can move across markets.', overview: 'Connect international commerce, payouts, business data, and platform workflows around the requirements of a growing global operation.', capabilities: ['Cross-market commerce experiences', 'Global payout and treasury workflows', 'Connected operational data'], outcomes: ['Support expansion with fewer disconnected tools', 'Create clearer cross-market operations', 'Adapt customer and partner experiences by market'], connected: [{ title: 'B2B Global Commerce', url: 'products/b2b-global-commerce.html' }, { title: 'Global Payouts', url: 'products/global-payouts.html' }, { title: 'Treasury Operations', url: 'products/treasury-operations.html' }] },
        { key: 'marketplaces', title: 'Marketplaces', description: 'Connect buyers, sellers, payments, and multi-party operations.', url: 'solutions/marketplaces.html', image: 'assets/product-visual-platforms-marketplaces.jpg', headline: 'Coordinate every side of a marketplace.', overview: 'Design onboarding, transaction, payout, and administrative experiences for businesses that connect multiple participant groups.', capabilities: ['Seller and provider onboarding', 'Multi-party payment and payout flows', 'Marketplace operations and visibility'], outcomes: ['Make participation easier to manage', 'Connect transactions with platform workflows', 'Support new marketplace revenue models'], connected: [{ title: 'Marketplace Commerce', url: 'products/marketplace-commerce.html' }, { title: 'AIYA Connect', url: 'products/aiya-connect.html' }, { title: 'Financial Services API Integration', url: 'products/financial-services-api-integration.html' }] },
        { key: 'platforms-saas', title: 'Platforms & SaaS', description: 'Build, monetize, and operate scalable software platforms.', url: 'solutions/platforms-saas.html', image: 'assets/service-visual-software-engineering.jpg', headline: 'Build a platform customers can grow with.', overview: 'Combine scalable software engineering, subscription revenue, embedded payments, and connected operations for SaaS and platform businesses.', capabilities: ['Scalable platform engineering', 'Subscription and usage billing', 'Embedded product integrations'], outcomes: ['Launch new platform capabilities faster', 'Create flexible monetization models', 'Keep product and operational systems connected'], connected: [{ title: 'Enterprise & Cloud Platforms', url: 'services/enterprise-cloud-platforms.html' }, { title: 'Usage Billing', url: 'products/usage-billing.html' }, { title: 'Subscription Management', url: 'products/subscription-management.html' }] }
      ]
    }
  ]
};

window.getCatalogItem = function getCatalogItem(kind, key) {
  const collection = kind === 'product' ? window.aiyaCatalog.products : window.aiyaCatalog.services;
  return collection.find(item => item.key === key);
};
