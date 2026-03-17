/* ════════════════════════════════════
   js/main.js — Cursor, thème, nav, animations
   ════════════════════════════════════ */

/* ── CURSOR ── */
const cur=document.getElementById('cur');
const curArrow=document.getElementById('cur-arrow');
const curRing=document.getElementById('cur-ring');
let mx=window.innerWidth/2,my=window.innerHeight/2;

document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
  curArrow.style.left=mx+'px'; curArrow.style.top=my+'px';
  curRing.style.left=mx+'px'; curRing.style.top=my+'px';
});

function bindCursorTargets(){
  document.querySelectorAll('a,button,.pc,.stg,.vc,.sk,.hc,.btn-pri,.btn-sec,input,textarea,select,.img-ph,.schema-ph').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.classList.add('grab'); curArrow.classList.add('show'); });
    el.addEventListener('mouseleave',()=>{ cur.classList.remove('grab'); curArrow.classList.remove('show'); });
  });
}
bindCursorTargets();

document.addEventListener('mousedown',e=>{
  curRing.style.left=e.clientX+'px'; curRing.style.top=e.clientY+'px';
  curRing.style.width='0'; curRing.style.height='0';
  curRing.classList.remove('pop');
  void curRing.offsetWidth;
  curRing.classList.add('pop');
  cur.style.transform='translate(-4px,-4px) scale(.85)';
  setTimeout(()=>cur.style.transform='translate(-4px,-4px) scale(1)',130);
});

let ct;
document.addEventListener('mousemove',()=>{
  cur.style.opacity='1';
  if(curArrow.classList.contains('show')) curArrow.style.opacity='1';
  clearTimeout(ct);
  ct=setTimeout(()=>{cur.style.opacity='0';curArrow.style.opacity='0';},4000);
});

/* ── THEME TOGGLE ── */
const DARK_ICON='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const LIGHT_ICON='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
let isLight=false;
function toggleTheme(){
  isLight=!isLight;
  document.body.classList.toggle('light',isLight);
  const icon=document.querySelector('#theme-btn svg');
  icon.innerHTML=isLight?LIGHT_ICON:DARK_ICON;
  icon.style.transform=isLight?'rotate(180deg)':'rotate(0deg)';
  localStorage.setItem('theme',isLight?'light':'dark');
}
(function(){
  const saved=localStorage.getItem('theme');
  if(saved==='light'){isLight=true;document.body.classList.add('light');const icon=document.querySelector('#theme-btn svg');if(icon){icon.innerHTML=LIGHT_ICON;}}
})();

/* ── PROGRESS BAR ── */
const prog=document.getElementById('prog');
window.addEventListener('scroll',()=>{const p=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;prog.style.width=p+'%';},{passive:true});

/* ── REVEAL ON SCROLL (appelé aussi après chargement dynamique des sections) ── */
let revealObserver;
function initReveal(){
  if(revealObserver) revealObserver.disconnect();
  revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.07});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4*.08)+'s';revealObserver.observe(el);});
  // Re-bind cursor targets after dynamic load
  bindCursorTargets();
  // Re-bind card tilt
  bindCardTilt();
}
initReveal();

/* ── NAV ACTIVE ── */
window.addEventListener('scroll',()=>{
  const secs=document.querySelectorAll('section[id]');
  const nls=document.querySelectorAll('.nav-links a');
  let cs='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-160)cs=s.id;});
  nls.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cs?'var(--txt)':'';});
},{passive:true});

/* ── MOBILE MENU ── */
function toggleMenu(){document.getElementById('mobMenu').classList.toggle('open');}
function closeMenu(){document.getElementById('mobMenu').classList.remove('open');}

/* ── PARALLAX ── */
window.addEventListener('scroll',()=>{
  const hr=document.querySelector('.hero-right');
  if(hr)hr.style.transform=`translateY(${window.scrollY*.04}px)`;
},{passive:true});

/* ── CARD TILT ── */
function bindCardTilt(){
  document.querySelectorAll('.hc').forEach(c=>{
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(r.width/2),y=(e.clientY-r.top-r.height/2)/(r.height/2);
      c.style.transform=`perspective(900px) rotateX(${-y*3.5}deg) rotateY(${x*3.5}deg)`;
    });
    c.addEventListener('mouseleave',()=>{c.style.transform='perspective(900px) rotateX(0) rotateY(0)';});
  });
}
bindCardTilt();

/* ── CONTACT FORM ── */
function submitForm(){
  const nom=document.getElementById('cf-nom').value.trim();
  const email=document.getElementById('cf-email').value.trim();
  const sujet=document.getElementById('cf-sujet').value;
  const msg=document.getElementById('cf-message').value.trim();
  if(!nom||!email||!msg){ alert('Merci de remplir au moins le nom, l\'email et le message.'); return; }
  const s=encodeURIComponent('[Portfolio] '+(sujet||'Message')+' de '+nom);
  const b=encodeURIComponent('Nom : '+nom+'\nEmail : '+email+'\n\n'+msg);
  window.location.href='mailto:annaelle.champiau@outlook.fr?subject='+s+'&body='+b;
  setTimeout(()=>{const ok=document.getElementById('form-success');if(ok)ok.style.display='block';},800);
}

