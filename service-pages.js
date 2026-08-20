(() => {
  const profiles = {
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

  window.aiyaCatalog.serviceCategories = window.aiyaCatalog.services.map(category => ({
    ...category,
    overviewUrl: category.url,
    offerings: category.capabilities.map(title => {
      const profile = profiles[title];
      return {
        ...profile,
        title,
        description: profile.summary,
        url: `services/${profile.key}.html`,
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
