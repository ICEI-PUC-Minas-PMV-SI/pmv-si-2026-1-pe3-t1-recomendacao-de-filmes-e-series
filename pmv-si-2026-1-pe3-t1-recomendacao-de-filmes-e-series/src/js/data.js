// Mock de dados do CineMatch - substitui a API do TMDB no protótipo.
// Posters apontam para o CDN do TMDB (URLs públicas); fallback CSS cobre 404.

const GENRES = [
  'ação', 'animação', 'aventura', 'comédia', 'crime', 'documentário',
  'drama', 'fantasia', 'ficção científica', 'horror', 'musical',
  'mistério', 'romance', 'suspense'
];

const PROVIDERS = {
  netflix:   { name: 'Netflix',     short: 'N',  color: '#e50914', url: 'https://www.netflix.com' },
  prime:     { name: 'Prime Video', short: 'P',  color: '#00a8e1', url: 'https://www.primevideo.com' },
  disney:    { name: 'Disney+',     short: 'D+', color: '#113ccf', url: 'https://www.disneyplus.com' },
  hbo:       { name: 'HBO Max',     short: 'HB', color: '#872dbe', url: 'https://www.hbomax.com' },
  apple:     { name: 'Apple TV+',   short: 'A',  color: '#000000', url: 'https://tv.apple.com' },
  mubi:      { name: 'MUBI',        short: 'M',  color: '#1f1f1f', url: 'https://mubi.com' },
  globoplay: { name: 'Globoplay',   short: 'G',  color: '#ff414d', url: 'https://globoplay.globo.com' },
};

const TMDB = (path) => `https://image.tmdb.org/t/p/w500${path}`;
// Placeholder estilizado (warm noir) para posters que não temos no TMDB
const PH = (text) => `https://placehold.co/500x750/1d1813/d4a574/png?text=${encodeURIComponent(text)}&font=playfair`;

const TITLES = [
  {
    id: 1, title: 'O Poderoso Chefão', original: 'The Godfather', year: 1972,
    type: 'filme', duration: 175, avgRating: 4.8,
    genres: ['drama', 'crime'],
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall'],
    synopsis: 'A saga da família Corleone, dirigida por Vito Corleone, e a transição do poder para seu filho mais novo, Michael, em meio à guerra entre famílias mafiosas de Nova York.',
    poster: TMDB('/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'),
    providers: ['prime', 'apple']
  },
  {
    id: 2, title: 'O Cavaleiro das Trevas', original: 'The Dark Knight', year: 2008,
    type: 'filme', duration: 152, avgRating: 4.7,
    genres: ['ação', 'crime', 'drama'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    synopsis: 'Batman enfrenta seu maior inimigo psicológico: o Coringa, um criminoso anárquico que ameaça mergulhar Gotham no caos.',
    poster: TMDB('/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
    providers: ['hbo', 'netflix']
  },
  {
    id: 3, title: 'Pulp Fiction', original: 'Pulp Fiction', year: 1994,
    type: 'filme', duration: 154, avgRating: 4.6,
    genres: ['crime', 'drama'],
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    synopsis: 'Histórias entrelaçadas de pistoleiros, um boxeador e um casal de assaltantes em Los Angeles.',
    poster: TMDB('/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'),
    providers: ['netflix']
  },
  {
    id: 4, title: 'A Origem', original: 'Inception', year: 2010,
    type: 'filme', duration: 148, avgRating: 4.5,
    genres: ['ficção científica', 'ação', 'suspense'],
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Marion Cotillard'],
    synopsis: 'Um ladrão especializado em invadir sonhos recebe a missão impossível de plantar uma ideia na mente de um herdeiro.',
    poster: TMDB('/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'),
    providers: ['hbo', 'netflix']
  },
  {
    id: 5, title: 'Interestelar', original: 'Interstellar', year: 2014,
    type: 'filme', duration: 169, avgRating: 4.6,
    genres: ['ficção científica', 'aventura', 'drama'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    synopsis: 'Em um futuro próximo, uma equipe de astronautas atravessa um buraco de minhoca em busca de um novo lar para a humanidade.',
    poster: TMDB('/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
    providers: ['prime', 'apple']
  },
  {
    id: 6, title: 'Parasita', original: 'Parasite', year: 2019,
    type: 'filme', duration: 132, avgRating: 4.6,
    genres: ['drama', 'suspense', 'comédia'],
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    synopsis: 'Uma família pobre infiltra-se aos poucos na vida de uma família rica, com consequências imprevisíveis.',
    poster: TMDB('/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'),
    providers: ['globoplay', 'mubi']
  },
  {
    id: 7, title: 'A Viagem de Chihiro', original: 'Spirited Away', year: 2001,
    type: 'filme', duration: 125, avgRating: 4.7,
    genres: ['animação', 'aventura', 'fantasia'],
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    synopsis: 'Uma menina entra num mundo encantado de espíritos e precisa encontrar o caminho de volta para casa.',
    poster: TMDB('/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'),
    providers: ['netflix']
  },
  {
    id: 8, title: 'Cidade de Deus', original: 'Cidade de Deus', year: 2002,
    type: 'filme', duration: 130, avgRating: 4.7,
    genres: ['crime', 'drama'],
    director: 'Fernando Meirelles',
    cast: ['Alexandre Rodrigues', 'Leandro Firmino', 'Phellipe Haagensen'],
    synopsis: 'Acompanha duas décadas de violência na favela carioca da Cidade de Deus, contada por Buscapé.',
    poster: PH('Cidade\\nde Deus'),
    providers: ['globoplay', 'netflix']
  },
  {
    id: 9, title: 'La La Land', original: 'La La Land', year: 2016,
    type: 'filme', duration: 128, avgRating: 4.3,
    genres: ['romance', 'musical', 'drama'],
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend'],
    synopsis: 'Em Los Angeles, um pianista de jazz e uma aspirante a atriz se apaixonam enquanto perseguem seus sonhos.',
    poster: TMDB('/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'),
    providers: ['prime', 'globoplay']
  },
  {
    id: 10, title: 'Whiplash', original: 'Whiplash', year: 2014,
    type: 'filme', duration: 106, avgRating: 4.5,
    genres: ['drama', 'musical'],
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Paul Reiser'],
    synopsis: 'Um jovem baterista enfrenta o método cruel de um maestro implacável em busca da perfeição.',
    poster: TMDB('/7fn624j5lj3xTme2SgiLCeuedmO.jpg'),
    providers: ['prime', 'apple']
  },
  {
    id: 11, title: 'Corra!', original: 'Get Out', year: 2017,
    type: 'filme', duration: 104, avgRating: 4.2,
    genres: ['horror', 'suspense', 'mistério'],
    director: 'Jordan Peele',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Catherine Keener'],
    synopsis: 'Um jovem negro visita a família branca da namorada e descobre que algo profundamente perturbador acontece naquela casa.',
    poster: TMDB('/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg'),
    providers: ['netflix']
  },
  {
    id: 12, title: 'O Grande Hotel Budapeste', original: 'The Grand Budapest Hotel', year: 2014,
    type: 'filme', duration: 99, avgRating: 4.3,
    genres: ['comédia', 'drama'],
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'Tony Revolori', 'F. Murray Abraham'],
    synopsis: 'Um lendário concierge e seu protegido se envolvem na disputa por uma pintura renascentista valiosa.',
    poster: TMDB('/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg'),
    providers: ['disney', 'hbo']
  },
  {
    id: 13, title: 'Breaking Bad', original: 'Breaking Bad', year: 2008,
    type: 'série', duration: 5, avgRating: 4.8,
    genres: ['crime', 'drama', 'suspense'],
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris'],
    synopsis: 'Um professor de química com câncer começa a fabricar metanfetamina para sustentar sua família após o diagnóstico.',
    poster: TMDB('/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'),
    providers: ['netflix']
  },
  {
    id: 14, title: 'Stranger Things', original: 'Stranger Things', year: 2016,
    type: 'série', duration: 4, avgRating: 4.4,
    genres: ['ficção científica', 'horror', 'drama'],
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder', 'David Harbour'],
    synopsis: 'Em uma cidade pequena nos anos 80, um grupo de crianças investiga o desaparecimento de um amigo e descobre forças sobrenaturais.',
    poster: TMDB('/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'),
    providers: ['netflix']
  },
  {
    id: 15, title: 'Dark', original: 'Dark', year: 2017,
    type: 'série', duration: 3, avgRating: 4.6,
    genres: ['ficção científica', 'mistério', 'drama'],
    director: 'Baran bo Odar',
    cast: ['Louis Hofmann', 'Lisa Vicari', 'Maja Schöne'],
    synopsis: 'O desaparecimento de duas crianças em uma cidade alemã expõe os segredos sobrenaturais de quatro famílias ao longo de gerações.',
    poster: TMDB('/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg'),
    providers: ['netflix']
  },
  {
    id: 16, title: 'The Office', original: 'The Office', year: 2005,
    type: 'série', duration: 9, avgRating: 4.5,
    genres: ['comédia'],
    director: 'Greg Daniels',
    cast: ['Steve Carell', 'Rainn Wilson', 'John Krasinski', 'Jenna Fischer'],
    synopsis: 'O dia a dia caótico de uma filial de uma empresa de papel em Scranton, contado em formato mockumentary.',
    poster: TMDB('/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg'),
    providers: ['prime']
  },
  {
    id: 17, title: 'La Casa de Papel', original: 'La Casa de Papel', year: 2017,
    type: 'série', duration: 5, avgRating: 4.2,
    genres: ['crime', 'drama', 'suspense'],
    director: 'Álex Pina',
    cast: ['Úrsula Corberó', 'Álvaro Morte', 'Itziar Ituño'],
    synopsis: 'Um misterioso Professor recruta oito ladrões para realizar o assalto mais ambicioso da história espanhola.',
    poster: TMDB('/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg'),
    providers: ['netflix']
  },
  {
    id: 18, title: 'Black Mirror', original: 'Black Mirror', year: 2011,
    type: 'série', duration: 6, avgRating: 4.4,
    genres: ['ficção científica', 'drama', 'suspense'],
    director: 'Charlie Brooker',
    cast: ['Vários elencos por episódio'],
    synopsis: 'Antologia que explora o lado sombrio da tecnologia e o impacto distópico dela na sociedade contemporânea.',
    poster: PH('Black\\nMirror'),
    providers: ['netflix']
  },
  {
    id: 19, title: 'Severance', original: 'Severance', year: 2022,
    type: 'série', duration: 2, avgRating: 4.6,
    genres: ['ficção científica', 'mistério', 'suspense'],
    director: 'Dan Erickson',
    cast: ['Adam Scott', 'Britt Lower', 'Patricia Arquette'],
    synopsis: 'Funcionários de uma corporação aceitam um procedimento que separa cirurgicamente suas memórias de trabalho da vida pessoal.',
    poster: TMDB('/lFf6LLrQjYldcZItzOkGmMMigP7.jpg'),
    providers: ['apple']
  },
  {
    id: 20, title: 'Better Call Saul', original: 'Better Call Saul', year: 2015,
    type: 'série', duration: 6, avgRating: 4.7,
    genres: ['crime', 'drama'],
    director: 'Vince Gilligan',
    cast: ['Bob Odenkirk', 'Rhea Seehorn', 'Jonathan Banks'],
    synopsis: 'A trajetória de Jimmy McGill antes de virar Saul Goodman, o advogado escorregadio de Breaking Bad.',
    poster: TMDB('/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg'),
    providers: ['netflix']
  },
  {
    id: 21, title: 'Mad Max: Estrada da Fúria', original: 'Mad Max: Fury Road', year: 2015,
    type: 'filme', duration: 120, avgRating: 4.4,
    genres: ['ação', 'aventura', 'ficção científica'],
    director: 'George Miller',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
    synopsis: 'Em um deserto pós-apocalíptico, Max ajuda Furiosa a libertar um grupo de mulheres de um tirano sanguinário.',
    poster: TMDB('/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg'),
    providers: ['hbo', 'netflix']
  },
  {
    id: 22, title: 'Tropa de Elite', original: 'Tropa de Elite', year: 2007,
    type: 'filme', duration: 118, avgRating: 4.4,
    genres: ['ação', 'crime', 'drama'],
    director: 'José Padilha',
    cast: ['Wagner Moura', 'Caio Junqueira', 'André Ramiro'],
    synopsis: 'O capitão Nascimento procura um substituto na BOPE enquanto enfrenta o tráfico de drogas no Rio de Janeiro.',
    poster: PH('Tropa\\nde Elite'),
    providers: ['globoplay']
  },
  {
    id: 23, title: 'Mulholland Drive', original: 'Mulholland Drive', year: 2001,
    type: 'filme', duration: 147, avgRating: 4.2,
    genres: ['mistério', 'drama', 'suspense'],
    director: 'David Lynch',
    cast: ['Naomi Watts', 'Laura Harring', 'Justin Theroux'],
    synopsis: 'Uma jovem atriz em Los Angeles descobre uma trama enigmática após encontrar uma mulher amnésica.',
    poster: PH('Mulholland\\nDrive'),
    providers: ['mubi']
  },
  {
    id: 24, title: 'Bacurau', original: 'Bacurau', year: 2019,
    type: 'filme', duration: 132, avgRating: 4.1,
    genres: ['suspense', 'drama', 'ficção científica'],
    director: 'Kleber Mendonça Filho',
    cast: ['Sônia Braga', 'Udo Kier', 'Bárbara Colen'],
    synopsis: 'Em um vilarejo no sertão brasileiro do futuro próximo, os moradores percebem que algo estranho está acontecendo.',
    poster: PH('Bacurau'),
    providers: ['globoplay', 'mubi']
  }
];

// Index para acesso rápido por ID
const TITLES_BY_ID = Object.fromEntries(TITLES.map(t => [t.id, t]));

window.CINEMATCH_DATA = { GENRES, PROVIDERS, TITLES, TITLES_BY_ID };
