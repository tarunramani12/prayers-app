fetch('essentials.json')
  .then(response => response.json())
  .then(essentials => {
    const list = document.getElementById('essentials-list');
    essentials.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="prayer.html?source=essentials&id=${item.id}">${item.title}</a>`;
      list.appendChild(li);
    });
  });

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
