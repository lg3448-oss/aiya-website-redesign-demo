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

const services = {
  api: { code: 'API', kicker: 'CONNECTED SYSTEMS', title: 'Make every system work together.', description: 'Secure integrations connect platforms, payments, and business data without adding operational friction.', tags: ['REST APIs', 'Data Sync', 'System Integration'] },
  payment: { code: 'PAY', kicker: 'SECURE COMMERCE', title: 'Connect every payment moment.', description: 'Payment integrations support reliable transactions across digital and in-person customer journeys.', tags: ['Payment APIs', 'Clover POS', 'Processing'] },
  ai: { code: 'AI', kicker: 'INTELLIGENT OPERATIONS', title: 'Automate the work behind growth.', description: 'AI-powered software reduces repetitive tasks and helps teams turn operational data into action.', tags: ['AI Workflows', 'Automation', 'Insights'] },
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
