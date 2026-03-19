/* ═══════════════════════════════════════════════════
   shared.js — navigation, thème, reveal communs
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
    input.checked = theme === 'dark';
    input.addEventListener('change', () => {
      const t = input.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(key, t);
    });
  });
})();

/* ── Curseur personnalisé ────────────────────────── */
(function initCursor() {
  if ('ontouchstart' in window || window.matchMedia('(pointer:coarse)').matches) return;

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.id  = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`;
    if (!dot.classList.contains('active')) {
      dot.classList.add('active');
      ring.classList.add('active');
    }
  });

  (function animRing() {
    rx += (mx - rx) * .11;
    ry += (my - ry) * .11;
    ring.style.transform = `translate(${rx - 14}px,${ry - 14}px)`;
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('active');
    ring.classList.remove('active');
  });

  const hoverSel = 'a,button,[role="button"],.card,.pcard,.nav-link,.qchip,label[for],input,select,textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSel)) {
      dot.classList.add('on-hover');
      ring.classList.add('on-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSel)) {
      dot.classList.remove('on-hover');
      ring.classList.remove('on-hover');
    }
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
