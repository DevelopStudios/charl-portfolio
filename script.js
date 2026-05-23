// =============================================
// Charl Roux — Portfolio v2026
// Scroll reveals, tilt-on-hover, live clock
// =============================================
(() => {
  // ----- Scroll reveals -----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ----- Subtle 3D tilt on bento tiles (desktop only) -----
  const MAX_TILT = 4; // degrees
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (!isTouch) document.querySelectorAll('.tile').forEach((tile) => {
    let rafId = 0;
    const onMove = (ev) => {
      const r = tile.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width;
      const y = (ev.clientY - r.top) / r.height;
      const rx = (0.5 - y) * MAX_TILT;
      const ry = (x - 0.5) * MAX_TILT;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        tile.style.setProperty('--mx', `${x * 100}%`);
        tile.style.setProperty('--my', `${y * 100}%`);
        tile.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(rafId);
      tile.style.transform = '';
      tile.style.setProperty('--mx', '50%');
      tile.style.setProperty('--my', '0%');
    };
    tile.addEventListener('mousemove', onMove);
    tile.addEventListener('mouseleave', onLeave);
  });

  // ----- Live clock (status bar) -----
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const tz = 'America/Detroit';
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: tz,
    });
    const tick = () => {
      const t = fmt.format(new Date());
      clock.textContent = `${t} EDT`;
    };
    tick();
    setInterval(tick, 30 * 1000);
  }

  // ===========================================================
  // Tweaks panel — palette swapper
  // ===========================================================
  const PALETTES = [
    { id: 'amber',    name: 'amber',    swatch: '#ffb547' },
    { id: 'blue',     name: 'blue',     swatch: '#5fa8ff' },
    { id: 'uv',       name: 'uv',       swatch: '#b58cff' },
    { id: 'phosphor', name: 'phos',     swatch: '#5ee084' },
    { id: 'acid',     name: 'acid',     swatch: '#d4ff3d' },
  ];

  const TWEAKS = (window.__TWEAK_DEFAULTS__ && { ...window.__TWEAK_DEFAULTS__ }) || { palette: 'amber' };

  const applyTweaks = () => {
    const p = TWEAKS.palette === 'amber' ? '' : TWEAKS.palette;
    if (p) document.body.dataset.palette = p;
    else delete document.body.dataset.palette;
  };
  applyTweaks();

  // Build panel
  const panel = document.createElement('aside');
  panel.className = 'tweaks';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="tw-head">
      <span class="ttl">// tweaks</span>
      <span class="x" role="button" aria-label="Close tweaks">×</span>
    </div>
    <div class="tw-body">
      <span class="tw-label">accent palette</span>
      <div class="palette-grid" role="radiogroup" aria-label="Accent palette">
        ${PALETTES.map(p => `
          <button class="sw" role="radio" data-pal="${p.id}"
                  aria-checked="${TWEAKS.palette === p.id}"
                  style="--sw-color:${p.swatch}">
            <span class="name">${p.name}</span>
          </button>
        `).join('')}
      </div>
      <div class="tw-hint">accent applies to type, lines, and ambient glow.</div>
    </div>
  `;
  document.body.appendChild(panel);

  const setPalette = (id) => {
    TWEAKS.palette = id;
    applyTweaks();
    panel.querySelectorAll('.sw').forEach((b) => {
      b.setAttribute('aria-checked', b.dataset.pal === id ? 'true' : 'false');
    });
    try {
      window.parent.postMessage(
        { type: '__edit_mode_set_keys', edits: { palette: id } },
        '*'
      );
    } catch (_) {}
  };

  panel.querySelectorAll('.sw').forEach((btn) => {
    btn.addEventListener('click', () => setPalette(btn.dataset.pal));
  });
  panel.querySelector('.x').addEventListener('click', () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    try {
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    } catch (_) {}
  });

  window.addEventListener('message', (ev) => {
    const t = ev.data && ev.data.type;
    if (t === '__activate_edit_mode') {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    } else if (t === '__deactivate_edit_mode') {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    }
  });

  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (_) {}

  // ----- Smooth scroll for in-page anchors -----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href').slice(1);
      const t = document.getElementById(id);
      if (!t) return;
      ev.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
