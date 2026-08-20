ObjC.import('Foundation');

const fm = $.NSFileManager.defaultManager;
const read = path => $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, null).js;
const window = {};

eval(read('catalog.js'));
eval(read('product-pages.js'));
eval(read('service-pages.js'));

const offerings = window.aiyaCatalog.productCategories.flatMap(category => category.offerings);
const hardware = window.aiyaCatalog.products.filter(item => ['pad', 'robot', 'scan'].includes(item.key));
const serviceOfferings = window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings);
const pages = [
  ...offerings.filter(item => item.key).map(item => ({ item, kind: 'offering' })),
  ...hardware.map(item => ({ item, kind: 'product' })),
  ...window.aiyaCatalog.services.map(item => ({ item, kind: 'service' })),
  ...window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings).map(item => ({ item, kind: 'service-offering' }))
];

if (offerings.length !== 44) throw new Error(`Expected 44 clickable products, observed ${offerings.length}`);
if (window.aiyaCatalog.serviceCategories.length !== 5) throw new Error('Expected five service categories');
if (serviceOfferings.length !== 15) throw new Error(`Expected 15 individual services, observed ${serviceOfferings.length}`);
if (new Set(serviceOfferings.map(item => item.key)).size !== serviceOfferings.length) throw new Error('Individual service keys must be unique');
if (new Set(serviceOfferings.map(item => item.url)).size !== serviceOfferings.length) throw new Error('Individual service URLs must be unique');
if (window.aiyaCatalog.serviceCategories.some(category => category.offerings.length !== 3)) throw new Error('Each service category must expose three individual services');
const serviceVisuals = window.aiyaCatalog.services.map(item => item.image);
if (new Set(serviceVisuals).size !== 5) throw new Error('Each service category must use a distinct visual');
if (serviceVisuals.includes('assets/aiya-chat-demo.png')) throw new Error('Chat preview image must not be reused as a service hero');
for (const visual of serviceVisuals) {
  if (!fm.fileExistsAtPath(visual)) throw new Error(`Missing service visual: ${visual}`);
}
if (pages.length !== 64) throw new Error(`Expected 64 product, service, and overview pages, observed ${pages.length}`);

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
    '../product-pages.js?v=20260820-9',
    '../service-pages.js?v=20260820-9',
    `Demo content for ${singular} planning`
  ];
  for (const marker of required) {
    if (!html.includes(marker)) throw new Error(`Missing ${marker} in ${item.url}`);
  }
  if (/Stripe|stripe|—|–/.test(html)) throw new Error(`Forbidden public copy in ${item.url}`);
  if (!Array.isArray(item.capabilities) || item.capabilities.length !== 3) throw new Error(`Invalid capabilities for ${item.title}`);
  if (!Array.isArray(item.deliverables) || item.deliverables.length !== 3) throw new Error(`Invalid deliverables for ${item.title}`);
  if (!Array.isArray(item.useCases) || item.useCases.length !== 3) throw new Error(`Invalid use cases for ${item.title}`);
}

const index = read('index.html');
if (!index.includes('product-pages.js?v=20260820-9')) throw new Error('Homepage does not load product page routing data');
if (!fm.fileExistsAtPath('assets/aiya-chat-demo.png')) throw new Error('Missing chat demo image');
for (const visual of ['payments-commerce', 'billing-revenue', 'treasury-finance', 'platforms-marketplaces', 'trust-business-tools']) {
  if (!fm.fileExistsAtPath(`assets/product-visual-${visual}.jpg`)) throw new Error(`Missing category visual: ${visual}`);
}

JSON.stringify({ productPages: pages.filter(page => ['offering', 'product'].includes(page.kind)).length, servicePages: window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings).length, serviceOverviewPages: window.aiyaCatalog.services.length, status: 'PASS' });
