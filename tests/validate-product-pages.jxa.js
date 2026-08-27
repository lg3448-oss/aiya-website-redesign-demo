ObjC.import('Foundation');

const fm = $.NSFileManager.defaultManager;
const read = path => $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, null).js;
const window = {};

eval(read('catalog.js'));
eval(read('product-pages.js'));
eval(read('service-pages.js'));

const offerings = window.aiyaCatalog.productCategories.flatMap(category => category.offerings);
const serviceOfferings = window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings);
const industrySolutions = window.aiyaCatalog.solutionCategories.find(category => category.key === 'industries')?.offerings || [];
const useCaseSolutions = window.aiyaCatalog.solutionCategories.find(category => category.key === 'use-cases')?.offerings || [];
const pages = [
  ...offerings.filter(item => item.key).map(item => ({ item, kind: 'offering' })),
  ...window.aiyaCatalog.services.map(item => ({ item, kind: 'service' })),
  ...window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings).map(item => ({ item, kind: 'service-offering' }))
];

if (offerings.length !== 40) throw new Error(`Expected 40 clickable products, observed ${offerings.length}`);
for (const removedProduct of ['Orders & Fulfillment', 'AIYAPad', 'AIYARobot', 'AIYAScan']) {
  if (offerings.some(item => item.title === removedProduct) || window.aiyaCatalog.products.some(item => item.title === removedProduct)) {
    throw new Error(`Removed product remains active: ${removedProduct}`);
  }
}
if (window.aiyaCatalog.productCategories.some(category => category.key === 'hardware')) throw new Error('Removed Hardware category remains active');
if (window.aiyaCatalog.serviceCategories.length !== 3) throw new Error('Expected three active service categories');
if (serviceOfferings.length !== 12) throw new Error(`Expected 12 distinct individual services, observed ${serviceOfferings.length}`);
if (new Set(serviceOfferings.map(item => item.key)).size !== serviceOfferings.length) throw new Error('Individual service keys must be unique');
if (new Set(serviceOfferings.map(item => item.url)).size !== serviceOfferings.length) throw new Error('Individual service URLs must be unique');
if (window.aiyaCatalog.serviceCategories.map(category => category.offerings.length).join(',') !== '6,3,3') throw new Error('Expected a 6, 3, 3 service distribution');
if (!serviceOfferings.some(item => item.key === 'crm-systems')) throw new Error('CRM Systems service is missing');
if (!serviceOfferings.some(item => item.key === 'custom-software-development')) throw new Error('Custom Software Development service is missing');
if (!serviceOfferings.some(item => item.key === 'ecommerce-platform-development')) throw new Error('Ecommerce Platform Development service is missing');
if (!serviceOfferings.some(item => item.title === 'API, Data & Payment Integration')) throw new Error('Payment Gateway Integration coverage is missing');
for (const duplicateTitle of ['Android Development', 'iOS Development', 'Mobile App Development', 'Software Customization']) {
  if (serviceOfferings.some(item => item.title === duplicateTitle)) throw new Error(`Redundant service remains active: ${duplicateTitle}`);
}
if (window.aiyaCatalog.serviceCategories.some(category => ['Strategy & Experience', 'Cloud & Operations'].includes(category.title))) throw new Error('Merged legacy categories remain in active navigation');
if (industrySolutions.length !== 9) throw new Error(`Expected 9 distinct industries, observed ${industrySolutions.length}`);
if (industrySolutions.some(item => /government|nonprofit/i.test(`${item.key} ${item.title}`))) throw new Error('Government or nonprofit industry must not be present');
if (useCaseSolutions.length !== 7) throw new Error(`Expected 7 distinct use cases, observed ${useCaseSolutions.length}`);
if (!industrySolutions.some(item => item.key === 'manufacturing-wholesale')) throw new Error('Manufacturing & Wholesale industry is missing');
if (!industrySolutions.some(item => item.key === 'healthcare-education')) throw new Error('Healthcare & Education industry is missing');
if (!useCaseSolutions.some(item => item.key === 'crypto')) throw new Error('Crypto use case is missing');
const solutionKeys = [...industrySolutions, ...useCaseSolutions].map(item => item.key);
if (new Set(solutionKeys).size !== solutionKeys.length) throw new Error('Solution keys must be unique');
const solutionUrls = [...industrySolutions, ...useCaseSolutions].map(item => item.url);
if (new Set(solutionUrls).size !== solutionUrls.length) throw new Error('Solution URLs must be unique');
for (const solution of [...industrySolutions, ...useCaseSolutions]) {
  if (!fm.fileExistsAtPath(solution.url)) throw new Error(`Missing solution page: ${solution.url}`);
  const html = read(solution.url);
  for (const marker of [`data-solution-key="${solution.key}"`, solution.headline, 'CONNECTED AIYA PRODUCTS &amp; SERVICES']) {
    if (!html.includes(marker)) throw new Error(`Missing ${marker} in ${solution.url}`);
  }
  if (!Array.isArray(solution.capabilities) || solution.capabilities.length !== 3) throw new Error(`Invalid capabilities for ${solution.title}`);
  if (!Array.isArray(solution.outcomes) || solution.outcomes.length !== 3) throw new Error(`Invalid outcomes for ${solution.title}`);
  if (!Array.isArray(solution.connected) || solution.connected.length !== 3) throw new Error(`Invalid connected capabilities for ${solution.title}`);
  for (const connected of solution.connected) {
    if (!fm.fileExistsAtPath(connected.url)) throw new Error(`Broken related link from ${solution.title}: ${connected.url}`);
  }
}
const serviceVisuals = window.aiyaCatalog.services.map(item => item.image);
if (new Set(serviceVisuals).size !== 5) throw new Error('Each service category must use a distinct visual');
if (serviceVisuals.includes('assets/aiya-chat-demo.png')) throw new Error('Chat preview image must not be reused as a service hero');
for (const visual of serviceVisuals) {
  if (!fm.fileExistsAtPath(visual)) throw new Error(`Missing service visual: ${visual}`);
}
if (pages.length !== 57) throw new Error(`Expected 57 product, service, and overview pages, observed ${pages.length}`);

for (const { item, kind } of pages) {
  if (!fm.fileExistsAtPath(item.url)) throw new Error(`Missing detail page: ${item.url}`);
  const html = read(item.url);
  const singular = kind.startsWith('service') ? 'service' : 'product';
  const required = [
    `data-detail-kind="${kind}"`,
    `data-detail-key="${item.key}"`,
    'class="detail-chat-panel"',
    'FUTURE CHAT PREVIEW',
    '../assets/aiya-chat-demo.png',
    'mailto:info@aiya.us',
    '../product-pages.js?v=20260826-1',
    '../service-pages.js?v=20260825-5',
    '../i18n.js?v=20260827-1',
    '<footer class="detail-footer"><img'
  ];
  for (const marker of required) {
    if (!html.includes(marker)) throw new Error(`Missing ${marker} in ${item.url}`);
  }
  if (/Stripe|stripe|—|–/.test(html)) throw new Error(`Forbidden public copy in ${item.url}`);
  const validCapabilityCount = kind === 'service'
    ? Array.isArray(item.capabilities) && item.capabilities.length >= 3 && item.capabilities.length <= 6
    : Array.isArray(item.capabilities) && item.capabilities.length === 3;
  if (!validCapabilityCount) throw new Error(`Invalid capabilities for ${item.title}`);
  if (!Array.isArray(item.deliverables) || item.deliverables.length !== 3) throw new Error(`Invalid deliverables for ${item.title}`);
  if (!Array.isArray(item.useCases) || item.useCases.length !== 3) throw new Error(`Invalid use cases for ${item.title}`);
}

const index = read('index.html');
for (const removedPath of ['products/orders-fulfillment.html', 'products/aiya-pad.html', 'products/aiya-robot.html', 'products/aiya-scan.html']) {
  if (fm.fileExistsAtPath(removedPath)) throw new Error(`Removed product page still exists: ${removedPath}`);
}
for (const removedCopy of ['Orders & Fulfillment', 'AIYAPad', 'AIYARobot', 'AIYAScan', 'data-product-category="hardware"']) {
  if (index.includes(removedCopy)) throw new Error(`Homepage still exposes removed product: ${removedCopy}`);
}
if (!index.includes('product-pages.js?v=20260826-1')) throw new Error('Homepage does not load product page routing data');
if (!index.includes('i18n.js?v=20260827-1')) throw new Error('Homepage does not load bilingual runtime');
if (!fm.fileExistsAtPath('i18n.js')) throw new Error('Missing bilingual runtime');
const i18n = read('i18n.js');
for (const marker of ["'B2B & Global Commerce': 'B2B 与全球商务'", "'Web & Mobile Development': '网站与移动应用开发'", "'CRM Systems': 'CRM 系统'", "'AIYA Payments': 'AIYA 支付'", 'normalizeChineseCatalog', 'applySolutionDetail', 'aiya-language', 'language-switch']) {
  if (!i18n.includes(marker)) throw new Error(`Missing bilingual policy marker: ${marker}`);
}
if (!i18n.includes("getItem('aiya-language-v2')") || !i18n.includes("(stored === 'zh' ? 'zh' : 'en')")) throw new Error('English-first language preference policy is missing');
if (!fm.fileExistsAtPath('assets/aiya-chat-demo.png')) throw new Error('Missing chat demo image');
if (!index.includes('data-mega-menu="solutions"')) throw new Error('Homepage is missing the Solutions navigation');
if (!index.includes('<a href="news.html">News</a>')) throw new Error('Homepage is missing the News navigation');
if (!fm.fileExistsAtPath('news.html')) throw new Error('News homepage is missing');
const newsPage = read('news.html');
for (const marker of ['LATEST ARTICLE', 'news/connected-business-technology.html', 'news/events.html', 'news/stories.html', 'Learn More', 'Under Construction']) {
  if (!newsPage.includes(marker)) throw new Error(`News homepage is missing ${marker}`);
}
if (!newsPage.includes('styles.css?v=20260827-1')) throw new Error('News homepage does not load centered construction status styles');
for (const newsPath of ['news/connected-business-technology.html', 'news/events.html', 'news/stories.html']) {
  if (!fm.fileExistsAtPath(newsPath)) throw new Error(`News content page is missing: ${newsPath}`);
  if (!read(newsPath).includes('Under Construction')) throw new Error(`News content page is missing construction status: ${newsPath}`);
}
for (const productMarker of ["'Usage Billing': '账单计费'", 'Branded Customer Credit Program', 'AIYA Gift Card & Loyalty Points']) {
  if (!i18n.includes(productMarker) && !read('product-pages.js').includes(productMarker)) throw new Error(`Updated product content is missing: ${productMarker}`);
}
if (!index.includes('class="header-signin" href="https://suite.aiya.us/login"') || !index.includes('class="nav-signin" href="https://suite.aiya.us/login"')) throw new Error('Homepage is missing AIYA Suite Sign in links');
if (!fm.fileExistsAtPath('signin.html')) throw new Error('Sign in demo page is missing');
const signinPage = read('signin.html');
if (!signinPage.includes('i18n.js?v=20260827-1')) throw new Error('Sign in page does not load bilingual runtime');
if (!fm.fileExistsAtPath('solutions.html') || !fm.fileExistsAtPath('solutions.js')) throw new Error('Solutions directory files are missing');
const solutionsPage = read('solutions.html');
for (const marker of ['id="industries"', 'id="use-cases"', 'solutions.js?v=20260825-5']) {
  if (!solutionsPage.includes(marker)) throw new Error(`Missing ${marker} in solutions.html`);
}
for (const visual of ['payments-commerce', 'billing-revenue', 'treasury-finance', 'platforms-marketplaces', 'trust-business-tools']) {
  if (!fm.fileExistsAtPath(`assets/product-visual-${visual}.jpg`)) throw new Error(`Missing category visual: ${visual}`);
}

JSON.stringify({ productPages: pages.filter(page => ['offering', 'product'].includes(page.kind)).length, servicePages: window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings).length, serviceOverviewPages: window.aiyaCatalog.services.length, status: 'PASS' });
