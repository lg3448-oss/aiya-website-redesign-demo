ObjC.import('Foundation');

const root = $.NSFileManager.defaultManager.currentDirectoryPath.js;
const read = path => $.NSString.stringWithContentsOfFileEncodingError(`${root}/${path}`, $.NSUTF8StringEncoding, null).js;
const write = (path, content) => $(content).writeToFileAtomicallyEncodingError(`${root}/${path}`, true, $.NSUTF8StringEncoding, null);
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const window = {};
eval(read('catalog.js'));

const solutionPages = window.aiyaCatalog.solutionCategories.flatMap(category =>
  category.offerings.map(item => ({ item, category }))
);

const renderHeader = () => `<header class="site-header"><a class="brand" href="../index.html#home"><img src="../assets/logo.png" alt="AIYA Technology"></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><i></i><i></i><span class="sr-only">Open navigation</span></button><nav class="main-nav" id="main-nav" aria-label="Primary navigation"><a href="../index.html#home">Home</a><div class="nav-menu-item" data-mega-menu="products"><div class="mega-trigger-group"><a class="mega-trigger" data-mega-link="products" href="../index.html#products">Products</a><button class="mega-toggle" type="button" data-mega-trigger="products" aria-label="Toggle products menu" aria-haspopup="true" aria-expanded="false" aria-controls="mega-products"><span aria-hidden="true">⌄︎</span></button></div><div class="mega-menu" id="mega-products" data-menu-panel="products" hidden><div class="mega-menu-inner"><ul class="mega-menu-list" aria-label="Products menu"></ul><div class="mega-menu-detail" aria-live="polite"></div><a class="mega-menu-footer" href="../index.html#products">View All Products →︎</a></div></div></div><div class="nav-menu-item" data-mega-menu="services"><div class="mega-trigger-group"><a class="mega-trigger" data-mega-link="services" href="../index.html#services">Services</a><button class="mega-toggle" type="button" data-mega-trigger="services" aria-label="Toggle services menu" aria-haspopup="true" aria-expanded="false" aria-controls="mega-services"><span aria-hidden="true">⌄︎</span></button></div><div class="mega-menu" id="mega-services" data-menu-panel="services" hidden><div class="mega-menu-inner"><ul class="mega-menu-list" aria-label="Services menu"></ul><div class="mega-menu-detail" aria-live="polite"></div><a class="mega-menu-footer" href="../index.html#services">View All Services →︎</a></div></div></div><div class="nav-menu-item" data-mega-menu="solutions"><div class="mega-trigger-group"><a class="mega-trigger" data-mega-link="solutions" href="../solutions.html">Solutions</a><button class="mega-toggle" type="button" data-mega-trigger="solutions" aria-label="Toggle solutions menu" aria-haspopup="true" aria-expanded="false" aria-controls="mega-solutions"><span aria-hidden="true">⌄︎</span></button></div><div class="mega-menu" id="mega-solutions" data-menu-panel="solutions" hidden><div class="mega-menu-inner"><ul class="mega-menu-list" aria-label="Solutions menu"></ul><div class="mega-menu-detail" aria-live="polite"></div><a class="mega-menu-footer" href="../solutions.html">View All Solutions →︎</a></div></div></div><a href="../index.html#company">Company</a><a class="nav-signin" href="../signin.html">Sign in</a><a class="nav-contact" href="../index.html#contact">Contact</a></nav><div class="header-actions"><a class="header-signin" href="../signin.html"><i aria-hidden="true"></i><span>Sign in</span></a><a class="header-cta" href="../index.html#contact">Contact <span>↗︎</span></a></div></header>`;

const render = ({ item, category }) => {
  const kindLabel = category.key === 'industries' ? 'INDUSTRY SOLUTION' : 'USE CASE';
  const backLabel = category.key === 'industries' ? 'Industries' : 'Use Cases';
  const capabilityCards = item.capabilities.map((capability, index) => `<article><small>${String(index + 1).padStart(2, '0')}</small><h3>${escapeHtml(capability)}</h3><span></span></article>`).join('');
  const outcomeRows = item.outcomes.map((outcome, index) => `<li><small>${String(index + 1).padStart(2, '0')}</small><span>${escapeHtml(outcome)}</span></li>`).join('');
  const connectedCards = item.connected.map(connected => `<a href="../${connected.url}"><span><small>CONNECTED AIYA CAPABILITY</small><strong>${escapeHtml(connected.title)}</strong></span><i aria-hidden="true">↗︎</i></a>`).join('');
  return `<!doctype html>
<html lang="en" class="detail-root">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(item.overview)}">
  <title>${escapeHtml(item.title)} Solutions | AIYA Technology</title>
  <link rel="stylesheet" href="../styles.css?v=20260825-2">
</head>
<body class="detail-page solution-detail-page" data-solution-key="${item.key}" data-solution-category="${category.key}">
  <div class="ambient-bg" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
  ${renderHeader()}
  <main>
    <section class="solution-detail-hero">
      <div class="solution-detail-copy"><a href="../solutions.html#${category.key}" class="detail-back">←︎ All ${backLabel}</a><small>${kindLabel}</small><h1>${escapeHtml(item.title)}</h1><h2>${escapeHtml(item.headline)}</h2><p>${escapeHtml(item.overview)}</p><a class="button primary" href="../index.html#contact">Talk to Our Team <span>↗︎</span></a></div>
      <div class="solution-detail-visual"><img src="../${item.image}" alt="Abstract technology visual for ${escapeHtml(item.title)}"><div class="solution-signal" aria-hidden="true"><i></i><i></i><i></i><span>AIYA<br>CONNECTED</span></div><small>${escapeHtml(category.title)} · ${escapeHtml(item.title)}</small></div>
    </section>
    <section class="solution-capability-section"><header><small>WHAT THIS SOLUTION CONNECTS</small><h2>A focused system,<br>not a list of disconnected tools</h2></header><div>${capabilityCards}</div></section>
    <section class="solution-outcome-section"><div><small>BUSINESS OUTCOMES</small><h2>Designed around<br>work that needs to move</h2></div><ol>${outcomeRows}</ol></section>
    <section class="solution-connected-section"><header><small>CONNECTED AIYA PRODUCTS &amp; SERVICES</small><h2>Build the right capability mix</h2><p>These related AIYA capabilities provide a starting point for this demo solution.</p></header><div>${connectedCards}</div></section>
    <section class="solutions-cta"><small>START WITH YOUR OPERATING MODEL</small><h2>Shape this solution around your business.</h2><a class="button primary" href="../index.html#contact">Talk to Our Team <span>↗︎</span></a></section>
  </main>
  <footer class="detail-footer"><img src="../assets/logo.png" alt="AIYA Technology"><span>Demo solution content. Final capabilities, availability, and requirements subject to company approval.</span></footer>
  <script src="../catalog.js?v=20260825-2"></script>
  <script src="../product-pages.js?v=20260825-2"></script>
  <script src="../service-pages.js?v=20260825-2"></script>
  <script src="../mega-menu.js?v=20260825-2"></script>
  <script>window.initializeAiyaMegaMenus({ pathPrefix: '../' });</script>
</body>
</html>`;
};

solutionPages.forEach(page => write(page.item.url, render(page)));
`${solutionPages.length} solution pages generated`;
