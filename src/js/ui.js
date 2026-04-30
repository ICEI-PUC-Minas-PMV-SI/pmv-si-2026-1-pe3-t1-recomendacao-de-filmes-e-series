// Helpers de UI: render de cards, modais, toasts, formatação.

const UI = {
  // Render de um card de título
  cardHTML(t) {
    const { PROVIDERS } = window.CINEMATCH_DATA;
    const providers = (t.providers || []).slice(0, 3).map(p => {
      const def = PROVIDERS[p];
      return def
        ? `<span class="provider-badge" style="background:${def.color}" title="${def.name}">${def.short}</span>`
        : '';
    }).join('');
    return `
      <a class="title-card" href="detalhes.html?id=${t.id}" data-id="${t.id}">
        <div class="poster">
          <div class="poster-fallback">${UI.escape(t.title)}</div>
          <img src="${t.poster}" alt="${UI.escape(t.title)}" onerror="this.style.display='none'">
          <div class="title-card-providers">${providers}</div>
        </div>
        <div class="title-card-body">
          <div class="title-card-title">${UI.escape(t.title)}</div>
          <div class="title-card-meta">
            <span>${t.year}</span>
            <span>•</span>
            <span>${t.type}</span>
            <span class="title-card-rating">★ ${t.avgRating.toFixed(1)}</span>
          </div>
        </div>
      </a>
    `;
  },

  renderGrid(container, titles, emptyMsg = 'Nenhum título encontrado.') {
    if (!titles.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎬</div>
          <div class="empty-state-title">${emptyMsg}</div>
        </div>
      `;
      return;
    }
    container.innerHTML = titles.map(UI.cardHTML).join('');
  },

  renderRow(container, titles) {
    container.innerHTML = titles.map(UI.cardHTML).join('');
  },

  // Toast curtinho
  toast(message, { type = 'success', action, onAction, duration = 3500 } = {}) {
    let host = document.querySelector('.toast-container');
    if (!host) {
      host = document.createElement('div');
      host.className = 'toast-container';
      document.body.appendChild(host);
    }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `
      <span class="toast-message">${UI.escape(message)}</span>
      ${action ? `<button class="toast-action">${UI.escape(action)}</button>` : ''}
    `;
    if (action && onAction) {
      el.querySelector('.toast-action').addEventListener('click', () => {
        onAction();
        el.remove();
      });
    }
    host.appendChild(el);
    setTimeout(() => el.remove(), duration);
  },

  // Modal genérico (avaliar)
  openModal(id) {
    document.getElementById(id)?.classList.add('open');
  },
  closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
  },

  // Star picker para o modal de avaliação
  bindStarPicker(container, onChange, initial = 0) {
    const stars = container.querySelectorAll('.star');
    let value = initial;
    const paint = (n) => stars.forEach((s, i) => s.classList.toggle('filled', i < n));
    paint(initial);

    stars.forEach((s, i) => {
      s.addEventListener('mouseenter', () => paint(i + 1));
      s.addEventListener('click', () => { value = i + 1; paint(value); onChange(value); });
    });
    container.addEventListener('mouseleave', () => paint(value));

    // Atalho de teclado: 1-5
    document.addEventListener('keydown', (e) => {
      if (!container.closest('.modal-backdrop')?.classList.contains('open')) return;
      if (e.key >= '1' && e.key <= '5') {
        value = Number(e.key);
        paint(value);
        onChange(value);
      }
    });

    return { getValue: () => value, setValue: (n) => { value = n; paint(n); } };
  },

  // Escapar texto para HTML
  escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  // Pegar query param
  qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  // Capitalizar primeira letra
  cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); },

  // Iniciais do nome do usuário (para avatar)
  initials(name) {
    return name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  }
};

window.UI = UI;
