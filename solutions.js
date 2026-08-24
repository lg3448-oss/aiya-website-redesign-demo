(() => {
  const renderDirectory = (categoryKey, targetId) => {
    const category = window.aiyaCatalog.solutionCategories.find(item => item.key === categoryKey);
    const target = document.querySelector(`#${targetId}`);
    if (!category || !target) return;

    const cards = category.offerings.map((item, index) => {
      const card = document.createElement('a');
      card.className = 'solution-card';
      card.href = item.url;
      const number = document.createElement('small');
      number.textContent = String(index + 1).padStart(2, '0');
      const title = document.createElement('h3');
      title.textContent = item.title;
      const description = document.createElement('p');
      description.textContent = item.description;
      const status = document.createElement('span');
      status.textContent = 'Explore solution \u2197\uFE0E';
      card.append(number, title, description, status);
      return card;
    });
    target.replaceChildren(...cards);
  };

  renderDirectory('industries', 'industry-solutions');
  renderDirectory('use-cases', 'use-case-solutions');
  window.initializeAiyaMegaMenus();
})();
