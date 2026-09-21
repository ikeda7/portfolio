# Portfólio — Lucas Ikeda

Landing page única com estética **Dark Studio & IA**: fundo carvão, acento roxo
neon e metáforas de software de áudio (waveform, faders de mesa de som, rack de
processamento, capas de vinil nos cards de projeto).

## Stack

| Camada | Ferramenta |
|---|---|
| Build | Vite 8 |
| UI | React 19 + TypeScript 6 (strict) |
| Estilo | Tailwind CSS 4 (`@tailwindcss/vite`, tokens em `@theme`) |
| Animação | CSS/Tailwind; `motion` e `gsap` instalados para as fases seguintes |
| Ícones | `lucide-react` |
| Qualidade | oxlint + Prettier |

## Scripts

```bash
npm run dev           # servidor de desenvolvimento
npm run build         # typecheck + build de produção
npm run preview       # serve o build local
npm run typecheck     # tsc sem emitir
npm run lint          # oxlint
npm run lint:fix      # oxlint --fix
npm run format        # prettier --write
npm run format:check  # prettier --check
```

## Estrutura

```
src/
├─ components/
│  ├─ layout/     Header, Footer
│  ├─ sections/   Hero, About, Skills, Projects, Contact
│  └─ ui/         primitivos reutilizáveis (Fader, RackRow, Waveform, …)
├─ data/          conteúdo da página (site, skills, projects, social)
├─ hooks/         useActiveSection
├─ types/         contratos de conteúdo
└─ index.css      tokens do tema + utilitários de glow
```

Todo o conteúdo vive em `src/data/` — nenhum texto fica hardcoded no JSX.

## Cores: `accent` vs `accent-text`

O roxo neon do design (`#9D00FF`) atinge **3.59:1** sobre o fundo carvão — passa
como componente de UI (mín. 3:1), mas **reprova como texto** (mín. 4.5:1). Por isso
o acento é dois tokens:

| Token | Valor | Usar em |
|---|---|---|
| `--color-accent` | `#9D00FF` | preenchimento, glow, borda, LED, fundo de botão |
| `--color-accent-text` | `#BB4DFF` | qualquer **texto** em acento (4.66:1 no pior fundo) |

Outras regras do mesmo tipo:

- `--color-line` (`#262626`) é para divisor decorativo. Onde a borda é a **única**
  afordância do controle — os campos do formulário — use `--color-line-strong`.
- Texto sobre o botão de acento é **branco** (5.42:1). O `#0D0D0D` do protótipo
  dava 3.59:1.
- Nada de texto abaixo de 10px.

Auditado com contraste computado sobre o fundo efetivo de cada elemento, em
página renderizada — não só sobre os tokens. Zero falhas AA.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha. `.env*` está no `.gitignore`;
apenas `.env.example` é versionado.

## Regras do projeto

- [`DIRETRIZES_CLAUDE.MD`](./DIRETRIZES_CLAUDE.MD) — Regra de Ouro: nenhum dado de
  projeto, experiência ou habilidade pode ser inventado. O que falta aparece como
  placeholder visível (`[INSERIR …]`).
- [`docs/design-reference/`](./docs/design-reference/) — protótipo e handoff do
  design aprovado (referência visual, não código de produção).

## Git Flow

- `main` — espelho de produção, intocável.
- `develop` — integração; todo trabalho sai daqui em branches `feature/*`.
- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/).
