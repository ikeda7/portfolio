# Pendências — portfólio Lucas Ikeda

Última atualização: **21/09/2026**, na branch `develop` (`5b031ec`).

Este arquivo existe para retomar o trabalho de outra máquina. Se você está
abrindo uma sessão nova do Claude Code, mande ele ler
[`DIRETRIZES_CLAUDE.MD`](../DIRETRIZES_CLAUDE.MD), o [`README.md`](../README.md)
e este arquivo antes de mexer em qualquer coisa.

---

## Como retomar

```bash
git clone https://github.com/ikeda7/portfolio
cd portfolio
git checkout develop
npm install
npm run dev            # http://localhost:5173
```

`main` é espelho de produção e está **desatualizada de propósito** — ela ainda
tem só o commit de setup. Todo o trabalho está em `develop`. Quando o site
estiver pronto para publicar, aí sim `develop` → `main`.

Trabalho novo sai de `develop` em branch `feature/*`, e volta com
`git merge --no-ff`.

---

## Estado atual

Pronto e verificado no navegador (contraste, responsividade e animações
medidos com Edge headless via CDP, não no olho):

- Estrutura, tema Dark Studio, 5 seções, header sticky com playhead de scroll
- Conteúdo real do currículo e do GitHub — zero placeholder na tela
- Animações de scroll, brilho que segue o cursor, fita de tecnologias
- Acento **azul** (`#0059FF`), amostrado da camiseta da foto da seção Sobre
- Formulário de contato funcional, faltando só as credenciais
- Ícone próprio (SVG + PNGs 180/192/512) e `site.webmanifest`
- 0 falhas de contraste WCAG AA, 0 overflow horizontal de 320px a 1440px
- Bundle: 109 kB gzip

---

## Pendências

### 1. Ligar o envio do formulário

O código está pronto em [`src/lib/contact.ts`](../src/lib/contact.ts). Falta:

1. Criar a conta e o template no EmailJS. O template precisa aceitar
   `{{nome}}`, `{{email}}` e `{{mensagem}}`.
2. Copiar `.env.example` para `.env.local` e preencher as três variáveis
   `VITE_EMAILJS_*`.
3. **Ligar a allowlist de domínios** no painel do EmailJS (Account → Security).
   A chave pública vai no JavaScript que o visitante baixa — não dá para
   escondê-la, e a allowlist é o que impede terceiros de gastarem a cota.

Enquanto as variáveis não existirem, o formulário valida normalmente e avisa
na tela que o envio está desligado.

### 2. Print do Sports Control

O card está com capa tipográfica (`sleeve`) porque o app abre em estado vazio
("Nenhum jogador cadastrado"), que é capa fraca.

O app é **Flutter web, renderiza em canvas** — não tem botão no DOM, então
automatizar o clique em "Popular dados de teste" exige clique por coordenada e
verificação visual. Tentei e não consegui confirmar o resultado.

**Caminho mais curto:** abrir <https://sportscontrol.vercel.app>, popular os
dados, tirar print em proporção 16:10 e salvar em `src/assets/`. Depois trocar
em [`src/data/projects.ts`](../src/data/projects.ts):

```ts
cover: { kind: 'sleeve' }
// vira
cover: { kind: 'shot', src: capaSportsControl }
```

### 3. Flowers2

O currículo cita "Flowers2 — arte generativa em voxel 3D (Three.js)", mas ele
**não existe no perfil público** do GitHub: não está nos 35 repositórios, nem
nos fixados, nem no README do perfil. Provavelmente é privado ou está em outra
conta.

Para entrar no Setlist, é preciso o link do repo ou do site no ar. A ideia era
trocá-lo pelo `merge-pdf` (Consolidação de PDFs), que hoje ocupa a faixa 06.

### 4. Versão em inglês

Ficou combinado mas o conteúdo nunca chegou. Decidir o escopo antes de
começar: só o texto traduzido, ou i18n de verdade com seletor de idioma e rota
`/en`? O segundo caso muda a arquitetura (hoje é single page sem roteador).

### 5. Conteúdo que ainda não tem fonte

- **Foto** — a atual é um recorte 720×720 da selfie de camiseta azul. Se
  aparecer uma foto melhor, o recorte é refeito.
- **LexTrack** — é trabalho de cliente em produção, sem repositório público. O
  card diz isso em vez de fingir um link. Se um dia houver case ou print
  liberado pelo cliente, entra.

---

## Decisões que você pode querer rever

Foram escolhas minhas com motivo; nenhuma é irreversível.

**Faders sem nota numérica.** Os números (82, 64, 91…) saíram da tela. Nota de
auto-avaliação não é verificável e convida a pergunta que ninguém responde
("por que 82 e não 90?"). Sem número, o `role="meter"` também saiu: a barra
virou decoração `aria-hidden` e quem usa leitor de tela recebe o rótulo. A
altura de cada fader é composição visual, e isso está documentado em
[`src/types/content.ts`](../src/types/content.ts). Para voltar atrás, é um
commit.

**Sem carrossel nos projetos.** Um carrossel esconderia 4 dos 6 projetos atrás
de um clique, e quem abre um portfólio escaneia tudo em segundos. No lugar
dele entrou a fita de tecnologias em loop, que dá o movimento horizontal sem
esconder nada. Se quiser algo mais ambicioso, a versão defensável é scroll
horizontal com pin via GSAP ScrollTrigger — mas ela sequestra o scroll e exige
fallback no mobile.

**Telefone fora do site.** O número está no currículo, mas publicar telefone em
site aberto é convite para spam. Os canais são GitHub, LinkedIn, Instagram e
e-mail.

**"35 repositórios públicos", não "+40".** É o número real do perfil (30 na
primeira página + 5 na segunda). Ele mede volume, não curadoria — boa parte é
trabalho de disciplina. A curadoria é o Setlist.

**Pill do hero mostra "Bauru – SP · Brasil".** O protótipo dizia "Disponível
para projetos", mas o currículo mostra vínculo ativo desde Ago/2026, e eu não
tinha como confirmar essa disponibilidade. Se for verdade, é só trocar em
[`src/data/site.ts`](../src/data/site.ts).

---

## Coisas do ambiente que vale saber

**O conector do GitHub não está autorizado.** Por isso só enxerguei os
repositórios públicos. Para dar acesso aos privados, autorizar nas
configurações de conectores da claude.ai, ou via `/mcp` numa sessão
interativa. Sessão não-interativa não consegue rodar o fluxo de autorização.

**Imagens anexadas têm limite de 2000px** no lado maior. Print maior que isso
é rejeitado antes de chegar no modelo, com a mensagem _"At least one of the
image dimensions exceed max allowed size for many-image requests"_.
Redimensionar antes de mandar.

**Favicon animado não dá.** Navegador renderiza favicon SVG como imagem
estática — animação SMIL ou CSS dentro dele não roda na aba. O único caminho é
JavaScript trocando frames de canvas num intervalo, o que trava em aba de
segundo plano (justo onde o favicon é visto) e queima um timer para sempre.
Não recomendo.

**Não mexer nos tokens fora do `@theme`.** Toda a paleta vive em
[`src/index.css`](../src/index.css). A troca de roxo para azul tocou 5 linhas
de CSS, o favicon e o README — é o retorno de manter isso centralizado. A
distinção entre `--color-accent` (preenchimento, glow, borda) e
`--color-accent-text` (texto) existe porque o azul cheio reprova como texto:
está explicada no README.

**Tempo de animação também é centralizado**, em
[`src/lib/motion.ts`](../src/lib/motion.ts). Mudar um número lá muda a página
inteira de forma consistente. As transições de hover ficam de fora de
propósito: são `duration-300` do Tailwind, fixadas pelo design aprovado, e
hover precisa responder na hora.

---

## Comandos

```bash
npm run dev           # servidor de desenvolvimento
npm run build         # typecheck + build de produção
npm run preview       # serve o build local
npm run typecheck     # tsc sem emitir
npm run lint          # oxlint
npm run format        # prettier --write
```
