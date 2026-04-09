// const params = new URLSearchParams(window.location.search);
// const id = params.get('id');

// fetch('prayers.json')
//   .then(response => response.json())
//   .then(prayers => {
//     const prayer = prayers.find(p => p.id === id);
//     const titleEl = document.getElementById('prayer-title');
//     const textEl = document.getElementById('prayer-text');

//     titleEl.textContent = prayer.title;
//     titleEl.style.color = prayer.color;
//     textEl.textContent = prayer.text;
//   });


const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('prayers.json')
  .then(response => response.json())
  .then(prayers => {
    const prayer = prayers.find(p => p.id === id);
    const titleEl = document.getElementById('prayer-title');
    const textEl = document.getElementById('prayer-text');
    const headerEl = document.getElementById('prayer-header');

    titleEl.textContent = prayer.title;
    headerEl.style.backgroundColor = prayer.color;
    textEl.textContent = prayer.text;
  });