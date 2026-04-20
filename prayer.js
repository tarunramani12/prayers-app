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
    const pageEl = document.getElementById('prayer-page');

    titleEl.textContent = item.title;
    textEl.textContent = item.text;
    pageEl.style.backgroundColor = item.color;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', item.color);

    // Make hamburger white on colored page
    document.querySelectorAll('.hamburger span').forEach(s => s.style.backgroundColor = '#ffffff');
  });

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
