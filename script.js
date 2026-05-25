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
(function initScramble() {
  const el = document.getElementById('scramble-target');
  if (!el) return;
  const finalText = el.getAttribute('data-text') || el.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>';
  const len = finalText.length;
  let isScrambling = false;

  function runScramble() {
    if (isScrambling) return;
    isScrambling = true;
    let frame = 0;
    const totalFrames = 25;
    function update() {
      let result = '';
      for (let i = 0; i < len; i++) {
        if (finalText[i] === ' ') { result += ' '; continue; }
        if (frame / totalFrames > i / len) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = result;
      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(update);
      } else {
        isScrambling = false;
      }
    }
    el.textContent = Array.from({ length: len }, (_, i) =>
      finalText[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    requestAnimationFrame(update);
  }

  // Initial scramble on load
  setTimeout(runScramble, 600);

  // Auto scramble every 15 seconds
  setInterval(runScramble, 15000);

  // Hover scramble — scramble only chars near cursor
  el.addEventListener('mousemove', (e) => {
    if (isScrambling) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const cursorIdx = Math.floor(relX * len);
    const radius = 3;
    let result = '';
    for (let i = 0; i < len; i++) {
      if (finalText[i] === ' ') { result += ' '; continue; }
      if (Math.abs(i - cursorIdx) <= radius) {
        result += chars[Math.floor(Math.random() * chars.length)];
      } else {
        result += finalText[i];
      }
    }
    el.textContent = result;
  });

  el.addEventListener('mouseleave', () => {
    if (!isScrambling) el.textContent = finalText;
  });
})();

/* ── SNIPER CLICK EFFECT ── */
document.addEventListener('click', (e) => {
  const container = document.createElement('div');
  container.className = 'click-effect';
  container.style.left = e.clientX + 'px';
  container.style.top = e.clientY + 'px';

  // 4 crosshair lines (right, left, down, up)
  const dirs = [
    { cls: 'h r', tx: '20px', ty: '0', tx2: '30px', ty2: '0' },
    { cls: 'h l', tx: '-20px', ty: '0', tx2: '-30px', ty2: '0' },
    { cls: 'v d', tx: '0', ty: '20px', tx2: '0', ty2: '30px' },
    { cls: 'v u', tx: '0', ty: '-20px', tx2: '0', ty2: '-30px' }
  ];
  dirs.forEach(d => {
    const line = document.createElement('div');
    line.className = 'sniper-line ' + d.cls;
    line.style.setProperty('--tx', d.tx);
    line.style.setProperty('--ty', d.ty);
    line.style.setProperty('--tx2', d.tx2);
    line.style.setProperty('--ty2', d.ty2);
    container.appendChild(line);
  });

  // 8 diagonal dots
  const angles = [Math.PI/6, Math.PI/3, 2*Math.PI/3, 5*Math.PI/6,
                  7*Math.PI/6, 4*Math.PI/3, 5*Math.PI/3, 11*Math.PI/6];
  angles.forEach(a => {
    const dot = document.createElement('div');
    dot.className = 'sniper-dot';
    const dist = 25;
    dot.style.setProperty('--dx', Math.cos(a) * dist + 'px');
    dot.style.setProperty('--dy', Math.sin(a) * dist + 'px');
    container.appendChild(dot);
  });

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 600);
});

/* ── DIRECTIONAL CURSOR ── */
(function initCursor() {
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
  if (isMobile) { document.body.classList.add('touch'); return; }

  const cursor = document.createElement('div');
  cursor.className = 'dir-cursor';
  cursor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 50 54" fill="none">' +
    '<path d="M42.68 41.15L27.51 6.8C26.73 5.03 24.21 5.03 23.39 6.8L7.6 41.15C6.76 42.98 8.53 44.89 10.41 44.2L24.38 39.05C24.88 38.86 25.44 38.86 25.94 39.05L39.81 44.2C41.68 44.89 43.49 42.98 42.68 41.15Z" fill="var(--neon-purple)"/>' +
    '<path d="M43.71 40.69L28.54 6.34C27.36 3.65 23.58 3.7 22.37 6.33L6.57 40.68C5.31 43.42 7.97 46.3 10.8 45.25L24.77 40.11C25.02 40.01 25.3 40.02 25.55 40.11L39.42 45.25C42.23 46.3 44.93 43.43 43.71 40.69Z" stroke="rgba(168,85,247,.5)" stroke-width="1.5"/>' +
    '</svg>';
  document.body.appendChild(cursor);

  let cx = window.innerWidth / 2, cy = -50;
  let tx = cx, ty = cy;
  let prevX = cx, prevY = cy;
  let angle = 0, targetAngle = 0;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!visible) { cx = tx; cy = ty; visible = true; cursor.style.opacity = '1'; }
  });

  document.addEventListener('mouseleave', () => {
    visible = false;
    cursor.style.opacity = '0';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    cx = lerp(cx, tx, 0.15);
    cy = lerp(cy, ty, 0.15);

    const dx = cx - prevX;
    const dy = cy - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.5) {
      targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      let diff = targetAngle - angle;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      angle += diff * 0.15;
    }

    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -10%) rotate(${angle}deg) scale(${speed > 1 ? 0.92 : 1})`;
    prevX = cx;
    prevY = cy;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

/* ── TERMINAL TYPING EFFECT ── */
const terminalLines = document.querySelectorAll('.terminal-body .t-line');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.2s ease';
    line.style.opacity = '1';
  }, 800 + i * 120);
});
