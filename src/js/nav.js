// Header compartilhado entre todas as telas autenticadas.

const Nav = {
  render(activePage) {
    const user = State.get().user;
    if (!user) return '';

    const isAdmin = user.role === 'admin';

    return `
      <header class="header">
        <div class="header-inner">
          <a href="home.html" class="logo">Cine<span>Match</span></a>
          <form class="header-search" id="navSearchForm">
            <input type="text" placeholder="Buscar filmes e séries..." id="navSearchInput" />
          </form>
          <nav class="header-nav">
            <a href="home.html"        class="${activePage === 'home' ? 'active' : ''}">Início</a>
            <a href="busca.html"       class="${activePage === 'busca' ? 'active' : ''}">Buscar</a>
            <a href="watchlist.html"   class="${activePage === 'watchlist' ? 'active' : ''}">Watchlist</a>
            <a href="favoritos.html"   class="${activePage === 'favoritos' ? 'active' : ''}">Favoritos</a>
            ${isAdmin ? `<a href="admin.html" class="${activePage === 'admin' ? 'active' : ''}">Admin</a>` : ''}
          </nav>
          <div class="header-user">
            <div class="avatar" id="avatarBtn" title="${UI.escape(user.name)}">${UI.initials(user.name)}</div>
            <div class="user-menu" id="userMenu">
              <a href="perfil.html">Meu perfil</a>
              <a href="preferencias.html">Preferências de gênero</a>
              <a href="historico.html">Histórico</a>
              <div class="divider"></div>
              <button id="logoutBtn">Sair</button>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  mount(activePage) {
    if (!Auth.requireAuth()) return;
    document.body.insertAdjacentHTML('afterbegin', Nav.render(activePage));

    // Busca: enter envia
    const form = document.getElementById('navSearchForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('navSearchInput').value.trim();
      window.location.href = 'busca.html' + (q ? `?q=${encodeURIComponent(q)}` : '');
    });

    // Menu do avatar
    const avatar = document.getElementById('avatarBtn');
    const menu = document.getElementById('userMenu');
    avatar?.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', () => menu?.classList.remove('open'));

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      Auth.logout();
      window.location.href = 'login.html';
    });
  }
};

window.Nav = Nav;
