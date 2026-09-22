# Pendências — portfólio Lucas Ikeda

Última atualização: **22/09/2026** (fim do dia). Este arquivo existe para
retomar o trabalho de outra máquina.

Antes de mexer em qualquer coisa, leia nesta ordem:
[`DIRETRIZES_CLAUDE.MD`](../DIRETRIZES_CLAUDE.MD) (a Regra de Ouro),
[`CLAUDE.md`](../CLAUDE.md), este arquivo, e o [`README.md`](../README.md).

---

## Como retomar em outra máquina

```bash
git clone https://github.com/ikeda7/portfolio
cd portfolio
git checkout develop
npm install
npm run dev            # http://localhost:5173
```

> **`develop` é o estado completo do site.** A pilha de PRs que existia em
> 21–22/09 (#1 a #7) foi toda mergeada.
>
> **`main` continua com só o commit de setup, de propósito** — é espelho de
> produção e só recebe `develop` quando o site for publicar. Quem abrir `main`
> vai achar que perdeu o trabalho.

Trabalho novo sai de `develop` em `feature/*` (ou `fix/`, `chore/`, `docs/`) e
volta por PR com merge `--no-ff`. O CI roda os quatro portões em todo PR.

---

## Estado atual

Verificado por CDP (Chrome headless), não no olho:

- Zero overflow horizontal de **320 a 1920px**
- Nenhum espaço morto acima do limiar a 1440×900 nem a 1920×1080
- Zero falha de contraste WCAG AA e **zero texto abaixo de 10px**
- Header em 97px no mobile e 62px a partir de `sm`, com os 5 links da nav em
  uma linha só
- `typecheck`, `lint`, `format:check` e `build` passam
- Bundle: ~113 kB gzip
- **Zero PR aberto e zero branch órfã** — só `main` e `develop`, local e remoto.
  O repositório está configurado para apagar a branch sozinho no merge, então
  não volta a acumular.

São 5 seções numeradas — Sobre 01, Experiência 02, Stack 03, Projetos 04,
Contato 05 — e o CI roda os quatro portões em todo PR.

### Rode a auditoria antes de mexer

```bash
npm run build
npm run preview -- --port 4173 --strictPort   # noutro terminal
npm run auditar
```

[`scripts/auditoria/auditar.mjs`](../scripts/auditoria/auditar.mjs) dirige um
Chrome ou Edge headless e mede o que os quatro portões **não** veem: contraste,
texto cortado, overflow horizontal, alvo de toque, espaço morto e erro de
console. Não instala nada — o Node 24 tem `WebSocket` global. Se não achar o
navegador, `BROWSER_PATH=/caminho npm run auditar`.

Hoje ela fecha **limpa**. Cada checagem ali dentro já pegou bug real neste
repositório; nenhuma é teórica.

### O que entrou em 22/09

- **Experiência** como seção própria — a carreira saiu do parágrafo do Sobre
- **Foco técnico**: clicar num termo da Stack ou da fita acende ele na página
  inteira; os projetos que usam ganham destaque, os outros recuam, e a seção
  Projetos diz quantos casaram
- Navegação da página inteira: régua lateral e botão de próxima seção
- **Espaço morto eliminado** — o Contato ocupava 53% da altura a 1920×1080
- Rodapé em grade, CI, indicação de rolagem, e o timecode do hero (a única
  coisa na tela sem fonte) trocado por dado real

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

### 4. Link do `flowers2` — decisão sua

Ele **já está no Setlist**, na faixa 06, no lugar do `merge-pdf`. Entrou com o
espectro real do repositório (99,3% TypeScript) e **sem link**.

Sem link porque o deploy público (`flowers2.dev`) redireciona para
`/rebeca` — o título da página é "Flores para Rebeca ♥". É um presente pessoal,
e mandar um recrutador para lá é decisão sua, não minha. O card entra pelo que
o projeto demonstra (3D em código) sem expor o destino.

Para publicar: preencher `href` em
[`src/data/projects.ts`](../src/data/projects.ts). Ou tornar o repositório
público e apontar para ele.

### 4b. Dois canais a mais no Contato — precisa de você

O painel **Canais** tem 4 (GitHub, LinkedIn, Instagram, e-mail) numa grade 2×2.
Para fechar 6, só existem dois candidatos com lastro no currículo:

- **Currículo em PDF** — depende do item 3 acima. É o que mais falta num
  portfólio de quem busca posição.
- **WhatsApp** — o telefone está no currículo. Ficou fora de propósito:
  publicar número em site aberto é convite para spam, e um `wa.me` expõe o
  número do mesmo jeito. Se aceitar o risco, entra.

Qualquer outro canal (X, Lattes, telefone puro) não tem fonte — a Regra de Ouro
proíbe inventar. Se quiser outro, me mande o link.

### 5. Versão em inglês — decisão de escopo

Combinada, nunca começou. Decidir antes: só o texto traduzido, ou i18n de
verdade com seletor e rota `/en`? O segundo caso muda a arquitetura — hoje é
single page sem roteador.

### 6. Polimento aberto (não bloqueado)

- **As 6 capas de espectro ficaram monótonas.** Quatro são dominadas por
  TypeScript e o `flowers2` é 99,3% dele — vira um retângulo quase sólido, que
  lê como barra de progresso. Foi decisão explícita (consistência acima de
  variedade) e **reafirmada em 22/09**: cheguei a montar o `flowers2` com print
  do render 3D e você pediu para voltar ao padrão. Fica registrado que a saída
  existe: os prints do Inhouse LoL e do X9 seguem em `src/assets/`, e as
  variantes `shot` e `terminal` continuam no tipo com componente pronto —
  **voltar um card é trocar a linha `cover`**.
- **Dois botões com a mesma palavra e sentidos diferentes.** Os canais da
  waveform no hero (`PYTHON`, `TYPESCRIPT`, `IA APLICADA`) usam `aria-pressed`
  e redesenham as barras; os termos da Stack usam `aria-pressed` e acendem a
  tecnologia na página. Clicar em "TYPESCRIPT" faz coisas diferentes nos dois
  lugares. Nunca incomodou na prática — são contextos visuais distintos — mas
  se for unificar, o caminho é a waveform também setar o foco técnico.
- **A régua lateral e o botão de próxima seção convivem.** Duas navegações
  extras além do header. Medi e não atrapalham, mas se achar poluído, a régua
  (`SectionNav`) é a que sai mais fácil: é um componente em `App.tsx`.
- **Sem runner de teste.** Ausência deliberada desta fase; não instale sem
  alinhar. O CI roda os quatro portões, mas ninguém verifica comportamento
  automaticamente — `npm run auditar` é manual. Ligá-la no CI exigiria um
  navegador no runner (`browser-actions/setup-chrome`) e subir o preview antes;
  é meia hora de trabalho se um dia incomodar.
- **`main` nunca recebeu `develop`.** Quando o site for publicar, é o passo que
  falta — e aí `VITE_SITE_URL` precisa estar definida, senão o `og:image` sai
  do HTML.

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
