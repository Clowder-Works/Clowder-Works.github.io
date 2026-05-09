// nav-init.js — run after nav.html is injected into #site-header

function initNav() {

  // ── Active link ──────────────────────────────────────────────
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ── Email links ──────────────────────────────────────────────
  const u = 'clowder.works', d = 'gmail.com';
  document.querySelectorAll('.nav-email-link').forEach(a => {
    a.href = 'mailto:' + u + '@' + d;
  });

  // ── Theme toggle ─────────────────────────────────────────────
  const r = document.documentElement;
  // Respect existing data-theme already set by inline script (if any),
  // otherwise fall back to system preference.
  let theme = r.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  r.setAttribute('data-theme', theme);

  function setIcon(t) {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
    btn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  setIcon(theme);

  const btn = document.querySelector('[data-theme-toggle]');
  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', theme);
      setIcon(theme);
    });
  }

  // ── Sticky nav shadow ────────────────────────────────────────
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ──────────────────────────────────────────────
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (mobileBtn && menu) {
    mobileBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', open);
      mobileBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileBtn.innerHTML = open
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }
}
