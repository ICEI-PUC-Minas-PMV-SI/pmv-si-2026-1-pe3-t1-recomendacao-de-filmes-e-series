// Motor de recomendação simplificado para o protótipo.
// Implementa as duas estratégias dos CSUs 10 e 11 com a regra de transição dos 5 ratings.

const Recommend = {
  THRESHOLD: 5,  // a partir de 5 ratings, muda pro modo histórico

  // Estado da estratégia atual: 'cold-start' | 'transition' | 'history-based'
  currentStrategy() {
    const ratings = State.get().ratings;
    const count = Object.keys(ratings).length;
    if (count === 0) return 'cold-start';
    if (count < Recommend.THRESHOLD) return 'cold-start-with-ratings';
    if (count < 10) return 'transition';
    return 'history-based';
  },

  strategyLabel() {
    const s = Recommend.currentStrategy();
    return {
      'cold-start': 'Recomendações por gêneros preferidos',
      'cold-start-with-ratings': 'Recomendações por gêneros preferidos',
      'transition': 'Recomendações por histórico (em transição)',
      'history-based': 'Recomendações por histórico de avaliações'
    }[s];
  },

  // CSU10: usa só os gêneros preferidos
  byPreferences() {
    const { TITLES } = window.CINEMATCH_DATA;
    const userGenres = State.get().user?.genres || [];
    const ratings = State.get().ratings;

    return TITLES
      .filter(t => !ratings[t.id])  // não mostra o que ja foi avaliado
      .map(t => ({
        title: t,
        score: t.genres.filter(g => userGenres.includes(g)).length * 10 + t.avgRating
      }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.title);
  },

  // CSU11: filtra por gêneros mais bem avaliados (4-5 estrelas) e exclui mal avaliados (1-2)
  byHistory() {
    const { TITLES } = window.CINEMATCH_DATA;
    const ratings = State.get().ratings;

    const positiveGenres = {};
    const negativeGenres = new Set();

    Object.entries(ratings).forEach(([id, stars]) => {
      const t = window.CINEMATCH_DATA.TITLES_BY_ID[id];
      if (!t) return;
      if (stars >= 4) {
        t.genres.forEach(g => positiveGenres[g] = (positiveGenres[g] || 0) + 1);
      } else if (stars <= 2) {
        t.genres.forEach(g => negativeGenres.add(g));
      }
    });

    return TITLES
      .filter(t => !ratings[t.id])
      .filter(t => !t.genres.every(g => negativeGenres.has(g)))  // só exclui se TODOS forem negativos
      .map(t => ({
        title: t,
        score: t.genres.reduce((acc, g) => acc + (positiveGenres[g] || 0), 0) * 5 + t.avgRating
      }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.title);
  },

  // Recomendação principal - escolhe a estratégia
  forUser(limit = 12) {
    const strat = Recommend.currentStrategy();
    if (strat === 'cold-start' || strat === 'cold-start-with-ratings') {
      return Recommend.byPreferences().slice(0, limit);
    }
    if (strat === 'transition') {
      // Mistura as duas estratégias
      const hist = Recommend.byHistory().slice(0, Math.ceil(limit / 2));
      const pref = Recommend.byPreferences().filter(t => !hist.find(h => h.id === t.id)).slice(0, limit - hist.length);
      return [...hist, ...pref];
    }
    return Recommend.byHistory().slice(0, limit);
  },

  // Linhas temáticas para a home
  byGenre(genre, limit = 10) {
    const { TITLES } = window.CINEMATCH_DATA;
    const ratings = State.get().ratings;
    return TITLES
      .filter(t => t.genres.includes(genre) && !ratings[t.id])
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, limit);
  },

  trending(limit = 10) {
    const { TITLES } = window.CINEMATCH_DATA;
    return [...TITLES].sort((a, b) => b.avgRating - a.avgRating).slice(0, limit);
  }
};

window.Recommend = Recommend;
