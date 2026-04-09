const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('prayers.json')
  .then(response => response.json())
  .then(prayers => {
    const prayer = prayers.find(p => p.id === id);
    document.getElementById('prayer-title').textContent = prayer.title;
    document.getElementById('prayer-text').textContent = prayer.text;
  });