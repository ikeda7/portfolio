# Pendências — portfólio Lucas Ikeda

Última atualização: **22/09/2026**, fim da noite. Este arquivo existe para
retomar o trabalho de outra máquina.

Antes de mexer em qualquer coisa, leia nesta ordem:
[`DIRETRIZES_CLAUDE.MD`](../DIRETRIZES_CLAUDE.MD) (a Regra de Ouro),
[`CLAUDE.md`](../CLAUDE.md), este arquivo, e o [`README.md`](../README.md).

---

## Como retomar em outra máquina

```bash
# Se ja tiver clonado, o --prune e ESSENCIAL: sem ele o clone antigo nao
# conhece as branches novas e ainda lista as que ja foram apagadas.
git fetch --all --prune
git checkout develop
git pull --ff-only
npm install
npm run dev            # http://localhost:5173
```

> **`develop` é o estado completo do site.** Todos os PRs (#1 a #19) foram
> mergeados. Nenhum PR aberto.
>
> **`main` continua com só o commit de setup, de propósito** — é espelho de
> produção e só recebe `develop` quando o site for publicar. Quem abrir `main`
> vai achar que perdeu o trabalho.

Trabalho novo sai de `develop` em `feature/*` (ou `fix/`, `chore/`, `docs/`) e
volta por PR com merge `--no-ff`. O CI roda os quatro portões em todo PR.

---

## Estado atual

`develop` tem tudo. O CI roda os quatro portoes **mais a auditoria visual** em
todo PR. Zero PR aberto, zero branch orfa — so `main` e `develop`.

- Zero overflow de 320 a 1920px, zero espaco morto, zero erro de console
- Zero texto abaixo de **11px** (era 10px) e zero falha de contraste
- Bundle ~113 kB gzip

### O que entrou em 22/09 (noite)

- **Retrato novo** no Sobre, com vinheta em CSS: o fundo de estudio quase
  branco virava o objeto mais claro da pagina e apagava o glow de acento
- **Link do Flowers2** publicado (voce foi avisado que o destino e a pagina
  "Flores para Rebeca ♥" e decidiu publicar)
- **Auditoria visual no CI** — era manual, dependia de alguem lembrar
- **Quatro desalinhamentos corrigidos**: buraco de ~330px no Contato, barra do
  espectro fora da linha de base nos 6 cards, botao flutuante cobrindo texto de
  card, e rotulos dos faders desencontrados
- **Legibilidade**: `ink-faint` 5,04 -> 6,18, `accent-text` 5,97 -> 7,56, e as
  21 ocorrencias de `text-[10px]` viraram `text-[11px]`

---

## Pendencias, em ordem

### 1. DEPLOY NA VERCEL — o proximo passo, e quase todo automatizavel

**Nao foi feito.** Combinado com o dono em 22/09: publicar primeiro na Vercel,
dominio .br depois.

O acesso a Vercel funciona por MCP nesta sessao. Dados ja descobertos, para nao
redescobrir amanha:

|                   |                                                                       |
| ----------------- | --------------------------------------------------------------------- |
| Conta (accountId) | `team_dFIqik9gl4cwNS9RjHk1zdcU`                                       |
| `list_teams`      | devolve vazio — e conta pessoal, use o accountId acima como `teamId`  |
| Projetos ja la    | inhouse-lol, sportscontrol, lextrack, flowers2, x9-game, ikeda7-stats |

Ordem correta, e a ordem importa:

1. **Mergear `develop` em `main` primeiro.** A Vercel publica a branch padrao
   do repositorio, que e `main` — e `main` ainda tem so o commit de setup.
   Criar o projeto antes disso publicaria um site vazio.
2. Criar o projeto (`create_git_project`, repo `ikeda7/portfolio`, com o
   `teamId` acima).
3. Pegar a URL `*.vercel.app` que a Vercel devolver.
4. Definir `VITE_SITE_URL` com essa URL e **redeployar** — sem ela o build
   remove as tags de `og:image` e o link no LinkedIn fica sem card.
5. Quando o dominio .br existir, trocar `VITE_SITE_URL` e redeployar de novo.

### 2. Curriculo em PDF — BLOQUEADA, precisa do arquivo

Nao existe link para curriculo no site. Basta colocar o PDF em `public/` e
avisar o nome. Destrava **duas** coisas: o botao de download e o 5o canal do
painel Contato.

### 3. EmailJS — BLOQUEADA, precisa das 3 credenciais

O codigo esta pronto em `src/lib/contact.ts`. Em emailjs.com: criar conta,
_Email Services_ -> Gmail (da o **Service ID**), _Email Templates_ com
`{{nome}}`, `{{email}}` e `{{mensagem}}` (da o **Template ID**), e a
**Public Key** em _Account_. Depois, ligar a **allowlist de dominios** em
_Account -> Security_, senao qualquer um gasta a cota.

As tres vao como variaveis de ambiente na Vercel, nao no codigo.

### 4. WhatsApp no Contato — decisao do dono

O telefone esta no curriculo. Ficou de fora porque `wa.me` expoe o numero para
qualquer visitante, robo de spam incluso. Se ele aceitar o risco, entra como
canal.

### 5. Dominio .br — nao trava nada

Ele vai registrar. Quando existir, e so trocar `VITE_SITE_URL` e apontar o
dominio na Vercel.

### 6. Versao em ingles — CANCELADA

Decisao de 22/09: nao precisa por enquanto, porque o dominio sera .br.

### 7. Polimento aberto (nao bloqueado)

- **A auditoria so responde passa/nao passa no WCAG AA**, que e o piso legal.
  Foi assim que 96 elementos em 10px a 5,04:1 passaram despercebidos ate o dono
  reclamar que estava "muito dark". Vale a auditoria passar a reportar a
  **razao** de cada estilo e alertar quando a folga for menor que ~1,5.
- **As 6 capas de espectro sao monotonas** — quatro dominadas por TypeScript.
  Decisao explicita e ja reafirmada duas vezes. Os prints do Inhouse LoL e do X9
  seguem em `src/assets/`, e as variantes `shot` e `terminal` continuam no tipo:
  voltar um card e trocar a linha `cover`.
- **O botao de proxima secao continua sobre o conteudo** em Projetos, a unica
  secao mais alta que a viewport. Virou pilula com fundo, entao le como
  controle flutuante — mas a sobreposicao existe. A saida honesta seria
  esconde-lo quando a secao nao cabe na tela.
- **Dois botoes com a mesma palavra**: "TYPESCRIPT" na waveform do hero
  redesenha as barras; na Stack acende a tecnologia na pagina. Avaliei unificar
  e **nao recomendo**: Projetos fica ~4 telas abaixo, entao o efeito
  aconteceria fora da tela.
- **Sem runner de teste.** Ausencia deliberada desta fase.

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

**Nunca deixe a arvore de trabalho numa branch WIP.** Em 22/09 o dono abriu o
`npm run dev` na pasta enquanto ela estava em `fix/legibilidade` com alteracoes
nao commitadas, viu o trabalho pela metade e concluiu — com razao — que o site
tinha quebrado. Ao terminar qualquer bloco: commitar, voltar para `develop` e
rebuildar.

**PR aberto e trabalho nao entregue.** Regra do dono, dada em 22/09: com o CI
verde e sem conflito, **mergear sem perguntar**. Ele quer fazer so o que so ele
consegue fazer — credencial, dominio, conteudo do curriculo, exposicao de link
pessoal. O resto e para resolver e avisar.

**Medir contraste sem depender da auditoria.** A auditoria responde
passa/nao passa. Para responder "quanto", enumere os nos de texto, calcule a
luminancia relativa contra o fundo efetivo (subindo a arvore e compondo as cores
translucidas) e agrupe por estilo. Duas armadilhas ja pagas: o Chrome devolve
tanto `rgba(13, 13, 13, .8)` quanto `rgb(13 13 13 / .8)`, entao normalize
virgula e barra antes de partir a string; e o CDP serializa `NaN` como `null`,
entao um parser que falha nao estoura — ele reporta silencio.

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
