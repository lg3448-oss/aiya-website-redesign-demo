const detailPage = document.querySelector('[data-detail-kind][data-detail-key]');

if (detailPage) {
  const headerBrand = document.querySelector('.site-header .brand');
  if (headerBrand && !document.querySelector('.prototype-badge')) {
    const prototypeBadge = document.createElement('span');
    prototypeBadge.className = 'prototype-badge';
    prototypeBadge.textContent = 'Internal design prototype';
    headerBrand.after(prototypeBadge);
  }

  const item = window.getCatalogItem(detailPage.dataset.detailKind, detailPage.dataset.detailKey);
  if (!item) throw new Error(`Unknown catalog item: ${detailPage.dataset.detailKind}/${detailPage.dataset.detailKey}`);

  const assetPrefix = detailPage.dataset.assetPrefix || '';
  detailPage.dataset.detailCategory = (item.navCategory || 'AIYA').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  detailPage.classList.toggle('long-title', item.title.length > 23);
  document.querySelector('#detail-kicker').textContent = item.kicker;
  document.querySelector('#detail-title').textContent = item.title;
  document.querySelector('#detail-summary').textContent = item.summary;
  document.querySelector('#detail-code').textContent = item.monogram || item.code;

  const image = document.querySelector('#detail-image');
  if (image && item.image) {
    image.src = `${assetPrefix}${item.image}`;
    image.alt = `${item.title} visual`;
    image.decoding = 'async';
    image.fetchPriority = 'high';
  } else if (image) {
    image.hidden = true;
  }

  const renderList = (selector, entries, className) => {
    const list = document.querySelector(selector);
    const rows = entries.map((entry, index) => {
      const row = document.createElement('li');
      row.className = className;
      const number = document.createElement('small');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('span');
      label.textContent = entry;
      row.append(number, label);
      return row;
    });
    list.replaceChildren(...rows);
  };

  renderList('#detail-capabilities', item.capabilities, 'detail-capability');
  renderList('#detail-deliverables', item.deliverables, 'detail-list-item');
  renderList('#detail-use-cases', item.useCases, 'detail-list-item');

  const relatedRoot = document.querySelector('#detail-related-products');
  if (relatedRoot) {
    const category = window.aiyaCatalog.productCategories.find(candidate => candidate.title === item.navCategory);
    const related = (category?.offerings || [])
      .filter(candidate => candidate.title !== item.title)
      .slice(0, 3);
    const links = related.map(candidate => {
      const link = document.createElement('a');
      link.className = 'related-product-link';
      link.href = `${assetPrefix}${candidate.url}`;
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      title.textContent = candidate.title;
      const description = document.createElement('small');
      description.textContent = candidate.description;
      copy.append(title, description);
      const arrow = document.createElement('i');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '\u2197\uFE0E';
      link.append(copy, arrow);
      return link;
    });
    relatedRoot.replaceChildren(...links);
  }

  const revealSections = [...document.querySelectorAll('.reveal-section')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) detailPage.classList.add('reveal-enabled');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealSections.forEach(section => section.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    revealSections.forEach(section => revealObserver.observe(section));
  }
  window.initializeAiyaMegaMenus({ pathPrefix: '../' });
}
