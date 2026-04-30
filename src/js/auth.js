// Autenticação fake - só de simulação no protótipo.

const Auth = {
  // Usuários de demonstração pré-cadastrados
  DEMO_USERS: [
    { name: 'Lucas Mendes',   email: 'lucas@cinematch.com',   password: 'lucas123', role: 'user',
      genres: ['drama', 'crime', 'ficção científica', 'mistério'] },
    { name: 'Patrícia Souza', email: 'patricia@cinematch.com', password: 'patri123', role: 'user',
      genres: ['romance', 'drama', 'comédia'] },
    { name: 'Carolina Pinto', email: 'admin@cinematch.com',   password: 'admin123', role: 'admin',
      genres: ['drama', 'documentário', 'suspense'] }
  ],

  login(email, password) {
    const u = Auth.DEMO_USERS.find(x => x.email === email && x.password === password);
    if (!u) return { ok: false, error: 'E-mail ou senha incorretos.' };
    State.set(s => ({ ...s, user: { name: u.name, email: u.email, role: u.role, genres: u.genres, blocked: false } }));
    return { ok: true };
  },

  signup({ name, email, password, genres }) {
    if (!name || !email || !password) return { ok: false, error: 'Preencha todos os campos.' };
    if (genres.length < 3) return { ok: false, error: 'Selecione no mínimo 3 gêneros.' };
    State.set(s => ({ ...s, user: { name, email, role: 'user', genres, blocked: false } }));
    return { ok: true };
  },

  logout() {
    State.set(s => ({ ...s, user: null }));
  },

  // Redireciona para login.html se não autenticado
  requireAuth() {
    if (!State.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // Redireciona para login.html se não for admin
  requireAdmin() {
    if (!Auth.requireAuth()) return false;
    if (!State.isAdmin()) {
      window.location.href = 'home.html';
      return false;
    }
    return true;
  }
};

window.Auth = Auth;
