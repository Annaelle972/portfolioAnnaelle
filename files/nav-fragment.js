/* nav-fragment.js — insère la nav et le footer dans chaque page
   Usage : <script src="nav-fragment.js"></script> juste avant </body>
*/
(function () {
  /* ── SVG sprite (icons) ───────────────────────── */
  const sprite = `<svg aria-hidden="true" style="display:none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="ic-mail"     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
    <symbol id="ic-linkedin" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></symbol>
    <symbol id="ic-github"   viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></symbol>
    <symbol id="ic-pdf"      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></symbol>
    <symbol id="ic-pin"      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="ic-ext"      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>
    <symbol id="ic-check"    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol>
    <symbol id="ic-code"     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
    <symbol id="ic-db"       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></symbol>
    <symbol id="ic-shield"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
    <symbol id="ic-rss"      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1" fill="currentColor"/></symbol>
    <symbol id="ic-book"     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></symbol>
  </defs>
</svg>`;

  /* ── Nav HTML ─────────────────────────────────── */
  const nav = `<a href="#main" class="skip">Aller au contenu</a>
<nav class="site-nav" role="navigation" aria-label="Navigation principale">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">Annaëlle <em>Dupont</em></a>
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-menu" id="nav-menu" role="list">
      <li><a class="nav-link" href="index.html">Accueil</a></li>
      <li><a class="nav-link" href="cv.html">Curriculum Vitae</a></li>
      <li class="nav-dropdown nav-item">
        <a class="nav-link" href="#" tabindex="0">Stages</a>
        <div class="dropdown-menu" role="menu">
          <a href="stage-1.html" role="menuitem">Visual&amp;KO</a>
          <a href="stage-2.html" role="menuitem">Mecadaq</a>
        </div>
      </li>
      <li class="nav-dropdown nav-item">
        <a class="nav-link" href="#" tabindex="0">Ateliers Pro</a>
        <div class="dropdown-menu" role="menu">
          <a href="atelier-picdumidi.html" role="menuitem">PicDuMidiBoutique</a>
          <a href="atelier-immobill.html"  role="menuitem">Immo'Bill</a>
          <a href="atelier-visiteurs.html" role="menuitem">Visiteurs Android</a>
          <a href="atelier-netcar.html"    role="menuitem">Netcar MVC</a>
        </div>
      </li>
      <li><a class="nav-link" href="veille.html">Veille</a></li>
      <li><a class="nav-link" href="competences.html">Compétences</a></li>
      <li><a class="nav-link" href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-right">
      <div class="theme-toggle" aria-label="Mode sombre/clair">
        <input type="checkbox" id="theme-input">
        <label for="theme-input" tabindex="0"></label>
      </div>
    </div>
  </div>
</nav>`;

  /* ── Footer HTML ──────────────────────────────── */
  const footer = `<footer class="site-footer">
  <div>Portfolio BTS SIO SLAM &nbsp;·&nbsp; <strong style="color:var(--accent)">Annaëlle Dupont</strong> &nbsp;·&nbsp; 2025</div>
  <nav class="footer-links" aria-label="Liens footer">
    <a href="cv.html">CV</a>
    <a href="contact.html">Contact</a>
    <a href="#">Mentions légales</a>
  </nav>
</footer>`;

  /* Inject */
  document.body.insertAdjacentHTML('afterbegin', sprite + nav);
  document.body.insertAdjacentHTML('beforeend', footer);
})();
