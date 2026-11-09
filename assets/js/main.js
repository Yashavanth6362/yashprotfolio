(() => {
  const $ = id => document.getElementById(id);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x !== undefined) e.textContent = x; return e; };
  const web = v => { try { const u = new URL(String(v || '').trim()); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch { return ''; } };
  const src = v => /^(assets|projects|articles|certificates)\/[\w\-./ ]+$/.test(v || '') && !String(v).includes('..') ? v : web(v);
  const slug = s => String(s || '').toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  const list = (x, k) => Array.isArray(x) ? x : (Array.isArray(x?.[k]) ? x[k] : []);

  const btn = document.querySelector('.menu-toggle'), nav = document.querySelector('.primary-nav');
  const setMenu = open => { btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open', open); };
  if (btn && nav) {
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        btn.focus();
      }
    });
    document.addEventListener('click', event => {
      if (btn.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !btn.contains(event.target)) setMenu(false);
    });
  }
  const yr = $('year'); if (yr) yr.textContent = new Date().getFullYear();
  if (document.body.dataset.page !== 'home') return;

  const ICON = {
    Instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    LinkedIn: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.5 9h3.8v11H4.5zM6.4 3.5a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4zM10.4 9H14v1.6c.6-1 1.9-1.9 3.8-1.9 3.6 0 4.2 2.4 4.2 5.4V20h-3.8v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20h-3.8z"/></svg>',
    GitHub: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 00-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.03 3.37 1.54.1-.72.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 015.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.78 1.14 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0012 .9z"/></svg>'
  };
  const fill = (id, items, build) => {
    const box = $(id); if (!box) return;
    items.forEach(i => { const n = build(i); if (n) box.append(n); });
    if (!box.children.length) box.closest('section')?.setAttribute('hidden', '');
  };
  const load = n => fetch(n + '.json', { headers: { Accept: 'application/json' } }).then(r => r.ok ? r.json() : null).catch(() => null);

  Promise.all(['data', 'projects', 'education', 'certificates', 'featuretracker', 'ad'].map(load)).then(([d, p, e, c, f, a]) => {
    const prof = d?.profile || {}, projects = list(p, 'projects'), certs = list(c, 'certificates'), arts = list(d, 'articles');

    const stats = $('stats');
    [[projects.length, 'Projects'], [certs.length, 'Certificates'], [arts.length, 'Articles']].filter(s => s[0]).forEach(([n, l]) => {
      const s = el('div'); s.append(el('b', '', n), el('span', '', l)); stats.append(s);
    });

    const socials = [
      { name: 'GitHub', url: web(prof.github), side: 'left' },
      { name: 'LinkedIn', url: web(prof.linkedin), side: 'right' }
    ];
    const portraitSocial = $('portrait-social');
    if (portraitSocial) {
      socials.forEach(({ name, url, side }) => {
        const className = `social-icon social-icon--${side}`;
        const icon = url ? el('a', className) : el('span', `${className} is-unconfigured`);
        icon.innerHTML = ICON[name];
        icon.setAttribute('aria-label', url ? `${name} profile` : `${name} profile URL not configured`);
        if (url) {
          icon.href = url;
          icon.target = '_blank';
          icon.rel = 'noopener noreferrer';
        } else {
          icon.setAttribute('aria-disabled', 'true');
          icon.setAttribute('role', 'img');
          icon.title = `Add your ${name} profile URL in data.json to activate this button.`;
        }
        portraitSocial.append(icon);
      });
    }
    socials.filter(({ url }) => url).forEach(({ name, url }) => {
      const link = el('a', '', `${name} ↗`);
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      $('social-links')?.append(link);
    });
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(prof.email || '').trim())) { const m = $('email-cta'); m.href = 'mailto:' + prof.email.trim(); m.hidden = false; }

    fill('skills', list(d, 'skills'), (s, i) => { const k = el('article', 'card'); k.append(el('span', 'num', String(list(d, 'skills').indexOf(s) + 1).padStart(2, '0')), el('h3', '', s.name), el('p', '', s.description || '')); return k; });

    fill('project-list', projects, x => {
      if (!x?.title) return;
      const k = el('article', 'card'), img = src(x.image);
      if (img) { const i = el('img'); i.src = img; i.alt = x.title; i.loading = 'lazy'; k.append(i); }
      k.append(el('span', 'cat', [x.category, x.year].filter(Boolean).join(' · ')), el('h3', '', x.title));
      if (x.status) k.append(el('span', 'badge ' + slug(x.status), x.status));
      k.append(el('p', '', x.summary || ''));
      if (x.tags?.length) { const t = el('div', 'chips'); x.tags.forEach(g => t.append(el('span', '', String(g)))); k.append(t); }
      const u = src(x.url); if (u) { const l = el('a', 'more', 'View project →'); l.href = u; k.append(l); }
      return k;
    });

    fill('edu-list', list(e, 'education'), x => {
      if (!x?.title) return;
      const k = el('li'); k.append(el('span', 'cat', x.period || ''), el('h3', '', x.title), el('p', '', x.institution || ''));
      if (x.status) k.append(el('span', 'badge ' + slug(x.status), x.status));
      return k;
    });

    fill('cert-list', certs, x => {
      if (!x?.title) return;
      const k = el('figure', 'cert'), img = src(x.image), href = web(x.link) || img;
      if (img) { const a = el('a'); a.href = href || img; if (href) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } const i = el('img'); i.src = img; i.alt = 'Certificate: ' + x.title; i.loading = 'lazy'; a.append(i); k.append(a); }
      const cap = el('figcaption'); cap.append(el('strong', '', x.title)); const m = [x.issuer, x.date].filter(Boolean).join(' · '); if (m) cap.append(el('span', '', m)); k.append(cap);
      return k;
    });
    if (!certs.length) {
      const box = $('cert-list');
      if (box) { box.append(el('div', 'empty-state', 'Certificates will be published here as they are earned and verified.')); box.closest('section')?.removeAttribute('hidden'); }
    }

    fill('tracker-list', list(f, 'features'), x => {
      if (!x?.title) return;
      const k = el('article', 'card'); k.append(el('span', 'badge ' + slug(x.status), x.status || 'Planned'), el('h3', '', x.title), el('p', '', x.note || '')); return k;
    });

    fill('article-list', arts, x => {
      if (!x?.title || !src(x.url)) return;
      const k = el('article', 'card'), l = el('a', 'more', 'Read article →'); l.href = src(x.url);
      k.append(el('span', 'cat', x.category || 'Article'), el('h3', '', x.title), el('p', '', x.summary || ''), l); return k;
    });

    if (a?.enabled && a.text) {
      let closed = false; try { closed = sessionStorage.getItem('ad-closed') === '1'; } catch {}
      if (!closed) {
        const bar = el('div', 'ad-bar'); bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Announcement');
        bar.append(el('span', '', a.text));
        const u = a.link && (a.link.startsWith('#') ? a.link : web(a.link)); if (u) { const l = el('a', '', a.linkText || 'Learn more'); l.href = u; bar.append(l); }
        const x = el('button', '', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close announcement');
        x.addEventListener('click', () => { bar.remove(); document.body.classList.remove('has-ad'); try { sessionStorage.setItem('ad-closed', '1'); } catch {} });
        bar.append(x); document.body.append(bar); document.body.classList.add('has-ad');
      }
    }
  });
})();
