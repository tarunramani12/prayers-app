fetch('essentials.json')
  .then(response => response.json())
  .then(categories => {
    const list = document.getElementById('essentials-list');
    categories.forEach(cat => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="essentials-items.html?id=${cat.id}" style="color: ${cat.color}">${cat.title}</a>`;
      list.appendChild(li);
    });
  });

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
