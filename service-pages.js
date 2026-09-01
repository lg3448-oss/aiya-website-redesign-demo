(() => {
  const profiles = {
    'Product & Experience Design': {
      key: 'product-experience-design', summary: 'Shape product direction and design clear experiences before engineering moves into production.',
      capabilities: ['Product Definition', 'UX and Interface Design', 'Experience Validation'],
      deliverables: ['Focused product roadmap', 'Responsive experience system', 'Testable user flows and prototypes'],
      useCases: ['Defining a new digital product', 'Simplifying a difficult workflow', 'Aligning business, design, and engineering']
    },
    'Custom Software Development': {
      key: 'custom-software-development', summary: 'Build or customize software around the workflows, customers, and systems that make the business distinct.',
      capabilities: ['Custom Application Engineering', 'Existing System Customization', 'Business Workflow Development'],
      deliverables: ['Purpose-built software application', 'Configured and extended existing platform', 'Maintainable business workflow components'],
      useCases: ['Replacing rigid off-the-shelf tools', 'Extending an existing business platform', 'Digitizing a specialized operational process']
    },
    'Web & Mobile Development': {
      key: 'web-mobile-development', summary: 'Build connected web and mobile applications around the same product and business requirements.',
      capabilities: ['Web Application Engineering', 'Mobile Product Engineering', 'Shared Backend Services'],
      deliverables: ['Responsive web application', 'Mobile-ready product experience', 'Maintainable connected services'],
      useCases: ['Launching across web and mobile', 'Extending an existing platform', 'Replacing disconnected customer tools']
    },
    'Ecommerce Platform Development': {
      key: 'ecommerce-platform-development', summary: 'Build and connect ecommerce platforms for catalog, checkout, payment, customer, and fulfillment workflows.',
      capabilities: ['Storefront Engineering', 'Commerce System Integration', 'Checkout and Fulfillment Workflows'],
      deliverables: ['Responsive ecommerce experience', 'Connected commerce platform services', 'Integrated payment and order flows'],
      useCases: ['Launching a new online sales channel', 'Customizing an existing ecommerce platform', 'Connecting commerce with internal operations']
    },
    'Enterprise & Cloud Platforms': {
      key: 'enterprise-cloud-platforms', summary: 'Modernize and scale the platforms that support customers, teams, and critical operations.',
      capabilities: ['Enterprise Architecture', 'Cloud Platform Engineering', 'Controlled Modernization'],
      deliverables: ['Scalable platform foundation', 'Cloud-ready application environments', 'Phased modernization roadmap'],
      useCases: ['Replacing legacy systems', 'Preparing a platform for growth', 'Unifying complex operational workflows']
    },
    'Product Strategy': {
      key: 'product-strategy', summary: 'Turn business goals and customer needs into a focused product direction.',
      capabilities: ['Opportunity Definition', 'Product Roadmapping', 'Launch Planning'],
      deliverables: ['Prioritized product roadmap', 'Requirements and success criteria', 'Launch-ready decision framework'],
      useCases: ['Validating a new product idea', 'Aligning teams before development', 'Planning the next product release']
    },
    'UX / UI Design': {
      key: 'ux-ui-design', summary: 'Design clear digital experiences that feel natural for customers and teams.',
      capabilities: ['User Journey Design', 'Interface Systems', 'Interactive Prototypes'],
      deliverables: ['Mapped user flows', 'Responsive interface designs', 'Reusable design components'],
      useCases: ['Creating a new customer experience', 'Simplifying a complex workflow', 'Modernizing an existing interface']
    },
    'Conversion Optimization': {
      key: 'conversion-optimization', summary: 'Remove friction from key journeys and help more users complete meaningful actions.',
      capabilities: ['Journey Audits', 'Experience Testing', 'Conversion Design'],
      deliverables: ['Conversion opportunity review', 'Prioritized experience improvements', 'Test-ready design recommendations'],
      useCases: ['Improving checkout completion', 'Increasing qualified inquiries', 'Reducing customer drop-off']
    },
    'Web Development': {
      key: 'web-development', summary: 'Build responsive websites and web applications around real business workflows.',
      capabilities: ['Frontend Engineering', 'Backend Development', 'Content Integrations'],
      deliverables: ['Responsive production interfaces', 'Secure application services', 'Maintainable content workflows'],
      useCases: ['Launching a company website', 'Building a customer portal', 'Replacing an outdated web application']
    },
    'Mobile App Development': {
      key: 'mobile-app-development', summary: 'Create mobile products that connect customers, teams, and business systems.',
      capabilities: ['Mobile Product Design', 'Cross-Platform Engineering', 'App Integrations'],
      deliverables: ['Mobile-ready product experience', 'Tested application builds', 'Connected backend services'],
      useCases: ['Launching a customer app', 'Supporting field teams', 'Extending a platform to mobile']
    },
    'Enterprise Platforms': {
      key: 'enterprise-platforms', summary: 'Build dependable platforms for complex operations, teams, and customer programs.',
      capabilities: ['Platform Architecture', 'Role-Based Workflows', 'Operational Dashboards'],
      deliverables: ['Scalable platform foundation', 'Configured team workflows', 'Connected operational tools'],
      useCases: ['Replacing manual processes', 'Unifying internal systems', 'Supporting multi-team operations']
    },
    'API & System Integration': {
      key: 'api-system-integration', summary: 'Connect business systems through reliable APIs and structured data exchange.',
      capabilities: ['API Architecture', 'System Connectivity', 'Integration Monitoring'],
      deliverables: ['Documented integration design', 'Connected application workflows', 'Error handling and visibility'],
      useCases: ['Connecting legacy and modern systems', 'Sharing data across platforms', 'Adding third-party capabilities']
    },
    'Data Connectivity': {
      key: 'data-connectivity', summary: 'Move useful information between platforms so teams can act on consistent data.',
      capabilities: ['Data Mapping', 'Synchronization Workflows', 'Quality Controls'],
      deliverables: ['Source-to-system data map', 'Reliable synchronization flows', 'Data validation rules'],
      useCases: ['Unifying customer information', 'Reducing duplicate data entry', 'Improving reporting inputs']
    },
    'AI & Workflow Automation': {
      key: 'ai-workflow-automation', summary: 'Automate repeatable work with practical AI and rules designed around your operation.',
      capabilities: ['Workflow Discovery', 'AI-Assisted Automation', 'Human Review Controls'],
      deliverables: ['Prioritized automation plan', 'Connected automated workflows', 'Review and exception handling'],
      useCases: ['Reducing repetitive team tasks', 'Routing operational requests', 'Accelerating document and data work']
    },
    'API, Data & Payment Integration': {
      key: 'api-data-integration', summary: 'Connect applications and keep essential business data consistent through reliable integration flows.',
      capabilities: ['API Architecture', 'Data Synchronization', 'Payment Gateway Integration'],
      deliverables: ['Documented integration design', 'Connected application and payment workflows', 'Validation, monitoring, and error visibility'],
      useCases: ['Connecting legacy and modern systems', 'Adding a payment gateway to a product', 'Sharing reliable data across teams']
    },
    'AIYA Marketing': {
      key: 'marketing', url: 'products/aiya-marketing.html', image: 'assets/aiya-marketing-interface.jpg', summary: 'Plan and run connected marketing that aligns your brand, campaigns, and customer journeys.',
      capabilities: ['Growth Strategy', 'Content and Campaigns', 'AIYA Gift Card & Loyalty Points'],
      deliverables: ['Digital growth planning', 'Campaign creative and execution', 'Gift-card customer experiences'],
      useCases: ['Launching a new offer', 'Connecting marketing with conversion', 'Building repeat-customer programs']
    },
    'AIYA Online Order': {
      key: 'aiya-online-order', url: 'products/aiya-online-order.html', image: 'assets/aiya-online-order-interface.jpg', summary: 'Create a branded online ordering experience connected to the way your business fulfills and serves customers.',
      capabilities: ['Branded Online Ordering', 'Order and Fulfillment Workflows', 'Payment and Customer Connections'],
      deliverables: ['Configured online ordering experience', 'Connected order management workflows', 'Integrated payment and customer data'],
      useCases: ['Launching online ordering', 'Replacing disconnected ordering tools', 'Connecting orders with business operations']
    },
    'AIYA Travel Ticketing': {
      key: 'aiya-travel-ticketing', url: 'products/aiya-travel-ticketing.html', image: 'assets/aiya-travel-ticketing-interface.jpg', summary: 'Launch a branded ticketing platform for travel services, bookings, and connected customer operations.',
      capabilities: ['Travel Booking Experiences', 'Ticketing and Reservation Workflows', 'Customer and Payment Connections'],
      deliverables: ['Branded travel ticketing experience', 'Configured booking workflows', 'Connected payment and operational data'],
      useCases: ['Launching a travel booking platform', 'Modernizing ticketing workflows', 'Connecting reservations with customer operations']
    },
    'AIYA CRM': {
      key: 'crm-systems', summary: 'Configure connected CRM systems that give sales, service, and operations teams a shared customer view.',
      url: 'services/crm-systems.html',
      capabilities: ['CRM Architecture', 'Workflow Configuration', 'Customer Data Integration'],
      deliverables: ['Configured CRM workspace', 'Sales and service workflows', 'Connected customer data model'],
      useCases: ['Organizing lead and account activity', 'Improving customer follow-up', 'Connecting CRM with existing business tools']
    },
    'AIYA Gaming': {
      key: 'aiya-gaming', url: 'products/aiya-gaming.html', summary: 'Create a branded gaming platform with game experience design, game payment workflows, player accounts, and virtual coin or token ledger systems.',
      capabilities: ['Player Experiences', 'Game and Membership Workflows', 'Payment and Engagement Connections'],
      deliverables: ['Branded gaming experience', 'Configured player workflows', 'Connected payment and engagement data'],
      useCases: ['Launching a gaming platform', 'Modernizing player operations', 'Connecting engagement with revenue workflows']
    },
    'AIYA ERP': {
      key: 'aiya-erp', url: 'products/aiya-erp.html', summary: 'Unify enterprise operational workflows for orders, inventory, purchasing, finance, and approvals in a branded ERP platform configured for your operational model.',
      capabilities: ['Operational Workflows', 'Business Data Management', 'Connected Finance and Inventory'],
      deliverables: ['Configured ERP workspace', 'Connected business workflows', 'Operational reporting foundation'],
      useCases: ['Replacing disconnected operating tools', 'Centralizing business data', 'Improving operational visibility']
    },
    'Cloud Architecture': {
      key: 'cloud-architecture', summary: 'Create a secure cloud foundation that can support reliable product growth.',
      capabilities: ['Architecture Planning', 'Environment Design', 'Security Foundations'],
      deliverables: ['Cloud architecture blueprint', 'Configured application environments', 'Access and security baseline'],
      useCases: ['Preparing a product to scale', 'Moving from local infrastructure', 'Standardizing cloud environments']
    },
    'Platform Modernization': {
      key: 'platform-modernization', summary: 'Improve aging systems without losing the workflows the business depends on.',
      capabilities: ['Legacy Assessment', 'Incremental Modernization', 'Migration Planning'],
      deliverables: ['Modernization roadmap', 'Updated application components', 'Controlled migration approach'],
      useCases: ['Reducing legacy system risk', 'Improving maintainability', 'Preparing for new integrations']
    },
    'Performance & Reliability': {
      key: 'performance-reliability', summary: 'Strengthen speed, stability, and operational visibility across critical applications.',
      capabilities: ['Performance Reviews', 'Reliability Engineering', 'Observability Setup'],
      deliverables: ['Performance improvement plan', 'Reliability safeguards', 'Monitoring and alerting foundation'],
      useCases: ['Improving slow experiences', 'Reducing service interruptions', 'Finding production issues faster']
    },
    'Digital Marketing': {
      key: 'digital-marketing', summary: 'Coordinate digital channels around clear audiences, offers, and business goals.',
      capabilities: ['Channel Strategy', 'Audience Planning', 'Campaign Management'],
      deliverables: ['Digital channel plan', 'Audience and message framework', 'Campaign execution roadmap'],
      useCases: ['Building qualified demand', 'Launching a new offer', 'Improving channel coordination']
    },
    'SEO & Content': {
      key: 'seo-content', summary: 'Build useful content that improves discovery and supports customer decisions.',
      capabilities: ['Search Opportunity Research', 'Content Systems', 'Performance Improvement'],
      deliverables: ['Search and content roadmap', 'Structured content plan', 'Measurement and improvement process'],
      useCases: ['Improving organic visibility', 'Explaining complex services', 'Building durable inbound demand']
    },
    'Campaign Development': {
      key: 'campaign-development', summary: 'Turn a focused message into coordinated creative and campaign execution.',
      capabilities: ['Campaign Concepts', 'Creative Production', 'Launch Coordination'],
      deliverables: ['Campaign direction and messaging', 'Channel-ready creative assets', 'Coordinated launch plan'],
      useCases: ['Launching a product', 'Supporting a seasonal initiative', 'Reaching a new customer segment']
    }
  };

  window.aiyaCatalog.serviceCategories = window.aiyaCatalog.services.filter(category => !category.legacy).map(category => ({
    ...category,
    overviewUrl: category.url,
    offerings: category.capabilities.map(title => {
      const profile = profiles[title];
      return {
        ...profile,
        title,
        description: profile.summary,
        url: profile.url || `services/${profile.key}.html`,
        navCategory: category.title,
        kicker: category.kicker,
        monogram: profile.key.split('-').map(part => part[0]).join('').slice(0, 3).toUpperCase(),
        image: category.image
      };
    })
  }));

  const originalGetCatalogItem = window.getCatalogItem;
  window.getCatalogItem = function getCatalogItem(kind, key) {
    if (kind === 'service-offering') {
      return window.aiyaCatalog.serviceCategories
        .flatMap(category => category.offerings)
        .find(item => item.key === key);
    }
    return originalGetCatalogItem(kind, key);
  };
})();
