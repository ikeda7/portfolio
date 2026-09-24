# Handoff: Portfólio pessoal — "Dark Studio & IA"

## Overview
Landing page única (single page) de portfólio pessoal com estética "dark studio":
fundo carvão profundo, acento roxo neon, tipografia sans + monoespaçada, e
metáforas visuais de software de áudio (waveform, faders de mesa de som, rack de
processamento, capas de vinil/plugin nos cards de projeto).

Cinco seções na ordem: **Hero → Sobre → Habilidades → Projetos → Contato**
(+ header sticky e footer).

## About the Design Files
O arquivo `Portfolio.dc.html` deste pacote é uma **referência de design feita em
HTML** — um protótipo que mostra aparência e comportamento pretendidos. **Não é
código de produção para copiar direto.** `support.js` é apenas o runtime do
ambiente de prototipagem: ignore-o na implementação.

A tarefa é **recriar este design no ambiente do projeto alvo** (React + Tailwind
é o caminho recomendado e o design foi pensado para isso; se o projeto ainda não
existe, crie com Vite + React + Tailwind, ou Next.js se for precisar de SEO/rotas)
usando os padrões e a biblioteca de componentes já existentes.

## Fidelity
**Alta fidelidade visual / conteúdo em placeholder.** Cores, tipografia,
espaçamentos, raios, sombras, estados de hover/focus e transições são finais e
devem ser reproduzidos fielmente. **Todo o texto é placeholder** (Lorem ipsum,
"Nome do projeto 1", "Sua profissão") e será substituído pelo conteúdo real do
dono do portfólio — o copy **não** faz parte da especificação.

## Screens / Views

Uma única view, rolagem vertical, com âncoras `#sobre`, `#habilidades`,
`#projetos`, `#contato` (todas com `scroll-margin-top: 80px` por causa do header
sticky).

Container padrão de todas as seções: `max-width: 1200px`, `margin: 0 auto`,
`padding: 80px 24px`.

### 1. Header (sticky)
- **Purpose**: navegação entre as âncoras.
- **Layout**: `position: sticky; top: 0; z-index: 20`, `backdrop-filter: blur(14px)`,
  fundo `rgba(13,13,13,.82)`, `border-bottom: 1px solid #262626`. Conteúdo:
  `max-width 1200px`, `padding: 14px 24px`, `flex`, `space-between`, `gap: 24px`.
- **Components**:
  - Marca: "Nome" 16px/700, `letter-spacing: -.02em`, cor `#EDEDED`; ao lado
    "/SOBRENOME" em mono 11px, `letter-spacing: .08em`, cor de acento.
    Alinhamento `align-items: baseline`, `gap: 8px`.
  - Nav: 4 links (Sobre, Stack, Projetos, Contato), `display:flex; gap:4px;
    flex-wrap:wrap`. Cada link: mono 11px, uppercase, `letter-spacing:.1em`,
    cor `#A3A3A3`, `padding: 8px 12px`, `border-radius: 6px`,
    `transition: all .3s`. **Hover**: cor `#EDEDED` + fundo `#1A1A1A`.

### 2. Hero
- **Purpose**: primeira impressão + CTA.
- **Layout**: `padding: 96px 24px 112px`, coluna centralizada,
  `text-align: center`, `overflow: hidden`, `position: relative`.
- **Components**:
  - **Glow de fundo**: div absoluta, `top: -180px`, centralizada,
    `760×460px`, `background: radial-gradient(ellipse at center,
    rgba(157,0,255,.22), rgba(13,13,13,0) 70%)`, `filter: blur(10px)`,
    animação `driftglow` (opacidade .35 → .7, 7s, ease-in-out, infinite),
    `pointer-events: none`.
  - **Pill de status**: `padding: 6px 12px`, `border: 1px solid #262626`,
    `border-radius: 999px`, fundo `#141414`, mono 11px uppercase
    `letter-spacing: .12em`, cor `#A3A3A3`; dentro, um ponto `6×6px`
    `border-radius: 999px` na cor de acento com `box-shadow: 0 0 10px` acento.
    Texto: "Disponível para projetos".
  - **H1**: `font-size: clamp(40px, 7vw, 76px)`, `line-height: 1.02`, 700,
    `letter-spacing: -.035em`, `max-width: 900px`, `text-wrap: balance`,
    `margin-top: 28px`.
  - **H2**: mono, `clamp(12px, 1.6vw, 15px)`, 400, uppercase,
    `letter-spacing: .18em`, cor de acento, `margin-top: 18px`.
  - **Parágrafo**: 16px/1.65, `max-width: 560px`, cor `#A3A3A3`,
    `text-wrap: pretty`, `margin-top: 22px`.
  - **CTAs** (`margin-top: 40px`, `flex`, `gap: 12px`, `wrap`, centralizado):
    - Primário: `padding: 14px 26px`, `border-radius: 8px`, fundo = acento,
      texto `#0D0D0D` 14px/600, `border: 1px solid` acento, `transition: all .3s`.
      **Hover**: `box-shadow: 0 0 34px rgba(157,0,255,.75)` +
      `transform: translateY(-2px)`.
    - Secundário: fundo transparente, texto `#EDEDED` 14px/500,
      `border: 1px solid #262626`. **Hover**: borda = acento +
      `box-shadow: 0 0 22px rgba(157,0,255,.25)`.
  - **Painel de waveform** (`margin-top: 72px`, `max-width: 880px`):
    `padding: 22px`, `border: 1px solid #262626`, `border-radius: 14px`,
    `background: linear-gradient(180deg, #141414, #101010)`,
    `box-shadow: 0 0 60px rgba(157,0,255,.12)`.
    - Linha de metadado: mono 10px uppercase `letter-spacing:.14em`, cor
      `#787878`, `space-between` — "Waveform · master" / "00:00:00 / 00:03:24".
    - **Barras**: `display:flex; gap:3px; height:120px; align-items:center`.
      48 barras, cada uma `flex:1 1 0; min-width:0`, altura em % vinda de um
      array fixo (ver `heights` no arquivo), `border-radius: 999px`,
      `background: linear-gradient(180deg, <acento>, rgba(138,43,226,.25))`,
      `transform-origin: center`, animação `wavepulse`
      (`0%,100% { scaleY(.25); opacity:.45 } 50% { scaleY(1); opacity:1 }`),
      duração `1.6s + (i % 5) * 0.28s`, delay `(i % 12) * 0.09s`.
    - Divisor `1px #262626` + 3 tags mono 10px (`padding: 5px 10px`,
      `border-radius: 4px`, fundo `#1A1A1A`); a terceira é destacada:
      fundo `rgba(157,0,255,.14)`, borda `rgba(157,0,255,.4)`, texto `#EDEDED`.

### 3. Sobre
- **Layout**: cabeçalho de seção (label mono 11px `letter-spacing:.16em` na cor
  de acento — "01 / SOBRE" — + régua `flex:1; height:1px; background:#262626`,
  `gap: 12px`, `margin-bottom: 36px`). Corpo:
  `display:grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  gap: 48px; align-items: center` (duas colunas em telas largas, uma em telas
  estreitas).
- **Coluna esquerda**: H3 `clamp(26px,3.4vw,38px)`/1.12/600
  `letter-spacing:-.03em`; dois parágrafos 15px/1.75 cor `#A3A3A3`; depois grade
  de 3 stats `repeat(auto-fit, minmax(120px,1fr))`, `gap: 12px` — cada um
  `padding: 16px`, `border: 1px solid #262626`, `border-radius: 10px`,
  fundo `#141414`, número mono 24px/700 na cor de acento + rótulo mono 10px
  uppercase `letter-spacing:.12em` cor `#787878`.
- **Coluna direita (imagem)**: wrapper relativo; glow absoluto
  `inset: 18px -18px -18px 18px`, `border-radius: 16px`,
  `radial-gradient(circle at 70% 70%, rgba(157,0,255,.45), transparent 70%)`,
  `filter: blur(24px)`. Placeholder: `aspect-ratio: 1/1`,
  `border: 1px solid #262626`, `border-radius: 16px`, fundo `#141414`,
  `box-shadow: 0 0 40px rgba(157,0,255,.18)`, conteúdo centralizado: quadrado
  `64×64`, `border-radius: 14px`, borda `rgba(157,0,255,.5)`, fundo
  `rgba(157,0,255,.12)` + legenda mono 10px uppercase. **Substituir por `<img>`
  com `object-fit: cover`.**

### 4. Habilidades — mesa de som / rack
- **Layout**: label "02 / STACK"; grade
  `repeat(auto-fit, minmax(320px,1fr))`, `gap: 20px` — dois painéis.
- **Painel comum**: `border: 1px solid #262626`, `border-radius: 14px`,
  fundo `#141414`, `overflow: hidden`. Cabeçalho: `padding: 14px 18px`,
  `border-bottom: 1px solid #262626`, fundo `#1A1A1A`, `space-between`,
  título mono 11px uppercase `letter-spacing:.14em` cor `#EDEDED` + código
  mono 10px cor `#787878`.
- **Painel A — "IA & Dados" (faders verticais)**: `padding: 26px 18px`,
  `flex`, `gap: 10px`, `space-between`. 5 canais; cada canal
  `flex:1 1 0; min-width:0`, coluna centralizada, `gap: 10px`:
  1. valor mono 10px cor `#787878`;
  2. trilho `width: 8px; height: 150px`, `border-radius: 999px`,
     fundo `#1A1A1A`, `border: 1px solid #262626`, `position: relative`;
     preenchimento absoluto a partir de `bottom`, altura = % do valor,
     `background: linear-gradient(180deg, <acento>, rgba(138,43,226,.4))`;
     **knob** absoluto em `bottom: <fill>`, `transform: translate(-50%, 50%)`,
     `26×12px`, `border-radius: 3px`, fundo `#2A2A2A`, borda `#3A3A3A`,
     `box-shadow: 0 0 12px rgba(157,0,255,.5)`;
  3. rótulo mono 10px uppercase `writing-mode: vertical-rl;
     transform: rotate(180deg); height: 78px; overflow: hidden`.
  - Valores de exemplo: 82, 64, 91, 55, 73.
- **Painel B — "Engenharia de software" (rack)**: `padding: 22px 18px`,
  coluna, `gap: 14px`. 5 linhas: rótulo mono 11px uppercase (largura fixa
  `96px`, `flex: none`, `text-overflow: ellipsis`, `nowrap`) + trilho
  `flex:1; min-width:0; height:6px`, `border-radius:999px`, fundo `#1A1A1A`,
  borda `#262626`, `overflow:hidden`, com barra
  `linear-gradient(90deg, rgba(138,43,226,.5), <acento>)` e
  `box-shadow: 0 0 14px rgba(157,0,255,.6)` + valor mono 10px alinhado à
  direita (`width: 34px`). Valores: 88, 76, 69, 81, 58.
  - Abaixo: divisor `1px #262626` + 8 tags mono 10px uppercase
    `letter-spacing:.1em`, `padding: 6px 10px`, `border-radius: 4px`,
    fundo `#1A1A1A`, borda `#262626`, `gap: 6px`, `wrap`.
    **Hover**: borda = acento, texto `#EDEDED`.

### 5. Projetos — grid
- **Layout**: label "03 / PROJETOS"; `display: grid`,
  `grid-template-columns: var(--proj-cols)` (default
  `repeat(auto-fit, minmax(280px,1fr))`; o protótipo permite forçar 2 ou 3
  colunas), `gap: 20px`. 6 cards.
- **Card**: `min-width: 0`, `border: 1px solid #262626`,
  `border-radius: 14px`, fundo `#141414`, `overflow: hidden`,
  `transition: all .3s`.
  **Hover**: `transform: translateY(-8px)`, `border-color: <acento>`,
  `box-shadow: 0 18px 40px rgba(0,0,0,.5), 0 0 30px rgba(157,0,255,.28)`.
- **Capa (vinil/plugin)**: `aspect-ratio: 16/10`,
  `background: radial-gradient(circle at 50% 50%, #1E1E1E, #101010)`,
  `border-bottom: 1px solid #262626`, conteúdo centralizado. Disco:
  largura `42%`, `aspect-ratio: 1/1`, `border-radius: 999px`,
  `border: 1px solid #2E2E2E`,
  `background: conic-gradient(from 0deg, #151515, #1D1D1D, #141414, #1D1D1D, #151515)`;
  miolo: `22%` do disco, círculo `rgba(157,0,255,.35)`, borda
  `rgba(157,0,255,.6)`, `box-shadow: 0 0 18px rgba(157,0,255,.5)`.
  Número da faixa absoluto em `top:10px; left:12px`, mono 10px
  `letter-spacing:.14em` cor `#787878` ("01"… "06").
  **Trocar por `<img>` da capa real quando houver.**
- **Corpo** (`padding: 18px`): H4 17px/600 `letter-spacing:-.01em`;
  parágrafo 13px/1.6 cor `#A3A3A3`; 3 tags de linguagem mono 9px
  `letter-spacing:.12em`, `padding: 4px 8px`, `border-radius: 4px`,
  fundo `#1A1A1A`, cor `#787878`; link "Abrir →" mono 11px uppercase
  `letter-spacing:.12em` cor `#A3A3A3`, `display: inline-flex`, `gap: 7px`.
  **Hover**: cor = acento e `gap: 12px` (a seta "anda").

### 6. Contato
- **Layout**: label "04 / CONTATO"; grade
  `repeat(auto-fit, minmax(300px,1fr))`, `gap: 56px`, `align-items: start`.
- **Coluna esquerda**: H3 `clamp(26px,3.4vw,38px)`/600; parágrafo 15px/1.7
  `max-width: 420px`; painel "Canais": `border: 1px solid #262626`,
  `border-radius: 12px`, fundo `#141414`, cabeçalho `padding: 12px 16px`
  fundo `#1A1A1A` com rótulo mono 10px uppercase; corpo `padding: 14px`,
  grade `repeat(auto-fit, minmax(110px,1fr))`, `gap: 10px`. Cada botão social:
  `padding: 14px`, `border: 1px solid #262626`, `border-radius: 8px`,
  fundo `#101010`, coluna com `gap: 8px` — LED `8×8px` redondo na cor de acento
  com `box-shadow: 0 0 10px` acento + rótulo mono 11px uppercase.
  **Hover**: borda = acento, fundo `rgba(157,0,255,.08)`.
  Canais: GitHub, LinkedIn, E-mail, X.
- **Coluna direita (formulário)**: coluna, `gap: 26px`. Cada campo é um
  `<label>` coluna `gap: 8px` com rótulo mono 10px uppercase
  `letter-spacing:.14em` cor `#787878` + controle:
  `width: 100%`, `background: transparent`, `border: 0`,
  `border-bottom: 1px solid #262626`, `padding: 10px 2px`, `font-size: 15px`,
  `outline: none`, `transition: all .3s`.
  **Focus**: `border-bottom-color: <acento>` +
  `box-shadow: 0 10px 24px -18px <acento>`.
  Campos: Nome (text), E-mail (email), Mensagem (`textarea rows=4`,
  `resize: vertical`).
  Botão: igual ao CTA primário do hero, `align-self: flex-start`,
  `padding: 14px 28px`.

### 7. Footer
`border-top: 1px solid #262626`, `padding: 26px 24px`; conteúdo
`max-width:1200px`, `flex`, `space-between`, `wrap`, `gap: 12px`,
mono 10px uppercase `letter-spacing:.12em` cor `#787878`.

## Interactions & Behavior
- Navegação por âncora (`href="#secao"`) + `scroll-margin-top: 80px`.
  Recomendado adicionar `scroll-behavior: smooth` no `html`.
- **Todas** as transições de estado: `transition: all .3s` (≈ `duration-300`).
- Hover muda cor de borda, fundo, sombra (glow) e translate — nunca opacidade.
- Animações contínuas: `wavepulse` (barras do hero) e `driftglow` (glow do hero).
- `@media (prefers-reduced-motion: reduce)` desliga **todas** as animações e
  transições (`animation: none !important; transition: none !important`).
- O formulário é **apenas visual** no protótipo: nenhum submit, nenhuma
  validação. Implementar: required em nome/e-mail, regex de e-mail, estado
  `enviando` (botão desabilitado + spinner), estado de sucesso e de erro
  (mensagem abaixo do botão, na cor semântica do projeto).
- Cards de projeto: no protótipo o link aponta para `#projetos`. Implementar
  como link real para o repositório/case.

## State Management
O design é praticamente estático. O que precisa de estado na implementação real:
- `form: { nome, email, mensagem }` + `status: 'idle' | 'enviando' | 'ok' | 'erro'`.
- Opcional: seção ativa no header (via `IntersectionObserver`) para destacar o
  link corrente — não existe no protótipo, mas cabe na estética (usar a cor de
  acento no link ativo).
- Dados de projetos/skills devem vir de um array/CMS, não hardcoded no JSX.

## Design Tokens

### Cores
| Token | Hex |
|---|---|
| `--bg` fundo da página | `#0D0D0D` |
| `--panel` card / painel | `#141414` |
| `--panel-2` superfície elevada, cabeçalho de painel, tag | `#1A1A1A` |
| fundo de item dentro de painel | `#101010` |
| `--line` borda / divisor | `#262626` |
| `--ink` texto principal | `#EDEDED` |
| `--ink-muted` texto de apoio | `#A3A3A3` |
| `--ink-faint` rótulo / metadado | `#787878` |
| `--accent` acento neon (default) | `#9D00FF` |
| `--accent-2` fim do gradiente | `#8A2BE2` |
| knob de fader | fundo `#2A2A2A`, borda `#3A3A3A` |
| relevos da capa de vinil | `#1E1E1E`, `#1D1D1D`, `#151515`, `#2E2E2E` |

Glows recorrentes: `rgba(157,0,255, .12 / .18 / .22 / .25 / .28 / .5 / .6 / .75)`.
Se a cor de acento for trocada, gerar os glows a partir dela (ex.:
`color-mix()` ou variável `--accent-rgb`) — no protótipo os `rgba` estão fixos.

### Tipografia
- Display/corpo: **Space Grotesk** (400/500/600/700).
- Mono (rótulos, números, tags, nav): **JetBrains Mono** (400/500/700).
- Escala: 9, 10, 11, 13, 14, 15, 16, 17, 24px; H3 `clamp(26px,3.4vw,38px)`;
  H1 `clamp(40px,7vw,76px)`; H2 `clamp(12px,1.6vw,15px)`.
- `letter-spacing`: títulos `-.01em` a `-.035em`; rótulos uppercase
  `.06em` a `.18em`.
- `line-height`: 1.02 (H1), 1.12 (H3), 1.6–1.75 (corpo).

### Espaçamento
Grade de 4px. Valores usados: 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26,
28, 32, 36, 40, 48, 56, 72, 80, 96, 112, 120px.
Container `max-width: 1200px`, padding lateral `24px`.

### Raios
4px (tag/pill pequena), 6px (link de nav, botão de painel), 8px (botão, item de
canal), 10px (bloco de stat), 12px (painel de canais), 14px (painel/card),
999px (barra, LED, pill).

### Sombras / glows
- CTA hover: `0 0 34px rgba(157,0,255,.75)`
- Botão secundário hover: `0 0 22px rgba(157,0,255,.25)`
- Card hover: `0 18px 40px rgba(0,0,0,.5), 0 0 30px rgba(157,0,255,.28)`
- Painel de waveform: `0 0 60px rgba(157,0,255,.12)`
- Placeholder de foto: `0 0 40px rgba(157,0,255,.18)`
- Knob de fader: `0 0 12px rgba(157,0,255,.5)`
- Barra do rack: `0 0 14px rgba(157,0,255,.6)`
- Input em foco: `0 10px 24px -18px <acento>`
- Header: `backdrop-filter: blur(14px)` sobre `rgba(13,13,13,.82)`

## Assets
Nenhum asset binário. Tudo é CSS puro.
- Fontes: Google Fonts (Space Grotesk, JetBrains Mono) — no projeto real,
  preferir self-host (`next/font` ou `@font-face` local) por performance.
- Placeholders a substituir por conteúdo real: foto da seção Sobre (quadrada,
  `object-fit: cover`) e capas dos 6 cards de projeto (16:10).
- Ícones: **não há** no protótipo. Os botões sociais usam um LED redondo.
  _(Implementação, 24/09: o LED virou o ícone de cada canal, no mesmo lugar e
  tamanho, a pedido do dono. Ver `src/components/ui/IconeCanal.tsx`.)_
  Na implementação, trocar o LED por ícone de marca (Lucide / Simple Icons),
  tamanho 16px, `currentColor`.

## Files
- `Portfolio.dc.html` — o protótipo completo (referência de design).
  - A árvore de markup fica entre `<x-dc>` e `</x-dc>`; todos os estilos são
    inline; `style-hover` / `style-focus` são pseudo-estados do protótipo que
    correspondem a `hover:` / `focus:` do Tailwind.
  - A classe `Component` no fim do arquivo contém os **dados de exemplo**
    (alturas das barras, valores dos faders/rack, tags, lista de projetos).
  - `--accent` e `--proj-cols` são variáveis CSS ajustáveis em runtime.
- `support.js` — runtime do ambiente de prototipagem. **Ignorar.**
