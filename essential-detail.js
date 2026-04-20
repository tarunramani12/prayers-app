const params = new URLSearchParams(window.location.search);
const catId = params.get('catId');
const itemId = params.get('itemId');

fetch('essentials.json')
  .then(response => response.json())
  .then(categories => {
    const category = categories.find(c => c.id === catId);
    const item = category.items.find(i => i.id === itemId);
    const titleEl = document.getElementById('item-title');
    const textEl = document.getElementById('item-text');
    const headerEl = document.getElementById('prayer-header');
    const backLink = document.getElementById('back-link');

    titleEl.textContent = item.title;
    headerEl.style.backgroundColor = category.color;
    textEl.textContent = item.text;
    backLink.href = `essentials-items.html?id=${catId}`;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', category.color);
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
