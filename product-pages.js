(function initializeProductPages() {
  const profiles = {
    'AIYA Payments': ['aiya-payments', 'Accept online and in-app payments through flexible flows built around your business.', ['Online and in-app payments', 'Flexible payment flows', 'Connected transaction data']],
    'Payment Operations': ['payment-operations', 'Bring payment monitoring, exceptions, refunds, and reporting into one operational workflow.', ['Payment monitoring', 'Refund and dispute workflows', 'Operational reporting']],
    'Smart Payment Links': ['smart-payment-links', 'Create shareable payment experiences for one-time purchases, recurring charges, or customer-selected amounts.', ['Shareable payment pages', 'One-time and recurring collection', 'QR and channel distribution']],
    'AIYA Checkout': ['aiya-checkout', 'Launch a branded checkout that supports the way your customers buy.', ['Hosted or embedded checkout', 'Branded purchase flows', 'Responsive customer experience']],
    'Embedded Payment UI': ['embedded-payment-ui', 'Add modular payment components to websites and applications without rebuilding the full payment experience.', ['Modular payment fields', 'Brand-level styling', 'Responsive embedded layouts']],
    'Payment Method Hub': ['payment-method-hub', 'Present relevant payment options through a connected payment-method layer.', ['Payment-method configuration', 'Customer option routing', 'Channel-ready integrations']],
    'In-Person Payments': ['in-person-payments', 'Connect countertop, mobile, and assisted payments with the rest of your commerce operation.', ['Point-of-sale payments', 'Mobile payment workflows', 'Online and offline data connection']],
    'Approval Optimization': ['approval-optimization', 'Improve payment acceptance with cleaner data, smarter routing, and structured retry workflows.', ['Payment data quality', 'Retry and recovery logic', 'Acceptance monitoring']],
    'Fast Checkout': ['fast-checkout', 'Help returning customers complete purchases faster with saved preferences and streamlined steps.', ['Returning-customer checkout', 'Saved payment preferences', 'Reduced purchase friction']],
    'Financial Data Connect': ['financial-data-connect', 'Connect customer-authorized financial account data to products and internal workflows.', ['Account connection', 'Permission-based financial data', 'Data-driven product workflows']],
    'Online Storefront': ['online-storefront', 'Create a digital storefront designed around your catalog, customers, and operating model.', ['Custom storefront experience', 'Catalog presentation', 'Commerce system connection']],
    'Catalog & Inventory': ['catalog-inventory', 'Keep product information and inventory activity connected across selling channels.', ['Catalog management', 'Inventory visibility', 'Channel synchronization']],
    'Customer Accounts': ['customer-accounts', 'Give customers a secure place to manage profiles, orders, preferences, and purchasing history.', ['Customer profiles', 'Order history', 'Account and preference controls']],
    'B2B & Global Commerce': ['b2b-global-commerce', 'Support business purchasing and multi-market selling through configurable commerce workflows.', ['Business buying workflows', 'Market and currency configuration', 'Customer-specific commerce rules']],
    'AIYA Billing': ['aiya-billing', 'Operate recurring revenue with configurable pricing, collection, and customer billing workflows.', ['Recurring billing', 'Pricing configuration', 'Revenue operations']],
    'Usage Billing': ['usage-billing', 'Turn measured product activity into clear, accurate, and configurable customer charges.', ['Usage measurement', 'Metered pricing', 'Billing data connection']],
    'Subscription Management': ['subscription-management', 'Manage subscription changes, renewals, access, and customer lifecycle events.', ['Plan lifecycle management', 'Renewal workflows', 'Customer subscription controls']],
    'AIYA Invoicing': ['aiya-invoicing', 'Create and manage one-time or recurring invoices connected to payment and finance workflows.', ['Invoice creation', 'Collection workflows', 'Payment status tracking']],
    'Tax Automation': ['tax-automation', 'Connect tax calculation and reporting workflows to digital transactions and billing systems.', ['Tax calculation integration', 'Transaction tax data', 'Reporting workflows']],
    'Revenue Accounting': ['revenue-accounting', 'Organize transaction and contract data for more consistent revenue accounting workflows.', ['Revenue scheduling', 'Transaction reconciliation', 'Accounting data connection']],
    'Revenue Analytics': ['revenue-analytics', 'Build clear revenue reporting from connected payments, billing, and customer data.', ['Custom revenue reports', 'Metric definitions', 'Decision-ready dashboards']],
    'Finance Data Pipeline': ['finance-data-pipeline', 'Move structured revenue and transaction data into finance and analytics systems.', ['Automated data sync', 'Warehouse-ready exports', 'Finance system connection']],
    'Treasury Operations': ['treasury-operations', 'Connect balances, cash movement, approvals, and finance workflows across the business.', ['Balance visibility', 'Money movement workflows', 'Treasury controls']],
    'Global Payouts': ['global-payouts', 'Send funds to sellers, contractors, and partners through configurable payout workflows.', ['Recipient onboarding', 'Payout scheduling', 'Payout status tracking']],
    'Business Financing': ['business-financing', 'Integrate business financing experiences into existing customer and operational systems.', ['Financing application flows', 'Offer presentation', 'Repayment data connection']],
    'Digital Asset Infrastructure': ['digital-asset-infrastructure', 'Build wallet, digital-asset, and payment experiences on connected infrastructure.', ['Wallet experiences', 'Digital asset movement', 'Operational controls']],
    'Digital Asset Onramp': ['digital-asset-onramp', 'Add an embedded purchase path that connects customers to supported digital assets.', ['Embedded purchase flow', 'Customer verification connection', 'Transaction status workflows']],
    'AIYA Connect': ['aiya-connect', 'Enable platforms to onboard businesses, accept payments, and route funds between participants.', ['Connected account onboarding', 'Platform payments', 'Multi-party money movement']],
    'Platform Financing': ['platform-financing', 'Offer financing experiences to eligible businesses through a platform-branded workflow.', ['Embedded financing experience', 'Business onboarding', 'Offer and repayment visibility']],
    'Embedded Treasury': ['embedded-treasury', 'Add branded balance, movement, and financial workflow capabilities inside a platform.', ['Embedded financial accounts', 'Balance and transfer workflows', 'Platform-level controls']],
    'Branded Customer Credit Program': ['card-issuing', 'Give customers a branded credit account they can use to purchase from your business, with configurable limits and account controls.', ['Branded customer credit accounts', 'Credit limits and purchase controls', 'Customer account lifecycle management']],
    'Marketplace Commerce': ['marketplace-commerce', 'Coordinate buyers, sellers, orders, fees, and payouts through one marketplace operating model.', ['Seller onboarding', 'Multi-party orders', 'Fees and payout coordination']],
    'Fraud & Risk': ['fraud-risk', 'Identify suspicious activity and give teams configurable tools to review and manage transaction risk.', ['Risk signals', 'Review workflows', 'Configurable transaction rules']],
    'Identity Verification': ['identity-verification', 'Add identity checks to onboarding, account access, and higher-risk customer actions.', ['Document and identity workflows', 'Verification status handling', 'Risk-based customer steps']],
    'Product Strategy': ['product-strategy', 'Define product direction, customer journeys, and delivery priorities before development begins.', ['Product roadmap', 'Customer journey definition', 'Delivery planning']],
    'Business Launch Systems': ['business-launch-systems', 'Bring the essential digital systems for a new business or offering into one coordinated launch.', ['Launch-ready web presence', 'Core operational systems', 'Connected customer workflows']],
    'Sustainability Integrations': ['sustainability-integrations', 'Connect climate and impact data to products, reporting, and customer experiences.', ['Impact data connection', 'Reporting workflows', 'Customer-facing integrations']],
    'Growth Strategy': ['growth-strategy', 'Turn business goals into a focused acquisition, retention, and conversion plan.', ['Growth planning', 'Channel priorities', 'Conversion roadmap']],
    'Content & Campaigns': ['content-campaigns', 'Plan and deliver coordinated content and campaigns across the channels your customers use.', ['Campaign planning', 'Creative production', 'Channel coordination']],
    'AIYA Gift Card & Loyalty Points': ['aiya-gift-card', 'Combine branded gift-card balances with a loyalty points program that rewards repeat purchases and lets customers earn and redeem value.', ['Gift-card purchase and balance', 'Loyalty points earning and redemption', 'Customer rewards program connection']]
  };

  const categoryCopy = {
    'Payments & Commerce': {
      deliverables: ['Branded payment and commerce experiences', 'Connections to customer and operating systems', 'Reporting and exception workflows'],
      useCases: ['Launching a new sales channel', 'Replacing disconnected payment tools', 'Connecting online and in-person commerce']
    },
    'Billing & Revenue': {
      deliverables: ['Configured pricing and revenue workflows', 'Customer-facing billing experiences', 'Finance and reporting connections'],
      useCases: ['Launching recurring or usage revenue', 'Improving billing operations', 'Connecting revenue data with finance']
    },
    'Treasury & Finance': {
      deliverables: ['Configured financial workflows', 'Business-system integrations', 'Operational visibility and controls'],
      useCases: ['Coordinating complex money movement', 'Adding financial capabilities', 'Improving finance operations']
    },
    'Platforms & Marketplaces': {
      deliverables: ['Platform-branded user experiences', 'Account and transaction workflows', 'Operational tools for platform teams'],
      useCases: ['Launching a software platform', 'Building a multi-party marketplace', 'Embedding financial capabilities']
    },
    'Trust & Business Tools': {
      deliverables: ['Business-specific workflow design', 'System and data integrations', 'Clear team operating tools'],
      useCases: ['Reducing operational risk', 'Launching a new customer experience', 'Connecting growth with business systems']
    }
  };

  const categoryVisuals = {
    'Payments & Commerce': '/assets/product-visual-payments-commerce.jpg',
    'Billing & Revenue': '/assets/product-visual-billing-revenue.jpg',
    'Treasury & Finance': '/assets/product-visual-treasury-finance.jpg',
    'Platforms & Marketplaces': '/assets/product-visual-platforms-marketplaces.jpg',
    'Trust & Business Tools': '/assets/product-visual-trust-business-tools.jpg'
  };

  const slugMonogram = slug => slug.split('-').map(part => part[0]).join('').slice(0, 3).toUpperCase();

  window.aiyaCatalog.productCategories.forEach(category => {
    category.offerings.forEach(offering => {
      const profile = profiles[offering.title];
      if (!profile) return;
      const [key, summary, capabilities] = profile;
      const shared = categoryCopy[category.title];
      Object.assign(offering, {
        key,
        url: `/products/${key}.html`,
        navCategory: category.title,
        kicker: category.kicker,
        monogram: slugMonogram(key),
        image: categoryVisuals[category.title] || category.image,
        summary,
        capabilities,
        deliverables: shared.deliverables,
        useCases: shared.useCases
      });
    });
  });

  const originalGetCatalogItem = window.getCatalogItem;
  window.getCatalogItem = function getCatalogItem(kind, key) {
    if (kind === 'offering') {
      return window.aiyaCatalog.productCategories
        .flatMap(category => category.offerings)
        .find(item => item.key === key);
    }
    return originalGetCatalogItem(kind, key);
  };
})();
