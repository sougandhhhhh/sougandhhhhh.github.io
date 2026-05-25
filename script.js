/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── HAMBURGER / MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.setAttribute('aria-label', 'Close menu');
  document.body.style.overflow = 'hidden';
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.opacity   = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
}

hamburger.setAttribute('aria-expanded', 'false');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.contains('active') ? closeMenu() : openMenu();
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
    closeMenu();
  }
}, { passive: true });

/* ── HIRE ME DROPDOWN ── */
const hireDropdown = document.getElementById('hire-dropdown');
const hireBtn = document.getElementById('hire-btn');

hireBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  hireDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!hireDropdown.contains(e.target)) {
    hireDropdown.classList.remove('open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hireDropdown.classList.remove('open');
});

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(idx * 90, 360));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(el => skillObserver.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--neon-purple)';
        }
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

/* ── TEXT SCRAMBLE EFFECT ── */
(function textScramble() {
  const el = document.getElementById('scramble-target');
  if (!el) return;
  const finalText = el.getAttribute('data-text') || el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>';
  const len = finalText.length;
  let frame = 0;
  const totalFrames = 25;

  function update() {
    let result = '';
    for (let i = 0; i < len; i++) {
      if (finalText[i] === ' ') {
        result += ' ';
        continue;
      }
      const progress = frame / totalFrames;
      const charThreshold = i / len;
      if (progress > charThreshold) {
        result += finalText[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = result;
    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(update);
    }
  }

  setTimeout(() => {
    el.textContent = chars.slice(0, len).split('').map(() =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    requestAnimationFrame(update);
  }, 600);
})();

/* ── CLICK EFFECT (sniper crosshair) ── */
document.addEventListener('click', (e) => {
  const el = document.createElement('div');
  el.className = 'click-effect';
  el.style.left = e.clientX + 'px';
  el.style.top = e.clientY + 'px';
  el.innerHTML = '<div class="click-ring"></div><div class="click-ring"></div><div class="click-cross"></div>';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
});

/* ── TERMINAL TYPING EFFECT ── */
const terminalLines = document.querySelectorAll('.terminal-body .t-line');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.2s ease';
    line.style.opacity = '1';
  }, 800 + i * 120);
});
