const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('essentials.json')
  .then(response => response.json())
  .then(essentials => {
    const item = essentials.find(e => e.id === id);

    const titleEl = document.getElementById('essential-title');
    titleEl.textContent = item.title;
    titleEl.style.color = item.color;

    // Build checklist
    const checklistEl = document.getElementById('checklist-list');
    item.checklist.forEach((entry, index) => {
      const li = buildCheckItem(entry, index, item.color);
      checklistEl.appendChild(li);
    });

    // Build aartis
    const aartisEl = document.getElementById('aartis-list');
    item.aartis.forEach(aarti => {
      const li = document.createElement('li');
      li.className = 'plain-item';
      li.textContent = aarti;
      aartisEl.appendChild(li);
    });
  });

function buildCheckItem(entry, index, color) {
  const li = document.createElement('li');
  li.className = 'check-item';

  if (typeof entry === 'string') {
    li.innerHTML = `
      <label class="check-label">
        <input type="checkbox" id="check-${index}" onchange="updateCheckStyle(this, '${color}')">
        <span class="check-text">${entry}</span>
      </label>`;
  } else {
    // Item with sub-items
    li.innerHTML = `
      <label class="check-label">
        <input type="checkbox" id="check-${index}" onchange="updateCheckStyle(this, '${color}')">
        <span class="check-text">${entry.name}</span>
      </label>`;
    const subUl = document.createElement('ul');
    subUl.className = 'sub-checklist';
    entry.items.forEach((sub, subIndex) => {
      const subLi = document.createElement('li');
      subLi.className = 'check-item';
      subLi.innerHTML = `
        <label class="check-label">
          <input type="checkbox" id="check-${index}-${subIndex}" onchange="updateCheckStyle(this, '${color}')">
          <span class="check-text">${sub}</span>
        </label>`;
      subUl.appendChild(subLi);
    });
    li.appendChild(subUl);
  }
  return li;
}

function updateCheckStyle(checkbox, color) {
  const label = checkbox.closest('.check-label');
  const text = label.querySelector('.check-text');
  if (checkbox.checked) {
    text.style.textDecoration = 'line-through';
    text.style.opacity = '0.4';
  } else {
    text.style.textDecoration = 'none';
    text.style.opacity = '1';
  }
}

function clearAll() {
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
    const text = cb.closest('.check-label').querySelector('.check-text');
    text.style.textDecoration = 'none';
    text.style.opacity = '1';
  });
}

function toggleSection(id) {
  const body = document.getElementById(id);
  const chevron = document.getElementById('chevron-' + id);
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  chevron.textContent = isOpen ? '▸' : '▾';
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
