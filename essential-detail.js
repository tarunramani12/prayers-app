const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let checkedItems = {};

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

function toggleSection(sectionId) {
  const body = document.getElementById(sectionId);
  const icon = document.getElementById(sectionId === 'requirements' ? 'req-icon' : 'aar-icon');
  body.classList.toggle('collapsed');
  icon.textContent = body.classList.contains('collapsed') ? '▶' : '▼';
}

function updateCompletedCount(total) {
  const checked = Object.values(checkedItems).filter(Boolean).length;
  const el = document.getElementById('completed-count');
  if (el) el.textContent = `${checked} of ${total} completed`;
}

function buildRequirements(items, container, color, total) {
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'checklist-item';

    const checkbox = document.createElement('span');
    checkbox.className = 'checkbox';
    checkbox.dataset.id = item.id;
    checkbox.style.borderColor = color;

    checkbox.addEventListener('click', () => {
      checkedItems[item.id] = !checkedItems[item.id];
      checkbox.classList.toggle('checked', checkedItems[item.id]);
      checkbox.style.backgroundColor = checkedItems[item.id] ? color : '';
      updateCompletedCount(total);
    });

    const label = document.createElement('span');
    label.className = 'item-label';
    label.textContent = item.label + (item.note ? ` — ${item.note}` : '');

    li.appendChild(checkbox);
    li.appendChild(label);
    container.appendChild(li);

    if (item.children && item.children.length > 0) {
      const subUl = document.createElement('ul');
      subUl.className = 'checklist sub-checklist';
      buildRequirements(item.children, subUl, color, total);
      container.appendChild(subUl);
    }
  });
}

fetch('essentials.json')
  .then(r => r.json())
  .then(essentials => {
    const item = essentials.find(e => e.id === id);
    const titleEl = document.getElementById('essential-title');
    titleEl.textContent = item.title;
    titleEl.style.color = item.color;

    // Count all checkable items including children
    function countAll(items) {
      return items.reduce((acc, i) => acc + 1 + (i.children ? countAll(i.children) : 0), 0);
    }
    const total = countAll(item.requirements);

    const reqList = document.getElementById('requirements-list');
    buildRequirements(item.requirements, reqList, item.color, total);
    updateCompletedCount(total);

    // Aartis
    const aartiList = document.getElementById('aartis-list');
    item.aartis.forEach(aarti => {
      const li = document.createElement('li');
      li.className = 'checklist-item';

      const checkbox = document.createElement('span');
      checkbox.className = 'checkbox';
      checkbox.style.borderColor = item.color;
      checkbox.addEventListener('click', () => {
        checkedItems[`aarti-${aarti.id}`] = !checkedItems[`aarti-${aarti.id}`];
        checkbox.classList.toggle('checked', checkedItems[`aarti-${aarti.id}`]);
        checkbox.style.backgroundColor = checkedItems[`aarti-${aarti.id}`] ? item.color : '';
      });

      const link = document.createElement('a');
      link.className = 'item-label aarti-link';
      link.textContent = aarti.label;
      link.href = `prayer.html?source=prayers&id=${aarti.id}`;

      li.appendChild(checkbox);
      li.appendChild(link);
      aartiList.appendChild(li);
    });
  });
