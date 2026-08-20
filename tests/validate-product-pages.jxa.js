ObjC.import('Foundation');

const fm = $.NSFileManager.defaultManager;
const read = path => $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, null).js;
const window = {};

eval(read('catalog.js'));
eval(read('product-pages.js'));

const offerings = window.aiyaCatalog.productCategories.flatMap(category => category.offerings);
const hardware = window.aiyaCatalog.products.filter(item => ['pad', 'robot', 'scan'].includes(item.key));
const pages = [
  ...offerings.filter(item => item.key).map(item => ({ item, kind: 'offering' })),
  ...hardware.map(item => ({ item, kind: 'product' })),
  ...window.aiyaCatalog.services.map(item => ({ item, kind: 'service' }))
];

if (offerings.length !== 44) throw new Error(`Expected 44 clickable products, observed ${offerings.length}`);
if (pages.length !== 49) throw new Error(`Expected 49 product and service pages, observed ${pages.length}`);

for (const { item, kind } of pages) {
  if (!fm.fileExistsAtPath(item.url)) throw new Error(`Missing detail page: ${item.url}`);
  const html = read(item.url);
  const singular = kind === 'service' ? 'service' : 'product';
  const required = [
    `data-detail-kind="${kind}"`,
    `data-detail-key="${item.key}"`,
    'class="detail-chat-panel"',
    'FUTURE CHAT PREVIEW',
    '../assets/aiya-chat-demo.png',
    'mailto:info@aiya.us',
    '../product-pages.js?v=20260820-5',
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
if (!index.includes('product-pages.js?v=20260820-5')) throw new Error('Homepage does not load product page routing data');
if (!fm.fileExistsAtPath('assets/aiya-chat-demo.png')) throw new Error('Missing chat demo image');
for (const visual of ['payments-commerce', 'billing-revenue', 'treasury-finance', 'platforms-marketplaces', 'trust-business-tools']) {
  if (!fm.fileExistsAtPath(`assets/product-visual-${visual}.jpg`)) throw new Error(`Missing category visual: ${visual}`);
}

JSON.stringify({ productPages: pages.length - window.aiyaCatalog.services.length, servicePages: window.aiyaCatalog.services.length, clickableProducts: offerings.length, status: 'PASS' });
