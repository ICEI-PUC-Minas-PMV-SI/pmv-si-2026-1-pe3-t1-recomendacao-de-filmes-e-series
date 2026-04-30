// Captura screenshots de todas as telas do protótipo CineMatch.
// Roda dentro do container ghcr.io/puppeteer/puppeteer com /work montado na raiz do projeto.

const puppeteer = require('puppeteer');

const SRC = 'file:///work/src';
const OUT = '/work/docs/personas/img/screenshots/prototipo';

// Estado simulando Lucas após algumas sessões (mostra recs por histórico)
const lucasState = {
  user: {
    name: 'Lucas Mendes',
    email: 'lucas@cinematch.com',
    role: 'user',
    genres: ['drama', 'crime', 'ficção científica', 'mistério'],
    blocked: false
  },
  ratings: { 1: 5, 2: 5, 3: 4, 4: 5, 13: 5, 20: 4, 6: 4, 23: 4 },
  watchlist: [19, 5, 11, 9],
  favorites: [1, 13, 7],
  history: [
    { titleId: 23, ratedAt: new Date(Date.now() - 86400000 * 1).toISOString() },
    { titleId: 6,  ratedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
    { titleId: 20, ratedAt: new Date(Date.now() - 86400000 * 7).toISOString() },
    { titleId: 13, ratedAt: new Date(Date.now() - 86400000 * 12).toISOString() },
    { titleId: 4,  ratedAt: new Date(Date.now() - 86400000 * 18).toISOString() },
    { titleId: 3,  ratedAt: new Date(Date.now() - 86400000 * 25).toISOString() },
    { titleId: 2,  ratedAt: new Date(Date.now() - 86400000 * 30).toISOString() },
    { titleId: 1,  ratedAt: new Date(Date.now() - 86400000 * 45).toISOString() }
  ],
  users: [
    { id: 'u-001', name: 'Lucas Mendes',     email: 'lucas.mendes@gmail.com',   role: 'user',  blocked: false, ratings: 18 },
    { id: 'u-002', name: 'Patrícia Souza',   email: 'patricia.souza@gmail.com', role: 'user',  blocked: false, ratings: 2  },
    { id: 'u-003', name: 'Rafael Costa',     email: 'rafael.costa@hotmail.com', role: 'user',  blocked: false, ratings: 11 },
    { id: 'u-004', name: 'Juliana Andrade',  email: 'juliana.a@uol.com.br',     role: 'user',  blocked: true,  ratings: 7  },
    { id: 'u-005', name: 'Marcos Dias',      email: 'marcos.dias@yahoo.com',    role: 'user',  blocked: false, ratings: 24 },
    { id: 'u-006', name: 'Ana Beatriz Lima', email: 'anabe.lima@gmail.com',     role: 'user',  blocked: false, ratings: 3  },
    { id: 'u-007', name: 'Felipe Rocha',     email: 'felipe.rocha@outlook.com', role: 'user',  blocked: true,  ratings: 0  },
    { id: 'u-008', name: 'Carolina Pinto',   email: 'carol.pinto@gmail.com',    role: 'admin', blocked: false, ratings: 9  }
  ]
};

const adminState = {
  ...lucasState,
  user: { ...lucasState.user, name: 'Carolina Pinto', email: 'admin@cinematch.com', role: 'admin' }
};

const screens = [
  { url: 'login.html',         out: 'login.png',         auth: false, viewport: [1440, 920] },
  { url: 'onboarding.html',    out: 'onboarding.png',    auth: false, viewport: [1440, 920] },
  { url: 'home.html',          out: 'home.png',          auth: 'lucas', viewport: [1440, 1100] },
  { url: 'busca.html?q=',      out: 'busca.png',         auth: 'lucas', viewport: [1440, 1100] },
  { url: 'detalhes.html?id=2', out: 'detalhes.png',      auth: 'lucas', viewport: [1440, 1100] },
  { url: 'watchlist.html',     out: 'watchlist.png',     auth: 'lucas', viewport: [1440, 920] },
  { url: 'favoritos.html',     out: 'favoritos.png',     auth: 'lucas', viewport: [1440, 920] },
  { url: 'historico.html',     out: 'historico.png',     auth: 'lucas', viewport: [1440, 1000] },
  { url: 'perfil.html',        out: 'perfil.png',        auth: 'lucas', viewport: [1440, 920] },
  { url: 'preferencias.html',  out: 'preferencias.png',  auth: 'lucas', viewport: [1440, 920] },
  { url: 'admin.html',         out: 'admin.png',         auth: 'admin', viewport: [1440, 920] }
];

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });

  for (const s of screens) {
    const [w, h] = s.viewport;
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });

    // Para telas autenticadas: navega para a página primeiro (mesmo origin),
    // injeta localStorage, depois recarrega.
    if (s.auth) {
      const state = s.auth === 'admin' ? adminState : lucasState;
      await page.goto(`${SRC}/login.html`, { waitUntil: 'domcontentloaded' });
      await page.evaluate((stateJSON) => {
        localStorage.setItem('cinematch_state_v1', stateJSON);
      }, JSON.stringify(state));
    }

    await page.goto(`${SRC}/${s.url}`, { waitUntil: 'networkidle0', timeout: 15000 });

    // Aguarda fontes web carregarem
    await page.evaluate(() => document.fonts && document.fonts.ready);
    // Pequena pausa para imagens TMDB
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({ path: `${OUT}/${s.out}`, fullPage: true });
    console.log(`ok: ${s.out}`);
    await page.close();
  }

  await browser.close();
})();
