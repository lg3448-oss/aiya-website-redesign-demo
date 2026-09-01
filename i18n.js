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
    'White Label Products': '白标产品', 'AIYA-BUILT PLATFORMS': 'AIYA 打造的平台',
    'AIYA Online Order': 'AIYA 在线点单', 'AIYA Travel Ticketing': 'AIYA 旅行票务', 'AIYA CRM': 'AIYA 客户关系管理', 'AIYA Gaming': 'AIYA 游戏系统', 'AIYA ERP': 'AIYA 企业资源管理',
    'Launch customizable AIYA-built products with your brand, workflows, and connected business systems.': '使用您的品牌、工作流程和已连接的业务系统，推出可定制的 AIYA 产品。',
    'Brand-ready product experience': '可直接体现品牌的产品体验', 'Configured business workflows': '配置完成的业务流程', 'Connected data, payments, and operations': '已连接的数据、支付与运营',
    'Launching a branded digital product': '推出品牌化数字产品', 'Replacing disconnected operating tools': '替换分散的运营工具', 'Starting from a proven customizable platform': '从经过验证的可定制平台开始',
    'Plan and run connected marketing that aligns your brand, campaigns, and customer journeys.': '规划并开展互联营销，使品牌、活动与客户旅程保持一致。',
    'Growth Strategy': '增长战略', 'Content and Campaigns': '内容与营销活动', 'AIYA Gift Card & Loyalty Points': 'AIYA 礼品卡与会员积分',
    'Digital growth planning': '数字化增长规划', 'Campaign creative and execution': '活动创意与执行', 'Gift-card customer experiences': '礼品卡客户体验',
    'Launching a new offer': '推出新产品', 'Connecting marketing with conversion': '连接营销与转化', 'Building repeat-customer programs': '建立复购客户计划',
    'Create a branded online ordering experience connected to the way your business fulfills and serves customers.': '打造与业务履约和客户服务方式相连的品牌化在线点单体验。',
    'Branded Online Ordering': '品牌化在线点单', 'Order and Fulfillment Workflows': '订单与履约流程', 'Payment and Customer Connections': '支付与客户连接',
    'Configured online ordering experience': '配置完成的在线点单体验', 'Connected order management workflows': '已连接的订单管理流程', 'Integrated payment and customer data': '集成的支付与客户数据',
    'Launching online ordering': '上线在线点单', 'Replacing disconnected ordering tools': '替换分散的点单工具', 'Connecting orders with business operations': '将订单与业务运营连接',
    'Launch a branded ticketing platform for travel services, bookings, and connected customer operations.': '为旅行服务、预订和互联客户运营推出品牌化票务平台。',
    'Travel Booking Experiences': '旅行预订体验', 'Ticketing and Reservation Workflows': '票务与预订流程', 'Customer and Payment Connections': '客户与支付连接',
    'Branded travel ticketing experience': '品牌化旅行票务体验', 'Configured booking workflows': '配置完成的预订流程', 'Connected payment and operational data': '已连接的支付与运营数据',
    'Launching a travel booking platform': '推出旅行预订平台', 'Modernizing ticketing workflows': '升级票务工作流程', 'Connecting reservations with customer operations': '将预订与客户运营连接',
    'Configure connected CRM systems that give sales, service, and operations teams a shared customer view.': '配置互联 CRM 系统，为销售、服务和运营团队提供统一的客户视图。',
    'CRM Architecture': 'CRM 架构', 'Workflow Configuration': '工作流程配置', 'Customer Data Integration': '客户数据集成',
    'Configured CRM workspace': '配置完成的 CRM 工作区', 'Sales and service workflows': '销售与服务流程', 'Connected customer data model': '已连接的客户数据模型',
    'Organizing lead and account activity': '整理潜在客户与账户活动', 'Improving customer follow-up': '改进客户跟进', 'Connecting CRM with existing business tools': '将 CRM 与现有业务工具连接',
    'Create a branded gaming platform with connected player, payment, and operational workflows.': '打造具有互联玩家、支付与运营流程的品牌化游戏平台。',
    'Player Experiences': '玩家体验', 'Game and Membership Workflows': '游戏与会员工作流程', 'Payment and Engagement Connections': '支付与参与度连接',
    'Branded gaming experience': '品牌化游戏体验', 'Configured player workflows': '配置完成的玩家工作流程', 'Connected payment and engagement data': '已连接的支付与参与度数据',
    'Launching a gaming platform': '推出游戏平台', 'Modernizing player operations': '升级玩家运营', 'Connecting engagement with revenue workflows': '将参与度与营收工作流程连接',
    'Unify core business processes in a branded ERP platform configured for your operational model.': '在适配您的运营模式的品牌化 ERP 平台中统一核心业务流程。',
    'Operational Workflows': '运营工作流程', 'Business Data Management': '业务数据管理', 'Connected Finance and Inventory': '已连接的财务与库存',
    'Configured ERP workspace': '配置完成的 ERP 工作区', 'Connected business workflows': '已连接的业务工作流程', 'Operational reporting foundation': '运营报表基础',
    'Centralizing business data': '集中管理业务数据', 'Improving operational visibility': '提升运营可视性',
    'PRODUCT INTERFACE': '产品界面', 'See the product experience': '查看产品体验', 'A current interface example that can be adapted around brand and workflow requirements.': '可根据品牌与工作流程需求进行调整的当前界面示例。',
    'AIYA Marketing interface example': 'AIYA 营销界面示例', 'AIYA Online Order interface example': 'AIYA 在线点单界面示例', 'AIYA Travel Ticketing interface example': 'AIYA 旅行票务界面示例',
    '© 2026 AIYA Technology System, LLC': '© 2026 AIYA 科技系统有限公司', '100 East Broadway 12 FL New York NY 10002': '美国纽约州纽约市东百老汇街100号12层，邮编10002'
  };

  const ko = {
    'Home': '홈', 'Products': '제품', 'Services': '서비스', 'Solutions': '솔루션', 'News': '뉴스', 'Company': '회사 소개', 'Contact': '문의',
    'Under Construction': '준비 중', 'News and updates are coming soon.': '뉴스와 새로운 소식을 곧 만나보실 수 있습니다.', 'Return Home': '홈으로 돌아가기',
    'AIYA NEWS': 'AIYA 뉴스', 'AIYA News': 'AIYA 뉴스', 'AIYA Events': 'AIYA 이벤트', 'AIYA Stories': 'AIYA 스토리',
    'LATEST ARTICLE': '최신 기사', 'Building the next chapter of connected business technology': '연결형 비즈니스 기술의 다음 장을 열다',
    'A look at how AIYA is bringing software, payments, automation, and customer operations into one connected experience.': 'AIYA가 소프트웨어, 결제, 자동화, 고객 운영을 하나의 연결된 경험으로 통합하는 방식을 소개합니다.',
    'Read Article': '기사 읽기', 'Read the latest AIYA article': 'AIYA 최신 기사 읽기',
    'MORE FROM AIYA': 'AIYA의 더 많은 소식', 'Events and stories': '이벤트와 스토리', 'EVENTS': '이벤트', 'STORIES': '스토리',
    'Meet AIYA at upcoming events': '다가오는 이벤트에서 AIYA를 만나보세요', 'Stories from connected businesses': '연결된 비즈니스의 이야기', 'Learn More': '자세히 보기',
    'Explore upcoming conversations, demonstrations, and opportunities to connect with the AIYA team.': '다가오는 대화, 데모, AIYA 팀과 만날 수 있는 기회를 확인하세요.',
    'See how connected software, payments, and operations can support practical business progress.': '연결된 소프트웨어, 결제, 운영이 실질적인 비즈니스 성장을 지원하는 방식을 확인하세요.',
    'Back to News': '뉴스로 돌아가기',
    'AIYA is creating a clearer way for businesses to connect the software, payment experiences, customer tools, and operational workflows they use every day.': 'AIYA는 기업이 매일 사용하는 소프트웨어, 결제 경험, 고객 도구, 운영 워크플로를 더욱 명확하게 연결할 수 있도록 지원합니다.',
    'One connected direction': '하나로 연결된 방향',
    'Instead of treating every business need as a separate tool, AIYA brings related capabilities together around the customer journey and the work teams need to complete.': 'AIYA는 각각의 비즈니스 요구를 별도 도구로 다루는 대신 고객 여정과 팀의 실제 업무를 중심으로 관련 기능을 통합합니다.',
    'Designed for practical progress': '실질적인 성과를 위한 설계',
    'The goal is a technology foundation that can begin with a focused need and expand as the business, customer experience, and operating model evolve.': '명확한 요구에서 시작해 비즈니스, 고객 경험, 운영 모델의 발전에 따라 확장할 수 있는 기술 기반을 구축하는 것이 목표입니다.',
    'This page will feature upcoming AIYA events, demonstrations, industry conversations, and opportunities to meet the team.': '이 페이지에서는 예정된 AIYA 이벤트, 데모, 업계 대화 및 팀과 만날 수 있는 기회를 소개합니다.',
    'Event calendar in preparation': '이벤트 일정 준비 중',
    'Confirmed dates, locations, registration details, and event recaps will be published here as they become available.': '확정된 날짜, 장소, 등록 정보 및 이벤트 리뷰가 준비되는 대로 이곳에 게시됩니다.',
    'This page will share approved customer stories and practical perspectives on connected software, payments, automation, and growth.': '이 페이지에서는 승인된 고객 사례와 연결형 소프트웨어, 결제, 자동화 및 성장에 관한 실질적인 관점을 공유합니다.',
    'Stories are being prepared': '스토리 준비 중',
    'Customer names, outcomes, and supporting details will be added after company and customer approval.': '고객명, 성과 및 관련 세부 정보는 회사와 고객의 승인을 받은 후 추가됩니다.',
    'Sign in': '로그인', 'Talk to our team': '팀에 문의하기', 'Talk to Our Team': '팀에 문의하기', 'Talk to Us': '문의하기',
    'View All Products': '모든 제품 보기', 'View All Services': '모든 서비스 보기', 'View All Solutions': '모든 솔루션 보기', 'overview': '개요',
    'Open navigation': '내비게이션 열기', 'Main navigation': '메인 내비게이션', 'Primary navigation': '주요 내비게이션',
    'Products menu': '제품 메뉴', 'Services menu': '서비스 메뉴', 'Solutions menu': '솔루션 메뉴',
    'Toggle products menu': '제품 메뉴 전환', 'Toggle services menu': '서비스 메뉴 전환', 'Toggle solutions menu': '솔루션 메뉴 전환',
    'AI-Powered Software': 'AI 기반 소프트웨어', 'Built for Real Business': '실제 비즈니스를 위한 설계',
    'Automation, intelligent workflows, and scalable software designed around business needs.': '비즈니스 요구를 중심으로 설계된 자동화, 지능형 워크플로, 확장 가능한 소프트웨어입니다.',
    'Connected Payments': '연결형 결제', 'Powerful Integrations': '강력한 시스템 연동',
    'Secure payment APIs and connected systems that simplify business operations.': '안전한 결제 API와 연결된 시스템으로 비즈니스 운영을 간소화합니다.',
    'Scalable Platforms': '확장 가능한 플랫폼', 'Ready for Growth': '성장을 위한 준비',
    'Cloud-based digital platforms built to support modern and growing businesses.': '현대적이고 성장하는 비즈니스를 지원하도록 구축된 클라우드 기반 디지털 플랫폼입니다.',
    'Explore Solutions': '솔루션 살펴보기', 'The Vision Has No Limits': '비전에는 한계가 없습니다', 'Scroll to explore': '스크롤하여 살펴보기',
    'TECHNOLOGY CAPABILITIES': '기술 역량', 'Connected expertise': '연결된 전문성', 'One clear outcome': '하나의 명확한 성과',
    'Choose a capability to see how AIYA turns complex technology into practical business advantage.': '역량을 선택하고 AIYA가 복잡한 기술을 실질적인 비즈니스 경쟁력으로 전환하는 방식을 확인하세요.',
    'API and Connectivity': 'API 및 연결성', 'Integrations · Data connectivity · Payment APIs': '시스템 연동 · 데이터 연결 · 결제 API',
    'Payments and FinTech': '결제 및 핀테크', 'Processing · FinTech · Clover POS': '결제 처리 · 핀테크 · Clover POS',
    'AI and Automation': 'AI 및 자동화', 'AI software · Workflows · Intelligence': 'AI 소프트웨어 · 워크플로 · 인텔리전스',
    'Cloud and Enterprise': '클라우드 및 엔터프라이즈', 'Cloud · Enterprise · Transformation': '클라우드 · 엔터프라이즈 · 혁신',
    'FEATURED PRODUCT': '주요 제품', 'Self-Service Made Simple': '더 간편한 셀프서비스',
    'A streamlined self-ordering system that helps restaurants serve guests faster, reduce ordering friction, and keep every order connected.': '레스토랑이 고객을 더 빠르게 응대하고 주문 불편을 줄이며 모든 주문을 연결할 수 있도록 지원하는 효율적인 셀프 주문 시스템입니다.',
    'Self-Service Ordering': '셀프 주문', 'Customizable Menu': '맞춤형 메뉴', 'Integrated Payments': '통합 결제', 'POS Order Sync': 'POS 주문 동기화',
    'Explore AIYA Kiosk': 'AIYA 키오스크 살펴보기', 'Guest Order': '고객 주문', 'Secure Payment': '안전한 결제', 'POS Sync': 'POS 동기화',
    'AIYA PRODUCTS': 'AIYA 제품', 'One platform family': '하나의 플랫폼 제품군', 'Built around business': '비즈니스 중심 설계',
    'SERVICES': '서비스', 'Expertise where': '전문성이 만나는 곳', 'technology meets growth': '기술과 성장의 연결',
    'CONNECTED BY AIYA': 'AIYA로 연결', 'One Connected': '하나로 연결된', 'Technology Ecosystem': '기술 생태계',
    'APIs, payments, AI, and cloud software working together.': 'API, 결제, AI, 클라우드 소프트웨어가 함께 작동합니다.',
    'Customer': '고객', 'Applications': '애플리케이션', 'Online': '온라인', 'Ordering': '주문', 'Payment': '결제', 'Automation': '자동화',
    'Cloud': '클라우드', 'Systems': '시스템', 'Business': '비즈니스', 'Data': '데이터', 'Merchant': '판매자', 'ONE PLATFORM': '하나의 플랫폼',
    'WHY AIYA': 'AIYA를 선택하는 이유', 'Technology depth': '깊이 있는 기술력', 'Business perspective': '비즈니스 관점',
    'One team brings the strategy, engineering, payment knowledge, and operational understanding to move ideas forward.': '하나의 팀이 전략, 엔지니어링, 결제 전문성, 운영 이해를 결합해 아이디어를 현실로 발전시킵니다.',
    'In-house developers': '내부 개발자', 'Projects & cases': '프로젝트 및 사례', 'U.S. locations': '미국 내 거점',
    'End-to-End Technology': '엔드투엔드 기술', 'Payment Expertise': '결제 전문성', 'API Connectivity': 'API 연결',
    'AI-Powered Automation': 'AI 기반 자동화', 'Scalable Platforms': '확장 가능한 플랫폼', 'Business-Focused Solutions': '비즈니스 중심 솔루션',
    'RESULTS': '성과', 'Outcomes clients': '고객이 이해할 수 있는', 'can understand': '명확한 성과',
    'Presentation format for future approved customer stories.': '향후 승인된 고객 사례를 위한 프레젠테이션 형식입니다.',
    'Demo result · 01': '데모 결과 · 01', 'Placeholder · 02': '예시 · 02', 'Placeholder · 03': '예시 · 03', 'Placeholder · 04': '예시 · 04',
    'Faster Order Processing': '더 빠른 주문 처리', 'Simplified Operations': '간소화된 운영', 'Reduced Manual Workflow': '수작업 감소',
    'A connected order flow reduces handoffs from customer to merchant.': '연결된 주문 흐름으로 고객에서 판매자까지의 인계 단계를 줄입니다.',
    'Orders, menus, payments, and reporting become easier to manage.': '주문, 메뉴, 결제, 보고를 더 쉽게 관리할 수 있습니다.',
    'Secure payment infrastructure supports every digital channel.': '안전한 결제 인프라가 모든 디지털 채널을 지원합니다.',
    'Automation gives teams more time for customers and growth.': '자동화를 통해 팀은 고객과 성장에 더 많은 시간을 집중할 수 있습니다.',
    'All results shown in this prototype are demonstration content pending approved customer data.': '이 프로토타입에 표시된 모든 결과는 승인된 고객 데이터가 제공되기 전까지 데모 콘텐츠입니다.',
    'COMPANY': '회사 소개', 'Technology Built': '기술을 구축합니다', 'Around Business': '비즈니스를 중심으로',
    'AIYA creates connected software, payment solutions, and digital platforms that help businesses operate more efficiently and grow with confidence.': 'AIYA는 기업이 더 효율적으로 운영하고 자신 있게 성장할 수 있도록 연결형 소프트웨어, 결제 솔루션, 디지털 플랫폼을 구축합니다.',
    'Meet AIYA': 'AIYA 소개', 'Strategy': '전략', 'Software': '소프트웨어', 'Growth': '성장',
    'START A CONVERSATION': '대화 시작하기', 'Let’s Build': '함께 만들어갑니다', 'What Comes Next': '다음 단계',
    'Bring us the business challenge. We’ll help define the connected technology behind the solution.': '비즈니스 과제를 알려주세요. 솔루션을 뒷받침할 연결형 기술을 함께 정의하겠습니다.',
    'USA Office': '미국 사무소', 'Phone': '전화', 'Email': '이메일', 'Trusted by businesses across industries': '다양한 산업의 기업이 신뢰합니다',
    'Back to top': '맨 위로', 'All rights reserved.': '모든 권리 보유.',
    'Payments & Commerce': '결제 및 커머스', 'Billing & Revenue': '청구 및 매출', 'Treasury & Finance': '자금 및 재무',
    'Platforms & Marketplaces': '플랫폼 및 마켓플레이스', 'Trust & Business Tools': '신뢰 및 비즈니스 도구',
    'Accept payments, build checkout experiences, and connect online and in-person commerce.': '결제를 수락하고 체크아웃 경험을 구축하며 온라인과 오프라인 커머스를 연결합니다.',
    'Manage recurring, usage-based, and invoice revenue with connected reporting and finance data.': '연결된 보고 및 재무 데이터로 정기, 사용량 기반, 인보이스 매출을 관리합니다.',
    'Build payments, financial services, and commerce infrastructure for platforms and marketplaces.': '플랫폼과 마켓플레이스를 위한 결제, 금융 서비스, 커머스 인프라를 구축합니다.',
    'Protect transactions, verify customers, connect business data, and support product growth.': '거래를 보호하고 고객을 인증하며 비즈니스 데이터를 연결해 제품 성장을 지원합니다.',
    'AIYA Payments': 'AIYA 결제', 'Payment Operations': '결제 운영', 'Smart Payment Links': '스마트 결제 링크', 'AIYA Checkout': 'AIYA 체크아웃',
    'Embedded Payment UI': '임베디드 결제 UI', 'Payment Method Hub': '결제 수단 허브', 'In-Person Payments': '대면 결제',
    'Approval Optimization': '승인율 최적화', 'Fast Checkout': '빠른 체크아웃', 'Financial Data Connect': '금융 데이터 연결',
    'Online Storefront': '온라인 스토어', 'Catalog & Inventory': '카탈로그 및 재고', 'Customer Accounts': '고객 계정',
    'B2B & Global Commerce': 'B2B 및 글로벌 커머스', 'AIYA Billing': 'AIYA 청구', 'Usage Billing': '사용량 기반 청구',
    'Subscription Management': '구독 관리', 'AIYA Invoicing': 'AIYA 인보이스', 'Tax Automation': '세금 자동화',
    'Revenue Accounting': '매출 회계', 'Revenue Analytics': '매출 분석', 'Finance Data Pipeline': '재무 데이터 파이프라인',
    'Treasury Operations': '자금 운영', 'Global Payouts': '글로벌 지급', 'Financial Services API Integration': '금융 서비스 API 연동',
    'Digital Asset Infrastructure': '디지털 자산 인프라', 'Digital Asset Onramp': '디지털 자산 온램프', 'AIYA Connect': 'AIYA 커넥트',
    'Embedded Treasury': '임베디드 자금 관리', 'Marketplace Commerce': '마켓플레이스 커머스', 'Fraud & Risk': '사기 및 위험 관리',
    'Identity Verification': '신원 인증', 'Product Strategy': '제품 전략', 'Business Launch Systems': '비즈니스 출시 시스템',
    'Sustainability Integrations': '지속가능성 연동', 'Growth Strategy': '성장 전략', 'Content & Campaigns': '콘텐츠 및 캠페인',
    'AIYA Gift Card & Loyalty Points': 'AIYA 기프트카드 및 로열티 포인트',
    'Online payment processing': '온라인 결제 처리', 'Managed payment workflows': '관리형 결제 워크플로', 'No-code payment collection': '노코드 결제 수금',
    'Custom checkout experiences': '맞춤형 체크아웃 경험', 'Flexible payment components': '유연한 결제 구성 요소', 'Connected payment methods': '연결된 결제 수단',
    'Connected point-of-sale payments': '연결형 POS 결제', 'Payment acceptance improvements': '결제 승인 개선', 'Accelerated repeat checkout': '간편한 재구매 체크아웃',
    'Linked financial account data': '연결된 금융 계정 데이터', 'Custom digital storefronts': '맞춤형 디지털 스토어', 'Connected product operations': '연결된 상품 운영',
    'Customer identity and history': '고객 신원 및 이력', 'Business buying across markets': '시장 간 B2B 구매', 'Recurring revenue operations': '반복 매출 운영',
    'Metered and usage-based billing': '계량 및 사용량 기반 청구', 'Subscription lifecycle workflows': '구독 수명주기 워크플로',
    'One-time and recurring invoices': '일회성 및 정기 인보이스', 'Sales tax and VAT integrations': '판매세 및 VAT 연동',
    'Revenue recognition workflows': '매출 인식 워크플로', 'Custom revenue reporting': '맞춤형 매출 보고',
    'Revenue and finance data sync': '매출 및 재무 데이터 동기화', 'Connected business finance workflows': '연결된 비즈니스 재무 워크플로',
    'Payouts to third parties': '제3자 지급', 'Third-party financial service system connectivity': '제3자 금융 서비스 시스템 연결',
    'Wallet and digital asset systems': '지갑 및 디지털 자산 시스템', 'Embeddable purchase experiences': '임베드 가능한 구매 경험',
    'Payments for platforms': '플랫폼 결제', 'Embedded financial service workflows': '임베디드 금융 서비스 워크플로',
    'Customer credit for purchases with your business': '비즈니스 구매를 위한 고객 크레딧', 'Multi-party commerce operations': '다자간 커머스 운영',
    'Fraud prevention workflows': '사기 방지 워크플로', 'Online identity workflows': '온라인 신원 워크플로',
    'Roadmaps and launch planning': '로드맵 및 출시 계획', 'Digital foundations for new ventures': '신규 사업을 위한 디지털 기반',
    'Connected climate and impact data': '연결된 기후 및 영향 데이터', 'Connected acquisition planning': '연결형 고객 확보 계획',
    'Creative campaign execution': '크리에이티브 캠페인 실행', 'Gift balances and repeat-customer rewards': '기프트 잔액 및 재구매 고객 리워드',
    'Connect payouts, treasury workflows, financial service APIs, and digital asset infrastructure to business operations.': '지급, 자금 워크플로, 금융 서비스 API, 디지털 자산 인프라를 비즈니스 운영과 연결합니다.',
    'TECHNOLOGY INFRASTRUCTURE': '기술 인프라', 'Technology Infrastructure for Financial Service Connectivity': '금융 서비스 연결을 위한 기술 인프라',
    'Connect software platforms with independent third-party financial service providers through secure APIs and system integrations. AIYA provides software development, API connectivity, data integration, workflow automation, and technical support only. AIYA does not offer, arrange, broker, refer, approve, service, or fund any loan or financing product.': '안전한 API와 시스템 연동을 통해 소프트웨어 플랫폼을 독립적인 제3자 금융 서비스 제공업체와 연결합니다. AIYA는 소프트웨어 개발, API 연결, 데이터 통합, 워크플로 자동화 및 기술 지원만 제공합니다. AIYA는 대출 또는 금융 상품을 제공, 주선, 중개, 추천, 승인, 관리하거나 자금을 지원하지 않습니다.',
    'API integration': 'API 연동', 'Secure data connectivity': '안전한 데이터 연결', 'Testing and technical support': '테스트 및 기술 지원',
    'AIYA helps businesses, software platforms, and financial service providers connect their systems through secure APIs, data integrations, and customized software workflows.': 'AIYA는 기업, 소프트웨어 플랫폼, 금융 서비스 제공업체가 안전한 API, 데이터 통합, 맞춤형 소프트웨어 워크플로를 통해 시스템을 연결하도록 지원합니다.',
    'Our role is strictly limited to technology development and system integration. AIYA does not provide or participate in lending or financing activities.': 'AIYA의 역할은 기술 개발과 시스템 연동으로 엄격히 제한됩니다. AIYA는 대출 또는 금융 활동을 제공하거나 이에 참여하지 않습니다.',
    'Explore API Integration': 'API 연동 살펴보기', 'Contact Our Integration Team': '연동 팀에 문의하기',
    'Secure financial service API and system connectivity': '안전한 금융 서비스 API 및 시스템 연결', 'API / DATA / WORKFLOWS': 'API / 데이터 / 워크플로',
    'OUR TECHNOLOGY SERVICES': '기술 서비스', 'Technical connections built around independently operated systems': '독립 운영 시스템을 중심으로 구축한 기술 연결',
    'API Integration': 'API 연동',
    'Connect eligible business applications with APIs made available by independent third-party financial service providers.': '적격 비즈니스 애플리케이션을 독립적인 제3자 금융 서비스 제공업체가 제공하는 API와 연결합니다.',
    'Custom Software Development': '맞춤형 소프트웨어 개발',
    'Develop user interfaces, dashboards, data connections, and operational tools based on the client’s technical requirements.': '고객의 기술 요구사항에 따라 사용자 인터페이스, 대시보드, 데이터 연결 및 운영 도구를 개발합니다.',
    'Data Connectivity': '데이터 연결', 'Support the secure transmission of authorized data between independently operated systems.': '독립적으로 운영되는 시스템 간 승인된 데이터의 안전한 전송을 지원합니다.',
    'Workflow Automation': '워크플로 자동화', 'Build technical workflows for document submission, application-status updates, notifications, and reporting.': '문서 제출, 신청 상태 업데이트, 알림 및 보고를 위한 기술 워크플로를 구축합니다.',
    'Testing and Technical Support': '테스트 및 기술 지원',
    'Assist with API testing, sandbox environments, implementation, troubleshooting, and ongoing technical maintenance.': 'API 테스트, 샌드박스 환경, 구현, 문제 해결 및 지속적인 기술 유지보수를 지원합니다.',
    'View Integration Capabilities': '연동 역량 보기', 'WHO WE SERVE': '지원 대상',
    'Built for teams connecting financial service technology': '금융 서비스 기술을 연결하는 팀을 위한 설계',
    'Financial technology companies': '핀테크 기업', 'Banks and regulated financial institutions': '은행 및 규제 금융기관',
    'Independent financing providers': '독립 금융 제공업체', 'SaaS and software platforms': 'SaaS 및 소프트웨어 플랫폼',
    'Marketplaces': '마켓플레이스', 'Payment companies': '결제 기업',
    'Businesses requiring third-party financial system integrations': '제3자 금융 시스템 연동이 필요한 기업',
    'AIYA’S ROLE': 'AIYA의 역할', 'Software development and technology integration only': '소프트웨어 개발 및 기술 연동에 한정',
    'AIYA acts solely as a software developer and technology integration provider.': 'AIYA는 소프트웨어 개발 및 기술 연동 제공업체로서만 역할을 수행합니다.',
    'AIYA does not:': 'AIYA는 다음 업무를 수행하지 않습니다:', 'Offer loans or financing': '대출 또는 금융 제공',
    'Accept financing applications on its own behalf': '자체 명의의 금융 신청 접수', 'Recommend or refer applicants to lenders': '신청자를 대출기관에 추천 또는 소개',
    'Arrange or broker financing transactions': '금융 거래 주선 또는 중개', 'Evaluate creditworthiness': '신용도 평가', 'Perform underwriting': '인수 심사',
    'Approve or decline applications': '신청 승인 또는 거절', 'Determine interest rates, fees, or financing terms': '이자율, 수수료 또는 금융 조건 결정',
    'Make lending or credit decisions': '대출 또는 신용 결정', 'Provide or advance loan funds': '대출 자금 제공 또는 선지급',
    'Collect loan payments': '대출 상환금 수금', 'Service or manage loans': '대출 관리', 'Guarantee approval or funding': '승인 또는 자금 제공 보장',
    'Assume credit or repayment risk': '신용 또는 상환 위험 부담',
    'IMPORTANT TECHNOLOGY SERVICES DISCLOSURE': '중요 기술 서비스 고지', 'Technology services with clearly defined boundaries': '명확한 범위의 기술 서비스',
    'AIYA Technology System LLC is a technology and software integration company. AIYA is not a bank, lender, financing provider, loan broker, financing broker, or credit services provider.': 'AIYA Technology System LLC는 기술 및 소프트웨어 연동 회사입니다. AIYA는 은행, 대출기관, 금융 제공업체, 대출 중개업체, 금융 중개업체 또는 신용 서비스 제공업체가 아닙니다.',
    'AIYA does not offer, arrange, broker, refer, approve, service, or fund loans or other financing products. AIYA does not make credit decisions and does not participate in any financing agreement between a financial service provider and its customer.': 'AIYA는 대출 또는 기타 금융 상품을 제공, 주선, 중개, 추천, 승인, 관리하거나 자금을 지원하지 않습니다. AIYA는 신용 결정을 내리지 않으며 금융 서비스 제공업체와 고객 간의 어떠한 금융 계약에도 참여하지 않습니다.',
    'Any financial products displayed or accessed through an integrated third-party system are independently offered, reviewed, approved, funded, and administered by the applicable third-party provider. The third-party provider is solely responsible for its products, eligibility requirements, disclosures, pricing, fees, terms, regulatory obligations, customer agreements, and servicing activities.': '연동된 제3자 시스템을 통해 표시되거나 이용되는 모든 금융 상품은 해당 제3자 제공업체가 독립적으로 제공, 검토, 승인, 자금 지원 및 관리합니다. 제3자 제공업체는 자사 상품, 자격 요건, 고지, 가격, 수수료, 조건, 규제 의무, 고객 계약 및 관리 활동에 대해 전적인 책임을 집니다.',
    'AIYA’s services are limited to software development, API connectivity, data integration, workflow automation, implementation, and technical support.': 'AIYA의 서비스는 소프트웨어 개발, API 연결, 데이터 통합, 워크플로 자동화, 구현 및 기술 지원으로 제한됩니다.',
    'TECHNICAL CONSULTATION': '기술 상담', 'Connect your systems with a clearly scoped integration plan.': '범위가 명확한 연동 계획으로 시스템을 연결하세요.',
    'Request Technical Consultation': '기술 상담 요청',
    'Software Engineering': '소프트웨어 엔지니어링', 'Integration & Automation': '연동 및 자동화', 'Product & Experience Design': '제품 및 경험 디자인',
    'Web & Mobile Development': '웹 및 모바일 개발', 'Ecommerce Platform Development': '이커머스 플랫폼 개발',
    'Enterprise & Cloud Platforms': '엔터프라이즈 및 클라우드 플랫폼', 'Performance & Reliability': '성능 및 안정성',
    'API, Data & Payment Integration': 'API, 데이터 및 결제 연동', 'AI & Workflow Automation': 'AI 및 워크플로 자동화',
    'CRM Systems': 'CRM 시스템', 'Digital Marketing': '디지털 마케팅', 'SEO & Content': 'SEO 및 콘텐츠', 'Campaign Development': '캠페인 개발',
    'Plan, design, build, and strengthen reliable digital products on one engineering foundation.': '하나의 엔지니어링 기반에서 신뢰할 수 있는 디지털 제품을 기획, 설계, 구축하고 강화합니다.',
    'Connect systems and automate repetitive work across the business.': '비즈니스 전반의 시스템을 연결하고 반복 업무를 자동화합니다.',
    'Bring brand, content, and campaigns together around measurable customer action.': '측정 가능한 고객 행동을 중심으로 브랜드, 콘텐츠, 캠페인을 통합합니다.',
    'By Industry': '산업별', 'By Use Case': '활용 사례별', 'Food & Hospitality': '외식 및 호스피탈리티', 'Retail': '리테일',
    'Beauty, Wellness & Fitness': '뷰티, 웰니스 및 피트니스', 'Healthcare & Education': '헬스케어 및 교육', 'Automotive': '자동차',
    'Home & Field Services': '홈 및 현장 서비스', 'Professional Services': '전문 서비스', 'Entertainment': '엔터테인먼트',
    'Manufacturing & Wholesale': '제조 및 도매', 'Digital & Agentic Commerce': '디지털 및 에이전틱 커머스', 'Crypto': '크립토',
    'Embedded Finance & Payments': '임베디드 금융 및 결제', 'Finance Automation & Management': '재무 자동화 및 관리',
    'Global Business': '글로벌 비즈니스', 'Platforms & SaaS': '플랫폼 및 SaaS',
    'Restaurants, cafes, hotels, venues, and guest experiences.': '레스토랑, 카페, 호텔, 행사장 및 고객 경험.',
    'Grocery, convenience, specialty, and consumer retail.': '식료품, 편의점, 전문점 및 소비자 리테일.',
    'Salons, spas, studios, gyms, and membership businesses.': '살롱, 스파, 스튜디오, 피트니스 센터 및 멤버십 비즈니스.',
    'Clinics, care providers, schools, and training organizations.': '클리닉, 케어 제공업체, 학교 및 교육 기관.',
    'Repair, car care, dealerships, parts, and EV services.': '정비, 차량 관리, 딜러십, 부품 및 전기차 서비스.',
    'HVAC, plumbing, electrical, construction, and mobile teams.': '냉난방, 배관, 전기, 건설 및 이동형 현장 팀.',
    'Accounting, legal, insurance, real estate, and consulting.': '회계, 법률, 보험, 부동산 및 컨설팅.',
    'Arcades, theaters, recreation, ticketing, and venues.': '오락실, 극장, 레저, 티켓 및 행사장.',
    'Manufacturers, distributors, warehousing, and logistics.': '제조업체, 유통업체, 창고 및 물류.',
    'Connect online buying with AI-assisted discovery and action.': '온라인 구매를 AI 기반 탐색 및 실행과 연결합니다.',
    'Build digital asset payment and infrastructure experiences.': '디지털 자산 결제 및 인프라 경험을 구축합니다.',
    'Add payments and financial capabilities inside digital products.': '디지털 제품 안에 결제 및 금융 기능을 추가합니다.',
    'Connect billing, reporting, reconciliation, and financial visibility.': '청구, 보고, 정산 및 재무 가시성을 연결합니다.',
    'Support connected commerce and operations across markets.': '여러 시장의 연결형 커머스와 운영을 지원합니다.',
    'Connect buyers, sellers, payments, and multi-party operations.': '구매자, 판매자, 결제 및 다자간 운영을 연결합니다.',
    'Build, monetize, and operate scalable software platforms.': '확장 가능한 소프트웨어 플랫폼을 구축하고 수익화하며 운영합니다.',
    'AIYA SOLUTIONS': 'AIYA 솔루션', 'Built around': '중심으로 설계', 'how business works': '실제 비즈니스 운영 방식',
    'Explore connected technology by industry or by the outcome your business needs to achieve.': '산업 또는 달성하려는 비즈니스 성과에 따라 연결형 기술을 살펴보세요.',
    'Solutions sections': '솔루션 섹션', 'BY INDUSTRY': '산업별', 'BY USE CASE': '활용 사례별',
    'Technology shaped for': '기술을 설계합니다', 'the way your industry operates': '산업의 실제 운영 방식에 맞춰',
    'Industry groupings are designed as demo navigation and can be refined as AIYA confirms its final market coverage.': '산업 분류는 데모 내비게이션용이며 AIYA의 최종 시장 범위가 확정되면 조정할 수 있습니다.',
    'Start with the outcome': '성과에서 시작하세요', 'Connect products and services around a clear operational, commercial, or financial goal.': '명확한 운영, 상업 또는 재무 목표를 중심으로 제품과 서비스를 연결합니다.',
    'NEED A DIFFERENT FIT?': '다른 구성이 필요하신가요?', 'Tell us how your business operates.': '비즈니스 운영 방식을 알려주세요.', 'Explore solution': '솔루션 살펴보기',
    'All Products': '모든 제품', 'All Services': '모든 서비스', 'All Industries': '모든 산업', 'All Use Cases': '모든 활용 사례',
    'Explore Product': '제품 살펴보기', 'Explore Service': '서비스 살펴보기', 'CORE CAPABILITIES': '핵심 역량',
    'Three ways this product moves work forward': '이 제품이 업무를 발전시키는 세 가지 방식',
    'Three ways this service moves work forward': '이 서비스가 업무를 발전시키는 세 가지 방식',
    'Focused capabilities that can be configured around the way your business operates.': '비즈니스 운영 방식에 맞게 구성할 수 있는 핵심 역량입니다.',
    'WHAT AIYA CAN BUILD': 'AIYA가 구축할 수 있는 것', 'Designed around your operation': '운영 방식을 중심으로 설계',
    'BEST FOR': '적합한 활용 분야', 'Where it creates value': '가치를 만드는 영역', 'CONNECTED PRODUCTS': '연결된 제품', 'RELATED SERVICES': '관련 서비스',
    'Build a broader AIYA system': '더 넓은 AIYA 시스템 구축', 'Bring the right team together': '적합한 팀을 하나로 연결',
    'Explore related capabilities from the same product family.': '같은 제품군의 관련 역량을 살펴보세요.',
    'Explore complementary expertise for planning, building, and growing your next initiative.': '다음 프로젝트의 기획, 구축, 성장을 위한 상호 보완적 전문성을 살펴보세요.',
    'DEMO PRODUCT CONTENT': '제품 데모 콘텐츠', 'DEMO SERVICE CONTENT': '서비스 데모 콘텐츠',
    'Explore how this capability could fit your business.': '이 역량이 비즈니스에 어떻게 적용될 수 있는지 알아보세요.',
    'FUTURE CHAT PREVIEW': '향후 채팅 기능 미리보기', 'Have a question?': '궁금한 점이 있으신가요?', 'Tell our team what you are building.': '구축하려는 내용을 팀에 알려주세요.',
    'AIYA ACCOUNT ACCESS': 'AIYA 계정 접속', 'One place for': '하나의 공간에서', 'connected work': '연결된 업무',
    'The customer portal is represented here for design review. Authentication and account functionality will be connected during production development.': '이 고객 포털은 디자인 검토용으로 표시됩니다. 인증 및 계정 기능은 실제 개발 단계에서 연결됩니다.',
    'DEMO PORTAL': '데모 포털', 'Work email': '업무용 이메일', 'Continue': '계속',
    'Portal access is not active in this frontend demo.': '이 프런트엔드 데모에서는 포털 접속이 활성화되어 있지 않습니다.',
    'Request access from AIYA': 'AIYA에 접속 요청', 'Back to website': '웹사이트로 돌아가기',
    'INDUSTRY SOLUTION': '산업 솔루션', 'USE CASE': '활용 사례', 'WHAT THIS SOLUTION CONNECTS': '이 솔루션이 연결하는 역량',
    'A focused system,': '집중된 하나의 시스템,', 'not a list of disconnected tools': '분리된 도구의 나열이 아닙니다', 'BUSINESS OUTCOMES': '비즈니스 성과',
    'Designed around': '중심으로 설계', 'work that needs to move': '앞으로 나아가야 할 업무',
    'CONNECTED AIYA PRODUCTS & SERVICES': '연결된 AIYA 제품 및 서비스', 'CONNECTED AIYA CAPABILITY': '연결된 AIYA 역량',
    'Build the right capability mix': '적합한 역량 조합 구축',
    'These related AIYA capabilities provide a starting point for this demo solution.': '관련 AIYA 역량은 이 데모 솔루션을 위한 출발점을 제공합니다.',
    'START WITH YOUR OPERATING MODEL': '운영 모델에서 시작하세요', 'Shape this solution around your business.': '비즈니스에 맞게 이 솔루션을 구성하세요.',
    'AIYA contact preview': 'AIYA 문의 기능 미리보기', 'Demo preview of a future AIYA customer support chat': '향후 AIYA 고객 지원 채팅 기능 데모 미리보기',
    'AIYA TECHNOLOGY SYSTEM': 'AIYA 기술 시스템', 'AIYA Kiosk': 'AIYA 키오스크', 'AIYA Commerce': 'AIYA 커머스', 'AIYA Revenue': 'AIYA 매출', 'AIYA Marketing': 'AIYA 마케팅',
    'CONNECTED': '연결', 'CONNECTED BY': '연결 플랫폼', 'PLATFORM': '플랫폼', 'PLATFORMS': '플랫폼', 'PAYMENTS': '결제',
    'WORKFLOWS': '워크플로', 'INSIGHTS': '인사이트', 'SCALE': '확장', 'GROWTH': '성장', 'SECURITY': '보안', 'FINTECH': '핀테크', 'CLOVER': 'Clover', 'PAY': '결제',
    'Payments and Commerce capabilities': '결제 및 커머스 역량', 'Product categories': '제품 카테고리', 'Service categories': '서비스 카테고리',
    'AIYA connected technology ecosystem': 'AIYA 연결형 기술 생태계',
    'Connected AI, API, payments, and cloud platform visualization': '연결된 AI, API, 결제 및 클라우드 플랫폼 시각화',
    'AI, APIs, payment systems, and cloud services connected through one enterprise platform': '하나의 엔터프라이즈 플랫폼으로 연결된 AI, API, 결제 시스템 및 클라우드 서비스',
    'AI automation': 'AI 자동화', 'Payment APIs': '결제 API', 'Cloud platform': '클라우드 플랫폼',
    'AIYA Kiosk self-service restaurant ordering system': 'AIYA 키오스크 레스토랑 셀프 주문 시스템', 'Kiosk order flow': '키오스크 주문 흐름',
    'AIYA Kiosk · Self-service ordering system': 'AIYA 키오스크 · 셀프 주문 시스템', 'capability preview': '역량 미리보기', 'capabilities': '역량', 'services': '서비스',
    'Abstract technology visual for': '추상 기술 비주얼:', 'visual': '비주얼', 'Switch to English': '영어로 전환',
    'Payment Links': '결제 링크', 'B2B Global Commerce': 'B2B 글로벌 커머스', '1 view': '하나의 뷰', '↓ work': '업무 감소',
    '© 2026 AIYA Technology System, LLC': '© 2026 AIYA Technology System, LLC',
    '100 East Broadway 12 FL New York NY 10002': '미국 뉴욕주 뉴욕시 이스트 브로드웨이 100, 12층, NY 10002',
    'Switch language': '언어 변경', 'Languages': '언어', 'Let\'s Talk': '문의하기',
    'CAPABILITIES': '역량', 'What it brings together': '함께 연결되는 역량', 'WHAT WE BUILD': 'AIYA가 구축하는 것',
    'Build the right system for your business.': '비즈니스에 적합한 시스템을 구축하세요.', 'Talk to AIYA': 'AIYA에 문의하기',
    'Technology built around business.': '비즈니스를 중심으로 구축한 기술.', 'Section navigation': '섹션 내비게이션',
    'Ecosystem': '생태계', 'Results': '성과', 'Why AIYA': 'AIYA를 선택하는 이유', 'Technology capabilities': '기술 역량',
    'PURPOSE-BUILT SOFTWARE': '목적에 맞춘 소프트웨어', 'PAYMENTS · COMMERCE': '결제 · 커머스', 'DEV': '개발', 'DATA': '데이터', 'APIs': 'API',
    'White Label Products': '화이트 라벨 제품', 'AIYA-BUILT PLATFORMS': 'AIYA 구축 플랫폼',
    'AIYA Online Order': 'AIYA 온라인 주문', 'AIYA Travel Ticketing': 'AIYA 여행 티켓팅', 'AIYA CRM': 'AIYA CRM', 'AIYA Gaming': 'AIYA 게이밍', 'AIYA ERP': 'AIYA ERP',
    'Launch customizable AIYA-built products with your brand, workflows, and connected business systems.': '브랜드, 워크플로, 연결된 비즈니스 시스템에 맞춘 맞춤형 AIYA 제품을 출시하세요.',
    'Brand-ready product experience': '브랜드에 맞춘 제품 경험', 'Configured business workflows': '구성된 비즈니스 워크플로', 'Connected data, payments, and operations': '연결된 데이터, 결제 및 운영',
    'Launching a branded digital product': '브랜드 디지털 제품 출시', 'Replacing disconnected operating tools': '분산된 운영 도구 교체', 'Starting from a proven customizable platform': '검증된 맞춤형 플랫폼에서 시작',
    'Plan and run connected marketing that aligns your brand, campaigns, and customer journeys.': '브랜드, 캠페인 및 고객 여정을 연결하는 마케팅을 기획하고 운영하세요.',
    'Growth Strategy': '성장 전략', 'Content and Campaigns': '콘텐츠 및 캠페인', 'AIYA Gift Card & Loyalty Points': 'AIYA 기프트카드 및 로열티 포인트',
    'Digital growth planning': '디지털 성장 계획', 'Campaign creative and execution': '캠페인 크리에이티브 및 실행', 'Gift-card customer experiences': '기프트카드 고객 경험',
    'Launching a new offer': '새로운 오퍼 출시', 'Connecting marketing with conversion': '마케팅과 전환 연결', 'Building repeat-customer programs': '재방문 고객 프로그램 구축',
    'Create a branded online ordering experience connected to the way your business fulfills and serves customers.': '비즈니스의 주문 이행 및 고객 응대 방식과 연결된 브랜드 온라인 주문 경험을 구축하세요.',
    'Branded Online Ordering': '브랜드 온라인 주문', 'Order and Fulfillment Workflows': '주문 및 이행 워크플로', 'Payment and Customer Connections': '결제 및 고객 연결',
    'Configured online ordering experience': '구성된 온라인 주문 경험', 'Connected order management workflows': '연결된 주문 관리 워크플로', 'Integrated payment and customer data': '통합 결제 및 고객 데이터',
    'Launching online ordering': '온라인 주문 출시', 'Replacing disconnected ordering tools': '분산된 주문 도구 교체', 'Connecting orders with business operations': '주문과 비즈니스 운영 연결',
    'Launch a branded ticketing platform for travel services, bookings, and connected customer operations.': '여행 서비스, 예약 및 연결된 고객 운영을 위한 브랜드 티켓팅 플랫폼을 출시하세요.',
    'Travel Booking Experiences': '여행 예약 경험', 'Ticketing and Reservation Workflows': '티켓팅 및 예약 워크플로', 'Customer and Payment Connections': '고객 및 결제 연결',
    'Branded travel ticketing experience': '브랜드 여행 티켓팅 경험', 'Configured booking workflows': '구성된 예약 워크플로', 'Connected payment and operational data': '연결된 결제 및 운영 데이터',
    'Launching a travel booking platform': '여행 예약 플랫폼 출시', 'Modernizing ticketing workflows': '티켓팅 워크플로 현대화', 'Connecting reservations with customer operations': '예약과 고객 운영 연결',
    'Configure connected CRM systems that give sales, service, and operations teams a shared customer view.': '영업, 서비스 및 운영 팀이 공유하는 고객 보기를 제공하는 연결형 CRM 시스템을 구성하세요.',
    'CRM Architecture': 'CRM 아키텍처', 'Workflow Configuration': '워크플로 구성', 'Customer Data Integration': '고객 데이터 통합',
    'Configured CRM workspace': '구성된 CRM 작업 공간', 'Sales and service workflows': '영업 및 서비스 워크플로', 'Connected customer data model': '연결된 고객 데이터 모델',
    'Organizing lead and account activity': '리드 및 계정 활동 정리', 'Improving customer follow-up': '고객 후속 조치 개선', 'Connecting CRM with existing business tools': 'CRM과 기존 비즈니스 도구 연결',
    'Create a branded gaming platform with connected player, payment, and operational workflows.': '연결된 플레이어, 결제 및 운영 워크플로를 갖춘 브랜드 게이밍 플랫폼을 구축하세요.',
    'Player Experiences': '플레이어 경험', 'Game and Membership Workflows': '게임 및 멤버십 워크플로', 'Payment and Engagement Connections': '결제 및 참여 연결',
    'Branded gaming experience': '브랜드 게이밍 경험', 'Configured player workflows': '구성된 플레이어 워크플로', 'Connected payment and engagement data': '연결된 결제 및 참여 데이터',
    'Launching a gaming platform': '게이밍 플랫폼 출시', 'Modernizing player operations': '플레이어 운영 현대화', 'Connecting engagement with revenue workflows': '참여와 매출 워크플로 연결',
    'Unify core business processes in a branded ERP platform configured for your operational model.': '운영 모델에 맞춰 구성된 브랜드 ERP 플랫폼에서 핵심 비즈니스 프로세스를 통합하세요.',
    'Operational Workflows': '운영 워크플로', 'Business Data Management': '비즈니스 데이터 관리', 'Connected Finance and Inventory': '연결된 재무 및 재고',
    'Configured ERP workspace': '구성된 ERP 작업 공간', 'Connected business workflows': '연결된 비즈니스 워크플로', 'Operational reporting foundation': '운영 보고 기반',
    'Centralizing business data': '비즈니스 데이터 중앙화', 'Improving operational visibility': '운영 가시성 향상',
    'PRODUCT INTERFACE': '제품 인터페이스', 'See the product experience': '제품 경험 보기', 'A current interface example that can be adapted around brand and workflow requirements.': '브랜드와 워크플로 요구에 맞게 조정할 수 있는 현재 인터페이스 예시입니다.',
    'AIYA Marketing interface example': 'AIYA 마케팅 인터페이스 예시', 'AIYA Online Order interface example': 'AIYA 온라인 주문 인터페이스 예시', 'AIYA Travel Ticketing interface example': 'AIYA 여행 티켓팅 인터페이스 예시'
  };

  const dictionary = { zh, ko }[language] || null;

  const translate = value => {
    if (!dictionary || typeof value !== 'string') return value;
    const match = value.match(/^(\s*)(.*?)(\s*)$/s);
    const core = match[2];
    if (dictionary[core]) return `${match[1]}${dictionary[core]}${match[3]}`;
    const affixed = core.match(/^([←→↗↓⌄︎︎\s]*)(.*?)([←→↗↓⌄︎︎\s]*)$/);
    if (affixed && dictionary[affixed[2]]) return `${match[1]}${affixed[1]}${dictionary[affixed[2]]}${affixed[3]}${match[3]}`;
    return value;
  };

  const translateCatalog = value => {
    if (!dictionary || !value) return value;
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
    const whiteLabel = {
      title: '白标产品', kicker: 'AIYA 打造的平台', code: '白标',
      summary: '使用您的品牌、工作流程和已连接的业务系统，推出可定制的 AIYA 产品。',
      capabilities: ['AIYA 营销', 'AIYA 在线点单', 'AIYA 旅行票务', 'AIYA 客户关系管理', 'AIYA 游戏系统', 'AIYA 企业资源管理'],
      deliverables: ['可直接体现品牌的产品体验', '配置完成的业务流程', '已连接的数据、支付与运营'],
      useCases: ['推出品牌化数字产品', '替换分散的运营工具', '从经过验证的可定制平台开始'],
      offerings: {
        marketing: { title: 'AIYA 营销', summary: '规划并开展互联营销，使品牌、活动与客户旅程保持一致。', capabilities: ['增长战略', '内容与营销活动', 'AIYA 礼品卡与会员积分'], deliverables: ['数字化增长规划', '活动创意与执行', '礼品卡客户体验'], useCases: ['推出新产品', '连接营销与转化', '建立复购客户计划'] },
        'aiya-online-order': { title: 'AIYA 在线点单', summary: '打造与业务履约和客户服务方式相连的品牌化在线点单体验。', capabilities: ['品牌化在线点单', '订单与履约流程', '支付与客户连接'], deliverables: ['配置完成的在线点单体验', '已连接的订单管理流程', '集成的支付与客户数据'], useCases: ['上线在线点单', '替换分散的点单工具', '将订单与业务运营连接'] },
        'aiya-travel-ticketing': { title: 'AIYA 旅行票务', summary: '为旅行服务、预订和互联客户运营推出品牌化票务平台。', capabilities: ['旅行预订体验', '票务与预订流程', '客户与支付连接'], deliverables: ['品牌化旅行票务体验', '配置完成的预订流程', '已连接的支付与运营数据'], useCases: ['推出旅行预订平台', '升级票务工作流程', '将预订与客户运营连接'] },
        'crm-systems': { title: 'AIYA 客户关系管理', summary: '配置互联 CRM 系统，为销售、服务和运营团队提供统一的客户视图。', capabilities: ['CRM 架构', '工作流程配置', '客户数据集成'], deliverables: ['配置完成的 CRM 工作区', '销售与服务流程', '已连接的客户数据模型'], useCases: ['整理潜在客户与账户活动', '改进客户跟进', '将 CRM 与现有业务工具连接'] },
        'aiya-gaming': { title: 'AIYA 游戏系统', summary: '打造涵盖游戏体验设计、游戏支付、玩家账户和虚拟币或代币账本系统的品牌化游戏平台。', capabilities: ['游戏体验设计', '游戏支付流程', '虚拟币与代币账本系统'], deliverables: ['品牌化游戏体验', '玩家账户与管理控制', '运营与参与度报告'], useCases: ['推出游戏平台', '升级玩家运营', '将游戏参与度与运营流程连接'] },
        'aiya-erp': { title: 'AIYA 企业资源管理', summary: '为业务运营模式配置品牌化 ERP 平台，统一订单、库存、采购、财务和审批流程。', capabilities: ['订单、库存与采购流程', '财务与内部审批流程', '企业系统集成'], deliverables: ['配置完成的 ERP 工作区', '已连接的企业运营流程', '运营报表基础'], useCases: ['替换分散的运营工具', '集中管理业务数据', '提升运营可视性'] }
      }
    };
    const { offerings: whiteLabelOfferings, ...whiteLabelCategory } = whiteLabel;
    catalog.products?.forEach(item => {
      item.kicker = item.title;
      item.monogram = productMonograms[item.key] || '产品';
      item.summary = `${item.title}连接客户体验、业务系统与日常运营，支持企业持续发展。`;
      item.capabilities = productCapabilities[item.key] || ['产品配置', '系统连接', '运营支持'];
      item.deliverables = ['围绕业务需求设计的产品方案', '客户体验与运营系统连接', '可维护、可扩展的交付成果'];
      item.useCases = ['上线新的数字业务', '替换分散的业务工具', '连接客户体验与内部运营'];
    });
    const marketing = catalog.products?.find(item => item.key === 'marketing');
    if (marketing) Object.assign(marketing, whiteLabelOfferings.marketing, { kicker: whiteLabel.title, monogram: whiteLabel.code });
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
    const whiteLabelService = catalog.services?.find(item => item.key === 'white-label');
    if (whiteLabelService) Object.assign(whiteLabelService, whiteLabelCategory);
    catalog.serviceCategories?.forEach(category => {
      if (category.key === 'white-label') {
        Object.assign(category, whiteLabelCategory);
        category.offerings.forEach(item => {
          const offering = whiteLabelOfferings[item.key];
          if (offering) Object.assign(item, offering, { description: offering.summary, kicker: whiteLabel.title, monogram: whiteLabel.code, navCategory: whiteLabel.title });
        });
        return;
      }
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

  const normalizeKoreanCatalog = catalog => {
    if (language !== 'ko' || !catalog) return;
    const categoryCopy = {
      'payments-commerce': {
        deliverables: ['브랜드 결제 및 커머스 경험', '고객 및 운영 시스템 연결', '보고 및 예외 처리 워크플로'],
        useCases: ['새로운 판매 채널 출시', '분산된 결제 도구 교체', '온라인과 오프라인 커머스 연결']
      },
      'billing-revenue': {
        deliverables: ['청구 및 매출 워크플로 구성', '고객용 청구 경험', '재무 및 보고 시스템 연결'],
        useCases: ['구독 또는 사용량 기반 비즈니스 출시', '청구 운영 개선', '매출 및 재무 데이터 연결']
      },
      'treasury-finance': {
        deliverables: ['자금 및 재무 워크플로 구성', '엔터프라이즈 시스템 연동', '운영 가시성 및 제어'],
        useCases: ['복잡한 자금 흐름 조정', '금융 서비스 기능 추가', '재무 운영 개선']
      },
      'platforms-marketplaces': {
        deliverables: ['플랫폼 브랜드 사용자 경험', '계정 및 거래 워크플로', '플랫폼 팀 운영 도구'],
        useCases: ['소프트웨어 플랫폼 출시', '다자간 마켓플레이스 구축', '금융 서비스 기능 임베드']
      },
      'trust-business-tools': {
        deliverables: ['비즈니스 중심 워크플로 설계', '시스템 및 데이터 연동', '명확한 팀 운영 도구'],
        useCases: ['운영 위험 감소', '새로운 고객 경험 출시', '성장 및 비즈니스 시스템 연결']
      }
    };
    const categoryMonograms = { 'payments-commerce': '결제', 'billing-revenue': '매출', 'treasury-finance': '재무', 'platforms-marketplaces': '플랫폼', 'trust-business-tools': '위험' };
    catalog.productCategories?.forEach(category => {
      category.kicker = category.title;
      category.monogram = categoryMonograms[category.key] || '제품';
      category.offerings.forEach(item => {
        item.kicker = category.title;
        item.monogram = '제품';
        if (!/[\uac00-\ud7af]/.test(item.summary || '')) item.summary = `${item.title}은(는) ${item.description}을(를) 지원하며 비즈니스 요구에 따라 관련 운영 시스템과 연결할 수 있습니다.`;
        item.capabilities = [`${item.title} 핵심 구성`, '고객 경험 및 워크플로', '비즈니스 데이터 및 시스템 연결'];
        item.deliverables = categoryCopy[category.key].deliverables;
        item.useCases = categoryCopy[category.key].useCases;
        if (item.key === 'usage-billing') {
          item.summary = '사용량 기반 청구는 확인된 상품, 서비스, 요금 및 계정 활동을 기준으로 명확한 고객 청구서를 생성합니다.';
          item.capabilities = ['고객 청구서 생성', '유연한 청구 규칙', '청구 및 고객 계정 데이터 연결'];
        }
        if (item.key === 'financial-services-api-integration') {
          item.summary = '안전한 API와 시스템 연동을 통해 비즈니스 소프트웨어 플랫폼을 독립적인 제3자 금융 서비스 제공업체와 연결합니다. AIYA는 소프트웨어 개발, API 연결, 데이터 통합, 워크플로 자동화 및 관련 기술 지원만 제공합니다.';
          item.capabilities = ['API 시스템 연동', '안전한 데이터 연결', '워크플로 자동화', '테스트 및 기술 지원'];
        }
        if (item.key === 'aiya-gift-card') {
          item.summary = 'AIYA 기프트카드 및 로열티 포인트는 충전식 기프트카드와 고객 리워드를 결합하여 반복 구매로 포인트를 적립하고 향후 구매에 사용할 수 있도록 합니다.';
          item.capabilities = ['기프트카드 구매 및 잔액 관리', '로열티 포인트 적립 및 사용', '고객 리워드 프로그램 연결'];
        }
      });
    });
    const productMonograms = { commerce: '커머스', revenue: '매출', marketing: '마케팅' };
    const productCapabilities = {
      commerce: ['온라인 스토어', '맞춤형 체크아웃', '상품 및 재고', '고객 계정', 'B2B 및 글로벌 커머스'],
      revenue: ['온라인 및 오프라인 결제', '청구 및 구독', '인보이스 및 결제 링크', '플랫폼 결제 및 지급', '위험 및 신원 인증 워크플로', '세금 및 매출 보고 연동'],
      marketing: ['성장 전략', '콘텐츠 및 캠페인', 'AIYA 기프트카드 및 로열티 포인트']
    };
    const whiteLabel = {
      title: '화이트 라벨 제품', kicker: 'AIYA 구축 플랫폼', code: '제품',
      summary: '브랜드, 워크플로, 연결된 비즈니스 시스템에 맞춘 맞춤형 AIYA 제품을 출시하세요.',
      capabilities: ['AIYA 마케팅', 'AIYA 온라인 주문', 'AIYA 여행 티켓팅', 'AIYA CRM', 'AIYA 게이밍', 'AIYA ERP'],
      deliverables: ['브랜드에 맞춘 제품 경험', '구성된 비즈니스 워크플로', '연결된 데이터, 결제 및 운영'],
      useCases: ['브랜드 디지털 제품 출시', '분산된 운영 도구 교체', '검증된 맞춤형 플랫폼에서 시작'],
      offerings: {
        marketing: { title: 'AIYA 마케팅', summary: '브랜드, 캠페인 및 고객 여정을 연결하는 마케팅을 기획하고 운영하세요.', capabilities: ['성장 전략', '콘텐츠 및 캠페인', 'AIYA 기프트카드 및 로열티 포인트'], deliverables: ['디지털 성장 계획', '캠페인 크리에이티브 및 실행', '기프트카드 고객 경험'], useCases: ['새로운 오퍼 출시', '마케팅과 전환 연결', '재방문 고객 프로그램 구축'] },
        'aiya-online-order': { title: 'AIYA 온라인 주문', summary: '비즈니스의 주문 이행 및 고객 응대 방식과 연결된 브랜드 온라인 주문 경험을 구축하세요.', capabilities: ['브랜드 온라인 주문', '주문 및 이행 워크플로', '결제 및 고객 연결'], deliverables: ['구성된 온라인 주문 경험', '연결된 주문 관리 워크플로', '통합 결제 및 고객 데이터'], useCases: ['온라인 주문 출시', '분산된 주문 도구 교체', '주문과 비즈니스 운영 연결'] },
        'aiya-travel-ticketing': { title: 'AIYA 여행 티켓팅', summary: '여행 서비스, 예약 및 연결된 고객 운영을 위한 브랜드 티켓팅 플랫폼을 출시하세요.', capabilities: ['여행 예약 경험', '티켓팅 및 예약 워크플로', '고객 및 결제 연결'], deliverables: ['브랜드 여행 티켓팅 경험', '구성된 예약 워크플로', '연결된 결제 및 운영 데이터'], useCases: ['여행 예약 플랫폼 출시', '티켓팅 워크플로 현대화', '예약과 고객 운영 연결'] },
        'crm-systems': { title: 'AIYA CRM', summary: '영업, 서비스 및 운영 팀이 공유하는 고객 보기를 제공하는 연결형 CRM 시스템을 구성하세요.', capabilities: ['CRM 아키텍처', '워크플로 구성', '고객 데이터 통합'], deliverables: ['구성된 CRM 작업 공간', '영업 및 서비스 워크플로', '연결된 고객 데이터 모델'], useCases: ['리드 및 계정 활동 정리', '고객 후속 조치 개선', 'CRM과 기존 비즈니스 도구 연결'] },
        'aiya-gaming': { title: 'AIYA 게이밍', summary: '게임 경험 설계, 게임 결제, 플레이어 계정, 가상 코인 또는 토큰 원장 시스템을 갖춘 브랜드 게이밍 플랫폼을 구축하세요.', capabilities: ['게임 경험 설계', '게임 결제 워크플로', '가상 코인 및 토큰 원장 시스템'], deliverables: ['브랜드 게이밍 경험', '플레이어 계정 및 관리 제어', '운영 및 참여 보고'], useCases: ['게이밍 플랫폼 출시', '플레이어 운영 현대화', '게임 참여와 운영 워크플로 연결'] },
        'aiya-erp': { title: 'AIYA ERP', summary: '운영 모델에 맞춘 브랜드 ERP 플랫폼에서 주문, 재고, 구매, 재무 및 승인 프로세스를 통합하세요.', capabilities: ['주문, 재고 및 구매 워크플로', '재무 및 내부 승인 워크플로', '엔터프라이즈 시스템 연동'], deliverables: ['구성된 ERP 작업 공간', '연결된 엔터프라이즈 운영 워크플로', '운영 보고 기반'], useCases: ['분산된 운영 도구 교체', '비즈니스 데이터 중앙화', '운영 가시성 향상'] }
      }
    };
    const { offerings: whiteLabelOfferings, ...whiteLabelCategory } = whiteLabel;
    catalog.products?.forEach(item => {
      item.kicker = item.title;
      item.monogram = productMonograms[item.key] || '제품';
      item.summary = `${item.title}은(는) 고객 경험, 비즈니스 시스템, 일상 운영을 연결하여 지속적인 성장을 지원합니다.`;
      item.capabilities = productCapabilities[item.key] || ['제품 구성', '시스템 연결', '운영 지원'];
      item.deliverables = ['비즈니스 요구 중심의 제품 솔루션', '고객 경험 및 운영 시스템 연결', '유지보수와 확장이 가능한 결과물'];
      item.useCases = ['새로운 디지털 비즈니스 출시', '분산된 비즈니스 도구 교체', '고객 경험과 내부 운영 연결'];
    });
    const marketing = catalog.products?.find(item => item.key === 'marketing');
    if (marketing) Object.assign(marketing, whiteLabelOfferings.marketing, { kicker: whiteLabel.title, monogram: whiteLabel.code });
    const serviceCategoryUseCases = {
      engineering: ['새로운 디지털 제품 출시', '고객 및 내부 시스템 업그레이드', '플랫폼 확장성과 안정성 향상'],
      integration: ['분산된 플랫폼 연결', '반복적인 백오피스 업무 감소', '판매 및 고객 운영 통합'],
      growth: ['효과적인 고객 수요 창출', '자연 검색 노출 향상', '제품 또는 시장 출시 조정']
    };
    const serviceCapabilities = {
      strategy: ['제품 전략', 'UX / UI 디자인', '전환율 최적화'],
      engineering: ['제품 및 경험 디자인', '맞춤형 소프트웨어 개발', '웹 및 모바일 개발', '이커머스 플랫폼 개발', '엔터프라이즈 및 클라우드 플랫폼', '성능 및 안정성'],
      integration: ['API, 데이터 및 결제 연동', 'AI 및 워크플로 자동화', 'CRM 시스템'],
      cloud: ['클라우드 아키텍처', '플랫폼 현대화', '성능 및 안정성'],
      growth: ['디지털 마케팅', 'SEO 및 콘텐츠', '캠페인 개발']
    };
    catalog.services?.forEach(item => {
      item.kicker = item.title;
      item.code = item.key === 'integration' ? 'API' : (item.key === 'engineering' ? '개발' : item.key === 'growth' ? '성장' : '서비스');
      item.summary = `${item.title}은(는) 비즈니스 요구를 중심으로 기획, 구현, 제공 및 지속적인 최적화를 지원합니다.`;
      item.capabilities = serviceCapabilities[item.key] || ['솔루션 기획', '구현 및 연동', '지속적인 최적화'];
      item.deliverables = ['비즈니스 요구 및 구현 계획', '유지보수 가능한 시스템 및 워크플로', '테스트, 제공 및 지속적인 최적화'];
      item.useCases = serviceCategoryUseCases[item.key] || ['새로운 디지털 역량 기획', '기존 비즈니스 워크플로 개선', '지속적인 운영 및 성장 지원'];
    });
    const whiteLabelService = catalog.services?.find(item => item.key === 'white-label');
    if (whiteLabelService) Object.assign(whiteLabelService, whiteLabelCategory);
    catalog.serviceCategories?.forEach(category => {
      if (category.key === 'white-label') {
        Object.assign(category, whiteLabelCategory);
        category.offerings.forEach(item => {
          const offering = whiteLabelOfferings[item.key];
          if (offering) Object.assign(item, offering, { description: offering.summary, kicker: whiteLabel.title, monogram: whiteLabel.code, navCategory: whiteLabel.title });
        });
        return;
      }
      category.kicker = category.title;
      category.code = category.key === 'integration' ? 'API' : (category.key === 'engineering' ? '개발' : '성장');
      category.offerings.forEach(item => {
        item.kicker = category.title;
        item.monogram = '서비스';
        item.summary = `${item.title}은(는) 실제 비즈니스 프로세스를 중심으로 기획, 구현 및 지속적인 최적화를 제공합니다.`;
        item.description = item.summary;
        item.capabilities = [`${item.title} 솔루션 설계`, `${item.title} 구현 및 연동`, '테스트, 제공 및 지속적인 최적화'];
        item.deliverables = ['명확한 구현 경로와 요구사항', '유지보수 가능한 결과물', '테스트 및 출시 지원'];
        item.useCases = serviceCategoryUseCases[category.key];
      });
    });
    catalog.solutionCategories?.forEach(category => {
      category.offerings.forEach(item => {
        item.headline = `${item.title}을(를) 위한 연결된 디지털 경험을 구축합니다.`;
        item.overview = `${item.description.replace(/[.]$/, '')}. 소프트웨어, 결제, 데이터 및 운영 워크플로를 연결하여 실제 비즈니스에 적합한 통합 솔루션을 제공합니다.`;
        item.capabilities = ['고객 경험 및 디지털 채널', '결제, 데이터 및 시스템 연결', '운영 워크플로 및 자동화'];
        item.outcomes = ['분산된 프로세스와 반복 업무 감소', '팀 및 고객 경험 향상', '지속적으로 확장 가능한 운영 기반 구축'];
      });
    });
  };

  const applySolutionDetail = () => {
    if (!dictionary) return;
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
    if (visual) visual.alt = language === 'zh' ? `${item.title}技术主题视觉图` : `${item.title} 기술 비주얼`;
    const category = window.aiyaCatalog.solutionCategories.find(candidate => candidate.offerings.some(offering => offering.key === item.key));
    setText('.solution-detail-visual>small', `${category?.title || (language === 'zh' ? '解决方案' : '솔루션')} · ${item.title}`);
    document.title = language === 'zh' ? `${item.title}解决方案 | AIYA 科技系统` : `${item.title} 솔루션 | AIYA 기술 시스템`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = item.overview;
  };

  const applyDocument = () => {
    if (!dictionary) return;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'ko';
    const pageName = window.location.pathname.split('/').pop();
    const titles = language === 'zh' ? {
      '': 'AIYA 科技系统', 'index.html': 'AIYA 科技系统', 'solutions.html': '解决方案 | AIYA 科技系统',
      'signin.html': '登录 | AIYA 科技系统', 'news.html': '新闻 | AIYA 科技系统',
      'connected-business-technology.html': '互联商业科技 | AIYA 新闻', 'events.html': '活动 | AIYA 新闻',
      'stories.html': '故事 | AIYA 新闻', 'financial-services-api-integration.html': '金融服务API技术对接 | AIYA 科技系统'
    } : {
      '': 'AIYA 기술 시스템', 'index.html': 'AIYA 기술 시스템', 'solutions.html': '솔루션 | AIYA 기술 시스템',
      'signin.html': '로그인 | AIYA 기술 시스템', 'news.html': '뉴스 | AIYA 기술 시스템',
      'connected-business-technology.html': '연결형 비즈니스 기술 | AIYA 뉴스', 'events.html': '이벤트 | AIYA 뉴스',
      'stories.html': '스토리 | AIYA 뉴스', 'financial-services-api-integration.html': '금융 서비스 API 연동 | AIYA 기술 시스템'
    };
    if (Object.prototype.hasOwnProperty.call(titles, pageName)) document.title = titles[pageName];
    const detailPage = document.querySelector('[data-detail-kind][data-detail-key]');
    if (detailPage) {
      const item = window.getCatalogItem?.(detailPage.dataset.detailKind, detailPage.dataset.detailKey);
      if (item) {
        document.title = `${item.title} | ${language === 'zh' ? 'AIYA 科技系统' : 'AIYA 기술 시스템'}`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = item.summary;
      }
    }
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
    document.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach(element => {
      ['alt', 'aria-label', 'title', 'placeholder'].forEach(attribute => {
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
      trigger.setAttribute('aria-label', translate('Switch language'));
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = `<span>${labels[language]}</span><i aria-hidden="true">⌄</i>`;

      const menu = document.createElement('div');
      menu.className = 'language-menu';
      menu.setAttribute('role', 'listbox');
      menu.setAttribute('aria-label', translate('Languages'));
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
    if (!actions && header) {
      const classes = nav ? 'language-selector-desktop language-selector-standalone' : 'language-selector-standalone';
      header.insertBefore(makeSelector(classes), header.lastElementChild);
    }
  };

  window.aiyaI18n = { language, t: translate, applyDocument, switchLanguage };
  translateCatalog(window.aiyaCatalog);
  normalizeChineseCatalog(window.aiyaCatalog);
  normalizeKoreanCatalog(window.aiyaCatalog);
  applyDocument();
  applySolutionDetail();
  injectSwitches();
})();
