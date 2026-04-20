const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const source = params.get('source');

const jsonFile = source === 'essentials' ? 'essentials.json' : 'prayers.json';
const backHref = source === 'essentials' ? 'essentials.html' : 'index.html';

document.getElementById('back-link').href = backHref;

fetch(jsonFile)
  .then(response => response.json())
  .then(items => {
    const item = items.find(i => i.id === id);
    const titleEl = document.getElementById('prayer-title');
    const textEl = document.getElementById('prayer-text');

    titleEl.textContent = item.title;
    titleEl.style.color = item.color;
    textEl.textContent = item.text;
  });

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
