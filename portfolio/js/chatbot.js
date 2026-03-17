/* ════════════════════════════════════
   js/chatbot.js — Bot IA du portfolio
   ════════════════════════════════════ */
/* ══ CHATBOT ══════════════════════════════════════════════════════ */
const SYSTEM_PROMPT = `Tu es l'assistant IA du portfolio d'Annaëlle Champiau, étudiante en BTS SIO (Services Informatiques aux Organisations) option SLAM en 2ème année à Pau (64000). Tu réponds de façon concise, chaleureuse et professionnelle au nom du portfolio. Tu parles toujours en français.

PROFIL :
- Nom : Annaëlle Champiau
- Formation : BTS SIO SLAM, 2ème année, promo 2024-2026
- Localisation : Pau, 64000 (Pyrénées-Atlantiques)
- Email : annaelle.champiau@outlook.fr
- Téléphone : 06 75 34 12 59
- Recherche : Contrat d'alternance pour un Bachelor CDA (Concepteur Développeur d'Applications) au CESI Bordeaux dès 2026
- Rythme alternance : 3 semaines entreprise / 1 semaine école, 12 mois

PROJETS RÉALISÉS :
1. Site Boutique Pic du Midi (1ère année S2) — WordPress, gestion de contenu e-commerce pour le site touristique du Pic du Midi de Bigorre
2. Projet Journée Intégration (2ème année S1) — PHP/HTML/CSS, maintenance applicative en mode Agile, correction de 4 tickets GLPI, Git/GitHub Codespaces, sources BDD+XML+JSON, architecture MVC
3. Gestion Commande V2 (2ème année S1) — PHP POO, MySQL, architecture MVC + DAO, 4 modules (Clients, Produits, Commandes, Utilisateurs), authentification + rôles, 5 tables interconnectées
4. Site Fâ + ECommerce (2ème année S1-S2) — PHP 8 MVC, SCRUM, Product Backlog, Git, analyse risques sécurité, tests unitaires, triggers SQL (empecheSoldeNegatif BEFORE UPDATE + SIGNAL SQLSTATE), gestion sécurisée des comptes

STAGES :
1. FEBUS OPTICS (1ère année 2024) — Développement module Webmin en Perl/CGI pour basculement NTP/PTP, création VLAN sur switchs Cisco, brassage baie réseau, plan adressage IP
2. ARGITIK (2ème année Janv-Fév 2026) — Entreprise d'électricité, création site web complet prise de rendez-vous en binôme : maquettes Figma/Canva, BDD MySQL, PHP MVC, HTML/CSS/JS, documentation hébergement

VEILLE TECHNOLOGIQUE :
1. Protection des données en entreprise (1ère année 2025) — ransomwares, phishing, IA dans les attaques, outils Google Alerts + Feedly, sources CERT-FR, Cisco Security, GitHub Advisory
2. Snyk — Sécurisation du code source SAST (2ème année) — analyse PHP, injections SQL, extension VS Code, Snyk DeepCode AI

COMPÉTENCES TECHNIQUES :
- PHP 8 / POO : Maîtrisé
- Architecture MVC + pattern DAO : Maîtrisé
- HTML5 / CSS3 / Responsive : Maîtrisé
- MySQL / SQL / Triggers : Maîtrisé
- Conception MCD / MLD : Maîtrisé
- Git / GitHub / GitHub Codespaces : Maîtrisé
- WordPress CMS : Maîtrisé
- GLPI (gestion incidents) : Maîtrisé
- Méthode Agile / SCRUM : Maîtrisé
- JavaScript ES6 : En cours
- Perl / CGI : Notions
- VLAN / Cisco / réseau : En cours
- Snyk SAST : En cours
- VS Code, Canva, Figma : Maîtrisé

SOFT SKILLS : Autonomie, rigueur, curiosité technologique, travail en équipe, veille technologique active

Si on te demande si Annaëlle est disponible pour une alternance : oui, dès 2026 pour un Bachelor CDA.
Si on te demande son CV : il est disponible sur demande par email.
Reste toujours positif, factuel et encourage le recruteur à contacter Annaëlle.`;

let chatOpen = false;
let chatHistory = [];
// Inject robot into welcome message avatar
document.addEventListener('DOMContentLoaded', () => {
  const wa = document.getElementById('welcome-av');
  if (wa) wa.innerHTML = ROBOT_SVG;
});

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chat-window');
  const btn = document.getElementById('chat-btn');
  const notif = document.getElementById('chat-notif');
  win.classList.toggle('open', chatOpen);
  btn.classList.toggle('open', chatOpen);
  if (chatOpen) {
    notif.style.display = 'none';
    setTimeout(() => document.getElementById('chat-input').focus(), 300);
  }
}

function sendSuggestion(el) {
  document.getElementById('chat-input').value = el.textContent;
  // Remove suggestions after first use
  document.getElementById('chat-suggest').style.display = 'none';
  sendMsg();
}

// SVG robot mini pour les messages
const ROBOT_SVG = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="5" x2="9" y2="2" stroke="#a78bfa" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="9" cy="1.5" r="1.2" fill="#a78bfa"/>
  <line x1="18" y1="5" x2="19" y2="2" stroke="#2dd4bf" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="19" cy="1.5" r="1.2" fill="#2dd4bf"/>
  <rect x="6" y="5" width="16" height="12" rx="3" fill="#1e1e30" stroke="#a78bfa" stroke-width="1"/>
  <ellipse cx="11" cy="11" rx="2.5" ry="3" fill="#a78bfa"/>
  <ellipse cx="17" cy="11" rx="2.5" ry="3" fill="#2dd4bf"/>
  <circle cx="12.2" cy="9.8" r=".7" fill="rgba(255,255,255,0.6)"/>
  <circle cx="18.2" cy="9.8" r=".7" fill="rgba(255,255,255,0.6)"/>
  <rect x="10" y="15.5" width="8" height="1.2" rx=".6" fill="#a78bfa" opacity=".7"/>
  <rect x="8" y="18" width="12" height="7" rx="2" fill="#1e1e30" stroke="#a78bfa" stroke-width=".8"/>
  <circle cx="12" cy="21.5" r="1" fill="#2dd4bf"/>
  <circle cx="16" cy="21.5" r="1" fill="#a78bfa"/>
  <rect x="3" y="19" width="4" height="2" rx="1" fill="#1e1e30" stroke="#a78bfa" stroke-width=".7"/>
  <rect x="21" y="19" width="4" height="2" rx="1" fill="#1e1e30" stroke="#a78bfa" stroke-width=".7"/>
</svg>`;

// Génère un bouton lien de navigation vers une section
function navLink(label, anchor) {
  return `<br><a class="chat-nav-btn" onclick="goTo('${anchor}')" href="javascript:void(0)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>${label}</a>`;
}

function goTo(anchor) {
  // Scroll vers l'élément avec offset pour la nav fixe (64px)
  const el = document.getElementById(anchor);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
  // Highlight flash sur la carte cible
  el.style.transition = 'box-shadow .3s';
  el.style.boxShadow = '0 0 0 2px var(--acc), 0 0 32px rgba(167,139,250,.3)';
  setTimeout(() => { el.style.boxShadow = ''; }, 2200);
}

function addMsg(role, html) {
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  if (role === 'bot') {
    div.innerHTML = `<div class="msg-av">${ROBOT_SVG}</div><div class="msg-bubble">${html.replace(/\n/g,'<br>')}</div>`;
  } else {
    div.innerHTML = `<div class="msg-bubble">${html}</div>`;
  }
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addTyping() {
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-av">${ROBOT_SVG}</div><div class="typing-bubble"><span></span><span></span><span></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}


async function sendMsg() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  sendBtn.disabled = true;
  addMsg('user', text);
  chatHistory.push({ role: 'user', content: text });
  addTyping();

  // Simulation d'un délai naturel de frappe
  await new Promise(r => setTimeout(r, 900 + Math.random() * 700));

  const reply = getReply(text.toLowerCase());
  removeTyping();
  chatHistory.push({ role: 'assistant', content: reply });
  addMsg('bot', reply);

  sendBtn.disabled = false;
  input.focus();
}

function getReply(q) {
  // ── Salutations ──
  if (/^(bonjour|salut|hello|hi|coucou|bonsoir|hey)/.test(q))
    return "Bonjour ! Je suis le bot du portfolio d'Annaëlle Champiau. Je peux vous renseigner sur ses projets, compétences, stages, alternance et bien plus. Que souhaitez-vous savoir ?";

  if (/merci|super|parfait|nickel|cool|genial|génial/.test(q))
    return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions 😊";

  if (/(au revoir|bye|à bientôt|bonne journée|à plus)/.test(q))
    return "Au revoir ! N'hésitez pas à revenir ou à contacter Annaëlle directement : annaelle.champiau@outlook.fr. Bonne journée !";

  // ── Présentation générale ──
  if (/qui est|présent|profil|elle|annaëlle|champiau|c'est qui/.test(q))
    return "Annaëlle Champiau est une étudiante en BTS SIO SLAM (2ème année, promo 2024-2026) basée à Pau (64). Passionnée par le développement web et la cybersécurité, elle maîtrise PHP/POO, MySQL, MVC et les bonnes pratiques de sécurité. Elle recherche une alternance Bachelor CDA au CESI Bordeaux dès 2026."
      + navLink("Voir ses compétences", "competences")
      + navLink("Voir ses projets", "projets");

  // ── Contact ──
  if (/contact|email|mail|téléphone|tel|appeler|joindre|coordonnées/.test(q))
    return "Vous pouvez contacter Annaëlle par :\n📧 annaelle.champiau@outlook.fr\n📞 06 75 34 12 59\n📍 Pau, 64000 (Pyrénées-Atlantiques)\nElle répond généralement sous 48h."
      + navLink("Aller à la section Contact", "contact");

  // ── Alternance ──
  if (/alternance|contrat|bachelor|cda|cesi|disponible|disponibilité|recrut|embauche|2026|rythme/.test(q))
    return "Annaëlle recherche un contrat d'alternance pour son Bachelor CDA au CESI Bordeaux, disponible dès 2026.\n\n🔄 Rythme : 3 semaines entreprise / 1 semaine école\n⏱ Durée : 12 mois\n📍 Zone : Pau, environs, ou télétravail possible"
      + navLink("Formulaire de contact", "contact-form")
      + navLink("Ses compétences", "competences");

  // ── Projets ──
  if (/projet|réalis|atelier|ap|application/.test(q) && !/stage/.test(q)) {
    if (/fa|fâ|gallo|romain|billetterie|billet|entrée|ecommerce|trigger/.test(q))
      return "🏛 Site Fâ — PHP 8 MVC pour le site gallo-romain de Fâ.\nMéthode SCRUM, Product Backlog, Git, analyse risques, tests unitaires.\n\n💳 ECommerce : Triggers SQL BEFORE UPDATE + SIGNAL SQLSTATE pour sécuriser les comptes."
        + navLink("Voir le projet Site Fâ", "proj-fa");

    if (/commande|gestion|crud|client|produit|panier/.test(q))
      return "📦 Gestion Commande V2 — PHP/POO + MVC + DAO.\n\n✓ 4 modules : Clients, Produits, Commandes, Utilisateurs\n✓ Auth + rôles admin/user\n✓ MySQL 5 tables interconnectées"
        + navLink("Voir le projet Gestion Commande", "proj-commande");

    if (/intégration|journée|glpi|ticket|agile|xml|json/.test(q))
      return "🎓 Journée Intégration — Maintenance applicative Agile.\n4 tickets GLPI résolus, branches Git, BDD + XML + JSON, MVC sécurisé."
        + navLink("Voir le projet Journée Intégration", "proj-integration");

    if (/pic|midi|boutique|wordpress|wp/.test(q))
      return "🏔 Site Boutique Pic du Midi — WordPress e-commerce pour le Pic du Midi de Bigorre.\nGestion produits, catégories, interface responsive."
        + navLink("Voir le projet Pic du Midi", "proj-picdumidi");

    return "Annaëlle a réalisé 4 projets. Lequel vous intéresse ?"
      + navLink("→ Boutique Pic du Midi", "proj-picdumidi")
      + navLink("→ Journée Intégration", "proj-integration")
      + navLink("→ Gestion Commande V2", "proj-commande")
      + navLink("→ Site Fâ + ECommerce", "proj-fa");
  }

  // ── Stages ──
  if (/stage|entreprise|febus|optics|argitik|électricité|rendez.vous|rdv|webmin|perl|vlan|cisco/.test(q)) {
    if (/febus|optics|réseau|vlan|cisco|perl|ntp|ptp|webmin|1ère|1ere|première/.test(q))
      return "🔭 Stage 1ère année — FEBUS OPTICS (2024) · Optronique, Bordeaux.\n\n✓ Module Webmin Perl/CGI pour basculement NTP/PTP\n✓ VLAN sur switchs Cisco\n✓ Brassage baie réseau + plan adressage IP"
        + navLink("Voir le stage FEBUS OPTICS", "stage-febus");

    if (/argitik|2ème|2eme|deuxième|électricité|electricite|rdv|figma|maquette/.test(q))
      return "⚡ Stage 2ème année — ARGITIK (Janv–Fév 2026) · Électricité, Bordeaux.\n\n✓ Maquettes Figma/Canva + analyse besoins\n✓ BDD MySQL + PHP MVC\n✓ Frontend HTML/CSS/JS — formulaire RDV\n✓ Documentation + guide hébergement"
        + navLink("Voir le stage ARGITIK", "stage-argitik");

    return "Annaëlle a effectué 2 stages. Lequel vous intéresse ?"
      + navLink("→ Stage FEBUS OPTICS (1ère année)", "stage-febus")
      + navLink("→ Stage ARGITIK (2ème année)", "stage-argitik");
  }

  // ── Veille ──
  if (/veille|snyk|sast|cert|phishing|ransomware|cybersécurité|données|rgpd|sécurité|feedly|google alert/.test(q)) {
    if (/snyk|sast|code|injection|vscode|deepcode/.test(q))
      return "🔍 Veille 2ème année — Snyk (SAST) :\n\n✓ Détection injections SQL en PHP\n✓ Surveillance bibliothèques open source\n✓ Extension VS Code\n✓ Snyk DeepCode AI — corrections automatiques"
        + navLink("Voir la veille Snyk", "veille-snyk");

    if (/phishing|ransomware|données|rgpd|feedly|cert|1ère|première|protect/.test(q))
      return "🛡 Veille 1ère année — Protection des données :\n\n✓ Google Alerts + Feedly RSS (CERT-FR, Cisco, GitHub Advisory)\n✓ Analyse : IA dans le phishing, failles Moodle/Zoom, FAULT+PROBE\n✓ Compte rendu PDF disponible"
        + navLink("Voir la veille Cybersécurité", "veille-secu");

    return "Annaëlle a réalisé 2 sujets de veille. Laquelle vous intéresse ?"
      + navLink("→ Veille Cybersécurité (1ère année)", "veille-secu")
      + navLink("→ Veille Snyk SAST (2ème année)", "veille-snyk");
  }

  // ── Compétences techniques ──
  if (/compétence|savoir|techno|technologie|langage|maîtrise|connaissance|stack|utilise/.test(q)) {
    if (/php|poo|objet|mvc|dao|back/.test(q))
      return "🐘 PHP / Back-end :\n✓ PHP 8 / POO : Maîtrisé\n✓ Architecture MVC : Maîtrisé\n✓ Pattern DAO + PDO : Maîtrisé\n✓ Perl / CGI : Notions"
        + navLink("Voir toutes les compétences", "competences");

    if (/sql|mysql|base|donnée|bdd|trigger|mld|mcd/.test(q))
      return "🗄 Base de données :\n✓ MySQL / SQL : Maîtrisé\n✓ Conception MCD / MLD : Maîtrisé\n✓ Triggers SQL : Maîtrisé\n✓ PDO requêtes préparées : Maîtrisé"
        + navLink("Voir toutes les compétences", "competences");

    if (/html|css|js|javascript|front|web/.test(q))
      return "🌐 Front-end :\n✓ HTML5 sémantique : Maîtrisé\n✓ CSS3 / Responsive : Maîtrisé\n✓ WordPress : Maîtrisé\n~ JavaScript ES6 : En cours"
        + navLink("Voir toutes les compétences", "competences");

    if (/git|github|version|scrum|agile|méthode/.test(q))
      return "⚙ Outils & Méthodes :\n✓ Git / GitHub : Maîtrisé\n✓ Méthode Agile / SCRUM : Maîtrisé\n✓ VS Code, Canva, WAMP : Maîtrisé\n✓ GLPI : Maîtrisé"
        + navLink("Voir toutes les compétences", "competences");

    if (/sécurité|cybersécu|glpi|rgpd|réseau|vlan/.test(q))
      return "🔐 Cybersécurité & Réseau :\n✓ RGPD / Protection données : Maîtrisé\n✓ GLPI tickets : Maîtrisé\n✓ Analyse de risques : Maîtrisé\n~ Snyk SAST : En cours\n~ VLAN / Cisco : En cours"
        + navLink("Voir toutes les compétences", "competences");

    return "Annaëlle maîtrise :\n\n✅ PHP 8/POO, MVC+DAO, MySQL, HTML/CSS, WordPress, Git, SCRUM, GLPI, Canva\n🔄 JavaScript ES6, Snyk, VLAN\n📚 Perl/CGI, Linux\n\nSur quel domaine voulez-vous plus de détails ?"
      + navLink("Voir le CV complet", "competences");
  }

  // ── Formation / CV ──
  if (/formation|bts|sio|slam|cv|diplôme|école|cesi|cursus|étude/.test(q))
    return "🎓 Parcours d'Annaëlle :\n\n• Bac général (Sciences Numériques) — 2023\n• BTS SIO SLAM — Pau — 2023–2026\n• Bachelor CDA — CESI Bordeaux — 2026 en alternance\n\nCV disponible sur demande : annaelle.champiau@outlook.fr"
      + navLink("Voir les compétences / CV", "competences")
      + navLink("Me contacter", "contact");

  // ── Soft skills ──
  if (/soft|qualité|défaut|personnalité|humain|motivat|passion|pourquoi|caractère/.test(q))
    return "Annaëlle se distingue par :\n\n💡 Curiosité technologique active\n🎯 Rigueur et autonomie\n🤝 Esprit d'équipe (stage ARGITIK en binôme, projets Agile)\n🔐 Passion cybersécurité au-delà du cursus\n📚 Apprentissage continu (JS, Python)"
      + navLink("Voir son profil complet", "competences");

  // ── Localisation ──
  if (/où|localisation|pau|bordeaux|mobilité|déplace|télétravail|remote/.test(q))
    return "📍 Annaëlle est basée à Pau (64000). Mobile sur la région, télétravail envisageable. Pour l'alternance CESI Bordeaux : zone Bordeaux et environs privilégiée."
      + navLink("Formulaire de contact", "contact-form");

  // ── Portfolio ──
  if (/portfolio|site|page|fait avec|créé|comment/.test(q))
    return "Ce portfolio est développé en HTML/CSS/JS pur — une seule page responsive avec animations, mode clair/sombre, curseur Wii personnalisé et ce bot ! Il reflète les compétences front-end d'Annaëlle."
      + navLink("Voir les projets", "projets");

  // ── Fallback ──
  return "Je n'ai pas bien compris. Voici les sections disponibles :"
    + navLink("Projets", "projets")
    + navLink("→ Pic du Midi", "proj-picdumidi")
    + navLink("→ Journée Intégration", "proj-integration")
    + navLink("→ Gestion Commande", "proj-commande")
    + navLink("→ Site Fâ", "proj-fa")
    + navLink("Stage FEBUS OPTICS", "stage-febus")
    + navLink("Stage ARGITIK", "stage-argitik")
    + navLink("Veille Cybersécurité", "veille-secu")
    + navLink("Veille Snyk", "veille-snyk")
    + navLink("Compétences", "competences")
    + navLink("Contact", "contact");
}
/* ════════════════════════════════════════════════════════════════ */
