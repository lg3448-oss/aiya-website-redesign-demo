(() => {
  const params = new URLSearchParams(window.location.search);
  const supportedLanguages = new Set(['en', 'zh', 'ko']);
  const requested = params.get('lang');
  let stored = '';
  try { stored = window.localStorage.getItem('aiya-language-v2'); } catch (_) {}
  const language = requested !== null
    ? (supportedLanguages.has(requested) ? requested : 'en')
    : (supportedLanguages.has(stored) ? stored : 'en');

  const zh = {
    'Home': '首页', 'Products': '产品', 'Services': '服务', 'Solutions': '解决方案', 'News': '新闻', 'Company': '公司', 'Contact': '联系我们',
    'Under Construction': '正在建设', 'News and updates are coming soon.': '新闻与动态即将上线。', 'Return Home': '返回首页',
    'AIYA NEWS': 'AIYA 新闻', 'AIYA News': 'AIYA 新闻', 'AIYA Events': 'AIYA 活动', 'AIYA Stories': 'AIYA 故事',
    'LATEST ARTICLE': '最新文章', 'Building the next chapter of connected business technology': '构建互联商业科技的新篇章',
    'A look at how AIYA is bringing software, payments, automation, and customer operations into one connected experience.': '了解 AIYA 如何将软件、支付、自动化与客户运营整合为统一互联体验。',
    'Read Article': '阅读文章', 'Read the latest AIYA article': '阅读 AIYA 最新文章',
    'MORE FROM AIYA': '更多 AIYA 动态', 'Events and stories': '活动与故事', 'EVENTS': '活动', 'STORIES': '故事',
    'Meet AIYA at upcoming events': '在近期活动中与 AIYA 见面', 'Stories from connected businesses': '互联企业故事', 'Learn More': '了解更多',
    'Explore upcoming conversations, demonstrations, and opportunities to connect with the AIYA team.': '了解即将举行的交流、演示，以及与 AIYA 团队沟通的机会。',
    'See how connected software, payments, and operations can support practical business progress.': '了解互联软件、支付与运营如何推动企业取得切实进展。',
    'Back to News': '返回新闻', 'AIYA is creating a clearer way for businesses to connect the software, payment experiences, customer tools, and operational workflows they use every day.': 'AIYA 正在帮助企业以更清晰的方式连接日常使用的软件、支付体验、客户工具与运营流程。',
    'One connected direction': '统一互联方向', 'Instead of treating every business need as a separate tool, AIYA brings related capabilities together around the customer journey and the work teams need to complete.': 'AIYA 不再把每项业务需求视为彼此独立的工具，而是围绕客户旅程与团队实际工作整合相关能力。',
    'Designed for practical progress': '为切实进展而设计', 'The goal is a technology foundation that can begin with a focused need and expand as the business, customer experience, and operating model evolve.': '目标是建立能够从明确需求起步，并随业务、客户体验与运营模式持续扩展的技术基础。',
    'This page will feature upcoming AIYA events, demonstrations, industry conversations, and opportunities to meet the team.': '本页面将展示 AIYA 即将举行的活动、产品演示、行业交流以及与团队见面的机会。',
    'Event calendar in preparation': '活动日程正在准备中', 'Confirmed dates, locations, registration details, and event recaps will be published here as they become available.': '确认后的日期、地点、报名信息与活动回顾将在准备完成后发布于此。',
    'This page will share approved customer stories and practical perspectives on connected software, payments, automation, and growth.': '本页面将分享经批准的客户故事，以及有关互联软件、支付、自动化与增长的实践观点。',
    'Stories are being prepared': '故事内容正在准备中', 'Customer names, outcomes, and supporting details will be added after company and customer approval.': '客户名称、成果与相关细节将在获得公司及客户批准后添加。',
    'Sign in': '登录', 'Talk to our team': '联系我们', 'Talk to Our Team': '联系我们', 'Talk to Us': '联系我们',
    'View All Products': '查看全部产品', 'View All Services': '查看全部服务', 'View All Solutions': '查看全部解决方案', 'overview': '概览',
    'Open navigation': '打开导航', 'Main navigation': '主导航', 'Primary navigation': '主导航',
    'Products menu': '产品菜单', 'Services menu': '服务菜单', 'Solutions menu': '解决方案菜单',
    'Toggle products menu': '展开或收起产品菜单', 'Toggle services menu': '展开或收起服务菜单', 'Toggle solutions menu': '展开或收起解决方案菜单',
    'AI-Powered Software': 'AI 驱动的软件', 'Built for Real Business': '为真实业务而打造',
    'Automation, intelligent workflows, and scalable software designed around business needs.': '围绕业务需求打造自动化、智能工作流程与可扩展软件。',
    'Connected Payments': '互联支付', 'Powerful Integrations': '强大的系统集成',
    'Secure payment APIs and connected systems that simplify business operations.': '通过安全的支付 API 与互联系统简化企业运营。',
    'Scalable Platforms': '可扩展平台', 'Ready for Growth': '为增长做好准备',
    'Cloud-based digital platforms built to support modern and growing businesses.': '以云端数字平台支持现代企业持续增长。',
    'Explore Solutions': '探索解决方案', 'The Vision Has No Limits': '思无限，创无境', 'Scroll to explore': '向下探索',
    'TECHNOLOGY CAPABILITIES': '技术能力', 'Connected expertise': '能力互联', 'One clear outcome': '聚焦清晰成果',
    'Choose a capability to see how AIYA turns complex technology into practical business advantage.': '选择一项能力，了解 AIYA 如何将复杂技术转化为切实的商业优势。',
    'API and Connectivity': 'API 与系统连接', 'Integrations · Data connectivity · Payment APIs': '系统集成 · 数据连接 · 支付 API',
    'Payments and FinTech': '支付与金融科技', 'Processing · FinTech · Clover POS': '支付处理 · 金融科技 · Clover POS',
    'AI and Automation': 'AI 与自动化', 'AI software · Workflows · Intelligence': 'AI 软件 · 工作流程 · 智能分析',
    'Cloud and Enterprise': '云服务与企业系统', 'Cloud · Enterprise · Transformation': '云服务 · 企业系统 · 数字化转型',
    'FEATURED PRODUCT': '精选产品', 'Self-Service Made Simple': '让自助服务更简单',
    'A streamlined self-ordering system that helps restaurants serve guests faster, reduce ordering friction, and keep every order connected.': '精简的自助点餐系统，帮助餐厅提升服务速度、减少点餐阻力，并保持业务流程互联。',
    'Self-Service Ordering': '自助点餐', 'Customizable Menu': '可定制菜单', 'Integrated Payments': '集成支付', 'POS Order Sync': 'POS 订单同步',
    'Explore AIYA Kiosk': '了解 AIYA Kiosk', 'Guest Order': '顾客点餐', 'Secure Payment': '安全支付', 'POS Sync': 'POS 同步',
    'AIYA PRODUCTS': 'AIYA 产品', 'One platform family': '统一平台体系', 'Built around business': '围绕业务打造',
    'SERVICES': '服务', 'Expertise where': '专业能力汇聚', 'technology meets growth': '让技术推动增长',
    'CONNECTED BY AIYA': '由 AIYA 互联', 'One Connected': '统一互联的', 'Technology Ecosystem': '技术生态系统',
    'APIs, payments, AI, and cloud software working together.': '让 API、支付、AI 与云软件协同运行。',
    'Customer': '客户', 'Applications': '应用', 'Online': '在线', 'Ordering': '点餐', 'Payment': '支付', 'Automation': '自动化',
    'Cloud': '云服务', 'Systems': '系统', 'Business': '业务', 'Data': '数据', 'Merchant': '商户', 'ONE PLATFORM': '统一平台',
    'WHY AIYA': '为什么选择 AIYA', 'Technology depth': '深厚技术能力', 'Business perspective': '结合商业视角',
    'One team brings the strategy, engineering, payment knowledge, and operational understanding to move ideas forward.': '一支团队整合战略、工程、支付与运营经验，推动想法真正落地。',
    'In-house developers': '内部开发团队', 'Projects & cases': '项目与案例', 'U.S. locations': '美国办公地点',
    'End-to-End Technology': '端到端技术能力', 'Payment Expertise': '支付专业能力', 'API Connectivity': 'API 系统连接',
    'AI-Powered Automation': 'AI 驱动的自动化', 'Scalable Platforms': '可扩展平台', 'Business-Focused Solutions': '以业务为核心的解决方案',
    'RESULTS': '成果', 'Outcomes clients': '客户能够理解的', 'can understand': '实际成果',
    'Presentation format for future approved customer stories.': '用于展示未来经批准客户案例的演示版式。',
    'Demo result · 01': '演示结果 · 01', 'Placeholder · 02': '占位内容 · 02', 'Placeholder · 03': '占位内容 · 03', 'Placeholder · 04': '占位内容 · 04',
    'Faster Order Processing': '更快的业务处理', 'Simplified Operations': '简化运营', 'Connected Payments': '互联支付', 'Reduced Manual Workflow': '减少手动流程',
    'A connected order flow reduces handoffs from customer to merchant.': '互联业务流程减少客户与商户之间的重复交接。',
    'Orders, menus, payments, and reporting become easier to manage.': '菜单、支付、业务流程与报表更易于统一管理。',
    'Secure payment infrastructure supports every digital channel.': '安全的支付基础设施支持各类数字渠道。',
    'Automation gives teams more time for customers and growth.': '自动化让团队将更多时间投入客户与增长。',
    'All results shown in this prototype are demonstration content pending approved customer data.': '本原型中的所有结果均为演示内容，等待经批准的客户数据。',
    'COMPANY': '公司', 'Technology Built': '以技术构建', 'Around Business': '围绕业务需求',
    'AIYA creates connected software, payment solutions, and digital platforms that help businesses operate more efficiently and grow with confidence.': 'AIYA 打造互联软件、支付解决方案与数字平台，帮助企业提升运营效率并稳健增长。',
    'Meet AIYA': '了解 AIYA', 'Strategy': '战略', 'Software': '软件', 'Growth': '增长',
    'START A CONVERSATION': '开启沟通', 'Let’s Build': '共同打造', 'What Comes Next': '下一步业务能力',
    'Bring us the business challenge. We’ll help define the connected technology behind the solution.': '告诉我们您的业务挑战，我们将协助定义支撑解决方案的互联技术。',
    'USA Office': '美国办公室', 'Phone': '电话', 'Email': '邮箱', 'Trusted by businesses across industries': '获得多个行业企业的信任',
    'Back to top': '返回顶部', 'All rights reserved.': '保留所有权利。',
    'Payments & Commerce': '支付与商务', 'Billing & Revenue': '计费与营收', 'Treasury & Finance': '资金与财务',
    'Platforms & Marketplaces': '平台与交易市场', 'Trust & Business Tools': '风控与业务工具',
    'Accept payments, build checkout experiences, and connect online and in-person commerce.': '接收支付、打造结账体验，并连接线上与线下商务场景。',
    'Manage recurring, usage-based, and invoice revenue with connected reporting and finance data.': '通过互联报表与财务数据管理订阅、按量计费和发票营收。',
    'Build payments, financial services, and commerce infrastructure for platforms and marketplaces.': '为平台与交易市场构建支付、金融服务和商务基础设施。',
    'Protect transactions, verify customers, connect business data, and support product growth.': '保护交易、验证客户、连接业务数据并支持产品增长。',
    'AIYA Payments': 'AIYA 支付', 'Payment Operations': '支付运营', 'Smart Payment Links': '智能支付链接', 'AIYA Checkout': 'AIYA 结账',
    'Embedded Payment UI': '嵌入式支付界面', 'Payment Method Hub': '支付方式中心', 'In-Person Payments': '线下支付', 'Approval Optimization': '支付通过率优化',
    'Fast Checkout': '快速结账', 'Financial Data Connect': '财务数据连接', 'Online Storefront': '在线商城', 'Catalog & Inventory': '商品与库存',
    'Customer Accounts': '客户账户', 'B2B & Global Commerce': 'B2B 与全球商务', 'AIYA Billing': 'AIYA 计费', 'Usage Billing': '账单计费',
    'Subscription Management': '订阅管理', 'AIYA Invoicing': 'AIYA 发票', 'Tax Automation': '税务自动化', 'Revenue Accounting': '营收会计',
    'Revenue Analytics': '营收分析', 'Finance Data Pipeline': '财务数据管道', 'Treasury Operations': '资金运营', 'Global Payouts': '全球付款',
    'Financial Services API Integration': '金融服务API技术对接', 'Digital Asset Infrastructure': '数字资产基础设施', 'Digital Asset Onramp': '数字资产购买入口',
    'AIYA Connect': 'AIYA 平台连接', 'Embedded Treasury': '嵌入式资金服务',
    'Marketplace Commerce': '交易市场商务', 'Fraud & Risk': '欺诈与风险管理', 'Identity Verification': '身份验证', 'Product Strategy': '产品战略',
    'Business Launch Systems': '业务启动系统', 'Sustainability Integrations': '可持续发展集成', 'Growth Strategy': '增长战略',
    'Content & Campaigns': '内容与营销活动', 'AIYA Gift Card & Loyalty Points': 'AIYA 礼品卡与会员积分',
    'Online payment processing': '在线支付处理', 'Managed payment workflows': '支付工作流程管理', 'No-code payment collection': '无需代码的收款方式',
    'Custom checkout experiences': '定制结账体验', 'Flexible payment components': '灵活的支付组件', 'Connected payment methods': '互联支付方式',
    'Connected point-of-sale payments': '互联销售点支付', 'Payment acceptance improvements': '提升支付通过率', 'Accelerated repeat checkout': '加快重复购买结账',
    'Linked financial account data': '连接财务账户数据', 'Custom digital storefronts': '定制数字商城', 'Connected product operations': '互联商品运营',
    'Customer identity and history': '客户身份与历史记录', 'Business buying across markets': '跨市场 B2B 采购',
    'Recurring revenue operations': '经常性营收运营', 'Metered and usage-based billing': '计量与账单计费', 'Subscription lifecycle workflows': '订阅生命周期流程',
    'One-time and recurring invoices': '一次性与周期性发票', 'Sales tax and VAT integrations': '销售税与 VAT 集成', 'Revenue recognition workflows': '营收确认流程',
    'Custom revenue reporting': '定制营收报表', 'Revenue and finance data sync': '营收与财务数据同步',
    'Connected business finance workflows': '互联企业财务流程', 'Payouts to third parties': '向第三方付款', 'Third-party financial service system connectivity': '第三方金融服务系统连接',
    'Wallet and digital asset systems': '钱包与数字资产系统', 'Embeddable purchase experiences': '可嵌入的购买体验',
    'Payments for platforms': '平台支付', 'Embedded financial service workflows': '嵌入式金融服务流程',
    'Customer credit for purchases with your business': '用于在企业内消费的客户信用账户', 'Multi-party commerce operations': '多方商务运营',
    'Fraud prevention workflows': '欺诈防范流程', 'Online identity workflows': '在线身份验证流程', 'Roadmaps and launch planning': '路线图与上线规划',
    'Digital foundations for new ventures': '新业务的数字基础', 'Connected climate and impact data': '连接环境与影响数据', 'Connected acquisition planning': '互联获客规划',
    'Creative campaign execution': '营销活动创意执行', 'Gift balances and repeat-customer rewards': '礼品余额与回头客积分奖励',
    'Connect payouts, treasury workflows, financial service APIs, and digital asset infrastructure to business operations.': '将付款、资金流程、金融服务API与数字资产基础设施连接到企业运营。',
    'TECHNOLOGY INFRASTRUCTURE': '技术基础设施', 'Technology Infrastructure for Financial Service Connectivity': '金融服务系统连接技术基础设施',
    'Connect software platforms with independent third-party financial service providers through secure APIs and system integrations. AIYA provides software development, API connectivity, data integration, workflow automation, and technical support only. AIYA does not offer, arrange, broker, refer, approve, service, or fund any loan or financing product.': '通过安全的API及系统集成，帮助企业软件平台连接独立第三方金融服务提供商。AIYA仅提供软件开发、API连接、数据集成、工作流程自动化及相关技术支持。AIYA不提供、不安排、不经纪、不转介、不审批、不管理，也不出资任何贷款或融资产品。',
    'API integration': 'API系统对接', 'Secure data connectivity': '安全数据连接', 'Testing and technical support': '测试及技术支持',
    'AIYA helps businesses, software platforms, and financial service providers connect their systems through secure APIs, data integrations, and customized software workflows.': 'AIYA通过安全API、数据集成及定制化软件工作流程，帮助企业、软件平台和金融服务机构实现不同系统之间的技术连接。',
    'Our role is strictly limited to technology development and system integration. AIYA does not provide or participate in lending or financing activities.': 'AIYA的角色严格限于软件开发及系统技术集成。AIYA不提供也不参与任何贷款或融资业务。',
    'Explore API Integration': '了解API技术对接', 'Contact Our Integration Team': '联系我们的系统集成团队', 'Secure financial service API and system connectivity': '安全的金融服务API及系统连接', 'API / DATA / WORKFLOWS': 'API / 数据 / 工作流程',
    'OUR TECHNOLOGY SERVICES': '我们的技术服务', 'Technical connections built around independently operated systems': '围绕独立运营系统构建技术连接',
    'API Integration': 'API系统对接', 'Connect eligible business applications with APIs made available by independent third-party financial service providers.': '将符合技术条件的商业应用程序与独立第三方金融服务机构提供的API进行连接。',
    'Custom Software Development': '定制软件开发', 'Develop user interfaces, dashboards, data connections, and operational tools based on the client’s technical requirements.': '根据客户的技术需求，开发用户界面、管理后台、数据连接及运营工具。',
    'Data Connectivity': '数据连接', 'Support the secure transmission of authorized data between independently operated systems.': '协助在相互独立运营的系统之间安全传输经授权的数据。',
    'Workflow Automation': '工作流程自动化', 'Build technical workflows for document submission, application-status updates, notifications, and reporting.': '建立文件提交、申请状态更新、系统通知及报告等技术工作流程。',
    'Testing and Technical Support': '测试及技术支持', 'Assist with API testing, sandbox environments, implementation, troubleshooting, and ongoing technical maintenance.': '协助完成API测试、Sandbox测试环境、系统实施、故障排查及后续技术维护。',
    'View Integration Capabilities': '查看技术对接能力', 'WHO WE SERVE': '我们的服务对象', 'Built for teams connecting financial service technology': '服务于连接金融服务技术的团队',
    'Financial technology companies': '金融科技公司', 'Banks and regulated financial institutions': '银行及受监管金融机构', 'Independent financing providers': '独立第三方融资机构', 'SaaS and software platforms': 'SaaS及软件平台', 'Marketplaces': '交易平台', 'Payment companies': '支付公司', 'Businesses requiring third-party financial system integrations': '需要连接第三方金融系统的企业',
    'AIYA’S ROLE': 'AIYA的角色', 'Software development and technology integration only': '仅提供软件开发及技术系统集成', 'AIYA acts solely as a software developer and technology integration provider.': 'AIYA仅作为软件开发及技术系统集成服务提供商。', 'AIYA does not:': 'AIYA不从事以下业务：',
    'Offer loans or financing': '不提供贷款或融资', 'Accept financing applications on its own behalf': '不以自身名义接收融资申请', 'Recommend or refer applicants to lenders': '不向贷款机构推荐或转介申请人', 'Arrange or broker financing transactions': '不安排或经纪融资交易', 'Evaluate creditworthiness': '不评估申请人的信用状况', 'Perform underwriting': '不进行贷款审核', 'Approve or decline applications': '不批准或拒绝融资申请', 'Determine interest rates, fees, or financing terms': '不决定利率、费用或融资条款', 'Make lending or credit decisions': '不作出任何贷款或信贷决定', 'Provide or advance loan funds': '不提供或垫付贷款资金', 'Collect loan payments': '不收取贷款还款', 'Service or manage loans': '不管理或服务贷款账户', 'Guarantee approval or funding': '不保证申请获批或获得资金', 'Assume credit or repayment risk': '不承担信贷或还款风险',
    'IMPORTANT TECHNOLOGY SERVICES DISCLOSURE': '重要技术服务声明', 'Technology services with clearly defined boundaries': '职责边界清晰的技术服务',
    'AIYA Technology System LLC is a technology and software integration company. AIYA is not a bank, lender, financing provider, loan broker, financing broker, or credit services provider.': 'AIYA Technology System LLC是一家科技及软件系统集成公司。AIYA并非银行、贷款机构、融资提供商、贷款经纪人、融资经纪人或信用服务机构。',
    'AIYA does not offer, arrange, broker, refer, approve, service, or fund loans or other financing products. AIYA does not make credit decisions and does not participate in any financing agreement between a financial service provider and its customer.': 'AIYA不提供、不安排、不经纪、不转介、不审批、不管理，也不出资任何贷款或其他融资产品。AIYA不作出信贷决定，也不参与金融服务机构与其客户之间签订的任何融资协议。',
    'Any financial products displayed or accessed through an integrated third-party system are independently offered, reviewed, approved, funded, and administered by the applicable third-party provider. The third-party provider is solely responsible for its products, eligibility requirements, disclosures, pricing, fees, terms, regulatory obligations, customer agreements, and servicing activities.': '任何通过第三方集成系统展示或访问的金融产品，均由相应的独立第三方机构负责提供、审核、批准、出资及管理。相关第三方机构独立负责其产品、申请资格、法定披露、价格、费用、条款、监管责任、客户合同及后续服务。',
    'AIYA’s services are limited to software development, API connectivity, data integration, workflow automation, implementation, and technical support.': 'AIYA提供的服务仅限于软件开发、API连接、数据集成、工作流程自动化、系统实施及技术支持。',
    'TECHNICAL CONSULTATION': '技术咨询', 'Connect your systems with a clearly scoped integration plan.': '通过职责范围清晰的技术对接方案连接您的系统。', 'Request Technical Consultation': '申请技术咨询',
    'Software Engineering': '软件工程', 'Integration & Automation': '系统集成与自动化', 'Growth': '增长服务',
    'Product & Experience Design': '产品与体验设计', 'Custom Software Development': '定制软件开发', 'Web & Mobile Development': '网站与移动应用开发',
    'Ecommerce Platform Development': '电商平台开发', 'Enterprise & Cloud Platforms': '企业与云平台', 'Performance & Reliability': '性能与可靠性',
    'API, Data & Payment Integration': 'API、数据与支付集成', 'AI & Workflow Automation': 'AI 与工作流程自动化', 'CRM Systems': 'CRM 系统',
    'Digital Marketing': '数字营销', 'SEO & Content': 'SEO 与内容', 'Campaign Development': '营销活动开发',
    'Plan, design, build, and strengthen reliable digital products on one engineering foundation.': '在统一工程基础上规划、设计、构建并强化可靠的数字产品。',
    'Connect systems and automate repetitive work across the business.': '连接企业系统，并自动化重复性工作。',
    'Bring brand, content, and campaigns together around measurable customer action.': '围绕可衡量的客户行动整合品牌、内容与营销活动。',
    'By Industry': '按行业', 'By Use Case': '按应用场景', 'Food & Hospitality': '餐饮与酒店', 'Retail': '零售',
    'Beauty, Wellness & Fitness': '美容、健康与健身', 'Healthcare & Education': '医疗与教育', 'Automotive': '汽车行业',
    'Home & Field Services': '家庭与现场服务', 'Professional Services': '专业服务', 'Entertainment': '娱乐行业', 'Manufacturing & Wholesale': '制造与批发',
    'Digital & Agentic Commerce': '数字与智能代理商务', 'Crypto': '加密货币', 'Embedded Finance & Payments': '嵌入式金融与支付',
    'Finance Automation & Management': '财务自动化与管理', 'Global Business': '全球业务', 'Marketplaces': '交易平台', 'Platforms & SaaS': '平台与 SaaS',
    'Restaurants, cafes, hotels, venues, and guest experiences.': '适用于餐厅、咖啡馆、酒店、场馆与宾客体验。',
    'Grocery, convenience, specialty, and consumer retail.': '适用于杂货、便利店、专业门店与消费零售。',
    'Salons, spas, studios, gyms, and membership businesses.': '适用于美容院、水疗、工作室、健身房与会员制业务。',
    'Clinics, care providers, schools, and training organizations.': '适用于诊所、护理机构、学校与培训组织。',
    'Repair, car care, dealerships, parts, and EV services.': '适用于维修、汽车养护、经销商、零部件与电动车服务。',
    'HVAC, plumbing, electrical, construction, and mobile teams.': '适用于暖通、管道、电气、建筑与移动团队。',
    'Accounting, legal, insurance, real estate, and consulting.': '适用于会计、法律、保险、房地产与咨询。',
    'Arcades, theaters, recreation, ticketing, and venues.': '适用于游戏厅、影院、休闲娱乐、票务与场馆。',
    'Manufacturers, distributors, warehousing, and logistics.': '适用于制造商、分销商、仓储与物流。',
    'Connect online buying with AI-assisted discovery and action.': '将在线购买与 AI 辅助发现和操作连接起来。',
    'Build digital asset payment and infrastructure experiences.': '构建数字资产支付与基础设施体验。',
    'Add payments and financial capabilities inside digital products.': '在数字产品中加入支付与金融能力。',
    'Connect billing, reporting, reconciliation, and financial visibility.': '连接计费、报表、对账与财务可视化。',
    'Support connected commerce and operations across markets.': '支持跨市场的互联商务与运营。',
    'Connect buyers, sellers, payments, and multi-party operations.': '连接买家、卖家、支付与多方运营。',
    'Build, monetize, and operate scalable software platforms.': '构建、商业化并运营可扩展的软件平台。',
    'AIYA SOLUTIONS': 'AIYA 解决方案', 'Built around': '围绕', 'how business works': '真实业务运作方式构建',
    'Explore connected technology by industry or by the outcome your business needs to achieve.': '按行业或业务目标探索互联技术解决方案。',
    'Solutions sections': '解决方案栏目', 'BY INDUSTRY': '按行业', 'BY USE CASE': '按应用场景',
    'Technology shaped for': '为行业打造技术', 'the way your industry operates': '贴合实际运营方式',
    'Industry groupings are designed as demo navigation and can be refined as AIYA confirms its final market coverage.': '行业分类为演示导航，可在 AIYA 确认最终市场范围后继续调整。',
    'Start with the outcome': '从业务目标出发', 'Connect products and services around a clear operational, commercial, or financial goal.': '围绕清晰的运营、商务或财务目标连接产品与服务。',
    'NEED A DIFFERENT FIT?': '需要其他方案？', 'Tell us how your business operates.': '告诉我们您的业务如何运作。',
    'Explore solution': '了解解决方案',
    'All Products': '全部产品', 'All Services': '全部服务', 'All Industries': '全部行业', 'All Use Cases': '全部应用场景',
    'Explore Product': '了解产品', 'Explore Service': '了解服务', 'CORE CAPABILITIES': '核心能力',
    'Three ways this product moves work forward': '这项产品推动业务的三种方式', 'Three ways this service moves work forward': '这项服务推动业务的三种方式',
    'Focused capabilities that can be configured around the way your business operates.': '可根据企业实际运营方式配置的聚焦能力。',
    'WHAT AIYA CAN BUILD': 'AIYA 可以构建什么', 'Designed around your operation': '围绕您的运营方式设计', 'BEST FOR': '适用场景',
    'Where it creates value': '创造价值的场景', 'CONNECTED PRODUCTS': '关联产品', 'RELATED SERVICES': '相关服务',
    'Build a broader AIYA system': '构建更完整的 AIYA 系统', 'Bring the right team together': '汇集所需专业团队',
    'Explore related capabilities from the same product family.': '探索同一产品体系中的相关能力。',
    'Explore complementary expertise for planning, building, and growing your next initiative.': '探索支持下一项计划、建设与增长的互补专业能力。',
    'DEMO PRODUCT CONTENT': '产品演示内容', 'DEMO SERVICE CONTENT': '服务演示内容',
    'Explore how this capability could fit your business.': '了解这项能力如何适配您的业务。',
    'FUTURE CHAT PREVIEW': '未来聊天功能预览', 'Have a question?': '有问题？', 'Tell our team what you are building.': '告诉我们您正在构建什么。',
    'AIYA ACCOUNT ACCESS': 'AIYA 账户入口', 'One place for': '统一工作入口', 'connected work': '连接各项工作',
    'The customer portal is represented here for design review. Authentication and account functionality will be connected during production development.': '此处为客户门户的设计演示，身份验证与账户功能将在正式开发阶段接入。',
    'DEMO PORTAL': '演示门户', 'Work email': '工作邮箱', 'Continue': '继续', 'Portal access is not active in this frontend demo.': '此前端演示暂未启用门户访问。',
    'Request access from AIYA': '向 AIYA 申请访问', 'Back to website': '返回网站'
    ,'INDUSTRY SOLUTION': '行业解决方案', 'USE CASE': '应用场景', 'WHAT THIS SOLUTION CONNECTS': '此解决方案连接的能力',
    'A focused system,': '聚焦统一系统，', 'not a list of disconnected tools': '而非分散工具的堆叠', 'BUSINESS OUTCOMES': '业务成果',
    'Designed around': '围绕实际需求设计', 'work that needs to move': '推动关键工作向前',
    'CONNECTED AIYA PRODUCTS & SERVICES': '关联的 AIYA 产品与服务', 'CONNECTED AIYA CAPABILITY': '关联的 AIYA 能力',
    'Build the right capability mix': '组合适合您的能力', 'These related AIYA capabilities provide a starting point for this demo solution.': '这些相关 AIYA 能力为本演示解决方案提供起点。',
    'START WITH YOUR OPERATING MODEL': '从您的运营模式出发', 'Shape this solution around your business.': '围绕您的业务定制解决方案。',
    'AIYA contact preview': 'AIYA 联系功能预览', 'Demo preview of a future AIYA customer support chat': '未来 AIYA 客户支持聊天功能演示图',
    'AIYA TECHNOLOGY SYSTEM': 'AIYA 科技系统', 'AIYA Kiosk': 'AIYA 自助终端', 'AIYA Commerce': 'AIYA 商务', 'AIYA Revenue': 'AIYA 营收', 'AIYA Marketing': 'AIYA 营销',
    'CONNECTED': '互联', 'CONNECTED BY': '互联平台', 'PLATFORM': '平台', 'PLATFORMS': '平台', 'PAYMENTS': '支付', 'WORKFLOWS': '工作流程', 'INSIGHTS': '洞察',
    'SCALE': '扩展', 'GROWTH': '增长', 'SECURITY': '安全', 'FINTECH': '金融科技', 'CLOVER': 'Clover', 'PAY': '支付',
    'Payments and Commerce capabilities': '支付与商务能力', 'Product categories': '产品分类', 'Service categories': '服务分类',
    'AIYA connected technology ecosystem': 'AIYA 互联技术生态系统', 'Connected AI, API, payments, and cloud platform visualization': 'AI、API、支付与云平台互联示意图',
    'AI, APIs, payment systems, and cloud services connected through one enterprise platform': 'AI、API、支付系统与云服务通过统一企业平台连接',
    'AI automation': 'AI 自动化', 'Payment APIs': '支付 API', 'Cloud platform': '云平台', 'AIYA Kiosk self-service restaurant ordering system': 'AIYA 餐厅自助点餐终端',
    'Kiosk order flow': '自助终端业务流程', 'AIYA Kiosk · Self-service ordering system': 'AIYA 自助终端 · 自助点餐系统',
    'capability preview': '能力预览', 'capabilities': '能力', 'services': '服务',
    'Abstract technology visual for': '技术主题视觉图：', 'visual': '视觉图', 'Switch to English': '切换到英文',
    'Payment Links': '支付链接', 'B2B Global Commerce': 'B2B 全球商务', '1 view': '统一视图', '↓ work': '减少工作',
    '© 2026 AIYA Technology System, LLC': '© 2026 AIYA 科技系统有限公司', '100 East Broadway 12 FL New York NY 10002': '美国纽约州纽约市东百老汇街100号12层，邮编10002'
  };

  const translate = value => {
    if (language !== 'zh' || typeof value !== 'string') return value;
    const match = value.match(/^(\s*)(.*?)(\s*)$/s);
    const core = match[2];
    if (zh[core]) return `${match[1]}${zh[core]}${match[3]}`;
    const affixed = core.match(/^([←→↗↓⌄︎︎\s]*)(.*?)([←→↗↓⌄︎︎\s]*)$/);
    if (affixed && zh[affixed[2]]) return `${match[1]}${affixed[1]}${zh[affixed[2]]}${affixed[3]}${match[3]}`;
    return value;
  };

  const translateCatalog = value => {
    if (language !== 'zh' || !value) return value;
    if (Array.isArray(value)) return value.forEach(translateCatalog);
    if (typeof value !== 'object') return value;
    Object.keys(value).forEach(key => {
      if (typeof value[key] === 'string') value[key] = translate(value[key]);
      else translateCatalog(value[key]);
    });
    return value;
  };

  const normalizeChineseCatalog = catalog => {
    if (language !== 'zh' || !catalog) return;
    const categoryCopy = {
      'payments-commerce': {
        deliverables: ['品牌化支付与商务体验', '客户及运营系统连接', '报表与异常处理流程'],
        useCases: ['上线新的销售渠道', '替换分散的支付工具', '连接线上与线下商务']
      },
      'billing-revenue': {
        deliverables: ['计费与营收流程配置', '面向客户的账单体验', '财务与报表系统连接'],
        useCases: ['开展订阅或按量计费业务', '改进账单运营', '连接营收与财务数据']
      },
      'treasury-finance': {
        deliverables: ['资金与财务流程配置', '企业系统集成', '运营可视化与控制'],
        useCases: ['协调复杂资金流动', '增加金融服务能力', '改进财务运营']
      },
      'platforms-marketplaces': {
        deliverables: ['平台品牌化用户体验', '账户与交易工作流程', '平台团队运营工具'],
        useCases: ['上线软件平台', '构建多方交易市场', '嵌入金融服务能力']
      },
      'trust-business-tools': {
        deliverables: ['面向业务的工作流程设计', '系统与数据集成', '清晰的团队运营工具'],
        useCases: ['降低运营风险', '上线新的客户体验', '连接增长与业务系统']
      }
    };
    const categoryMonograms = { 'payments-commerce': '支付', 'billing-revenue': '营收', 'treasury-finance': '财务', 'platforms-marketplaces': '平台', 'trust-business-tools': '风控' };
    catalog.productCategories?.forEach(category => {
      category.kicker = category.title;
      category.monogram = categoryMonograms[category.key] || '产品';
      category.offerings.forEach(item => {
        item.kicker = category.title;
        item.monogram = '产品';
        if (!/[\u3400-\u9fff]/.test(item.summary || '')) item.summary = `${item.title}用于${item.description}，并可根据企业需求连接相关业务系统。`;
        item.capabilities = [`${item.title}核心配置`, '客户体验与工作流程', '业务数据与系统连接'];
        item.deliverables = categoryCopy[category.key].deliverables;
        item.useCases = categoryCopy[category.key].useCases;
        if (item.key === 'usage-billing') {
          item.summary = '账单计费用于根据已确认的商品、服务、费用和账户活动生成清晰的客户账单。';
          item.capabilities = ['客户账单生成', '灵活计费规则', '账单与客户账户数据连接'];
        }
        if (item.key === 'financial-services-api-integration') {
          item.summary = '通过安全的API及系统集成，帮助企业软件平台连接独立第三方金融服务提供商。AIYA仅提供软件开发、API连接、数据集成、工作流程自动化及相关技术支持。';
          item.capabilities = ['API系统对接', '安全数据连接', '工作流程自动化', '测试及技术支持'];
        }
        if (item.key === 'aiya-gift-card') {
          item.summary = 'AIYA 礼品卡与会员积分结合储值礼品卡和忠诚度积分，让客户通过重复消费获取积分，并在后续购买中兑换使用。';
          item.capabilities = ['礼品卡购买与余额管理', '会员积分获取与兑换', '客户奖励计划连接'];
        }
      });
    });
    const productMonograms = { commerce: '商务', revenue: '营收', marketing: '营销' };
    const productCapabilities = {
      commerce: ['在线商城', '定制结账', '商品与库存', '客户账户', 'B2B 与全球商务'],
      revenue: ['线上与线下支付', '计费与订阅', '发票与支付链接', '平台支付与付款', '风险与身份验证流程', '税务与营收报表集成'],
      marketing: ['增长战略', '内容与营销活动', 'AIYA 礼品卡与会员积分']
    };
    catalog.products?.forEach(item => {
      item.kicker = item.title;
      item.monogram = productMonograms[item.key] || '产品';
      item.summary = `${item.title}连接客户体验、业务系统与日常运营，支持企业持续发展。`;
      item.capabilities = productCapabilities[item.key] || ['产品配置', '系统连接', '运营支持'];
      item.deliverables = ['围绕业务需求设计的产品方案', '客户体验与运营系统连接', '可维护、可扩展的交付成果'];
      item.useCases = ['上线新的数字业务', '替换分散的业务工具', '连接客户体验与内部运营'];
    });
    const serviceCategoryUseCases = {
      engineering: ['上线新的数字产品', '升级客户与内部系统', '提升平台扩展性与可靠性'],
      integration: ['连接分散的平台', '减少重复后台工作', '统一销售与客户运营'],
      growth: ['建立有效客户需求', '提升自然搜索曝光', '协调产品或市场推广']
    };
    const serviceCapabilities = {
      strategy: ['产品战略', 'UX / UI 设计', '转化率优化'],
      engineering: ['产品与体验设计', '定制软件开发', '网站与移动应用开发', '电商平台开发', '企业与云平台', '性能与可靠性'],
      integration: ['API、数据与支付集成', 'AI 与工作流程自动化', 'CRM 系统'],
      cloud: ['云架构', '平台现代化改造', '性能与可靠性'],
      growth: ['数字营销', 'SEO 与内容', '营销活动开发']
    };
    catalog.services?.forEach(item => {
      item.kicker = item.title;
      item.code = item.key === 'integration' ? 'API' : (item.key === 'engineering' ? '开发' : item.key === 'growth' ? '增长' : '服务');
      item.summary = `${item.title}围绕企业需求提供规划、实施、交付与持续优化。`;
      item.capabilities = serviceCapabilities[item.key] || ['方案规划', '实施与集成', '持续优化'];
      item.deliverables = ['业务需求与实施方案', '可维护的系统与工作流程', '测试、交付与持续优化'];
      item.useCases = serviceCategoryUseCases[item.key] || ['规划新的数字能力', '改进现有业务流程', '支持持续运营与增长'];
    });
    catalog.serviceCategories?.forEach(category => {
      category.kicker = category.title;
      category.code = category.key === 'integration' ? 'API' : (category.key === 'engineering' ? '开发' : '增长');
      category.offerings.forEach(item => {
        item.kicker = category.title;
        item.monogram = '服务';
        item.summary = `${item.title}围绕企业实际流程提供规划、实施与持续优化。`;
        item.description = item.summary;
        item.capabilities = [`${item.title}方案设计`, `${item.title}实施与集成`, '测试、交付与持续优化'];
        item.deliverables = ['明确的实施路线与需求', '可维护的交付成果', '测试与上线支持'];
        item.useCases = serviceCategoryUseCases[category.key];
      });
    });
    catalog.solutionCategories?.forEach(category => {
      category.offerings.forEach(item => {
        item.headline = `为${item.title}打造互联数字体验。`;
        item.overview = `${item.description.replace(/[。.]$/, '')}通过连接软件、支付、数据与运营流程，形成适合实际业务的统一解决方案。`;
        item.capabilities = ['客户体验与数字渠道', '支付、数据与系统连接', '运营流程与自动化'];
        item.outcomes = ['减少分散流程与重复工作', '提升团队与客户体验', '建立可持续扩展的运营基础'];
      });
    });
  };

  const applySolutionDetail = () => {
    if (language !== 'zh') return;
    const page = document.querySelector('[data-solution-key]');
    if (!page) return;
    const item = window.aiyaCatalog?.solutionCategories?.flatMap(category => category.offerings).find(candidate => candidate.key === page.dataset.solutionKey);
    if (!item) return;
    const setText = (selector, value) => { const element = document.querySelector(selector); if (element) element.textContent = value; };
    setText('.solution-detail-copy h1', item.title);
    setText('.solution-detail-copy h2', item.headline);
    setText('.solution-detail-copy>p', item.overview);
    document.querySelectorAll('.solution-capability-section article h3').forEach((element, index) => { element.textContent = item.capabilities[index] || ''; });
    document.querySelectorAll('.solution-outcome-section li span').forEach((element, index) => { element.textContent = item.outcomes[index] || ''; });
    document.querySelectorAll('.solution-connected-section strong').forEach((element, index) => { element.textContent = item.connected[index]?.title || element.textContent; });
    const visual = document.querySelector('.solution-detail-visual img');
    if (visual) visual.alt = `${item.title}技术主题视觉图`;
    const category = window.aiyaCatalog.solutionCategories.find(candidate => candidate.offerings.some(offering => offering.key === item.key));
    setText('.solution-detail-visual>small', `${category?.title || '解决方案'} · ${item.title}`);
    document.title = `${item.title}解决方案 | AIYA 科技系统`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = item.overview;
  };

  const applyDocument = () => {
    if (language !== 'zh') return;
    document.documentElement.lang = 'zh-CN';
    const pageName = window.location.pathname.split('/').pop();
    if (!pageName || pageName === 'index.html') document.title = 'AIYA 科技系统';
    else if (pageName === 'solutions.html') document.title = '解决方案 | AIYA 科技系统';
    else if (pageName === 'signin.html') document.title = '登录 | AIYA 科技系统';
    else if (pageName === 'news.html') document.title = '新闻 | AIYA 科技系统';
    else if (pageName === 'connected-business-technology.html') document.title = '互联商业科技 | AIYA 新闻';
    else if (pageName === 'events.html') document.title = '活动 | AIYA 新闻';
    else if (pageName === 'stories.html') document.title = '故事 | AIYA 新闻';
    else if (pageName === 'financial-services-api-integration.html') document.title = '金融服务API技术对接 | AIYA 科技系统';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return /^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.parentElement?.tagName || '') || !node.nodeValue.trim()
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { node.nodeValue = translate(node.nodeValue); });
    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(element => {
      ['aria-label', 'title', 'placeholder'].forEach(attribute => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
      });
    });
  };

  const switchLanguage = next => {
    const selected = supportedLanguages.has(next) ? next : 'en';
    try { window.localStorage.setItem('aiya-language-v2', selected); } catch (_) {}
    const url = new URL(window.location.href);
    if (selected === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', selected);
    window.location.assign(url.toString());
  };

  const injectSwitches = () => {
    const labels = { en: 'English', zh: '中文', ko: '한국어' };
    const makeSelector = extraClass => {
      const selector = document.createElement('div');
      selector.className = `language-selector ${extraClass}`.trim();

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'language-switch';
      trigger.setAttribute('aria-label', 'Switch language');
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = `<span>${labels[language]}</span><i aria-hidden="true">⌄</i>`;

      const menu = document.createElement('div');
      menu.className = 'language-menu';
      menu.setAttribute('role', 'listbox');
      menu.setAttribute('aria-label', 'Languages');
      menu.hidden = true;

      const close = restoreFocus => {
        menu.hidden = true;
        selector.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        if (restoreFocus) trigger.focus();
      };

      Object.entries(labels).forEach(([code, label]) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.setAttribute('role', 'option');
        option.dataset.language = code;
        option.textContent = label;
        option.setAttribute('aria-selected', String(code === language));
        if (code === language) {
          option.setAttribute('aria-current', 'true');
          option.disabled = true;
        }
        option.addEventListener('click', () => switchLanguage(code));
        menu.append(option);
      });

      trigger.addEventListener('click', () => {
        const willOpen = menu.hidden;
        menu.hidden = !willOpen;
        selector.classList.toggle('open', willOpen);
        trigger.setAttribute('aria-expanded', String(willOpen));
        if (willOpen) menu.querySelector('[data-language]:not(:disabled)')?.focus();
      });
      document.addEventListener('pointerdown', event => {
        if (!selector.contains(event.target)) close(false);
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !menu.hidden) close(true);
      });

      selector.append(trigger, menu);
      return selector;
    };
    const actions = document.querySelector('.header-actions');
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');
    if (actions) actions.prepend(makeSelector('language-selector-desktop'));
    if (nav) nav.append(makeSelector('language-selector-mobile'));
    if (!actions && !nav && header) header.insertBefore(makeSelector('language-selector-standalone'), header.lastElementChild);
  };

  window.aiyaI18n = { language, t: translate, applyDocument, switchLanguage };
  translateCatalog(window.aiyaCatalog);
  normalizeChineseCatalog(window.aiyaCatalog);
  applyDocument();
  applySolutionDetail();
  injectSwitches();
})();
