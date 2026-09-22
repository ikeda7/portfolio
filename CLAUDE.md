# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Landing page única de portfólio (Lucas Ikeda), tema "Dark Studio & IA".
Código, comentários, copy e ids de âncora são em **pt-BR** — mantenha o idioma.

## Antes de tocar em qualquer coisa

**Confira a branch antes de qualquer coisa.** `main` tem só o commit de setup, e
`develop` está atrás de uma pilha de PRs abertos. O estado completo do site fica
na branch do topo da pilha.

```bash
git log --oneline -1          # um commit so = branch errada
git branch -r                 # ache a branch do topo
```

A ordem de merge dos PRs e o que cada um entrega estão em
[docs/PENDENCIAS.md](docs/PENDENCIAS.md) — **leia antes de editar**, porque
merge fora de ordem gera conflito à toa.

Não rode `/init` aqui: este arquivo já existe e carrega sozinho no início da
sessão. Rodar `/init` numa branch atrasada geraria um CLAUDE.md descrevendo um
site que não existe mais.

Leia nesta ordem: [DIRETRIZES_CLAUDE.MD](DIRETRIZES_CLAUDE.MD) (a Regra de Ouro),
[docs/PENDENCIAS.md](docs/PENDENCIAS.md) (o que falta, o que está bloqueado e as
decisões já tomadas — com o motivo), [README.md](README.md) (contraste de cores e
formulário) e [docs/design-reference/README.md](docs/design-reference/README.md)
(a spec visual).

## Comandos

```bash
npm run dev           # Vite dev server → localhost:5173
npm run build         # tsc -b && vite build
npm run typecheck     # tsc -b --noEmit
npm run lint          # oxlint (não é ESLint)
npm run format        # prettier --write .
npm run format:check
npm run preview       # serve o build
```

**Não há runner de teste** (sem vitest/jest, sem script `test`) e **não há CI**.
O portão antes de commitar é rodar os quatro:
`npm run typecheck && npm run lint && npm run format:check && npm run build`.
Não instale framework de teste sem alinhar — a ausência é uma escolha desta fase.

## Regra de Ouro

[DIRETRIZES_CLAUDE.MD](DIRETRIZES_CLAUDE.MD) proíbe inventar conteúdo: nenhum
projeto, experiência, métrica, link ou descrição pode ser gerado por conta
própria. Tudo sai do currículo e do GitHub (`github.com/ikeda7`).

Hoje **não há placeholder na tela** — o conteúdo real já entrou. Então a regra
aparece de outra forma: onde falta fonte, o componente **diz o que é** em vez de
fingir. `href: null` num projeto renderiza card sem link (LexTrack é trabalho de
cliente sem repo público, e o card declara isso). Nada de preencher esses vazios
com suposição; o que falta e por quê está em [docs/PENDENCIAS.md](docs/PENDENCIAS.md).

O `gh` desta máquina está autenticado como `ikeda7` com escopo `repo` — dá para
ler os repositórios privados e conferir a fonte antes de escrever qualquer
descrição. Prefira isso a supor.

## Arquitetura

`index.html` → [src/main.tsx](src/main.tsx) → [src/App.tsx](src/App.tsx) → Hero →
About → Skills → Marquee → Projects → Contact, com Header sticky e Footer.

**Conteúdo é dado, não JSX.** Nenhum texto fica hardcoded em componente. Copy,
listas e números vivem em [src/data/](src/data/) (`site.ts`, `skills.ts`,
`projects.ts`, `social.ts`), tipados pelos contratos `readonly` de
[src/types/content.ts](src/types/content.ts). Mudança de texto → `src/data/`;
mudança de forma → o tipo primeiro.

Camadas:

- `components/sections/` — dona da `<section id>`, do container e do
  `aria-labelledby`.
- `components/ui/` — primitivos sem conhecimento de conteúdo, tudo por props.
- `hooks/` — `useActiveSection` (link ativo no header), `usePointerGlow`.
- `lib/` — [motion.ts](src/lib/motion.ts) (tempos/curvas) e
  [contact.ts](src/lib/contact.ts) (envio do formulário). Lógica sem JSX.
- Exports **nomeados** em todo lugar; `export default` só em `App.tsx`.

Âncoras em pt-BR (`#sobre`, `#habilidades`, `#projetos`, `#contato`).
[Header.tsx](src/components/layout/Header.tsx) deriva os ids de `navLinks`
(`href.slice(1)`) — ao adicionar seção, basta entrar em `navLinks`.

## Cor de acento: dois tokens, não um

A armadilha mais fácil de cair neste repositório. O acento é azul `#0059FF`, que
passa como componente de UI mas **reprova como texto**:

- `--color-accent` → preenchimento, glow, borda, LED, fundo de botão.
- `--color-accent-text` → **qualquer texto** em acento.
- `--color-line` é divisor decorativo; onde a borda é a única afordância do
  controle (campos do formulário), use `--color-line-strong`.
- Texto sobre botão de acento é **branco**, não `#0D0D0D`.

O raciocínio e os números de contraste estão no [README](README.md). A auditoria
fechou em zero falhas WCAG AA — não regrida isso usando `text-accent` onde
deveria ser `text-accent-text`.

## Tailwind 4 e tokens

Tailwind 4 via plugin Vite — **não existe `tailwind.config.js`**, não crie um.
Tudo em [src/index.css](src/index.css):

- `@theme` declara cores/fontes e gera as classes (`bg-panel`, `text-ink-muted`,
  `border-line`, `font-mono`…).
- Glows e gradientes são `@utility` (`glow-cta`, `glow-card`, `glow-panel`,
  `fill-vertical`…) derivados de `--accent-rgb` / `--accent-2-rgb` em `:root`.
  **Trocar o acento = trocar essas duas variáveis.** Nunca escreva o `rgba()`
  literal — foi essa centralização que fez a troca de roxo para azul custar 5
  linhas.
- Os keyframes `wavepulse` e `marquee` ficam **fora** do `@theme` de propósito:
  recebem `animation` inline (duration/delay por índice), nenhum utilitário
  `animate-*` os referencia, e o Tailwind os removeria do bundle. Não mova.

Valores arbitrários (`rounded-[14px]`, `tracking-[0.14em]`) batem 1:1 com a spec
de design. É intencional.

## Animação

Duas metades, e cada uma tem sua regra:

**CSS/Tailwind** — hover é sempre `transition-all duration-300` (fixado pelo
design; hover precisa responder na hora). O bloco
`@media (prefers-reduced-motion: reduce)` no fim do `index.css` mata **todas** as
animações e transições CSS de uma vez.

**`motion` (Framer)** — [App.tsx](src/App.tsx) envolve a árvore em
`<LazyMotion features={domAnimation} strict>`:

- `strict` **proíbe `motion.*`**. Importe `* as m from 'motion/react-m'` e use
  `<m.div>`. Errar isso quebra em desenvolvimento em vez de inflar o bundle.
- `domAnimation` é o que traz `whileInView`; trocar por um feature set menor faz
  todo reveal parar em silêncio com o conteúdo preso em `opacity: 0`.
- Tempos, curvas e variants ficam só em [src/lib/motion.ts](src/lib/motion.ts).
  Mudar um número lá muda a página inteira de forma consistente — não escreva
  `duration` solto no componente.
- O kill switch CSS **não** alcança animação em JS: todo componente com `motion`
  checa `useReducedMotion()` e renderiza a versão estática (ver
  [Reveal.tsx](src/components/ui/Reveal.tsx); `usePointerGlow` devolve `null`).

## Capas de projeto e faders: dois contratos com intenção

`ProjectCover` é união discriminada — `shot` (print do site no ar) | `terminal`
(comandos **reais** do README do repo) | `sleeve` (tipográfica). Sempre existe
uma: **o card nunca fica com buraco**. Escolha pelo que o projeto tem para
mostrar, não por estética.

`SkillChannel.value` (0–100) é **composição visual**, não auto-avaliação. Por
isso o número nunca aparece na tela nem vai para leitor de tela (a barra é
`aria-hidden`, o rótulo é o que se lê). Não "conserte" adicionando `role="meter"`
ou o número de volta sem ler a justificativa em
[docs/PENDENCIAS.md](docs/PENDENCIAS.md).

## Formulário de contato

[src/lib/contact.ts](src/lib/contact.ts) chama a API REST do EmailJS com `fetch`
— sem SDK, de propósito. Anti-bot sem CAPTCHA: campo-armadilha fora da tela e
tempo mínimo antes do envio, ambos falhando para o lado de deixar o humano passar.

Credenciais em `VITE_EMAILJS_*` (ver `.env.example`). **Tudo com prefixo `VITE_`
entra no bundle público** — nada secreto ali. A chave pública do EmailJS é
pública por definição; o que protege a cota é a allowlist de domínios no painel,
que precisa estar ligada antes de publicar. Sem as variáveis, o formulário valida
e avisa na tela que o envio está desligado, em vez de falhar em silêncio.

## TypeScript

`tsconfig.app.json` é estrito além do padrão: `strict`,
`noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`, `erasableSyntaxOnly`,
`verbatimModuleSyntax`. Na prática:

- Import de tipo **precisa** ser `import type { X } from '…'`.
- Acesso indexado devolve `T | undefined` — trate.
- Sem enums nem parameter properties.
- `typescript/no-explicit-any: error` no oxlint.

Alias `@/` → `src/`, declarado em **dois** arquivos que andam juntos:
[vite.config.ts](vite.config.ts) e [tsconfig.app.json](tsconfig.app.json).

## Git

`main` é espelho de produção e só recebe `develop` quando o site vai publicar.
`develop` é a integração; trabalho novo sai de `develop` em `feature/*` (ou
`fix/`, `chore/`, `docs/`) e volta por Pull Request, com merge `--no-ff` para o
histórico manter a forma do trabalho. Conventional Commits.

`.gitattributes` força `eol=lf` — no Windows não reintroduza CRLF (o Prettier já
está com `endOfLine: lf`).
