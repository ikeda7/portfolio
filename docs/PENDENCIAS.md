# Pendências — portfólio Lucas Ikeda

Última atualização: **23/09/2026**, fim do dia. Há uma leva de 16 pontos do
dono ainda **não implementada** — a seção logo antes de "Pendencias, em ordem". Este arquivo existe para
retomar o trabalho de outra máquina — leia a pendência 1 antes de tentar o
deploy.

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

> **`develop` é o estado completo do site.** Todos os PRs (#1 a #22) foram
> mergeados. Nenhum PR aberto, nenhuma branch órfã — só `main` e `develop`.
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
- Estilo de texto mais justo em **1,2x** o minimo do AA (a auditoria agora
  reporta a margem, nao so passa/nao passa)
- Bundle ~114 kB gzip

**Duas ferramentas, nao uma.** `npm run auditar` mede; `npm run capturar`
fotografa. As duas precisam do `npm run preview` no ar. A segunda nasceu em
23/09 porque a primeira deu "tudo limpo" numa tela que tinha uma etiqueta
quebrada e um botao flutuante em cima do "Enviar mensagem" — medir nao e ver.

### O que entrou em 23/09 (noite)

- **CACiC na linha do tempo**: Diretor de Marketing, Abr/2024 — Abr/2025
  (pendencia 7, concluida).
- **Passo a passo do deploy escrito na pendencia 1**, porque o conector da
  Vercel esta sem escopo e a solucao e no navegador, nao aqui.

### O que entrou em 23/09 (tarde) — reestruturacao

- **Stack separada pelos cinco nichos do curriculo** (Linguagens / Front-end
  & mobile / Back-end & dados / IA aplicada / Ferramentas & processos). A
  taxonomia nao foi inventada: e a secao "Competencias tecnicas" do PDF, com
  os mesmos termos e a mesma ordem. Antes a pagina misturava linguagem,
  framework, banco e tecnica de IA nos mesmos tres blocos.
- **Linguagens ganham selo de extensao** (`.py`, `.ts`) — ideia do dono. Fica
  ao lado do nome e nao colado (`java.java` e `sql.sql` liam como erro de
  digitacao). A extensao so existe em Linguagens: e ela que marca a
  categoria sem precisar de legenda.
- **Capas dos seis projetos viraram uma so: o selo de vinil.** Eram quatro
  tratamentos diferentes e o conjunto lia como falta de padrao. Print em
  todos era impossivel — tres projetos nao tem tela nenhuma.
- **Curriculo em PDF REMOVIDO do site e do repositorio.** Ver pendencia 2.
- **EJCOMP entrou na linha do tempo** (Gerente de RH, Nov/2024–Ago/2026).
- **Ementa da pos saiu da Stack e foi para Formacao**, onde e atributo do
  curso. Ela era copia literal do fim do segundo paragrafo do Sobre.
- **Linha orfa eliminada**: os nichos sao listas de uma coluna, que nao tem
  ultima linha incompleta em largura nenhuma; a mesa tem 8 linguagens em 4
  ou 8 colunas, e as duas contas fecham.
- **As duas luzes do hero foram para o `Section`**, entao toda secao tem o
  pulso ambiente e o brilho que segue o cursor. O ambiente alterna de lado
  conforme o numero da faixa.
- **Contraste dos discos**: o fundo, o disco e o selo eram tres tons quase
  iguais. A auditoria nao pegava porque WCAG AA e piso, nao legibilidade.
- **Auditoria ganhou checagem de HOVER** (ver abaixo).

### Redundancia, medida

De 26 termos distintos na pagina, 17 apareciam em mais de um lugar. A
maioria e **reforco, nao redundancia** — "Python" na waveform e filtro, na
Stack e catalogo, nas tags de projeto e uso real. Funcao diferente, lugar
diferente.

A redundancia de verdade era uma so, e foi corrigida: o painel "Pos · IA
aplicada" repetia **os sete termos** do fim do segundo paragrafo do Sobre.
Seis apareciam 2x e "Embeddings" aparecia **3x** (mesa + pos + prosa).

### Hover, medido

De 113 interativos visiveis, **12 nao reagiam ao mouse**. Tres classes:

- o canal **ativo** da waveform (so os inativos tinham hover);
- os quatro campos do formulario (so tinham `:focus`);
- a marca "Lucas /IKEDA", que e link no header e no rodape.

Hoje sao **zero**, e a checagem esta versionada em `npm run auditar` — ela
desliga as transicoes antes de medir, senao o valor lido e o de partida
(a primeira versao da sonda acusou 79 de 82 como mudos, todos falso
positivo).

---

### O que entrou em 23/09 (manha) — resposta ao feedback de fora

Primeira leitura da pagina por alguem que nao participou dela. Vale registrar
o que ela pegou, porque foram coisas que nenhum dos portoes pega e que eu
tinha deixado passar duas vezes:

- **"texto deitado nao da pra ler"** — os rotulos dos faders eram
  `writing-mode: vertical-rl`. Agora sao horizontais, e a mesa reflui em 3
  colunas ate `sm` para caberem.
- **"slider pras hard skills nao e legal"** — os faders tinham altura
  variavel vinda de um `value` inventado. O campo saiu do tipo; todo canal
  sobe ate a mesma marca e o rack virou cabo + LED. Ver a pendencia 7: nivel
  por tecnologia agora depende do dono.
- **"o grafico dos cards e redundante com as tags"** — terceiro sinal na
  mesma direcao, e o mais preciso. As seis capas de espectro viraram seis
  capas diferentes.
- **"a secao de contato tem uma disposicao esquisita"** — o titulo saiu de
  dentro da coluna e virou cabecalho de largura cheia; os dois blocos viraram
  paineis irmaos, CANAIS/OUT e MENSAGEM/IN. O formulario era o unico bloco
  sem moldura da pagina, encostado num painel.
- **"efeito neon saturado"** e **"estilo com cara de gerado por IA"** — os
  alfas dos glows cairam ~40%. Quando tudo brilha, nada destaca.

Entrou junto, ja identificado antes: link dos dois curriculos em PDF, margem
de contraste na auditoria e a colisao do atalho flutuante com o botao de
enviar.

**Ficou como esta, de proposito:** a fita animada da Stack. O comentario foi
que a animacao agrada mas a stack como conteudo "nao agrega" — so que a fita
virou controle depois daquela leitura: cada termo e botao, clicar acende a
tecnologia na pagina inteira e para a fita. Ela deixou de ser enfeite.

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

## Leva de 23/09 (noite) — 16 pontos do dono, NENHUM implementado

Ele pediu explicitamente para **anotar e nao resolver**, porque ia trocar de
maquina. Esta tudo aqui, na ordem em que ele falou, com o que eu ja sei sobre
cada um — arquivo, causa provavel, e onde eu discordo.

> **Comece pelo ponto 11.** Ele nao e preferencia, e **erro factual no ar**.

### 1. Footer precisa de atencao

Sem detalhe do que incomoda. Perguntar antes de mexer.
`src/components/layout/Footer.tsx`.

### 2. O brilho do cursor "divide" entre secoes

**Causa conhecida, e e minha.** Hoje cada `<section>` tem o seu
`usePointerGlow` (mudanca de 23/09). Cada um mede a posicao **relativa a
propria secao** e zera no `onPointerLeave`, entao o brilho morre e renasce na
fronteira — exatamente a "divisao" que ele viu.

Saida: um unico brilho `fixed` na raiz, em `App.tsx`, com coordenada de
viewport, atras do conteudo. Um listener so, e nao seis. `Section.tsx` volta a
nao saber de luz. O pulso ambiente (`animate-driftglow`) pode continuar por
secao — esse e por secao de proposito, e alterna de lado.

### 3. EJCOMP e CACiC merecem bloco proprio

Hoje as duas estao na linha do tempo principal, junto com 3S e o estagio. Ele
quer separar: **experiencia profissional** de um lado, **atuacao academica**
de outro, e formacao e idiomas seguem em paineis. Ver tambem o ponto 15, que e
a mesma discussao por outro angulo — resolver os dois juntos.

`src/data/experience.ts`, `src/components/sections/Experience.tsx`.

### 4. Stack: e se tudo fosse mesa de som?

Varias mesas, uma por agrupamento, em vez de uma mesa + quatro listas. E a
resposta dele para a mesma coisa que eu registrei em "Ideias" — a mesa de
Linguagens virou oito faders identicos e nao carrega informacao nenhuma.

**Cuidado com o que ja doeu:** rotulo horizontal precisa de largura, e 35
termos em faders verticais e muita coluna. Um nicho de 9 termos numa mesa so
pode nao caber em 320px. Testar em 320 antes de comprar a ideia.

### 5. Fita muito rapida

Facil: `duration = 38` em `src/components/ui/Marquee.tsx`. Ele quer tempo de
clicar no termo que passa. Subir para ~60s e medir. Vale lembrar que a fita ja
pausa no hover e quando ha algo em foco.

### 6. Projetos — ele gostou, e quer sugestoes

Ver o ponto 16, que e concreto. Alem dele, ha uma ideia ja registrada mais
abaixo: um projeto em destaque, maior que os outros cinco.

### 7. Contato: painel de Canais grande demais

Ele **nao quer** encolher e perder o alinhamento com o formulario ao lado —
quer icone no lugar do LED redondo. Isso ja esta marcado como TODO no proprio
componente: `lucide-react@1` removeu Github/Linkedin/Instagram, entao a fonte
seria Simple Icons (SVG inline, 16px, `currentColor`).

`src/components/ui/ContactChannels.tsx`.

### 8. Waveform do hero: tres trilhas, tres cores

Trocar os canais atuais (PYTHON / TYPESCRIPT / IA APLICADA) por **
Desenvolvimento Full Stack / Data Science / IA Aplicada**, e cada um muda a
cor do neon: azul (padrao), roxo e vermelho.

**Isto e a mudanca mais arriscada da lista, e a arquitetura ajuda.** O acento
inteiro sai de `--accent-rgb` e `--accent-2-rgb` em `src/index.css`, e todo
glow deriva dessas duas — trocar o acento ja custou 5 linhas uma vez. Entao
trocar a cor por trilha e reescrever essas variaveis no `:root`.

**O que NAO pode regredir:** existem dois tokens de acento, nao um.
`--color-accent` passa como componente de UI e **reprova como texto**; texto
usa `--color-accent-text`. Cada cor nova precisa do seu par, com o contraste
conferido — a auditoria mede e hoje fecha em zero falha, com o estilo mais
justo em 1,2x o minimo. Vermelho escuro sobre carvao e o caso mais provavel de
reprovar.

### 9. A divisao em tres trilhas vale para o portfolio inteiro

E, nas palavras dele, "implantacao nao precisa desse destaque todo". Isso mexe
no subtitulo do hero, no Sobre e possivelmente na ordem da Experiencia.

**Atencao ao conflito:** o cargo atual dele **e** implantacao de ERP, e e a
experiencia mais recente e mais longa. Reduzir o destaque da implantacao e
decisao de posicionamento, nao de design — confirmar com ele o quanto, antes
de mexer. Nao apagar o que o curriculo afirma.

### 10. Tirar a localizacao

Mesma linha do curriculo em PDF (pendencia 2): dado pessoal solto numa pagina
aberta. "Bauru – SP" aparece em tres lugares: `site.hero.statusLabel`,
`site.contact.description` e `site.footer.right`. Todos em `src/data/site.ts`.

**Pensar antes de apagar os tres:** cidade e informacao que recrutador filtra,
e nao e o mesmo risco de um telefone. Talvez manter no Contato e tirar do hero
e do rodape. Perguntar.

### 11. ERRO FACTUAL — o nome da pos esta errado no site

A pagina diz **"Pos em Engenharia de Software em IA Aplicada"**. O certo,
segundo ele, e **"Engenharia de IA Aplicada"**, na UniPDS. Confere com o site
da instituicao (unipds.com.br/org-pos-ia e ia.unipds.com.br), que chama o
curso de Engenharia de IA Aplicada.

O nome errado provavelmente veio do curriculo: a organizacao dos alunos no
GitHub se chama `unipds-engenharia-de-ia-aplicada` e tem um repositorio
`engenharia-de-software-com-ia-aplicada` — nomenclatura antiga convivendo com
a nova.

Onde corrigir:

- `src/data/experience.ts` -> `education[0].title`
- `src/data/site.ts` -> primeiro paragrafo do Sobre ("pos-graduando em
  Engenharia de Software em IA Aplicada")

**Nao troque a ementa junto.** Os topicos (LLMs, RAG, embeddings, vector
databases, multiagente, MCP, fine-tuning, governanca) saem do curriculo dele e
continuam validos. A pagina do curso lista outra grade (AIOps, Kubernetes,
IaC) que pode ser outra turma ou outro recorte — **o curriculo do dono e a
fonte, nao o site da escola**.

Ele disse que isso "afeta bastante o sobre mim" e pediu atencao aos textos.
Reescrever o Sobre e tarefa propria, e depende da conversa do ponto 9.

### 12. Justificar o texto, no portfolio inteiro

`text-align: justify` nos paragrafos.

**Eu desaconselho, e explico por que antes de ele decidir.** Justificado na
web, sem hifenizacao, abre "rios" de espaco entre palavras — e pior em coluna
estreita, que e exatamente o caso do Sobre no celular. Se for para fazer, vai
com `hyphens: auto` e `lang="pt-BR"` no `<html>` (ja esta), e so nos
paragrafos largos — nunca nos cards de projeto, que tem 3 linhas.

Se ele reafirmar depois de ler isso, e decisao dele e se faz.

### 13. Foto do Sobre desalinhada com o texto

Duas saidas que ele mesmo deu: encolher a foto para casar com a altura do
texto, ou **adicionar mais uma linha de cards** para o texto crescer. A
segunda e melhor se houver conteudo real para os cards — hoje `aboutStats` tem
tres (2026 / 35 repositorios / B2). Uma quarta so entra com fonte.

`src/components/sections/About.tsx`, `src/data/site.ts`.

### 14. LED "em andamento" deve piscar e brilhar mais

Facil e bom. Hoje todo marcador acende e a diferenca entre atual e passado e
so o halo (`glow-led` contra `opacity-70`) — pouco. Um pulso no atual resolve.

**Nao esquecer:** animacao em JS nao morre no kill switch CSS. Se for
keyframe CSS, o bloco `prefers-reduced-motion` do `index.css` ja cobre; se for
`motion`, tem que checar `useReducedMotion()`.

`src/components/ui/Timeline.tsx`.

### 15. Separar Experiencia de Formacao em secoes?

Ele deu liberdade para eu decidir. **Minha leitura: nao separar em duas
secoes, e sim reorganizar dentro da que existe** — junto com o ponto 3.

Motivo: cada secao ocupa a tela inteira (`min-h-[100svh]`), entao uma secao so
para Formacao seria dois itens num oceano de vazio, e a auditoria de espaco
morto ia acusar. Alem disso, toda secao nova entra em `navLinks` e engorda o
header, que ja teve problema de altura no celular.

Proposta a validar: manter uma secao, com **tres blocos** — profissional,
academico (EJCOMP + CACiC), e a coluna de Formacao + Idiomas.

### 16. Cards de projeto: palavras-chave e a descricao de 3 linhas

Duas coisas:

- **Destacar palavras-chave** na descricao. Cuidado para nao colidir com as
  tags logo abaixo — foi exatamente essa redundancia que derrubou as capas de
  espectro.
- **O projeto 01 tem 3 linhas de descricao e os outros tem 2**, entao tags e
  "Abrir" descem e quebram o alinhamento da fileira. Duas saidas: encurtar a
  descricao do TCC para duas linhas, ou dar `min-h` a descricao e empurrar o
  rodape do card com `mt-auto`. **A segunda e mais robusta** — resolve para
  qualquer descricao futura em vez de calibrar texto a mao.

`src/components/ui/ProjectCard.tsx`, `src/data/projects.ts`.

---

## Pendencias, em ordem

### 1. DEPLOY NA VERCEL — BLOQUEADO, e a solucao e no navegador

Combinado com o dono em 22/09: publicar primeiro na Vercel, dominio .br
depois.

> **Por que esta bloqueado.** O conector Vercel desta sessao perdeu o escopo.
> `list_projects` com o `teamId` abaixo devolve **403 forbidden** — _"Not
> authorized: trying to access resource under scope ikeda7s-projects. You
> must re-authenticate to this scope"_. Sem escopo da para **ler** os seis
> projetos que ja existem, mas nao para **criar** o do portfolio.

#### Passo 0 — mergear `develop` em `main` ANTES de tudo

A Vercel publica a **branch padrao** do repositorio, que e a `main` — e a
`main` ainda tem so o commit de setup. Criar o projeto antes disso publica um
site vazio e voce vai achar que quebrou alguma coisa.

```bash
git checkout main
git pull --ff-only
git merge --no-ff develop -m "chore: publica o site"
git push
git checkout develop
```

#### Caminho A — direto no site da Vercel (mais rapido, nao depende de mim)

1. Entre em **vercel.com/new** logado como `ikeda7`.
2. Na lista **Import Git Repository**, procure `ikeda7/portfolio`.
3. **Se o repositorio nao aparecer**, e permissao do GitHub App, nao da
   Vercel. Na mesma tela tem o link **"Adjust GitHub App Permissions"**
   (ou va em github.com/settings/installations -> **Vercel** ->
   **Configure**). La escolha **Only select repositories** e marque
   `portfolio`, ou **All repositories**. Salve e volte para a aba da Vercel.
4. A Vercel detecta Vite sozinha. Confira e nao mexa:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Nao clique em Deploy ainda.** Abra **Environment Variables** e crie:
   - Name `VITE_SITE_URL`, Value `https://SEU-PROJETO.vercel.app`
   - Marque **Production**, **Preview** e **Development**

   Voce ainda nao sabe a URL final. Entao: **clique em Deploy sem essa
   variavel**, espere terminar, copie a URL que a Vercel mostrar, e so
   depois crie a variavel e clique em **Redeploy**. Sem ela o build remove
   as tags de `og:image` e o link no LinkedIn sai sem card de compartilhar —
   o proprio build avisa isso no log.

#### Caminho B — por mim, depois de reautorizar o conector

Se preferir que eu faca, reautorize o conector antes:

1. claude.ai -> **Settings** (engrenagem) -> **Connectors**
2. Ache **Vercel** na lista
3. **Disconnect** e depois **Connect** de novo (so "Reconnect" as vezes nao
   renova o escopo)
4. Na tela de autorizacao da Vercel, **selecione o escopo**
   `ikeda7s-projects` — e exatamente esse que esta faltando

Feito isso, me avise: eu crio o projeto, leio a URL, seto `VITE_SITE_URL` e
redeployo, tudo numa tacada.

#### Depois do deploy, nesta ordem

1. Conferir o site no ar e rodar `npm run auditar` contra a URL de producao:
   `AUDIT_URL=https://... npm run auditar`
2. Ligar a **allowlist de dominios do EmailJS** (pendencia 3) apontando para
   o dominio novo — antes disso o formulario segue desligado, e ele avisa
   isso na tela em vez de falhar calado
3. Quando o dominio .br existir: apontar na Vercel, trocar `VITE_SITE_URL` e
   redeployar de novo

Dados da conta, para nao redescobrir:

|                   |                                                                       |
| ----------------- | --------------------------------------------------------------------- |
| Conta (accountId) | `team_dFIqik9gl4cwNS9RjHk1zdcU`                                       |
| `list_teams`      | devolve vazio — e conta pessoal, use o accountId acima como `teamId`  |
| Projetos ja la    | inhouse-lol, sportscontrol, lextrack, flowers2, x9-game, ikeda7-stats |

### 2. Curriculo em PDF — REMOVIDO DO SITE

Os PDFs ja estao versionados em `public/`:

- `curriculo-lucas-ikeda-pt.pdf` (273 kB)
- `curriculo-lucas-ikeda-en.pdf`

Eles entraram por acidente no commit `6a5cbe7`, arrastados por um `git add -A`
enquanto o dono os colocava na pasta. Sao os arquivos certos; so a mensagem
daquele commit nao os menciona.

**REVERTIDO no mesmo dia, e com motivo tecnico.** Os PDFs chegaram a ficar no
painel "Canais", com download em PT-BR e EN. Sairam do site **e do
repositorio** algumas horas depois.

O PDF traz o telefone `(18) 99689-5151`. E o site esconde o telefone **de
proposito** — esta escrito em `src/data/social.ts`: "publicar numero em site
aberto e convite para spam". Publicar o arquivo desfazia em silencio uma
decisao que o proprio repositorio documenta, e bastava um `curl` na URL do
PDF para pegar o numero.

Apagar do `public/` nao bastava se o site ja estivesse no ar: arquivo servido
fica em cache e em indice. Como o deploy ainda nao aconteceu, o numero nunca
chegou a ser publicado.

As experiencias que o curriculo carrega ja estao na secao Experiencia, que e
o argumento do proprio dono: o portfolio basta.

Se um dia fizer sentido voltar, o caminho honesto e um PDF **sem telefone**,
gerado so para o site. Os arquivos originais continuam no historico do git
(commit `6a5cbe7`), entao nada se perdeu.

### 3. EmailJS — BLOQUEADA, e e a ULTIMA da fila

> Decisao do dono em 23/09: **"email depois vemos, vai ser o ultimo dos
> ultimos"**. Nao e esquecimento — e ordem de prioridade. O formulario ja
> falha bem sem credencial: valida os campos e diz "nao foi possivel enviar
> agora — me chame por e-mail ou LinkedIn", com os dois canais logo ao lado.

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

### 7. Centro Academico — CONCLUIDA

**FEITO em 23/09.** Entrou na linha do tempo, abaixo do estagio:

- **Diretor de Marketing** · CACiC — Centro Academico de Ciencia da
  Computacao · FCT-UNESP · Presidente Prudente, SP
- **Abr/2024 — Abr/2025**
- Comunicacao com o corpo discente (pauta, redacao e publicacao das
  postagens) e gestao das redes sociais e do canal no WhatsApp

E a **unica entrada da pagina que nao sai do curriculo nem do GitHub**: o
dono ditou cargo, periodo e atividades, e fonte direta dele e fonte valida.
O texto fica proximo do que ele disse, arrumado no registro das outras
entradas — sem numero, sem alcance, sem resultado que nao foi dito.

### 8. Nivel por tecnologia — DECISAO DO DONO

Os faders da Stack nao tem mais altura variavel. Cada canal tinha um `value` de
0 a 100 que desenhava a altura; o numero nunca apareceu na tela, mas o desenho
sim, e **fader parado em altura diferente e lido como nota**. Nota de
proficiencia e afirmacao sobre o dono, e nao tinha fonte nenhuma: os numeros
foram escolhidos para a mesa ficar bonita.

Hoje todos sobem ate a mesma marca e o rack usa cabo + LED. Para ter nivel de
volta, **a fonte precisa vir do Lucas**, no mesmo formato que Idiomas ja usa:
um rotulo por tecnologia ("intermediario", "avancado"). Com isso em maos, o
caminho e devolver um campo a `SkillChannel` — desta vez categorico e com
fonte — e mostrar o rotulo escrito em vez de uma barra: foi a barra que gerou a
leitura errada em primeiro lugar.

Se ele preferir nao declarar nivel, nao ha nada a fazer: a mesa reta ja e a
resposta honesta.

### 9. Polimento aberto (nao bloqueado)

- ~~A auditoria so responde passa/nao passa no WCAG AA.~~ **FEITO em 23/09.**
  Ela agora agrupa por estilo (cor + fundo + tamanho + peso), ordena pela
  margem e imprime as cinco combinacoes mais justas. Margem curta sai como
  `aviso` e nao como falha — 4,6:1 passa no AA, e reprovar ali daria um portao
  que ninguem consegue fechar. Hoje o estilo mais justo esta em 1,2x o minimo.
- ~~As 6 capas de espectro sao monotonas.~~ **FEITO em 23/09**, depois do
  terceiro sinal independente apontando para a mesma coisa — este de fora e mais
  preciso que os meus: o grafico era _redundante com as tags_. Hoje sao seis
  capas diferentes: print no Inhouse LoL e no X9 (os `.webp` estavam
  versionados e sem uso nenhum), terminal com os comandos reais do README no
  Sports Control, espectro so no TCC (onde o TeX conta o que as tags nao
  contam) e placa cega no LexTrack e no Flowers2.
- ~~O botao de proxima secao sobre o conteudo.~~ **MITIGADO em 23/09.** Ele
  cobria o "Enviar mensagem" e ficava com o clique — o controle mais importante
  da pagina. Duas mudancas: a pastilha deitou (de ~60px de altura para ~32px, o
  que a faz caber no respiro que toda secao ja tem embaixo) e o botao de enviar
  foi para a direita da coluna, longe do centro horizontal da janela. Em
  Projetos ele ainda passa por cima de card, o que e inerente a elemento
  `fixed`; o posicionamento central foi pedido explicito do dono.
- **Dois botoes com a mesma palavra**: "TYPESCRIPT" na waveform do hero
  redesenha as barras; na Stack acende a tecnologia na pagina. Avaliei unificar
  e **nao recomendo**: Projetos fica ~4 telas abaixo, entao o efeito
  aconteceria fora da tela.
- **Sem runner de teste.** Ausencia deliberada desta fase.

---

## Ideias para discutir (nenhuma foi implementada)

O dono pediu que eu separasse ideias em vez de sair fazendo. Estao em ordem
de quanto acho que valem, e cada uma diz o que custa.

### 1. A mesa das Linguagens ainda e o ponto mais fraco

Oito faders identicos, todos na mesma marca. Depois que o nivel saiu (ver
pendencia 8), a mesa virou desenho sem variavel — bonita e sem informacao.
Tres saidas possiveis:

- **Nivel categorico**, se o dono quiser declarar (pendencia 8). E a unica
  que devolve significado a altura.
- **Altura por tempo de uso**: "desde 2021". E fato verificavel se ele
  souber os anos, e ninguem le ano como nota.
- **Trocar a mesa por outra coisa** e aposentar o componente. Perde a
  assinatura do site — nao recomendo sem os outros dois descartados.

### 2. Um projeto em destaque, maior que os outros cinco

Os seis cards tem o mesmo peso, e o TCC nao e um projeto como os outros. Um
card duplo na primeira linha daria hierarquia ao Setlist sem quebrar o
padrao do selo. Custa layout, nao conteudo.

### 3. A fita e o unico lugar onde clicar nao tem retorno visivel

Clicar num termo acende os projetos que o usam — mas a secao Projetos fica
~3 telas abaixo, entao quem clica na Stack nao ve nada acontecer. Um contador
discreto no proprio painel ("3 projetos") fecharia o laco na hora.

### 4. Numero de repositorios esta desatualizado por construcao

`aboutStats` diz "35 repositorios publicos", conferido a mao em 21/09. Isso
envelhece sozinho. Da para gerar no build com uma chamada a API do GitHub e
cravar o numero no bundle — continua sendo numero com fonte, e para de
mentir com o tempo.

### 5. Sem runner de teste

Decisao desta fase, registrada. Vale reavaliar quando o site estiver no ar:
a auditoria visual cobre muito, mas nao cobre logica (validacao do
formulario, normalizacao do foco tecnico).

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
