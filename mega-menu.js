window.initializeAiyaMegaMenus = ({ pathPrefix = '' } = {}) => {
  const withPrefix = path => `${pathPrefix}${path}`;
  const controller = new AbortController();
  const listenerOptions = { signal: controller.signal };
  const menuRoots = [...document.querySelectorAll('[data-mega-menu]')];
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
  let openMenuType = null;
  let megaCloseTimer;
  const megaCloseDelay = 200;

  function buildMegaDetail(type, item) {
    const detail = document.createElement('div');
    detail.className = `mega-detail-content mega-detail-${type}`;

    if (type === 'products') {
      const image = document.createElement('img');
      image.src = withPrefix(item.image);
      image.alt = `${item.label} product preview`;

      const copy = document.createElement('div');
      const eyebrow = document.createElement('small');
      eyebrow.textContent = item.eyebrow;
      const title = document.createElement('h3');
      title.textContent = item.label;
      const description = document.createElement('p');
      description.textContent = item.description;
      const link = document.createElement('a');
      link.href = withPrefix(item.url);
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
    link.href = withPrefix(item.url);
    link.textContent = 'View Service \u2192';
    detail.append(title, description, capabilities, link);
    return detail;
  }

  function selectMegaItem(type, key, { focus = false } = {}) {
    const root = menuRoots.find(candidate => candidate.dataset.megaMenu === type);
    const item = megaMenuData[type]?.items.find(candidate => candidate.key === key);
    if (!root || !item) return;

    root.dataset.activeItem = key;
    root.querySelectorAll('[data-mega-item]').forEach(link => {
      const selected = link.dataset.megaItem === key;
      link.classList.toggle('active', selected);
      link.setAttribute('aria-selected', String(selected));
      link.tabIndex = selected ? 0 : -1;
      if (selected && focus) link.focus();
    });

    root.querySelector('.mega-menu-detail')?.replaceChildren(buildMegaDetail(type, item));
  }

  function renderMegaList(type) {
    const root = menuRoots.find(candidate => candidate.dataset.megaMenu === type);
    const list = root?.querySelector('.mega-menu-list');
    if (!root || !list || !megaMenuData[type]) return;
    const items = megaMenuData[type].items.map(item => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'mega-menu-item';
      link.dataset.megaItem = item.key;
      link.href = withPrefix(item.url);
      link.textContent = item.label;
      link.addEventListener('pointerenter', () => selectMegaItem(type, item.key), listenerOptions);
      link.addEventListener('focus', () => selectMegaItem(type, item.key), listenerOptions);
      listItem.append(link);
      return listItem;
    });
    list.replaceChildren(...items);
    selectMegaItem(type, megaMenuData[type].defaultKey);
  }

  function openMegaMenu(type) {
    window.clearTimeout(megaCloseTimer);
    menuRoots.forEach(root => {
      const open = root.dataset.megaMenu === type;
      root.classList.toggle('open', open);
      root.querySelector('.mega-toggle')?.setAttribute('aria-expanded', String(open));
      const panel = root.querySelector('.mega-menu');
      if (panel) panel.hidden = !open;
    });
    openMenuType = type;
  }

  function closeMegaMenu({ restoreFocus = false } = {}) {
    const destination = openMenuType
      ? document.querySelector(`[data-mega-link="${openMenuType}"]`)
      : null;
    if (restoreFocus) destination?.focus();
    menuRoots.forEach(root => {
      root.classList.remove('open');
      root.querySelector('.mega-toggle')?.setAttribute('aria-expanded', 'false');
      const panel = root.querySelector('.mega-menu');
      if (panel) panel.hidden = true;
    });
    openMenuType = null;
  }

  Object.keys(megaMenuData).forEach(type => {
    const root = menuRoots.find(candidate => candidate.dataset.megaMenu === type);
    if (!root) return;
    renderMegaList(type);
    const destination = root.querySelector('.mega-trigger');
    const toggle = root.querySelector('.mega-toggle');
    destination?.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') openMegaMenu(type);
    }, listenerOptions);
    root.addEventListener('pointerenter', () => window.clearTimeout(megaCloseTimer), listenerOptions);
    destination?.addEventListener('focus', event => {
      if (!root.contains(event.relatedTarget) && window.matchMedia('(min-width: 761px)').matches) openMegaMenu(type);
    }, listenerOptions);
    toggle?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (openMenuType !== type) openMegaMenu(type);
      else closeMegaMenu();
    }, listenerOptions);
    root.addEventListener('pointerleave', () => {
      window.clearTimeout(megaCloseTimer);
      megaCloseTimer = window.setTimeout(() => closeMegaMenu(), megaCloseDelay);
    }, listenerOptions);
    root.addEventListener('keydown', event => {
      if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
      const links = [...root.querySelectorAll('[data-mega-item]')];
      const currentIndex = links.indexOf(document.activeElement);
      if (currentIndex < 0) return;
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      links[(currentIndex + step + links.length) % links.length].focus();
    }, listenerOptions);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !openMenuType) return;
    event.preventDefault();
    closeMegaMenu({ restoreFocus: true });
  }, listenerOptions);

  document.addEventListener('pointerdown', event => {
    if (openMenuType && !event.target.closest('[data-mega-menu]')) closeMegaMenu();
  }, listenerOptions);

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  navToggle?.addEventListener('click', () => {
    const open = mainNav?.classList.toggle('open') || false;
    navToggle.setAttribute('aria-expanded', String(open));
  }, listenerOptions);
  mainNav?.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    closeMegaMenu();
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }, listenerOptions);

  return {
    open: openMegaMenu,
    close: closeMegaMenu,
    destroy() {
      window.clearTimeout(megaCloseTimer);
      controller.abort();
      closeMegaMenu();
    }
  };
};
