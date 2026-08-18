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

const services = Object.fromEntries(window.aiyaCatalog.services.map(item => [item.key, item]));
const megaMenus = window.initializeAiyaMegaMenus({ pathPrefix: '' });

const productCategories = Object.fromEntries(window.aiyaCatalog.productCategories.map(category => [category.key, category]));

function renderOfferings(container, offerings) {
  container.replaceChildren(...offerings.map(offering => {
    const link = document.createElement('a');
    link.href = offering.url;
    const title = document.createElement('strong');
    title.textContent = offering.label;
    const description = document.createElement('small');
    description.textContent = offering.description;
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '\u2197\uFE0E';
    link.append(title, description, arrow);
    return link;
  }));
}

function activateProductCategory(categoryKey) {
  const category = productCategories[categoryKey];
  if (!category) return;
  document.querySelectorAll('.product-selector [data-product-category]').forEach(el => el.classList.toggle('active', el.dataset.productCategory === categoryKey));
  const stage = document.querySelector('#product-stage');
  stage.dataset.productCategory = category.key;
  document.querySelector('#product-kicker').textContent = category.kicker;
  document.querySelector('#product-title').textContent = category.title;
  document.querySelector('#product-description').textContent = category.summary;
  const image = document.querySelector('#product-image');
  image.src = category.image;
  image.alt = `${category.title} capability preview`;
  document.querySelector('#product-monogram').textContent = category.monogram;
  const offerings = document.querySelector('#product-offerings');
  offerings.setAttribute('aria-label', `${category.title} capabilities`);
  renderOfferings(offerings, category.offerings.map(offering => ({ label: offering.title, ...offering })));
  const overview = document.querySelector('#product-overview');
  overview.hidden = false;
  overview.href = category.overviewUrl;
  overview.textContent = `${category.title} overview \u2192\uFE0E`;
}

document.querySelectorAll('.product-selector [data-product-category]').forEach(button => {
  ['mouseenter', 'focus', 'click'].forEach(eventName => button.addEventListener(eventName, () => activateProductCategory(button.dataset.productCategory)));
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
  const offerings = document.querySelector('#service-offerings');
  offerings.setAttribute('aria-label', `${service.title} services`);
  renderOfferings(offerings, service.capabilities.map(label => ({ label, description: service.title, url: service.url })));
  const overview = document.querySelector('#service-overview');
  overview.href = service.url;
  overview.textContent = `${service.title} overview \u2192\uFE0E`;
}

document.querySelectorAll('.service-selector [data-service]').forEach(button => {
  ['mouseenter', 'focus', 'click'].forEach(eventName => button.addEventListener(eventName, () => activateService(button.dataset.service)));
});

activateProductCategory('payments-commerce');
activateService('strategy');

const sections = [...document.querySelectorAll('.scene')];
const navLinks = [...document.querySelectorAll('.main-nav > a, [data-mega-link]')];
const megaLinks = [...document.querySelectorAll('[data-mega-link]')];
const progressLinks = [...document.querySelectorAll('.scene-nav a')];
function setActiveScene(id) {
  progressLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  megaLinks.forEach(link => link.classList.toggle('active', link.dataset.megaLink === id));
}
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    setActiveScene(entry.target.id);
  });
}, { root: snapPage, threshold: .62 });
sections.forEach(section => sectionObserver.observe(section));

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
