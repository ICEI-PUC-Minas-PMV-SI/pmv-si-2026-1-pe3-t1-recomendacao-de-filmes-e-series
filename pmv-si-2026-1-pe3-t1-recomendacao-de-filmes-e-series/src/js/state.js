// Wrapper de localStorage. Centraliza estado do usuário no protótipo.

const KEY = 'cinematch_state_v1';

const DEFAULT_STATE = {
  user: null,            // { name, email, role: 'user'|'admin', genres: [], blocked: false }
  ratings: {},           // { titleId: stars (1-5) }
  watchlist: [],         // [titleId, ...]
  favorites: [],         // [titleId, ...]
  history: [],           // [{ titleId, ratedAt }]
  // Mock de outros usuários para a tela de admin
  users: [
    { id: 'u-001', name: 'Lucas Mendes',     email: 'lucas.mendes@gmail.com',     role: 'user',  blocked: false, ratings: 18 },
    { id: 'u-002', name: 'Patrícia Souza',   email: 'patricia.souza@gmail.com',   role: 'user',  blocked: false, ratings: 2  },
    { id: 'u-003', name: 'Rafael Costa',     email: 'rafael.costa@hotmail.com',   role: 'user',  blocked: false, ratings: 11 },
    { id: 'u-004', name: 'Juliana Andrade',  email: 'juliana.a@uol.com.br',       role: 'user',  blocked: true,  ratings: 7  },
    { id: 'u-005', name: 'Marcos Dias',      email: 'marcos.dias@yahoo.com',      role: 'user',  blocked: false, ratings: 24 },
    { id: 'u-006', name: 'Ana Beatriz Lima', email: 'anabe.lima@gmail.com',       role: 'user',  blocked: false, ratings: 3  },
    { id: 'u-007', name: 'Felipe Rocha',     email: 'felipe.rocha@outlook.com',   role: 'user',  blocked: true,  ratings: 0  },
    { id: 'u-008', name: 'Carolina Pinto',   email: 'carol.pinto@gmail.com',      role: 'admin', blocked: false, ratings: 9  }
  ]
};

const State = {
  get() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      // Merge para garantir chaves novas
      return { ...structuredClone(DEFAULT_STATE), ...parsed };
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  },

  set(updater) {
    const current = State.get();
    const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  },

  reset() {
    localStorage.removeItem(KEY);
  },

  // Helpers de uso comum
  isAuthenticated() { return !!State.get().user; },
  isAdmin() { return State.get().user?.role === 'admin'; },

  rate(titleId, stars) {
    State.set(s => {
      const ratings = { ...s.ratings, [titleId]: stars };
      // Auto-popular histórico (CSU09 → CSU14)
      const history = s.history.filter(h => h.titleId !== titleId);
      history.unshift({ titleId, ratedAt: new Date().toISOString() });
      return { ...s, ratings, history };
    });
  },

  unrate(titleId) {
    State.set(s => {
      const ratings = { ...s.ratings };
      delete ratings[titleId];
      return { ...s, ratings };
    });
  },

  toggleWatchlist(titleId) {
    State.set(s => {
      const has = s.watchlist.includes(titleId);
      const watchlist = has ? s.watchlist.filter(id => id !== titleId) : [titleId, ...s.watchlist];
      return { ...s, watchlist };
    });
    return !State.get().watchlist.includes(titleId) ? 'removed' : 'added';
  },

  toggleFavorite(titleId) {
    State.set(s => {
      const has = s.favorites.includes(titleId);
      const favorites = has ? s.favorites.filter(id => id !== titleId) : [titleId, ...s.favorites];
      return { ...s, favorites };
    });
    return !State.get().favorites.includes(titleId) ? 'removed' : 'added';
  },

  removeFromHistory(titleId) {
    State.set(s => ({
      ...s,
      history: s.history.filter(h => h.titleId !== titleId),
      ratings: Object.fromEntries(Object.entries(s.ratings).filter(([id]) => Number(id) !== titleId))
    }));
  },

  setUserGenres(genres) {
    State.set(s => ({ ...s, user: { ...s.user, genres } }));
  },

  toggleBlockUser(userId) {
    State.set(s => ({
      ...s,
      users: s.users.map(u => u.id === userId ? { ...u, blocked: !u.blocked } : u)
    }));
  }
};

window.State = State;
