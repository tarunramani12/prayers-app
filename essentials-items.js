const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('essentials.json')
  .then(response => response.json())
  .then(categories => {
    const category = categories.find(c => c.id === id);
    document.getElementById('category-title').textContent = category.title;
    const list = document.getElementById('items-list');
    category.items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="essential-detail.html?catId=${id}&itemId=${item.id}">${item.title}</a>`;
      list.appendChild(li);
    });
  });

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
