# Pendências — portfólio Lucas Ikeda

Última atualização: **22/09/2026**. Este arquivo existe para retomar o trabalho
de outra máquina.

Antes de mexer em qualquer coisa, leia nesta ordem:
[`DIRETRIZES_CLAUDE.MD`](../DIRETRIZES_CLAUDE.MD) (a Regra de Ouro),
[`CLAUDE.md`](../CLAUDE.md), este arquivo, e o [`README.md`](../README.md).

---

## Como retomar em outra máquina

```bash
git clone https://github.com/ikeda7/portfolio
cd portfolio

# O trabalho mais recente esta no TOPO DA PILHA de PRs, nao em develop.
git checkout feature/social-preview
npm install
npm run dev            # http://localhost:5173
```

> **`main` está desatualizada de propósito** — ainda tem só o commit de setup.
> **`develop` também está atrás**: os quatro PRs abaixo ainda não foram
> mergeados. Quem fizer `git checkout develop` vai ver o site de 21/09, sem
> nada do que foi feito depois.

### Ordem de merge dos PRs abertos

São **empilhados**: cada um tem o anterior como base. Merge fora de ordem gera
conflito à toa.

| Ordem | PR                                               | Branch                   | Base      | O que entrega                                                  |
| ----- | ------------------------------------------------ | ------------------------ | --------- | -------------------------------------------------------------- |
| 1º    | [#1](https://github.com/ikeda7/portfolio/pull/1) | `docs/claude-md`         | `develop` | `CLAUDE.md` + correção de deriva no README                     |
| 2º    | [#2](https://github.com/ikeda7/portfolio/pull/2) | `feature/revisao-secoes` | `develop` | Seções de tela cheia, container mais largo, 3º painel na Stack |
| 3º    | [#3](https://github.com/ikeda7/portfolio/pull/3) | `feature/capas-projetos` | `#2`      | Capas de espectro nos 6 cards, Projetos em uma tela            |
| 4º    | [#4](https://github.com/ikeda7/portfolio/pull/4) | `feature/social-preview` | `#3`      | `og:image` e metatags absolutas                                |
| 5º    | —                                                | `feature/experiencia`    | `#4`      | Seção Experiência, nav rolável no mobile, correção do 9px      |

Depois que o #2 mergear, o #3 vira automaticamente um PR contra `develop`
(mesmo para o #4 depois do #3, e o #5 depois do #4).

`docs/handoff-continuacao` é uma branch de integração que junta tudo isso —
serve para ver o site completo sem esperar a pilha mergear, e é a base do
`feature/experiencia`.

**Branches antigas foram apagadas** (8 delas, todas já contidas em `develop`).

---

## Estado atual

Verificado por CDP (Chrome headless), não no olho:

- Zero overflow horizontal de **320 a 1920px**
- No desktop, Hero / Sobre / Experiência / Stack / Contato fecham **exatos na
  altura da viewport**; Projetos fecha em 891px a 1440×900 (cabe sem rolar)
- Zero falha de contraste WCAG AA e **zero texto abaixo de 10px**
- Header em 97px no mobile e 62px a partir de `sm`, com os 5 links da nav em
  uma linha só
- `typecheck`, `lint`, `format:check` e `build` passam
- Bundle: ~112 kB gzip

A seção **Experiência** entrou em 22/09 e preencheu o que era o item 1 desta
lista: a carreira deixou de viver num parágrafo do Sobre. São 5 seções
numeradas agora — Sobre 01, Experiência 02, Stack 03, Projetos 04, Contato 05.

---

## Pendências, em ordem de impacto

### 1. Credenciais do EmailJS — BLOQUEADA, precisa de você

O código está pronto em [`src/lib/contact.ts`](../src/lib/contact.ts). Falta:

1. Criar conta e template no EmailJS, aceitando `{{nome}}`, `{{email}}` e
   `{{mensagem}}`.
2. Copiar `.env.example` para `.env.local` e preencher as três `VITE_EMAILJS_*`.
3. **Ligar a allowlist de domínios** (Account → Security). A chave pública vai
   no JavaScript que o visitante baixa; a allowlist é o que impede terceiros de
   gastarem sua cota.

Sem as variáveis o formulário valida normalmente e, ao enviar, aponta os canais
ao lado. O motivo técnico vai para o console, não para a tela do visitante.

### 2. `VITE_SITE_URL` no deploy — BLOQUEADA, precisa do domínio

Sem ela o build **remove** as tags de `og:image` e avisa. O card de
compartilhamento não aparece no LinkedIn/WhatsApp até isso ser definido com o
domínio real.

### 3. Download do currículo — BLOQUEADA, precisa do PDF

Não existe link para currículo em lugar nenhum do site. Coloque o PDF em
`public/` e me avise para eu ligar o botão no Hero e na seção Contato.

### 4. `flowers2` no Setlist — decisão sua

O repositório **existe** (privado, TypeScript): "buquê de flores em 3D voxel
montado por código — o arranjo é resolvido por simulação de encaixe, não
posicionado a mão". A versão anterior deste documento dizia que ele não
existia; o acesso via `gh` mostrou que sim.

Para entrar no Setlist precisa de link público: tornar o repo público, publicar
um deploy, ou deixar de fora. Hoje ele não aparece.

### 5. Versão em inglês — decisão de escopo

Combinada, nunca começou. Decidir antes: só o texto traduzido, ou i18n de
verdade com seletor e rota `/en`? O segundo caso muda a arquitetura — hoje é
single page sem roteador.

### 6. Polimento aberto (não bloqueado)

- **As 6 capas de espectro ficaram monótonas.** Quatro são dominadas por
  TypeScript, e o `merge-pdf` virou um retângulo azul sólido de 100%, que lê
  como barra de progresso. Foi decisão consciente (consistência acima de
  variedade), mas vale rever com o olho. Os prints do Inhouse LoL e do X9
  continuam em `src/assets/` e as variantes `shot` e `terminal` seguem no tipo
  com componente pronto: **voltar um card é trocar a linha `cover`**.
- **Timecode do hero é inventado.** `00:00:00 / 00:03:24` em
  [`src/data/site.ts`](../src/data/site.ts) é a única coisa na tela sem fonte,
  num site cuja regra é não inventar nada.
- **Hero sem indicação de rolagem**, apesar de todas as seções serem de tela
  cheia.
- **Footer com duas linhas** e nada mais — cabe navegação e canais.
- **Sem CI.** Nenhum workflow roda os quatro portões num PR. O token do `gh`
  tem escopo `workflow`, então dá para criar.
- **Sem runner de teste.** Ausência deliberada desta fase; não instale sem
  alinhar.

---

## Coisas do ambiente que vale saber

**O `gh` local tem escopo `repo` + `workflow`.** Dá para ler os repositórios
privados — foi assim que `flowers2` e `lextrack` foram confirmados, e como os
percentuais de linguagem das capas foram medidos. Prefira conferir a supor.

**Verificação visual por CDP, sem dependência nova.** O Node 24 tem `WebSocket`
global, então dá para dirigir o Chrome headless direto:

```bash
node node_modules/vite/bin/vite.js preview --port 4173 --strictPort
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu \
  --hide-scrollbars --remote-debugging-port=9222 about:blank
```

Foi assim que altura de seção e overflow foram medidos em 6 larguras. Não usei
Playwright de propósito: não está instalado e não vale a dependência.

**Não existe Python nesta máquina.** Scripts utilitários em Node.

**Cuidado com backtick em string passada para o bash.** Perdi um comentário
inteiro porque o shell interpretou `` `shot` `` como substituição de comando.
Para editar arquivo, use a ferramenta de edição ou script em arquivo, não
`node -e` com backtick dentro.

**`npm run og` precisa do Chrome.** Procura nos caminhos padrão de Windows e
macOS/Linux; `CHROME_PATH="/caminho/chrome" npm run og` se estiver em outro
lugar. Ele baixa as fontes do Google Fonts na hora do render, então precisa de
rede.

**O hook `auto-tmux-dev` reescreve `npm run dev`** numa janela cmd separada no
Windows, e aí o log some. Por isso os comandos acima chamam
`node node_modules/vite/bin/vite.js` direto.

---

## Decisões já tomadas (com motivo)

Nenhuma é irreversível; estão aqui para não serem refeitas por engano.

**Faders e rack sem nota numérica.** Auto-avaliação não é verificável e convida
a pergunta que ninguém responde ("por que 82 e não 90?"). A altura é composição
visual; a barra é `aria-hidden` e o rótulo é o que se lê.

**Dois tokens de acento.** O azul `#0059FF` passa como componente de UI mas
reprova como texto. `--color-accent` para preenchimento/glow/borda,
`--color-accent-text` para texto. Usar o errado regride a auditoria AA em
silêncio.

**Projetos não é de tela cheia.** Com 6 cards, a altura mínima de tela empurrava
a segunda fileira para fora da viewport — o oposto do pretendido.

**LexTrack não mostra espectro do repo privado.** O card declara "sem
repositório público"; publicar o gráfico dos bytes do repositório do cliente
contradiz isso. Hoje ele usa espectro como os outros porque foi escolha
explícita de consistência — se incomodar, é reverter uma linha.

**Telefone fora do site.** Está no currículo, mas publicar telefone em site
aberto é convite para spam. Canais: GitHub, LinkedIn, Instagram e e-mail.

**Sem carrossel nos projetos.** Esconderia 4 dos 6 atrás de um clique, e quem
abre portfólio escaneia tudo em segundos.

---

## Comandos

```bash
npm run dev           # servidor de desenvolvimento
npm run build         # typecheck + build de produção
npm run preview       # serve o build local
npm run typecheck
npm run lint          # oxlint, nao ESLint
npm run format
npm run og            # regenera public/og.png
```

Portão antes de commitar, os quatro:

```bash
npm run typecheck && npm run lint && npm run format:check && npm run build
```
