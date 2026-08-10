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

const products = Object.fromEntries(window.aiyaCatalog.products.map(item => [item.key, item]));
const services = Object.fromEntries(window.aiyaCatalog.services.map(item => [item.key, item]));

const megaMenuData = {
  products: {
    defaultKey: 'commerce',
    items: window.aiyaCatalog.products.map(item => ({
      ...item,
      label: item.title,
      eyebrow: item.kicker,
      description: item.summary
    }))
  },
  services: {
    defaultKey: 'strategy',
    items: window.aiyaCatalog.services.map(item => ({
      ...item,
      label: item.title,
      eyebrow: item.kicker,
      description: item.summary
    }))
  }
};

function activateProduct(key) {
  const product = products[key];
  if (!product) return;
  document.querySelectorAll('.product-selector [data-product]').forEach(el => el.classList.toggle('active', el.dataset.product === key));
  const stage = document.querySelector('#product-stage');
  stage.dataset.product = key;
  document.querySelector('#product-kicker').textContent = product.kicker;
  document.querySelector('#product-title').textContent = product.title;
  document.querySelector('#product-description').textContent = product.summary;
  const image = document.querySelector('#product-image');
  image.src = product.image;
  image.alt = `${product.title} product preview`;
  document.querySelector('#product-monogram').textContent = product.monogram;
}

document.querySelectorAll('.product-selector [data-product]').forEach(link => {
  ['mouseenter', 'focus'].forEach(eventName => link.addEventListener(eventName, () => activateProduct(link.dataset.product)));
});

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
    link.href = item.url;
    link.textContent = 'View Product \u2192';
    copy.append(eyebrow, title, description, link);
    detail.append(image, copy);
    return detail;
  }

  const title = document.createElement('h3');
  title.textContent = item.label;
  const description = document.createElement('p');
  description.textContent = item.description;
  const capabilities = document.createElement('div');
  capabilities.className = 'mega-detail-links';
  item.capabilities.forEach(label => {
    const span = document.createElement('span');
    span.textContent = label;
    capabilities.append(span);
  });
  const link = document.createElement('a');
  link.href = item.url;
  link.textContent = 'View Service \u2192';
  detail.append(title, description, capabilities, link);
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
    button.className = 'mega-menu-item';
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
  if (restoreFocus) trigger?.focus();
  document.querySelectorAll('[data-mega-menu]').forEach(root => {
    root.classList.remove('open');
    root.querySelector('.mega-trigger').setAttribute('aria-expanded', 'false');
    root.querySelector('.mega-menu').hidden = true;
  });
  openMenuType = null;
}

Object.keys(megaMenuData).forEach(type => {
  renderMegaList(type);
  const root = document.querySelector(`[data-mega-menu="${type}"]`);
  const trigger = root.querySelector('.mega-trigger');
  let openedByTriggerLeadIn = false;
  const openFromTrigger = () => {
    openedByTriggerLeadIn ||= openMenuType !== type;
    openMegaMenu(type);
  };
  trigger.addEventListener('pointerenter', openFromTrigger);
  trigger.addEventListener('focus', event => {
    if (!root.contains(event.relatedTarget)) openFromTrigger();
  });
  trigger.addEventListener('click', event => {
    event.preventDefault();
    const keepOpen = openedByTriggerLeadIn;
    openedByTriggerLeadIn = false;
    if (keepOpen || openMenuType !== type) openMegaMenu(type);
    else closeMegaMenu();
  });
  root.addEventListener('pointerenter', () => window.clearTimeout(megaCloseTimer));
  root.addEventListener('pointerleave', () => {
    window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(() => closeMegaMenu(), megaCloseDelay);
  });
  root.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const buttons = [...root.querySelectorAll('[data-mega-item]')];
    const currentIndex = buttons.indexOf(document.activeElement);
    if (currentIndex < 0) return;
    event.preventDefault();
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const next = buttons[(currentIndex + step + buttons.length) % buttons.length];
    next.focus();
  });
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !openMenuType) return;
  event.preventDefault();
  closeMegaMenu({ restoreFocus: true });
});

document.addEventListener('pointerdown', event => {
  if (openMenuType && !event.target.closest('[data-mega-menu]')) closeMegaMenu();
});

document.addEventListener('click', event => {
  if (event.target.closest('.main-nav a')) closeMegaMenu();
});

function activateService(key) {
  const service = services[key];
  if (!service) return;
  document.querySelectorAll('[data-service]').forEach(el => el.classList.toggle('active', el.dataset.service === key));
  document.querySelector('.service-stage').dataset.service = key;
  document.querySelector('#service-code').textContent = service.code;
  document.querySelector('#service-kicker').textContent = service.kicker;
  document.querySelector('#service-title').textContent = service.title;
  document.querySelector('#service-description').textContent = service.summary;
  document.querySelector('#service-tags').innerHTML = service.capabilities.map(tag => `<span>${tag}</span>`).join('');
}

document.querySelectorAll('.service-selector [data-service]').forEach(link => {
  ['mouseenter', 'focus'].forEach(eventName => link.addEventListener(eventName, () => activateService(link.dataset.service)));
});

const sections = [...document.querySelectorAll('.scene')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const megaTriggers = [...document.querySelectorAll('.mega-trigger')];
const progressLinks = [...document.querySelectorAll('.scene-nav a')];
function setActiveScene(id) {
  progressLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  megaTriggers.forEach(trigger => trigger.classList.toggle('active', trigger.dataset.megaTrigger === id));
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
mainNav.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
});

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
