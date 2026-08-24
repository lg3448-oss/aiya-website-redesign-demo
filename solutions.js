(() => {
  const renderDirectory = (categoryKey, targetId, idPrefix) => {
    const category = window.aiyaCatalog.solutionCategories.find(item => item.key === categoryKey);
    const target = document.querySelector(`#${targetId}`);
    if (!category || !target) return;

    const cards = category.offerings.map((item, index) => {
      const card = document.createElement('article');
      card.className = 'solution-card';
      card.id = `${idPrefix}-${item.key}`;
      const number = document.createElement('small');
      number.textContent = String(index + 1).padStart(2, '0');
      const title = document.createElement('h3');
      title.textContent = item.title;
      const description = document.createElement('p');
      description.textContent = item.description;
      const status = document.createElement('span');
      status.textContent = 'Solution page planned';
      card.append(number, title, description, status);
      return card;
    });
    target.replaceChildren(...cards);
  };

  renderDirectory('industries', 'industry-solutions', 'industry');
  renderDirectory('use-cases', 'use-case-solutions', 'use-case');
  window.initializeAiyaMegaMenus();
})();
