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
    const headerEl = document.getElementById('prayer-header');

    titleEl.textContent = item.title;
    headerEl.style.backgroundColor = item.color;
    textEl.textContent = item.text;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', item.color);
  });

window.addEventListener('scroll', () => {
  const header = document.getElementById('prayer-header');
  const scrollY = window.scrollY;
  const headerHeight = header.offsetHeight;
  const progress = Math.min(scrollY / headerHeight, 1);
  header.style.opacity = 1 - progress;
  header.style.transform = `translateY(-${progress * 40}px)`;
});

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
