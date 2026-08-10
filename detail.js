const detailPage = document.querySelector('[data-detail-kind][data-detail-key]');

if (detailPage) {
  const item = window.getCatalogItem(detailPage.dataset.detailKind, detailPage.dataset.detailKey);
  if (!item) throw new Error(`Unknown catalog item: ${detailPage.dataset.detailKind}/${detailPage.dataset.detailKey}`);

  const assetPrefix = detailPage.dataset.assetPrefix || '';
  document.querySelector('#detail-kicker').textContent = item.kicker;
  document.querySelector('#detail-title').textContent = item.title;
  document.querySelector('#detail-summary').textContent = item.summary;
  document.querySelector('#detail-code').textContent = item.monogram || item.code;

  const image = document.querySelector('#detail-image');
  if (image && item.image) {
    image.src = `${assetPrefix}${item.image}`;
    image.alt = `${item.title} visual`;
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
}
