/* ═══════════════════════════════════════════════════
   ANNA.BOT — Chatbot Portfolio Annaëlle Champiau
   Thème : Cyberpunk terminal
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CSS injecté ── */
  const css = `
  #chatbot-wrap {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 9000;
    font-family: 'Sora', sans-serif;
  }

  /* Bouton flottant */
  #chatbot-toggle {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 1.5px solid rgba(129,140,248,.5);
    background: linear-gradient(135deg, #0e1525, #111928);
    box-shadow: 0 0 0 0 rgba(129,140,248,.4), 0 4px 20px rgba(0,0,0,.8);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
    animation: chat-pulse 3s ease-in-out infinite;
  }
  #chatbot-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 6px rgba(129,140,248,.12), 0 0 30px rgba(129,140,248,.3);
    animation: none;
  }
  @keyframes chat-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(129,140,248,.35), 0 4px 20px rgba(0,0,0,.8); }
    50%       { box-shadow: 0 0 0 10px rgba(129,140,248,.0), 0 4px 20px rgba(0,0,0,.8); }
  }
  #chatbot-toggle svg { color: #818cf8; }

  /* Badge notification */
  .chat-notif {
    position: absolute; top: -3px; right: -3px;
    width: 16px; height: 16px; border-radius: 50%;
    background: #f43f5e;
    border: 2px solid #080c14;
    font-size: .5rem; font-weight: 700; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    animation: notif-pop .3s cubic-bezier(.34,1.56,.64,1);
  }
  @keyframes notif-pop { from { transform: scale(0); } to { transform: scale(1); } }

  /* Panneau chat */
  #chatbot-panel {
    position: absolute;
    bottom: 68px; right: 0;
    width: 360px;
    max-height: 520px;
    border-radius: 12px;
    background: #080c14;
    border: 1px solid rgba(99,102,241,.2);
    box-shadow: 0 8px 48px rgba(0,0,0,.9), 0 0 60px rgba(99,102,241,.08);
    display: flex; flex-direction: column;
    overflow: hidden;
    transform-origin: bottom right;
    transform: scale(.92) translateY(8px);
    opacity: 0;
    pointer-events: none;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s;
  }
  #chatbot-panel.open {
    transform: scale(1) translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  @media (max-width: 420px) {
    #chatbot-panel { width: calc(100vw - 2rem); right: 0; }
  }

  /* Header */
  .chat-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: .9rem 1.1rem;
    background: #0c1120;
    border-bottom: 1px solid rgba(99,102,241,.15);
    position: relative; overflow: hidden;
    flex-shrink: 0;
  }
  .chat-header::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #818cf8, #22d3ee, #c084fc, #818cf8);
    background-size: 200% 100%;
    animation: chat-bar 3s linear infinite;
  }
  @keyframes chat-bar { to { background-position: -200% 0; } }

  .chat-header-left { display: flex; align-items: center; gap: .75rem; }

  .chat-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, rgba(129,140,248,.2), rgba(34,211,238,.2));
    border: 1.5px solid rgba(129,140,248,.4);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .chat-avatar::after {
    content: '';
    position: absolute; bottom: 0; right: 0;
    width: 10px; height: 10px; border-radius: 50%;
    background: #4ade80;
    border: 2px solid #0c1120;
    animation: blink-status 2s ease-in-out infinite;
  }
  @keyframes blink-status {
    0%, 100% { opacity: 1; } 50% { opacity: .5; }
  }

  .chat-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: .72rem; font-weight: 700; color: #e2e8f0;
    letter-spacing: .06em;
  }
  .chat-name em { color: #818cf8; font-style: normal; }
  .chat-online {
    font-size: .6rem; color: #4ade80;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: .1em;
    display: flex; align-items: center; gap: .35rem;
  }
  .chat-online::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: #4ade80; flex-shrink: 0;
  }

  .chat-close {
    width: 28px; height: 28px; border-radius: 50%;
    border: 1px solid rgba(99,102,241,.2);
    background: transparent; color: #8892a4;
    cursor: pointer; font-size: .75rem;
    display: flex; align-items: center; justify-content: center;
    transition: background .15s, color .15s;
  }
  .chat-close:hover { background: rgba(244,63,94,.15); color: #f43f5e; border-color: rgba(244,63,94,.3); }

  /* Messages */
  .chat-messages {
    flex: 1; overflow-y: auto; padding: 1rem;
    display: flex; flex-direction: column; gap: .75rem;
    scroll-behavior: smooth;
  }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-track { background: transparent; }
  .chat-messages::-webkit-scrollbar-thumb { background: rgba(99,102,241,.25); border-radius: 2px; }

  /* Bulle bot */
  .msg-bot {
    display: flex; align-items: flex-start; gap: .6rem;
    animation: msg-in .25s cubic-bezier(.34,1.56,.64,1);
  }
  .msg-bot-icon {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(129,140,248,.25), rgba(34,211,238,.25));
    border: 1px solid rgba(129,140,248,.3);
    display: flex; align-items: center; justify-content: center;
    margin-top: .1rem;
  }
  .msg-bot-bubble {
    background: #0e1525;
    border: 1px solid rgba(99,102,241,.18);
    border-radius: 4px 12px 12px 12px;
    padding: .65rem .9rem;
    font-size: .83rem; color: #c8d0dc; line-height: 1.75;
    max-width: calc(100% - 46px);
  }
  .msg-bot-bubble a { color: #818cf8; text-decoration: none; }
  .msg-bot-bubble a:hover { text-decoration: underline; }
  .msg-bot-bubble strong { color: #e2e8f0; }
  .msg-bot-bubble code {
    font-family: 'JetBrains Mono', monospace;
    font-size: .75em; color: #22d3ee;
    background: rgba(34,211,238,.08); padding: .1em .35em; border-radius: 3px;
  }

  /* Bulle user */
  .msg-user {
    display: flex; justify-content: flex-end;
    animation: msg-in .25s cubic-bezier(.34,1.56,.64,1);
  }
  .msg-user-bubble {
    background: linear-gradient(135deg, rgba(129,140,248,.18), rgba(99,102,241,.12));
    border: 1px solid rgba(129,140,248,.3);
    border-radius: 12px 4px 12px 12px;
    padding: .65rem .9rem;
    font-size: .83rem; color: #e2e8f0; line-height: 1.75;
    max-width: 80%;
  }

  @keyframes msg-in {
    from { opacity: 0; transform: translateY(8px) scale(.97); }
    to   { opacity: 1; transform: none; }
  }

  /* Indicateur de frappe */
  .msg-typing .msg-bot-bubble {
    padding: .65rem .85rem;
  }
  .typing-dots { display: flex; gap: 4px; align-items: center; height: 1em; }
  .typing-dots span {
    width: 5px; height: 5px; border-radius: 50%; background: #818cf8;
    animation: tdot 1.2s ease-in-out infinite;
  }
  .typing-dots span:nth-child(2) { animation-delay: .2s; }
  .typing-dots span:nth-child(3) { animation-delay: .4s; }
  @keyframes tdot { 0%,80%,100% { transform: scale(.6); opacity:.4; } 40% { transform: scale(1); opacity:1; } }

  /* Suggestions rapides */
  .chat-quick {
    padding: .6rem 1rem .5rem;
    display: flex; flex-wrap: wrap; gap: .4rem;
    border-top: 1px solid rgba(99,102,241,.1);
    flex-shrink: 0;
  }
  .chat-quick:empty { display: none; }
  .qchip {
    font-family: 'JetBrains Mono', monospace; font-size: .6rem;
    letter-spacing: .06em; text-transform: uppercase;
    padding: .3rem .7rem; border-radius: 99px;
    border: 1px solid rgba(129,140,248,.3);
    background: rgba(129,140,248,.06);
    color: #818cf8; cursor: pointer;
    transition: background .15s, border-color .15s, color .15s;
    white-space: nowrap;
  }
  .qchip:hover { background: rgba(129,140,248,.15); border-color: rgba(129,140,248,.5); color: #a5b4fc; }

  /* Input */
  .chat-input-wrap {
    display: flex; align-items: center; gap: .5rem;
    padding: .7rem 1rem;
    border-top: 1px solid rgba(99,102,241,.15);
    background: #0c1120;
    flex-shrink: 0;
  }
  #chat-input {
    flex: 1; background: rgba(255,255,255,.04);
    border: 1px solid rgba(99,102,241,.2); border-radius: 8px;
    padding: .55rem .85rem;
    font-family: 'Sora', sans-serif; font-size: .82rem;
    color: #e2e8f0; outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  #chat-input::placeholder { color: #3a4558; }
  #chat-input:focus {
    border-color: rgba(129,140,248,.5);
    box-shadow: 0 0 0 3px rgba(129,140,248,.08);
  }
  #chat-send {
    width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, #818cf8, #6366f1);
    border: none; cursor: pointer; color: #fff;
    display: flex; align-items: center; justify-content: center;
    transition: transform .15s, box-shadow .15s;
    box-shadow: 0 0 12px rgba(129,140,248,.25);
  }
  #chat-send:hover { transform: scale(1.08); box-shadow: 0 0 20px rgba(129,140,248,.4); }
  #chat-send:active { transform: scale(.96); }

  /* Séparateur date */
  .chat-sep {
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: .55rem; color: #3a4558; letter-spacing: .12em;
    text-transform: uppercase; margin: .25rem 0;
  }
  `;

  /* ── Injection du style ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Base de connaissances ── */
  const kb = [
    {
      id: 'bonjour',
      match: ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'bonsoir', 'hi'],
      reply: `Bonjour ! 👋 Je suis <strong>ANNA.BOT</strong>, l'assistant virtuel d'Annaëlle Champiau.<br><br>Je peux vous renseigner sur son <strong>parcours</strong>, ses <strong>compétences</strong>, ses <strong>stages</strong> ou ses <strong>coordonnées</strong>. Que voulez-vous savoir ?`,
      chips: ['Qui est Annaëlle ?', 'Ses compétences', 'Ses stages', 'La contacter']
    },
    {
      id: 'qui',
      match: ['qui', 'annaëlle', 'annaelle', 'présente', 'présentation', 'profil', 'à propos'],
      reply: `<strong>Annaëlle Champiau</strong> est une étudiante de <strong>19 ans</strong> passionnée par le développement web et les applications.<br><br>Elle prépare actuellement un <strong>BTS SIO SLAM</strong> au Lycée Saint John Perse à <strong>Pau (64)</strong> et recherche une <strong>alternance Bachelor Bac+3</strong> en Conception & Développement Web (CESI).`,
      chips: ['Ses compétences', 'Ses stages', 'Sa formation', 'La contacter']
    },
    {
      id: 'competences',
      match: ['compétence', 'skill', 'technologie', 'langage', 'maîtrise', 'sait faire', 'stack'],
      reply: `Annaëlle maîtrise une large palette de technologies :<br><br>
<strong>Web :</strong> <code>HTML5</code> <code>CSS3</code> <code>JavaScript</code> <code>PHP</code> <code>Symfony</code> <code>WordPress</code><br>
<strong>Autres :</strong> <code>Java</code> <code>Python</code> <code>Android</code> <code>Perl</code><br>
<strong>BDD :</strong> <code>MySQL</code> <code>PHPMyAdmin</code> <code>UML</code> <code>JMerise</code><br>
<strong>Outils :</strong> <code>GitHub</code> <code>VS Code</code> <code>Webmin</code> <code>NetBeans</code><br>
<strong>Cyber :</strong> <code>RGPD</code> <code>Pare-feu</code> <code>Chiffrement</code>`,
      chips: ['PHP', 'Cybersécurité', 'Ses stages', 'Son CV']
    },
    {
      id: 'php',
      match: ['php', 'back-end', 'backend', 'back end'],
      reply: `PHP est l'une des compétences principales d'Annaëlle. Elle l'utilise en architecture <strong>MVC avec DAO</strong>, pour le traitement de formulaires, la gestion de BDD MySQL, et le développement d'applications web complètes.<br><br>Elle l'a notamment utilisé lors de son stage chez <strong>ARGITIK</strong> pour l'envoi automatique de formulaires par e-mail Outlook.`,
      chips: ['Ses stages', 'Ses compétences', 'Son CV']
    },
    {
      id: 'perl',
      match: ['perl', 'webmin', 'ntp', 'ptp', 'protocole', 'module'],
      reply: `Lors de son stage chez <strong>FEBUS OPTICS</strong> en 2025, Annaëlle a développé un <strong>module Webmin en Perl</strong> permettant de configurer les protocoles de synchronisation temporelle <strong>NTP & PTP</strong> sur des systèmes Linux Debian.<br><br>C'est une technologie qu'elle a entièrement apprise en autonomie pendant ce stage.`,
      chips: ['Stage FEBUS', 'Ses compétences', 'La contacter']
    },
    {
      id: 'stages',
      match: ['stage', 'expérience', 'travail', 'mission', 'entreprise', 'professionnel'],
      reply: `Annaëlle a réalisé <strong>deux stages</strong> :<br><br>
🔵 <strong>FEBUS OPTICS</strong> (2025 — 5 semaines)<br>
Module Webmin en Perl pour la synchronisation NTP/PTP — Présentiel, Pau<br><br>
🟣 <strong>ARGITIK</strong> (2026 — 6 semaines)<br>
Site web + formulaire avec envoi automatique par e-mail Outlook (HTML/CSS/PHP) — Télétravail, Pau`,
      chips: ['Stage FEBUS', 'Stage ARGITIK', 'Ses compétences', 'La contacter']
    },
    {
      id: 'febus',
      match: ['febus', 'optique', 'fibre', 'optik', 'optic'],
      reply: `<strong>FEBUS OPTICS</strong> est une PME innovante basée à Pau, spécialisée dans les systèmes de mesure par fibre optique distribuée (DOFS).<br><br>Lors de ce stage de <strong>5 semaines en 2025</strong>, Annaëlle a développé un module Webmin en <strong>Perl</strong> pour configurer les protocoles <strong>NTP & PTP</strong> sur les systèmes Linux Debian de l'entreprise.<br><br><a href="pages/stages/stage-febus.html">→ Voir la page du stage</a>`,
      chips: ['Stage ARGITIK', 'Ses compétences', 'La contacter']
    },
    {
      id: 'argitik',
      match: ['argitik', 'argitique', 'formulaire', 'outlook', 'mail', 'télétravail'],
      reply: `<strong>ARGITIK</strong> est une entreprise de services numériques basée à Pau.<br><br>Lors de ce stage de <strong>6 semaines en 2026</strong> (entièrement en télétravail), Annaëlle a réalisé un site web complet avec envoi automatique des données du formulaire de contact par <strong>e-mail Outlook</strong>, développé en <strong>HTML, CSS et PHP</strong>.<br><br><a href="pages/stages/stage-argitik.html">→ Voir la page du stage</a>`,
      chips: ['Stage FEBUS', 'Ses compétences', 'La contacter']
    },
    {
      id: 'formation',
      match: ['formation', 'étude', 'école', 'bts', 'sio', 'slam', 'lycée', 'diplôme', 'bac'],
      reply: `<strong>Parcours scolaire d'Annaëlle :</strong><br><br>
🎓 <strong>BTS SIO — Option SLAM</strong> (2024–2026)<br>
Lycée Saint John Perse, Pau — Développement Web & Applications<br><br>
📋 <strong>Bac Pro Systèmes Numériques — Option RISC</strong> (2021–2024)<br>
Lycée Professionnel Guynemer — Réseaux & Systèmes<br><br>
Elle recherche actuellement une <strong>alternance Bachelor Bac+3</strong> au CESI.`,
      chips: ['Ses compétences', 'Ses stages', 'Son CV', 'La contacter']
    },
    {
      id: 'alternance',
      match: ['alternance', 'recruter', 'recrutement', 'disponible', 'recherche', 'embauche', 'bachelor', 'cesi'],
      reply: `Annaëlle est à la recherche d'une <strong>alternance Bachelor Bac+3</strong> en Conception & Développement Web au <strong>CESI</strong>, à partir de <strong>septembre 2026</strong>.<br><br>📍 Basée à <strong>Pau (64000)</strong> — mobilité possible.<br><br>Pour la contacter : <a href="mailto:annaelle.champiau@outlook.fr">annaelle.champiau@outlook.fr</a>`,
      chips: ['Ses compétences', 'Son CV', 'La contacter']
    },
    {
      id: 'contact',
      match: ['contact', 'contacter', 'joindre', 'email', 'téléphone', 'mail', 'appeler', 'coordonnée'],
      reply: `Pour contacter Annaëlle :<br><br>
📧 <a href="mailto:annaelle.champiau@outlook.fr">annaelle.champiau@outlook.fr</a><br>
📞 <a href="tel:0675341259">06.75.34.12.59</a><br>
📍 Pau, 64000 — Nouvelle-Aquitaine<br><br>
Ou via la <a href="pages/contact.html">page de contact</a> du portfolio.`,
      chips: ['Son CV', 'Ses stages', 'Qui est Annaëlle ?']
    },
    {
      id: 'cv',
      match: ['cv', 'curriculum', 'télécharger', 'pdf', 'résumé'],
      reply: `Le CV d'Annaëlle est disponible en téléchargement sur la <a href="pages/cv.html">page CV du portfolio</a>.<br><br>Il détaille ses formations, expériences, compétences techniques et qualités personnelles.`,
      chips: ['La contacter', 'Ses stages', 'Ses compétences']
    },
    {
      id: 'cyber',
      match: ['cyber', 'sécurité', 'securite', 'rgpd', 'hacking', 'owasp', 'protection'],
      reply: `Annaëlle a des compétences en <strong>cybersécurité</strong> acquises en BTS SIO :<br><br>
• Loi RGPD & CNIL — bonnes pratiques<br>
• Installation pare-feu et antivirus<br>
• Chiffrement des données<br>
• Signature électronique<br>
• Initiation au hacking éthique<br>
• Sécurisation des équipements du SI`,
      chips: ['Ses compétences', 'Sa formation', 'Son CV']
    },
    {
      id: 'reseau',
      match: ['réseau', 'linux', 'windows', 'cisco', 'active directory', 'putty', 'routeur', 'système'],
      reply: `En Bac Pro Systèmes Numériques, Annaëlle a acquis des compétences réseaux :<br><br>
<code>Linux</code> <code>Windows 10/11</code> <code>CISCO</code> <code>Active Directory</code><br>
<code>PuTTY</code> <code>Tera Term</code> <code>VPN</code> <code>Configuration routeur</code><br><br>
Elle a également administré des serveurs <strong>Linux Debian</strong> lors de son stage FEBUS OPTICS.`,
      chips: ['Stage FEBUS', 'Ses compétences', 'Sa formation']
    },
    {
      id: 'qualites',
      match: ['qualité', 'personnalité', 'caractère', 'soft skill', 'humain'],
      reply: `Les qualités d'Annaëlle :<br><br>
⚡ <strong>Sérieuse</strong> — s'implique pleinement dans chaque projet<br>
🔍 <strong>Curieuse</strong> — toujours prête à apprendre de nouvelles technologies<br>
🎯 <strong>Déterminée</strong> — ne lâche pas face aux défis techniques<br>
🚀 <strong>Autonome</strong> — sait travailler seule (stage en télétravail)`,
      chips: ['Qui est Annaëlle ?', 'Ses stages', 'La contacter']
    },
    {
      id: 'loisirs',
      match: ['loisir', 'hobby', 'intérêt', 'passion', 'jeux', 'voyage', 'temps libre'],
      reply: `En dehors du code, Annaëlle aime :<br><br>
🎮 <strong>Jeux vidéo</strong> — une passion depuis longtemps<br>
✈️ <strong>Voyage</strong> — découvrir de nouveaux endroits et cultures<br><br>
Elle parle <strong>Français</strong> (natif) et <strong>Anglais</strong> (niveau B2).`,
      chips: ['Qui est Annaëlle ?', 'Ses compétences', 'La contacter']
    },
    {
      id: 'portfolio',
      match: ['portfolio', 'site', 'projet', 'atelier', 'veille'],
      reply: `Ce portfolio présente l'ensemble du parcours BTS SIO d'Annaëlle :<br><br>
📂 <strong>Stages</strong> — FEBUS OPTICS & ARGITIK<br>
🛠️ <strong>Ateliers pro</strong> — PicDuMidi, Intégration, Gestion Commande, Projet Fâ<br>
🔍 <strong>Veilles</strong> — Cybersécurité & Snyk<br>
📄 <strong>CV</strong> — Téléchargeable en PDF<br><br>
Naviguez avec le menu en haut de page !`,
      chips: ['Ses stages', 'Son CV', 'La contacter']
    },
    {
      id: 'merci',
      match: ['merci', 'thanks', 'super', 'parfait', 'cool', 'nickel', 'ok', 'bye', 'au revoir'],
      reply: `Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions.<br><br>Pour contacter directement Annaëlle : <a href="mailto:annaelle.champiau@outlook.fr">annaelle.champiau@outlook.fr</a>`,
      chips: ['Qui est Annaëlle ?', 'La contacter']
    }
  ];

  /* ── Réponse par défaut ── */
  const defaultReply = {
    reply: `Je n'ai pas bien compris votre question. 🤔<br><br>Vous pouvez me demander des informations sur :<br>• Le <strong>parcours</strong> d'Annaëlle<br>• Ses <strong>compétences</strong> techniques<br>• Ses <strong>stages</strong><br>• Ses <strong>coordonnées</strong>`,
    chips: ['Qui est Annaëlle ?', 'Ses compétences', 'Ses stages', 'La contacter']
  };

  /* ── Chips de démarrage ── */
  const startChips = ['Qui est Annaëlle ?', 'Ses stages', 'Ses compétences', 'La contacter'];

  /* ── Chip → question mapping ── */
  const chipMap = {
    'Qui est Annaëlle ?': 'Qui est Annaëlle ?',
    'Ses compétences': 'Quelles sont ses compétences ?',
    'Ses stages': 'Parle-moi de ses stages',
    'La contacter': 'Comment la contacter ?',
    'Stage FEBUS': 'Stage FEBUS OPTICS',
    'Stage ARGITIK': 'Stage ARGITIK',
    'Son CV': 'Où télécharger le CV ?',
    'Sa formation': 'Quelle est sa formation ?',
    'PHP': 'Compétences PHP',
    'Cybersécurité': 'Compétences cybersécurité',
  };

  /* ── Moteur de recherche ── */
  function findAnswer(text) {
    const t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const item of kb) {
      if (item.match.some(k => t.includes(k.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
        return item;
      }
    }
    return defaultReply;
  }

  /* ── Construction du DOM ── */
  const wrap = document.createElement('div');
  wrap.id = 'chatbot-wrap';
  wrap.innerHTML = `
    <button id="chatbot-toggle" aria-label="Ouvrir l'assistant portfolio" aria-expanded="false">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle cx="9"  cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
      <span class="chat-notif" aria-hidden="true">1</span>
    </button>

    <div id="chatbot-panel" role="dialog" aria-label="Chatbot portfolio" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">
            <svg width="16" height="16" fill="none" stroke="#818cf8" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <div class="chat-name">ANNA<em>.BOT</em></div>
            <div class="chat-online">En ligne</div>
          </div>
        </div>
        <button class="chat-close" aria-label="Fermer">✕</button>
      </div>

      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-quick" id="chat-quick"></div>

      <div class="chat-input-wrap">
        <input type="text" id="chat-input"
               placeholder="Posez votre question…"
               autocomplete="off" aria-label="Message">
        <button id="chat-send" aria-label="Envoyer">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"
               stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  /* ── Références DOM ── */
  const toggleBtn  = document.getElementById('chatbot-toggle');
  const panel      = document.getElementById('chatbot-panel');
  const messagesEl = document.getElementById('chat-messages');
  const quickEl    = document.getElementById('chat-quick');
  const inputEl    = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('chat-send');
  const closeBtn   = panel.querySelector('.chat-close');
  const notifBadge = toggleBtn.querySelector('.chat-notif');

  let isOpen = false;
  let msgCount = 0;

  /* ── Afficher un message ── */
  function addMsg(html, type) {
    msgCount++;
    const el = document.createElement('div');
    if (type === 'user') {
      el.className = 'msg-user';
      el.innerHTML = `<div class="msg-user-bubble">${html}</div>`;
    } else {
      el.className = 'msg-bot';
      el.innerHTML = `
        <div class="msg-bot-icon">
          <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div class="msg-bot-bubble">${html}</div>`;
    }
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  /* ── Indicateur de frappe ── */
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'msg-bot msg-typing';
    el.id = 'typing-indicator';
    el.innerHTML = `
      <div class="msg-bot-icon">
        <svg width="12" height="12" fill="none" stroke="#818cf8" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div class="msg-bot-bubble">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>`;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  /* ── Afficher les chips ── */
  function setChips(chips) {
    quickEl.innerHTML = '';
    if (!chips || !chips.length) return;
    chips.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'qchip';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        const q = chipMap[label] || label;
        handleSend(q);
      });
      quickEl.appendChild(btn);
    });
  }

  /* ── Traiter l'envoi ── */
  function handleSend(text) {
    const msg = text.trim();
    if (!msg) return;

    inputEl.value = '';
    setChips([]);
    addMsg(msg, 'user');

    showTyping();
    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      hideTyping();
      const answer = findAnswer(msg);
      addMsg(answer.reply, 'bot');
      setChips(answer.chips || []);
    }, delay);
  }

  /* ── Ouvrir / fermer ── */
  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (notifBadge) notifBadge.remove();

    /* Message de bienvenue si première ouverture */
    if (msgCount === 0) {
      const sep = document.createElement('div');
      sep.className = 'chat-sep';
      sep.textContent = '— Bienvenue —';
      messagesEl.appendChild(sep);

      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          hideTyping();
          addMsg(`Bonjour ! 👋 Je suis <strong>ANNA.BOT</strong>, l'assistant du portfolio d'<strong>Annaëlle Champiau</strong>.<br><br>Posez-moi vos questions sur son parcours, ses compétences ou ses stages !`, 'bot');
          setChips(startChips);
          setTimeout(() => inputEl.focus(), 100);
        }, 900);
      }, 200);
    } else {
      setTimeout(() => inputEl.focus(), 100);
    }
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  /* ── Events ── */
  toggleBtn.addEventListener('click', () => isOpen ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);

  sendBtn.addEventListener('click', () => handleSend(inputEl.value));
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(inputEl.value); }
  });

  /* Fermer en cliquant dehors */
  document.addEventListener('click', e => {
    if (isOpen && !e.composedPath().includes(wrap)) closePanel();
  });

  /* Fermer avec Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

})();
