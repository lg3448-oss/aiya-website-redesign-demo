window.aiyaCatalog = {
  products: [
    {
      key: 'commerce', group: 'Business Platforms', title: 'AIYA Commerce', url: 'products/aiya-commerce.html',
      kicker: 'COMMERCE · OPERATIONS', monogram: 'COM', image: 'assets/aiya-commerce.png',
      summary: 'A unified commerce system connecting customer experience with daily operations.',
      capabilities: ['Online Storefront', 'Custom Checkout', 'Catalog & Inventory', 'Orders & Fulfillment', 'Customer Accounts', 'B2B & Global Commerce'],
      deliverables: ['Custom storefronts and headless commerce', 'Checkout and customer-account experiences', 'Catalog, inventory, order, and fulfillment workflows', 'B2B pricing, purchasing, and global-market configuration'],
      useCases: ['Launching a new digital sales channel', 'Replacing disconnected commerce tools', 'Supporting B2C and B2B from one operating model']
    },
    {
      key: 'revenue', group: 'Business Platforms', title: 'AIYA Revenue', url: 'products/aiya-revenue.html',
      kicker: 'PAYMENTS · REVENUE', monogram: 'REV', image: 'assets/service-audit.png',
      summary: 'Flexible payment and revenue infrastructure built around the way your business operates.',
      capabilities: ['Online & In-Person Payments', 'Billing & Subscriptions', 'Invoicing & Payment Links', 'Platform Payments & Payouts', 'Risk & Identity Workflows', 'Tax & Revenue Reporting Integrations'],
      deliverables: ['Custom checkout and payment flows', 'Subscription, usage, and invoice workflows', 'Marketplace account, split-payment, and payout integrations', 'Risk, identity, tax, and finance-data integrations'],
      useCases: ['Adding payments to software products', 'Launching recurring or usage-based revenue', 'Connecting revenue data with finance operations']
    },
    {
      key: 'pad', group: 'AIYA Products', title: 'AIYAPad', url: 'products/aiya-pad.html',
      kicker: 'SERVICE · MOBILITY', monogram: 'PAD', image: 'assets/product-pad.png',
      summary: 'Flexible table-side tools designed for faster hospitality service.',
      capabilities: ['Table-Side Ordering', 'Menu and Order Access', 'Staff Workflow Support'],
      deliverables: ['Branded tablet ordering interfaces', 'Menu and order-system connections', 'Role-based staff workflows'],
      useCases: ['Full-service restaurants', 'High-volume hospitality teams', 'Businesses modernizing table service']
    },
    {
      key: 'robot', group: 'AIYA Products', title: 'AIYARobot', url: 'products/aiya-robot.html',
      kicker: 'AUTOMATION · SERVICE', monogram: 'BOT', image: 'assets/product-robot.png',
      summary: 'Automated delivery support that helps teams focus attention where customers need it.',
      capabilities: ['Delivery Automation', 'Route and Task Support', 'Service Workflow Integration'],
      deliverables: ['Robot workflow configuration', 'Dispatch and task interfaces', 'Operational system integrations'],
      useCases: ['Restaurants and hospitality venues', 'Repeatable indoor delivery routes', 'Teams reducing low-value transit work']
    },
    {
      key: 'scan', group: 'AIYA Products', title: 'AIYAScan', url: 'products/aiya-scan.html',
      kicker: 'QR · SELF SERVICE', monogram: 'QR', image: 'assets/product-scan.png',
      summary: 'QR ordering that connects customers directly to the restaurant workflow.',
      capabilities: ['QR Menu', 'Self-Service Ordering', 'Order and Payment Flow'],
      deliverables: ['Mobile-first QR experiences', 'Menu and ordering interfaces', 'Order and payment integrations'],
      useCases: ['Dine-in self-service', 'Fast-casual operations', 'Low-friction menu access']
    },
    {
      key: 'marketing', group: 'AIYA Products', title: 'AIYA Marketing', url: 'products/aiya-marketing.html',
      kicker: 'GROWTH · STRATEGY', monogram: 'MKT', image: 'assets/service-marketing.png',
      summary: 'Digital strategy and creative execution connected to the technology behind the business.',
      capabilities: ['Growth Strategy', 'Content and Campaigns', 'AIYA Gift Card'],
      deliverables: ['Digital growth planning', 'Campaign creative and execution', 'Gift-card customer experiences'],
      useCases: ['Launching a new offer', 'Connecting marketing with conversion', 'Building repeat-customer programs']
    }
  ],
  services: [
    {
      key: 'strategy', title: 'Strategy & Experience', url: 'services/strategy-experience.html', code: 'S/E', kicker: 'PLAN BEFORE BUILDING',
      summary: 'Define the right product, customer journey, and interface before development begins.',
      capabilities: ['Product Strategy', 'UX / UI Design', 'Conversion Optimization'],
      deliverables: ['Product requirements and roadmaps', 'User flows and interface systems', 'Prototypes and conversion reviews'],
      useCases: ['Validating a new digital product', 'Redesigning a difficult customer journey', 'Aligning business and engineering teams']
    },
    {
      key: 'engineering', title: 'Software Engineering', url: 'services/software-engineering.html', code: 'DEV', kicker: 'PURPOSE-BUILT SOFTWARE',
      summary: 'Build reliable digital products for customers, teams, and complex operations.',
      capabilities: ['Web Development', 'Mobile App Development', 'Enterprise Platforms'],
      deliverables: ['Responsive web applications', 'Native and cross-platform mobile products', 'Internal and customer-facing enterprise systems'],
      useCases: ['Launching a customer application', 'Replacing manual operational tools', 'Modernizing legacy business software']
    },
    {
      key: 'integration', title: 'Integration & Automation', url: 'services/integration-automation.html', code: 'API', kicker: 'CONNECTED OPERATIONS',
      summary: 'Connect systems and automate repetitive work across the business.',
      capabilities: ['API & System Integration', 'Data Connectivity', 'AI & Workflow Automation'],
      deliverables: ['API design and implementation', 'Reliable system and data synchronization', 'AI-assisted and rule-based workflows'],
      useCases: ['Connecting disconnected platforms', 'Reducing repetitive back-office work', 'Making operational data actionable']
    },
    {
      key: 'cloud', title: 'Cloud & Operations', url: 'services/cloud-operations.html', code: 'CLD', kicker: 'READY TO SCALE',
      summary: 'Modernize the foundation behind critical products and services.',
      capabilities: ['Cloud Architecture', 'Platform Modernization', 'Performance & Reliability'],
      deliverables: ['Cloud-ready application architecture', 'Legacy platform modernization', 'Performance, deployment, and observability improvements'],
      useCases: ['Preparing a product for growth', 'Reducing fragile infrastructure', 'Improving deployment and operational visibility']
    },
    {
      key: 'growth', title: 'Growth', url: 'services/growth.html', code: 'GRW', kicker: 'CONNECTED GROWTH',
      summary: 'Bring brand, content, and campaigns together around measurable customer action.',
      capabilities: ['Digital Marketing', 'SEO & Content', 'Campaign Development'],
      deliverables: ['Channel and campaign strategy', 'Search-focused content systems', 'Creative production and campaign execution'],
      useCases: ['Building qualified demand', 'Improving organic discovery', 'Coordinating a product or market launch']
    }
  ]
};

window.getCatalogItem = function getCatalogItem(kind, key) {
  const collection = kind === 'product' ? window.aiyaCatalog.products : window.aiyaCatalog.services;
  return collection.find(item => item.key === key);
};
