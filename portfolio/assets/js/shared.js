/* ═══════════════════════════════════════════════════
   shared.js — navigation, thème, reveal, carousel, lightbox
═══════════════════════════════════════════════════ */

/* ── Theme ──────────────────────────────────────── */
(function initTheme() {
  const key = 'pf-theme';
  const stored = localStorage.getItem(key);
  const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = stored || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('theme-input');
    if (!input) return;
    // checked = soleil = light mode
    input.checked = theme === 'light';
    input.addEventListener('change', () => {
      const t = input.checked ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(key, t);
    });
  });
})();


/* ── Mobile nav ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const toggle  = document.getElementById('nav-toggle');
  const menu    = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Active link highlight */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.endsWith(current) || (current === 'index.html' && href === '#')) {
      a.classList.add('active');
    }
  });

  /* Scroll reveal */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Skill bar animation */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.skill-fill').forEach(b => {
        b.style.width = '0%';
        requestAnimationFrame(() => { b.style.width = b.dataset.w + '%'; });
      });
      skillObs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));

  /* ── Carousel ── */
  document.querySelectorAll('[data-carousel]').forEach(function(carousel) {
    var track    = carousel.querySelector('.carousel-track');
    var slides   = carousel.querySelectorAll('.carousel-slide');
    var prevBtn  = carousel.querySelector('.carousel-prev');
    var nextBtn  = carousel.querySelector('.carousel-next');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var counter  = carousel.querySelector('.carousel-counter');
    var total    = slides.length;
    var current  = 0;
    slides.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Diapositive ' + (i + 1));
      dot.addEventListener('click', function() { goTo(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });
    function goTo(idx) {
      current = (idx + total) % total;
      if (track) track.style.transform = 'translateX(-' + current * 100 + '%)';
      carousel.querySelectorAll('.carousel-dot').forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
      if (counter) counter.textContent = (current + 1) + ' / ' + total;
    }
    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });
    var startX = 0;
    carousel.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, {passive: true});
    carousel.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, {passive: true});
    goTo(0);
  });

  /* ── Lightbox — injection HTML si absente ── */
  if (!document.getElementById('lightbox')) {
    document.body.insertAdjacentHTML('beforeend',
      '<div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-label="Image agrandie" aria-hidden="true">' +
      '<div class="lb-backdrop" id="lb-backdrop"></div>' +
      '<div class="lb-content">' +
      '<button class="lb-close" id="lb-close" aria-label="Fermer">&#x2715;</button>' +
      '<button class="lb-nav lb-prev" id="lb-prev" aria-label="Précédent" hidden>&#8249;</button>' +
      '<div class="lb-img-wrap"><img class="lb-img" id="lb-img" src="" alt=""></div>' +
      '<button class="lb-nav lb-next" id="lb-next" aria-label="Suivant" hidden>&#8250;</button>' +
      '<div class="lb-caption-bar" id="lb-caption"></div>' +
      '</div>' +
      '<div class="lb-counter" id="lb-counter"></div>' +
      '</div>'
    );
  }
  var lb      = document.getElementById('lightbox');
  var lbImg   = document.getElementById('lb-img');
  var lbCap   = document.getElementById('lb-caption');
  var lbPrev  = document.getElementById('lb-prev');
  var lbNext  = document.getElementById('lb-next');
  var lbCtr   = document.getElementById('lb-counter');
  var lbClose = document.getElementById('lb-close');
  var lbBack  = document.getElementById('lb-backdrop');
  var lbItems = [];
  var lbIndex = 0;
  function lbOpen(items, idx) {
    lbItems = items; lbIndex = idx;
    lbShow();
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function lbShow() {
    var item = lbItems[lbIndex];
    lbImg.src = item.src;
    lbImg.alt = item.caption || '';
    lbCap.innerHTML = item.caption || '';
    var many = lbItems.length > 1;
    lbPrev.hidden = !many;
    lbNext.hidden = !many;
    lbCtr.textContent = many ? (lbIndex + 1) + ' / ' + lbItems.length : '';
    lbImg.style.opacity = '0';
    lbImg.onload = function() { lbImg.style.opacity = '1'; };
    if (lbImg.complete) lbImg.style.opacity = '1';
  }
  function lbCloseFn() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
  if (lbClose) lbClose.addEventListener('click', lbCloseFn);
  if (lbBack)  lbBack.addEventListener('click',  lbCloseFn);
  if (lbPrev)  lbPrev.addEventListener('click',  function() { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; lbShow(); });
  if (lbNext)  lbNext.addEventListener('click',  function() { lbIndex = (lbIndex + 1) % lbItems.length; lbShow(); });
  document.addEventListener('keydown', function(e) {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') lbCloseFn();
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; lbShow(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbItems.length; lbShow(); }
  });
  document.querySelectorAll('[data-lb-src]').forEach(function(img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      var group = img.closest('[data-group]');
      if (group) {
        var imgs = Array.from(group.querySelectorAll('[data-lb-src]'));
        var idx  = imgs.indexOf(img);
        lbOpen(imgs.map(function(i) { return { src: i.dataset.lbSrc, caption: i.dataset.lbCaption || '' }; }), idx);
      } else {
        lbOpen([{ src: img.dataset.lbSrc, caption: img.dataset.lbCaption || '' }], 0);
      }
    });
  });

  /* Contact form (shared) */
  const form = document.getElementById('contact-form');
  if (form) {
    const rules = {
      'f-name':  v => v.trim().length > 1,
      'f-email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      'f-msg':   v => v.trim().length > 9,
    };
    function validate(id) {
      const inp = document.getElementById(id);
      if (!inp) return true;
      const ok = rules[id](inp.value);
      inp.closest('.form-row').classList.toggle('has-error', !ok);
      return ok;
    }
    Object.keys(rules).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => validate(id));
    });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const ok = Object.keys(rules).map(validate).every(Boolean);
      if (!ok) return;
      const btn = form.querySelector('.btn-submit');
      const status = document.getElementById('form-status');
      btn.disabled = true; btn.textContent = 'Envoi…';
      try {
        const res = await fetch(form.action, {
          method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
          body: JSON.stringify({ name: document.getElementById('f-name').value, email: document.getElementById('f-email').value, message: document.getElementById('f-msg').value }),
        });
        if (res.ok) {
          btn.textContent = 'Message envoyé'; btn.style.background = '#059669';
          if (status) { status.textContent = 'Merci, je vous réponds sous 24 h.'; status.style.color = 'var(--green)'; }
          form.reset();
        } else throw new Error();
      } catch {
        btn.disabled = false; btn.textContent = 'Envoyer';
        if (status) { status.textContent = 'Erreur. Contactez-moi par e-mail.'; status.style.color = '#dc2626'; }
      }
    });
  }
});
