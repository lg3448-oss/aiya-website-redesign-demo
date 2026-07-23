const snapPage = document.querySelector('#snap-page');
const initialHash = window.location.hash;
if (initialHash) history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
const slides = [...document.querySelectorAll('.hero-slide')];
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeSlide = 0;
let heroTimer;
let jumpTimer;

function showHero(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === activeSlide));
  clearInterval(heroTimer);
  if (!motionReduced) heroTimer = setInterval(() => showHero(activeSlide + 1), 7000);
}

if (!motionReduced) heroTimer = setInterval(() => showHero(activeSlide + 1), 7000);

const capabilityContent = {
  api: { title: 'API', nodes: ['PLATFORMS', 'DATA', 'PAYMENTS'] },
  payments: { title: 'PAY', nodes: ['CLOVER', 'SECURITY', 'FINTECH'] },
  ai: { title: 'AI', nodes: ['WORKFLOWS', 'INSIGHTS', 'AUTOMATION'] },
  cloud: { title: 'CLOUD', nodes: ['SCALE', 'SYSTEMS', 'GROWTH'] }
};

document.querySelectorAll('[data-capability]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.capability;
  document.querySelectorAll('[data-capability]').forEach(item => item.classList.toggle('active', item === button));
  document.querySelector('.capability-visual').dataset.active = key;
  document.querySelector('#capability-title').textContent = capabilityContent[key].title;
  document.querySelector('#cap-node-one').textContent = capabilityContent[key].nodes[0];
  document.querySelector('#cap-node-two').textContent = capabilityContent[key].nodes[1];
  document.querySelector('#cap-node-three').textContent = capabilityContent[key].nodes[2];
}));

const products = {
  pos: { kicker: 'OPERATIONS · PAYMENTS', title: 'AIYAPOS', description: 'A reliable point-of-sale foundation that keeps payments, orders, and reporting connected.', image: 'assets/product-pos.png', monogram: 'POS' },
  pad: { kicker: 'SERVICE · MOBILITY', title: 'AIYAPad', description: 'Flexible server and table-side ordering tools designed for faster hospitality service.', image: 'assets/product-pad.png', monogram: 'PAD' },
  robot: { kicker: 'AUTOMATION · SERVICE', title: 'AIYARobot', description: 'Automated delivery support that helps teams focus attention where customers need it.', image: 'assets/product-robot.png', monogram: 'BOT' },
  scan: { kicker: 'QR · SELF SERVICE', title: 'AIYAScan', description: 'Simple QR ordering that connects dine-in customers directly to the restaurant workflow.', image: 'assets/product-scan.png', monogram: 'QR' },
  marketing: { kicker: 'GROWTH · STRATEGY', title: 'AIYA Marketing', description: 'Digital strategy and creative execution connected to the technology behind the business.', image: 'assets/service-marketing.png', monogram: 'MKT' }
};

const megaMenuData = {
  products: {
    defaultKey: 'pos',
    items: ['pos', 'pad', 'robot', 'scan', 'marketing'].map(key => ({
      key,
      label: products[key].title,
      eyebrow: products[key].kicker,
      description: products[key].description,
      image: products[key].image
    }))
  },
  services: {
    defaultKey: 'integration',
    items: [
      {
        key: 'integration',
        label: 'Integration & Connectivity',
        description: 'Connect platforms, business data, and customer experiences through reliable integrations.',
        links: ['API Integrations', 'Data Connectivity']
      },
      {
        key: 'payments',
        label: 'Payments & FinTech',
        description: 'Build secure payment experiences and financial technology that support modern commerce.',
        links: ['Payment APIs', 'FinTech Solutions', 'Secure Payment Processing']
      },
      {
        key: 'ai',
        label: 'AI & Automation',
        description: 'Apply practical intelligence and automation to workflows, decisions, and daily operations.',
        links: ['AI Software Solutions', 'Artificial Intelligence', 'Automation', 'Workflow Automation']
      },
      {
        key: 'cloud',
        label: 'Cloud & Enterprise',
        description: 'Create resilient cloud foundations and enterprise platforms designed to scale.',
        links: ['Cloud Technologies', 'Enterprise Solutions', 'Scalable Software Platforms']
      },
      {
        key: 'digital',
        label: 'Digital Development',
        description: 'Modernize customer and operational experiences with purposeful software development.',
        links: ['Digital Transformation', 'Modern Software Development']
      }
    ]
  }
};

const marketingSubitem = document.querySelector('#marketing-subitem');

function activateProduct(key) {
  const product = products[key];
  if (!product) return;
  document.querySelectorAll('.product-selector [data-product]').forEach(el => el.classList.toggle('active', el.dataset.product === key));
  const stage = document.querySelector('#product-stage');
  stage.dataset.product = key;
  document.querySelector('#product-kicker').textContent = product.kicker;
  document.querySelector('#product-title').textContent = product.title;
  document.querySelector('#product-description').textContent = product.description;
  const image = document.querySelector('#product-image');
  image.src = product.image;
  image.alt = `${product.title} product preview`;
  document.querySelector('#product-monogram').textContent = product.monogram;
  marketingSubitem.hidden = key !== 'marketing';
}

document.querySelectorAll('.product-selector [data-product]').forEach(button => button.addEventListener('click', () => activateProduct(button.dataset.product)));

function buildMegaDetail(type, item) {
  const detail = document.createElement('div');
  detail.className = `mega-detail-content mega-detail-${type}`;

  if (type === 'products') {
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = `${item.label} product preview`;

    const copy = document.createElement('div');
    const eyebrow = document.createElement('small');
    eyebrow.textContent = item.eyebrow;
    const title = document.createElement('h3');
    title.textContent = item.label;
    const description = document.createElement('p');
    description.textContent = item.description;
    const link = document.createElement('a');
    link.href = '#products';
    link.dataset.productDestination = item.key;
    link.textContent = 'View Product \u2192';
    copy.append(eyebrow, title, description, link);
    detail.append(image, copy);
    return detail;
  }

  const title = document.createElement('h3');
  title.textContent = item.label;
  const description = document.createElement('p');
  description.textContent = item.description;
  const links = document.createElement('div');
  links.className = 'mega-detail-links';
  item.links.forEach(label => {
    const link = document.createElement('a');
    link.href = '#services';
    link.textContent = label;
    links.append(link);
  });
  detail.append(title, description, links);
  return detail;
}

function selectMegaItem(type, key, { focus = false } = {}) {
  const root = document.querySelector(`[data-mega-menu="${type}"]`);
  const item = megaMenuData[type].items.find(candidate => candidate.key === key);
  if (!root || !item) return;

  root.dataset.activeItem = key;
  root.querySelectorAll('[data-mega-item]').forEach(button => {
    const selected = button.dataset.megaItem === key;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected && focus) button.focus();
  });

  const detail = root.querySelector('.mega-menu-detail');
  detail.replaceChildren(buildMegaDetail(type, item));
}

function renderMegaList(type) {
  const root = document.querySelector(`[data-mega-menu="${type}"]`);
  if (!root) return;
  const list = root.querySelector('.mega-menu-list');
  const items = megaMenuData[type].items.map(item => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.megaItem = item.key;
    button.textContent = item.label;
    button.addEventListener('pointerenter', () => selectMegaItem(type, item.key));
    button.addEventListener('focus', () => selectMegaItem(type, item.key));
    button.addEventListener('click', () => selectMegaItem(type, item.key));
    listItem.append(button);
    return listItem;
  });
  list.replaceChildren(...items);
  selectMegaItem(type, megaMenuData[type].defaultKey);
}

let openMenuType = null;
let megaCloseTimer;
const megaCloseDelay = 200;

function openMegaMenu(type) {
  window.clearTimeout(megaCloseTimer);
  document.querySelectorAll('[data-mega-menu]').forEach(root => {
    const open = root.dataset.megaMenu === type;
    root.classList.toggle('open', open);
    root.querySelector('.mega-trigger').setAttribute('aria-expanded', String(open));
    root.querySelector('.mega-menu').hidden = !open;
  });
  openMenuType = type;
}

function closeMegaMenu({ restoreFocus = false } = {}) {
  const trigger = openMenuType
    ? document.querySelector(`[data-mega-trigger="${openMenuType}"]`)
    : null;
  document.querySelectorAll('[data-mega-menu]').forEach(root => {
    root.classList.remove('open');
    root.querySelector('.mega-trigger').setAttribute('aria-expanded', 'false');
    root.querySelector('.mega-menu').hidden = true;
  });
  openMenuType = null;
  if (restoreFocus) trigger?.focus();
}

Object.keys(megaMenuData).forEach(type => {
  renderMegaList(type);
  const root = document.querySelector(`[data-mega-menu="${type}"]`);
  const trigger = root.querySelector('.mega-trigger');
  trigger.addEventListener('pointerenter', () => openMegaMenu(type));
  trigger.addEventListener('focus', event => {
    if (!root.contains(event.relatedTarget)) openMegaMenu(type);
  });
  trigger.addEventListener('click', event => {
    event.preventDefault();
    if (openMenuType === type) closeMegaMenu();
    else openMegaMenu(type);
  });
  root.addEventListener('pointerenter', () => window.clearTimeout(megaCloseTimer));
  root.addEventListener('pointerleave', () => {
    window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(() => closeMegaMenu(), megaCloseDelay);
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMegaMenu({ restoreFocus: true });
      return;
    }
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const buttons = [...root.querySelectorAll('[data-mega-item]')];
    const currentIndex = buttons.indexOf(document.activeElement);
    if (currentIndex < 0) return;
    event.preventDefault();
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const next = buttons[(currentIndex + step + buttons.length) % buttons.length];
    selectMegaItem(type, next.dataset.megaItem, { focus: true });
  });
});

document.addEventListener('pointerdown', event => {
  if (openMenuType && !event.target.closest('[data-mega-menu]')) closeMegaMenu();
});

document.addEventListener('click', event => {
  const productLink = event.target.closest('[data-product-destination]');
  if (productLink) activateProduct(productLink.dataset.productDestination);
  if (event.target.closest('.main-nav a')) closeMegaMenu();
});

const services = {
  api: { code: 'API', kicker: 'CONNECTED SYSTEMS', title: 'Make every system work together.', description: 'Secure integrations connect platforms, payments, and business data without adding operational friction.', tags: ['REST APIs', 'Data Sync', 'System Integration'] },
  payment: { code: 'PAY', kicker: 'SECURE COMMERCE', title: 'Connect every payment moment.', description: 'Payment integrations support reliable transactions across digital and in-person customer journeys.', tags: ["Payment APIs", 'Clover POS', 'Processing'] },
  ai: { code: 'AI', kicker: 'INTELLIGENT OPERATIONS', title: 'Automate the work behind growth.', description: 'AI-powered software reduces repetitive tasks and helps teams turn operational data into action.', tags: ['AI Workflows', "Automation", 'Insights'] },
  mobile: { code: 'APP', kicker: 'MOBILE PRODUCTS', title: 'Build experiences people keep using.', description: 'Product strategy, UX, and development come together in intuitive iOS and Android applications.', tags: ['iOS', 'Android', 'UX / UI'] },
  web: { code: 'WEB', kicker: 'DIGITAL PRESENCE', title: 'Make the first interaction count.', description: 'High-performance websites clarify the brand story and guide visitors toward the right next step.', tags: ['Web Design', 'Development', 'SEO'] },
  enterprise: { code: 'ENT', kicker: 'SCALABLE SOFTWARE', title: 'Turn complex operations into one platform.', description: 'Purpose-built enterprise systems connect teams, workflows, data, and customer experiences.', tags: ['Platforms', 'Workflows', 'Architecture'] },
  cloud: { code: 'CLD', kicker: 'MODERN INFRASTRUCTURE', title: 'Create a foundation ready to scale.', description: 'Flexible cloud solutions give digital products the performance and resilience growth requires.', tags: ['Cloud', 'Scale', 'Reliability'] },
  marketing: { code: 'MKT', kicker: 'CONNECTED GROWTH', title: 'Align the message with the experience.', description: 'Strategy, content, and digital campaigns work alongside the technology that supports conversion.', tags: ['Strategy', 'Content', 'Campaigns'] }
};

function activateService(key) {
  const service = services[key];
  if (!service) return;
  document.querySelectorAll('[data-service]').forEach(el => el.classList.toggle('active', el.dataset.service === key));
  document.querySelector('.service-stage').dataset.service = key;
  document.querySelector('#service-code').textContent = service.code;
  document.querySelector('#service-kicker').textContent = service.kicker;
  document.querySelector('#service-title').textContent = service.title;
  document.querySelector('#service-description').textContent = service.description;
  document.querySelector('#service-tags').innerHTML = service.tags.map(tag => `<span>${tag}</span>`).join('');
}

document.querySelectorAll('.service-selector [data-service]').forEach(button => button.addEventListener('click', () => activateService(button.dataset.service)));

const sections = [...document.querySelectorAll('.scene')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const progressLinks = [...document.querySelectorAll('.scene-nav a')];
function setActiveScene(id) {
  progressLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
}
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    setActiveScene(entry.target.id);
  });
}, { root: snapPage, threshold: .62 });
sections.forEach(section => sectionObserver.observe(section));

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

function scrollToScene(hash, behavior = 'smooth') {
  const target = hash && document.querySelector(hash);
  if (!target) return;
  const top = snapPage.scrollTop + target.getBoundingClientRect().top - snapPage.getBoundingClientRect().top;
  snapPage.classList.add('is-jumping');
  snapPage.dataset.currentScene = hash.slice(1);
  setActiveScene(hash.slice(1));
  void snapPage.offsetHeight;
  if (behavior === 'auto') snapPage.scrollTop = top;
  else snapPage.scrollTo({ top, behavior });
  window.clearTimeout(jumpTimer);
  jumpTimer = window.setTimeout(() => snapPage.classList.remove('is-jumping'), behavior === 'smooth' ? 700 : 50);
}

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const hash = link.getAttribute('href');
  const target = hash.length > 1 ? document.querySelector(hash) : null;
  if (!target) return;
  event.preventDefault();
  history.pushState(null, '', hash);
  scrollToScene(hash);
}));

window.addEventListener('hashchange', () => scrollToScene(window.location.hash));
window.addEventListener('load', () => {
  if (!initialHash) return;
  requestAnimationFrame(() => scrollToScene(initialHash, 'auto'));
  window.setTimeout(() => {
    scrollToScene(initialHash, 'auto');
    history.replaceState(null, '', initialHash);
  }, 120);
});
