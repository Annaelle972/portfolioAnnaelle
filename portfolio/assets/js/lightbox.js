(function () {
  const items = Array.from(document.querySelectorAll('.screenshot-item'));
  if (!items.length) return;

  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCap = document.getElementById('lb-caption');
  let current = 0;

  function open(index) {
    current = index;
    const img = items[index].querySelector('img');
    const cap = items[index].querySelector('.screenshot-caption');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { open((current - 1 + items.length) % items.length); }
  function next() { open((current + 1) % items.length); }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
  });

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  document.getElementById('lb-next').addEventListener('click', function (e) { e.stopPropagation(); next(); });

  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
})();
