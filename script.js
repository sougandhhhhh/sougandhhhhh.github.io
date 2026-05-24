/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger siblings in same parent
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
          a.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

/* ── TERMINAL TYPING EFFECT ── */
const terminalLines = document.querySelectorAll('.terminal-body .t-line');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.2s ease';
    line.style.opacity = '1';
  }, 800 + i * 120);
});

/* ── NEON CURSOR TRAIL (subtle) ── */
let trail = [];
const MAX_TRAIL = 8;

document.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
  if (trail.length > MAX_TRAIL) trail.shift();
});
