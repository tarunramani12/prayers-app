fetch('prayers.json')
  .then(response => response.json())
  .then(prayers => {
    const list = document.getElementById('prayer-list');

    prayers.forEach(prayer => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="prayer.html?id=${prayer.id}">${prayer.title}</a>`;
      list.appendChild(li);
    });
  });

  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}