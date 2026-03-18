/* nav-fragment.js v3 — SVG logos + nav + footer */
(function(){

/* Calcule le chemin racine depuis l'emplacement du script
   afin que tous les liens fonctionnent quelle que soit la profondeur de la page */
const _s = document.currentScript;
const root = _s ? _s.src.replace(/assets\/js\/nav-fragment\.js.*$/, '') : '';

/* ── Sprite SVG complet ── */
const sprite = `<svg aria-hidden="true" style="display:none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- UI Icons -->
  <symbol id="ic-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
  <symbol id="ic-linkedin" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></symbol>
  <symbol id="ic-github" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></symbol>
  <symbol id="ic-pdf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></symbol>
  <symbol id="ic-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="ic-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>
  <symbol id="ic-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol>
  <symbol id="ic-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
  <symbol id="ic-db" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></symbol>
  <symbol id="ic-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
  <symbol id="ic-rss" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1" fill="currentColor"/></symbol>
  <symbol id="ic-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></symbol>
  <symbol id="ic-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>
  <symbol id="ic-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
  <symbol id="ic-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>
  <symbol id="ic-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="ic-zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>
  <symbol id="ic-settings" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></symbol>

  <!-- Tech Logos -->
  <symbol id="logo-php" viewBox="0 0 50 20">
    <rect width="50" height="20" rx="10" fill="rgba(119,123,180,.15)"/>
    <text x="25" y="14" font-family="monospace" font-size="9" font-weight="bold" fill="#7779B4" text-anchor="middle">PHP</text>
  </symbol>
  <symbol id="logo-mysql" viewBox="0 0 50 20">
    <rect width="50" height="20" rx="10" fill="rgba(0,114,180,.12)"/>
    <text x="25" y="14" font-family="monospace" font-size="8" font-weight="bold" fill="#0072B4" text-anchor="middle">MySQL</text>
  </symbol>
  <symbol id="logo-js" viewBox="0 0 20 20">
    <rect width="20" height="20" rx="3" fill="#F7DF1E"/>
    <text x="10" y="15" font-family="monospace" font-size="9" font-weight="bold" fill="#000" text-anchor="middle">JS</text>
  </symbol>
  <symbol id="logo-nodejs" viewBox="0 0 40 20">
    <rect width="40" height="20" rx="5" fill="rgba(83,158,70,.15)"/>
    <text x="20" y="14" font-family="monospace" font-size="8" font-weight="bold" fill="#539E46" text-anchor="middle">Node</text>
  </symbol>
  <symbol id="logo-wp" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="15" fill="none" stroke="#21759B" stroke-width="2"/>
    <text x="16" y="21" font-family="serif" font-size="13" font-weight="bold" fill="#21759B" text-anchor="middle">W</text>
  </symbol>
  <symbol id="logo-android" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.34l1.52-2.637a.5.5 0 10-.868-.5l-1.541 2.67A9.336 9.336 0 0112 14.25a9.336 9.336 0 01-4.634 1.623l-1.54-2.67a.5.5 0 10-.869.5l1.52 2.637C3.497 17.65 1.5 20.416 1.5 23.5h21c0-3.084-1.997-5.85-4.977-7.16zM8.25 9a.75.75 0 100-1.5A.75.75 0 008.25 9zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5zM4.85 5.45l1.5-2.6a.5.5 0 10-.87-.5L3.98 4.95a9.25 9.25 0 00-2.48 6.3h1a8.25 8.25 0 012.35-5.8zm14.3-.5l-1.5-2.6a.5.5 0 10-.87.5l1.5 2.6A8.25 8.25 0 0120.5 11.25h1a9.25 9.25 0 00-2.35-6.3z"/>
  </symbol>
  <symbol id="logo-git" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 11-1.1 1.045L12.6 8.68v6.563a1.838 1.838 0 11-1.511-.045V8.24a1.838 1.838 0 01-.997-2.41L7.49 3.076 .452 10.113a1.55 1.55 0 000 2.188l10.478 10.478a1.55 1.55 0 002.188 0l10.428-10.428a1.55 1.55 0 000-2.42z"/>
  </symbol>
  <symbol id="logo-html" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
  </symbol>
  <symbol id="logo-css" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z"/>
  </symbol>
  <symbol id="logo-bootstrap" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.956v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.325-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186C2.603 3.637 3.616 2.438 4.985 2.438h14.032c1.37 0 2.382 1.199 2.337 2.498-.043 1.249.013 2.867.42 4.186.408 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.519v-.034c1.053-.252 1.7-1.118 1.7-2.25 0-1.vanilla565-1.2-2.52-3.216-2.52H8.297v10.017h3.918c2.26 0 3.858-1.072 3.858-2.694z"/>
  </symbol>
  <symbol id="logo-febus" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(52,211,153,.15)"/>
    <text x="16" y="22" font-family="monospace" font-size="10" font-weight="bold" fill="#34d399" text-anchor="middle">FO</text>
  </symbol>
  <symbol id="logo-argitik" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(167,139,250,.15)"/>
    <text x="16" y="22" font-family="monospace" font-size="10" font-weight="bold" fill="#a78bfa" text-anchor="middle">AR</text>
  </symbol>
  <symbol id="logo-pic" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(251,191,36,.12)"/>
    <text x="16" y="22" font-family="monospace" font-size="9" font-weight="bold" fill="#fbbf24" text-anchor="middle">PDM</text>
  </symbol>
  <symbol id="logo-glpi" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(96,165,250,.12)"/>
    <text x="16" y="22" font-family="monospace" font-size="9" font-weight="bold" fill="#60a5fa" text-anchor="middle">GLPI</text>
  </symbol>
  <symbol id="logo-java" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
  </symbol>
  <symbol id="logo-snyk" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(74,222,128,.12)"/>
    <path d="M16 6l8 4.5v11L16 26l-8-4.5v-11L16 6z" fill="none" stroke="#4ade80" stroke-width="1.5"/>
    <text x="16" y="20" font-family="monospace" font-size="7" font-weight="bold" fill="#4ade80" text-anchor="middle">Snyk</text>
  </symbol>
  <symbol id="logo-cyber" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(248,113,113,.1)"/>
    <path d="M16 8l7 3.5v8L16 24 9 19.5v-8L16 8z" fill="none" stroke="#f87171" stroke-width="1.5"/>
    <path d="M13 14h6M13 17h4" stroke="#f87171" stroke-width="1.5" stroke-linecap="round"/>
  </symbol>
  <symbol id="logo-netcar" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="rgba(45,212,191,.12)"/>
    <text x="16" y="15" font-family="monospace" font-size="7" font-weight="bold" fill="#2dd4bf" text-anchor="middle">NET</text>
    <text x="16" y="24" font-family="monospace" font-size="7" font-weight="bold" fill="#2dd4bf" text-anchor="middle">CAR</text>
  </symbol>
</defs>
</svg>`;

/* ── Navigation ── */
const nav = `<a href="#main" class="skip">Aller au contenu</a>
<nav class="site-nav" role="navigation" aria-label="Navigation principale">
  <div class="nav-inner">
    <a href="${root}index.html" class="nav-brand">Annaëlle <em>Dupont</em></a>
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-menu" id="nav-menu" role="list">
      <li><a class="nav-link" href="${root}index.html">Accueil</a></li>
      <li><a class="nav-link" href="${root}pages/cv.html">Curriculum Vitae</a></li>
      <li class="nav-dropdown nav-item">
        <a class="nav-link" href="#" tabindex="0">Stages</a>
        <div class="dropdown-menu" role="menu">
          <a href="${root}pages/stages/stage-febus.html" role="menuitem">
            <svg width="16" height="16" color="var(--accent)"><use href="#logo-febus"/></svg>
            FEBUS OPTICS
          </a>
          <a href="${root}pages/stages/stage-argitik.html" role="menuitem">
            <svg width="16" height="16" color="var(--violet)"><use href="#logo-argitik"/></svg>
            ARGITIK
          </a>
        </div>
      </li>
      <li class="nav-dropdown nav-item">
        <a class="nav-link" href="#" tabindex="0">Ateliers Pro</a>
        <div class="dropdown-menu" role="menu">
          <a href="${root}pages/ateliers/atelier-picdumidi.html" role="menuitem">
            <svg width="16" height="16"><use href="#logo-pic"/></svg>
            PicDuMidiBoutique
          </a>
          <a href="${root}pages/ateliers/atelier-integration.html" role="menuitem">
            <svg width="16" height="16" color="var(--accent)"><use href="#ic-layers"/></svg>
            Intégration
          </a>
          <a href="${root}pages/ateliers/atelier-commande.html" role="menuitem">
            <svg width="16" height="16" color="var(--accent)"><use href="#ic-db"/></svg>
            Commande
          </a>
          <a href="${root}pages/ateliers/atelier-fa.html" role="menuitem">
            <svg width="16" height="16" color="var(--accent)"><use href="#ic-code"/></svg>
            Fâ
          </a>
        </div>
      </li>
      <li class="nav-dropdown nav-item">
        <a class="nav-link" href="#" tabindex="0">Veille</a>
        <div class="dropdown-menu" role="menu">
          <a href="${root}pages/veilles/veille-cybersecurite.html" role="menuitem">
            <svg width="16" height="16"><use href="#logo-cyber"/></svg>
            Cybersécurité
          </a>
          <a href="${root}pages/veilles/veille-snyk.html" role="menuitem">
            <svg width="16" height="16"><use href="#logo-snyk"/></svg>
            Snyk
          </a>
        </div>
      </li>
      <li><a class="nav-link" href="${root}pages/competences.html">Compétences</a></li>
      <li><a class="nav-link" href="${root}pages/contact.html">Contact</a></li>
      <li><a class="nav-link nav-link--accent" href="${root}pages/menu.html">Liens</a></li>
    </ul>
    <div class="nav-right">
      <div class="theme-toggle" aria-label="Mode sombre/clair">
        <input type="checkbox" id="theme-input">
        <label for="theme-input" tabindex="0"></label>
      </div>
    </div>
  </div>
</nav>`;

const footer = `<footer class="site-footer">
  <div>Portfolio BTS SIO SLAM &nbsp;·&nbsp; <strong style="color:var(--accent)">Annaëlle Dupont</strong> &nbsp;·&nbsp; 2025</div>
  <nav class="footer-links" aria-label="Liens footer">
    <a href="${root}pages/cv.html">CV</a>
    <a href="${root}pages/competences.html">Compétences</a>
    <a href="${root}pages/contact.html">Contact</a>
    <a href="${root}pages/menu.html">Liens</a>
  </nav>
</footer>`;

document.body.insertAdjacentHTML('afterbegin', sprite + nav);
document.body.insertAdjacentHTML('beforeend', footer);
})();
