window.initializeAiyaMegaMenus = ({ pathPrefix = '' } = {}) => {
  const i18nText = value => window.aiyaI18n?.t(value) || value;
  const withPrefix = path => (path.startsWith('/') ? path : `${pathPrefix}${path}`);
  const controller = new AbortController();
  const listenerOptions = { signal: controller.signal };
  const menuRoots = [...document.querySelectorAll('[data-mega-menu]')];
  const megaMenuData = {
    products: {
      categories: window.aiyaCatalog.productCategories,
      categoryOrder: window.aiyaCatalog.productCategories.map(category => category.title),
      items: window.aiyaCatalog.productCategories.flatMap(category => category.offerings.map((offering, index) => ({
        ...offering,
        key: `${category.key}-${index + 1}`,
        label: offering.title,
        category: category.title,
        description: offering.description
      })))
    },
    services: {
      categories: window.aiyaCatalog.serviceCategories,
      categoryOrder: window.aiyaCatalog.serviceCategories.map(category => category.title),
      items: window.aiyaCatalog.serviceCategories.flatMap(category => category.offerings.map((offering, index) => ({
        ...offering,
        menuKey: `${category.key}-${index + 1}`,
        label: offering.title,
        category: category.title,
        description: offering.description
      })))
    },
    solutions: {
      categories: window.aiyaCatalog.solutionCategories,
      categoryOrder: window.aiyaCatalog.solutionCategories.map(category => category.title),
      items: window.aiyaCatalog.solutionCategories.flatMap(category => category.offerings.map((offering, index) => ({
        ...offering,
        menuKey: `${category.key}-${index + 1}`,
        label: offering.title,
        category: category.title
      })))
    }
  };
  let openMenuType = null;
  let megaCloseTimer;
  const megaCloseDelay = 200;

  function selectMegaItem(type, key, { focus = false } = {}) {
    const root = menuRoots.find(candidate => candidate.dataset.megaMenu === type);
    if (!root) return;

    root.dataset.activeItem = key;
    root.querySelectorAll('[data-mega-item]').forEach(link => {
      const selected = link.dataset.megaItem === key;
      link.classList.toggle('active', selected);
      if (selected && focus) link.focus();
    });
  }

  function renderMegaList(type) {
    const root = menuRoots.find(candidate => candidate.dataset.megaMenu === type);
    const list = root?.querySelector('.mega-menu-list');
    if (!root || !list || !megaMenuData[type]) return;
    list.className = `mega-menu-groups mega-menu-groups-${type}`;
    const menuItems = megaMenuData[type].items.map(item => ({
      ...item,
      menuKey: item.menuKey || item.key,
      overview: false
    }));
    const groupedItems = menuItems.reduce((groups, item) => {
      (groups[item.category] ||= []).push(item);
      return groups;
    }, {});
    const categories = megaMenuData[type].categoryOrder
      .filter(category => groupedItems[category]?.length)
      .map(category => {
        const group = document.createElement('li');
        group.className = 'mega-menu-group';
        if (category === 'Hardware') group.classList.add('mega-menu-group-hardware');

        const heading = document.createElement('h3');
        heading.className = 'mega-menu-category';
        heading.textContent = category;

        const itemList = document.createElement('ul');
        itemList.className = 'mega-menu-products';
        groupedItems[category].forEach(item => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.className = 'mega-menu-item';
          link.classList.add('mega-menu-item-offering');
          link.dataset.megaItem = item.menuKey;
          link.href = withPrefix(item.url);

          const copy = document.createElement('span');
          copy.className = 'mega-menu-copy';
          const title = document.createElement('strong');
          title.textContent = item.label;
          const description = document.createElement('small');
          description.textContent = item.description;
          copy.append(title, description);

          const arrow = document.createElement('span');
          arrow.className = 'mega-menu-arrow';
          arrow.setAttribute('aria-hidden', 'true');
          arrow.textContent = '\u2197\uFE0E';
          link.append(copy, arrow);
          link.addEventListener('pointerenter', () => selectMegaItem(type, item.menuKey), listenerOptions);
          link.addEventListener('focus', () => selectMegaItem(type, item.menuKey), listenerOptions);
          listItem.append(link);
          itemList.append(listItem);
        });

        group.append(heading, itemList);
        if (category !== 'Hardware') {
          const parent = megaMenuData[type].categories.find(item => item.title === category);
          const overview = document.createElement('a');
          overview.className = 'mega-menu-overview';
          overview.href = withPrefix(parent.overviewUrl);
          overview.textContent = `${parent.title} ${i18nText('overview')} \u2192\uFE0E`;
          group.append(overview);
        }
        return group;
      });
    list.replaceChildren(...categories);
    root.querySelector('.mega-menu-detail')?.remove();
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
