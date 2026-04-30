# 4. PROJETO DO DESIGN DE INTERAÇÃO

## 4.1 Personas

As personas representam usuários fictícios, baseados em traços observados no público alvo do CineMatch, e servem como guia para as decisões de design. Cada integrante do grupo definiu uma persona alinhada à proposta de recomendação personalizada de filmes e séries, cobrindo perfis distintos de consumo audiovisual (engajamento alto e baixo, diferentes faixas etárias e níveis de letramento digital).

> Os arquivos de origem em HTML+CSS estão em [`docs/personas/`](personas/). Para gerar a imagem de cada persona, abra o arquivo `.html` correspondente no navegador e capture a tela; salve o PNG em `docs/personas/img/screenshots/` mantendo o nome (`persona-1.png`, `persona-2.png`, etc.) e referencie-o nesta seção.

### Persona 1: Lucas Mendes

![Persona 1: Lucas Mendes](personas/img/screenshots/persona-1.png)

### Persona 2: Patrícia Souza

![Persona 2: Patrícia Souza](personas/img/screenshots/persona-2.png)

### Persona 3: a definir

> **Placeholder para o(a) integrante 2 do grupo.**
> Para preencher: copie o arquivo [`personas/persona-1.html`](personas/persona-1.html) renomeando para `persona-3.html`, edite o conteúdo (nome, idade, trabalho, personalidade, hobby, sonhos e os quatro blocos), abra no navegador, capture a tela e salve em `docs/personas/img/screenshots/persona-3.png`. Depois substitua este bloco pelo cabeçalho e pela imagem da sua persona, no mesmo formato das Personas 1 e 2.

### Persona 4: a definir

> **Placeholder para o(a) integrante 3 do grupo.** Mesmo procedimento da Persona 3, gerando `persona-4.html` e `persona-4.png`.

### Persona 5: a definir

> **Placeholder para o(a) integrante 4 do grupo.** Mesmo procedimento, gerando `persona-5.html` e `persona-5.png`.

### Persona 6: a definir

> **Placeholder para o(a) integrante 5 do grupo.** Mesmo procedimento, gerando `persona-6.html` e `persona-6.png`.

> **Sugestão de perfis complementares ainda não cobertos:** estudante adolescente (consumo via dispositivo móvel, foco em recomendações sociais), idoso (baixa proficiência digital, alta sensibilidade a navegação simples), profissional ligado a cinema ou crítica (consumo profissional, uso intenso de filtros avançados), pai ou mãe de família (consumo compartilhado, controle parental implícito por gênero).

## 4.2 Mapa de Empatia

O mapa de empatia complementa a persona ao detalhar o contexto emocional e comportamental em que ela vive. O modelo adotado utiliza sete quadrantes: (1) com quem se busca empatia, (2) o que a persona precisa fazer, (3) o que ela vê, (4) o que diz, (5) o que faz, (6) o que escuta, e (7) o que sente e pensa, dividido entre dores e ganhos.

> Mesmo fluxo de geração de imagem das personas: abrir o `.html` correspondente, capturar a tela e salvar em `docs/personas/img/screenshots/` com o nome esperado.

### Mapa de Empatia: Lucas Mendes

![Mapa de Empatia de Lucas Mendes](personas/img/screenshots/mapa-empatia-1.png)

### Mapa de Empatia: Patrícia Souza

![Mapa de Empatia de Patrícia Souza](personas/img/screenshots/mapa-empatia-2.png)

### Mapa de Empatia: persona 3 a definir

> **Placeholder para o(a) integrante 2 do grupo.** Copie [`personas/mapa-empatia-1.html`](personas/mapa-empatia-1.html) para `mapa-empatia-3.html`, ajuste o conteúdo dos sete quadrantes alinhando à sua persona, capture a tela e salve em `docs/personas/img/screenshots/mapa-empatia-3.png`.

### Mapa de Empatia: persona 4 a definir

> **Placeholder para o(a) integrante 3 do grupo.** Mesmo procedimento, gerando `mapa-empatia-4.html` e `mapa-empatia-4.png`.

### Mapa de Empatia: persona 5 a definir

> **Placeholder para o(a) integrante 4 do grupo.** Mesmo procedimento, gerando `mapa-empatia-5.html` e `mapa-empatia-5.png`.

### Mapa de Empatia: persona 6 a definir

> **Placeholder para o(a) integrante 5 do grupo.** Mesmo procedimento, gerando `mapa-empatia-6.html` e `mapa-empatia-6.png`.

## 4.3 Protótipos das Interfaces

Os protótipos de alta fidelidade foram desenvolvidos em HTML, CSS e JavaScript puros, sem framework ou build. Os arquivos vivem em [`src/`](../src/) e podem ser abertos diretamente em qualquer navegador moderno (`src/index.html`). O estado da aplicação (login, watchlist, favoritos, histórico, avaliações) é simulado via `localStorage`, permitindo navegação completa entre as telas como se houvesse um back-end real.

A direção visual escolhida foi um **cinema noir editorial**: paleta quente (tons de tinta sobre papel, acento âmbar/cobre como luz de projetor), tipografia serifada variável (Fraunces) para títulos contrastando com uma sans-serif geométrica (Geist) no corpo, granulação sutil de filme sobre o fundo e vinheta perimetral remetendo ao escurecer da sala de cinema. O objetivo é fugir do estilo padrão "streaming corporativo" e criar uma identidade memorável, ao mesmo tempo em que mantém a estrutura legível para apontar princípios de design nas próximas seções.

### 4.3.1 Tecnologia e como executar

| Item | Decisão |
|------|---------|
| Linguagens | HTML5, CSS3, JavaScript ES2020 (sem TypeScript, sem framework, sem bundler) |
| Estado | `localStorage` (chave `cinematch_state_v1`) |
| Dados | Mock estático em [`src/js/data.js`](../src/js/data.js) com 24 filmes e séries |
| Posters | URLs públicas do TMDB com fallback estilizado para casos sem cobertura |
| Responsividade | Layout fluido com breakpoint em 768px (RNF02) |

**Para executar:** abrir [`src/index.html`](../src/index.html) no navegador. O arquivo redireciona para `login.html` (ou para `home.html` se houver sessão ativa). Três contas de demonstração estão pré-configuradas:

| Conta | E-mail | Senha | Perfil |
|-------|--------|-------|--------|
| Lucas Mendes | lucas@cinematch.com | lucas123 | Cinéfilo (8 avaliações pré-carregadas) |
| Patrícia Souza | patricia@cinematch.com | patri123 | Casual (cold start) |
| Carolina Pinto | admin@cinematch.com | admin123 | Administradora |

### 4.3.2 Mapa de telas e cobertura de casos de uso

| Tela | Arquivo | CSUs cobertos | Persona-alvo |
|------|---------|---------------|--------------|
| Cadastro | `onboarding.html` | CSU01 | Patrícia (primeiro acesso) |
| Login | `login.html` | CSU02, CSU03 (logout via menu) | ambos |
| Início | `home.html` | CSU10, CSU11 | Patrícia (cold start) e Lucas (>=5 avaliações) |
| Busca | `busca.html` | CSU06, CSU07 | ambos |
| Detalhes do título | `detalhes.html` | CSU08, CSU09, CSU16 | ambos |
| Watchlist | `watchlist.html` | CSU12 | Patrícia |
| Favoritos | `favoritos.html` | CSU13 | ambos |
| Histórico | `historico.html` | CSU14 | Lucas |
| Perfil | `perfil.html` | CSU04 | ambos |
| Preferências de gênero | `preferencias.html` | CSU05 | ambos |
| Painel administrativo | `admin.html` | CSU15 | Administrador |

### 4.3.3 Telas

#### Login (CSU02)

![Tela de login do CineMatch](personas/img/screenshots/prototipo/login.png)

Layout dividido: à esquerda, uma "parede de cartazes" desfocada com vinheta cria atmosfera cinematográfica e contextualiza o produto antes mesmo do usuário ler qualquer texto. À direita, o formulário em tipografia serifada italic ("Bom te ver de volta") humaniza a entrada. As contas de demonstração ficam visíveis em destaque âmbar para que o avaliador possa entrar sem fricção.

#### Cadastro / Onboarding (CSU01)

![Tela de cadastro do CineMatch](personas/img/screenshots/prototipo/onboarding.png)

Cadastro em duas etapas com indicador de progresso no topo. A segunda etapa é a seleção dos gêneros preferidos (mínimo de 3, exigido pela regra de negócio do RF01/CSU01). O botão "Criar conta" só é habilitado quando o requisito é atingido, e o contador no topo muda de cor para verde, dando feedback contínuo.

#### Início (CSU10, CSU11)

![Tela inicial do CineMatch](personas/img/screenshots/prototipo/home.png)

A tela combina uma saudação editorial em destaque ("Boa noite, Lucas."), um título em destaque com fundo de capa desfocada, e linhas temáticas numeradas (Nº 01, Nº 02, ...) em estilo de revista de cinema. O *eyebrow* da seção principal informa explicitamente qual estratégia de recomendação está em uso ("Histórico" para Lucas, "Cold start" para Patrícia), tornando o sistema legível.

#### Busca avançada (CSU06, CSU07)

![Tela de busca do CineMatch](personas/img/screenshots/prototipo/busca.png)

Layout em duas colunas: sidebar fixa com filtros agrupados por categoria (Tipo, Gênero, Ano, Nota mínima) e a grade de resultados ocupando o restante. Cada interação de filtro reaplica a busca em tempo real, com o contador de resultados no topo. O botão "Limpar filtros" reverte tudo de uma vez, atendendo a regra de Shneiderman 7 (controle do usuário).

#### Detalhes do título (CSU08, CSU09, CSU16)

![Tela de detalhes de um título](personas/img/screenshots/prototipo/detalhes.png)

Hero com fundo desfocado da capa, poster em primeiro plano e ficha técnica do lado. A sinopse aparece em italic serifado, evocando o tom de uma resenha. Abaixo, dois blocos lado a lado: "Elenco e direção" e "Onde assistir" (CSU16), este último com o logotipo de cada streaming acompanhado de uma seta indicando link externo. Os três botões de ação (Avaliar, Watchlist, Favoritar) ficam logo abaixo da sinopse, à mão.

#### Watchlist (CSU12)

![Tela de watchlist do CineMatch](personas/img/screenshots/prototipo/watchlist.png)

Coleção de "para assistir depois". Cada card tem um botão "Remover" sobreposto que aparece com fundo translúcido escuro para não disputar com o poster. A remoção dispara um toast com botão "Desfazer", oferecendo reversão imediata.

#### Favoritos (CSU13)

![Tela de favoritos do CineMatch](personas/img/screenshots/prototipo/favoritos.png)

Mesma estrutura da watchlist, mas semanticamente diferente: aqui ficam os títulos que o usuário já assistiu e quer marcar como referência pessoal. O texto introdutório ("X obras que marcaram sua jornada") usa linguagem distinta para reforçar o significado.

#### Histórico (CSU14)

![Tela de histórico do CineMatch](personas/img/screenshots/prototipo/historico.png)

Lista cronológica de tudo que foi avaliado, populada automaticamente quando o usuário avalia (regra de CSU09). Cada linha mostra capa em miniatura, título, ano, tipo, data da avaliação e a nota. Botão "Remover" deleta a entrada e a avaliação correspondente, com toast de desfazer.

#### Perfil (CSU04)

![Tela de perfil do CineMatch](personas/img/screenshots/prototipo/perfil.png)

Sidebar com avatar gerado a partir das iniciais, dados resumidos e três indicadores estatísticos (avaliações, watchlist, favoritos). À direita, formulário editável de dados pessoais e atalhos rápidos para preferências, histórico e watchlist em formato de "cards de navegação".

#### Preferências de gênero (CSU05)

![Tela de preferências de gênero](personas/img/screenshots/prototipo/preferencias.png)

Mesmo padrão de seleção do onboarding, só que como página dedicada para gestão contínua. Inclui um bloco explicativo no rodapé contando como as preferências afetam as recomendações enquanto o usuário ainda não tem 5 avaliações, alinhando a expectativa.

#### Painel administrativo (CSU15)

![Painel administrativo de usuários](personas/img/screenshots/prototipo/admin.png)

Tabela de usuários com tabs de filtro por status (Todos, Ativos, Bloqueados) e busca por texto. Cada linha tem ação de Bloquear ou Desbloquear, conforme o estado atual. Não há exclusão direta, em conformidade com a regra do CSU15 (preservar histórico de avaliações).

### 4.3.4 Princípios de Gestalt aplicados

| Princípio | Onde aparece no protótipo | Como reforça a leitura da interface |
|-----------|---------------------------|--------------------------------------|
| **Proximidade** | Filtros da busca agrupados verticalmente em blocos rotulados (Tipo, Gênero, Ano, Nota); ações de Avaliar/Watchlist/Favoritar reunidas no canto inferior do hero de detalhes | Itens próximos são lidos como pertencentes ao mesmo grupo funcional, reduzindo carga cognitiva |
| **Similaridade** | Todos os cards de título seguem a mesma anatomia (poster, título, ano, tipo, nota, badges de provider) em qualquer tela (home, busca, watchlist, favoritos) | O usuário aprende uma única vez como ler um card e replica em todas as telas |
| **Continuidade** | Carrosséis horizontais com `scroll-snap` nas linhas temáticas da home; rolagem vertical contínua nas listas | A direção do olhar acompanha a composição: horizontal para "explorar variações", vertical para "ler tudo" |
| **Fechamento** | Modal de avaliar com bordas, sombra e backdrop escuro define uma unidade fechada, separada do restante; cards de detalhes são "blocos" claramente delimitados | Áreas isoladas comunicam que aquele espaço é um contexto próprio, com início e fim |
| **Figura/fundo** | Posters coloridos sobre fundo quase preto (tinta-sobre-papel) na home e na busca; vinheta perimetral em todas as telas | A paleta concentra a atenção no conteúdo (filmes/séries) e empurra o cromo da interface para o segundo plano |

### 4.3.5 Oito Regras de Ouro de Shneiderman aplicadas

| Nº | Regra | Onde aparece |
|----|-------|--------------|
| 1 | **Consistência** | Cabeçalho idêntico em todas as telas autenticadas (logo, busca, navegação, avatar); cards seguem a mesma anatomia; tipografia, cores e espaçamentos centralizados em variáveis CSS |
| 2 | **Atalhos para usuários frequentes** | Tecla `Enter` envia o formulário de busca; teclas `1` a `5` definem a nota no modal de avaliar; tecla `Esc` fecha modais |
| 3 | **Feedback informativo** | Toasts com cor de borda esquerda (verde para sucesso, vermelho para erro, âmbar default); contador "selecionados X / mínimo 3" em tempo real no onboarding e em preferências; estrelas pintando ao passar o mouse |
| 4 | **Diálogos com fechamento** | Após avaliar, o modal fecha automaticamente e o botão de avaliar passa a exibir a nota dada; passos do onboarding indicados visualmente (etapa 01 fica verde quando concluída, etapa 02 fica âmbar quando ativa) |
| 5 | **Prevenção de erros** | Botão "Criar conta" desabilitado até 3 gêneros estarem marcados; botão "Confirmar" do modal de avaliar desabilitado até a nota ser escolhida; senha exige mínimo de 6 caracteres com mensagem de ajuda visível |
| 6 | **Reversão fácil** | Toast "Desfazer" disponível em watchlist, favoritos, histórico e bloqueio admin durante 3,5 s; botão "Cancelar" em formulários de edição reverte ao estado salvo |
| 7 | **Controle do usuário** | Filtros aplicados são explícitos e cumulativos; botão "Limpar filtros" reverte tudo; usuário pode trocar a estratégia de recomendação editando preferências ou avaliando títulos; sem auto-recomendação invasiva |
| 8 | **Reduzir carga cognitiva** | Card mostra apenas poster + título + ano + tipo + nota + plataforma na primeira camada; detalhes técnicos (sinopse, elenco, providers detalhados) ficam só na ficha; menus contextuais aparecem apenas quando solicitados (clique no avatar) |

## 4.4 Testes com Protótipos

> Esta seção apresentará os testes de usabilidade aplicados pelos integrantes do grupo com usuários alinhados ao perfil das personas, incluindo o roteiro de tarefas, métricas coletadas (tempo, taxa de sucesso, número de erros, comentários) e a consolidação dos resultados com identificação de pontos de melhoria.
