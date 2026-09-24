import type { SkillNiche, SkillTerm } from '@/types/content'

/**
 * Stack, separada por nicho.
 *
 * **A separação não foi inventada aqui.** Ela é a seção "Competências técnicas"
 * do currículo (pt-BR, Set/2026), com os mesmos cinco grupos, os mesmos termos
 * e a mesma ordem. A página antes espalhava tudo em três blocos que misturavam
 * linguagem, framework, banco, técnica de IA e ferramenta — e a leitura de fora
 * foi exatamente essa: "fica tudo muito bagunçado o que é linguagem, o que é
 * framework, o que é biblioteca, o que é técnica de IA".
 *
 * A taxonomia já existia no currículo. O trabalho foi usá-la, não criá-la.
 *
 * **Nenhum termo carrega nível.** Ver `SkillTerm` em @/types/content: os faders
 * tinham altura variável vinda de um número escolhido para ficar bonito, e
 * altura variável ao lado de um nome de tecnologia é lida como nota.
 */

/**
 * Nicho 1 — linguagens, com a extensão do arquivo.
 *
 * A extensão é o que faz a separação funcionar sem uma legenda: um `.py` ao lado diz
 * "isto é uma linguagem" antes de qualquer rótulo de painel. Por isso ela é
 * exclusiva deste nicho — em React ou RAG não significaria nada.
 *
 * SQL fica sem dialeto no rótulo e com os três no `context` do currículo
 * (Oracle PL/SQL, PostgreSQL, T-SQL), que aparecem nos nichos de dados.
 */
export const linguagens: SkillNiche = {
  id: 'linguagens',
  title: 'Linguagens',
  terms: [
    { label: 'Python', ext: 'py' },
    { label: 'TypeScript', ext: 'ts' },
    { label: 'JavaScript', ext: 'js' },
    { label: 'PHP', ext: 'php' },
    { label: 'C#', ext: 'cs' },
    { label: 'Java', ext: 'java' },
    { label: 'Dart', ext: 'dart' },
    { label: 'SQL', ext: 'sql' },
    // O README do perfil (github.com/ikeda7) classifica HTML5 e CSS3 como
    // linguagens; o currículo os punha em front-end. Vale o perfil, que é
    // fonte dele e mais recente (24/09).
    { label: 'HTML5', ext: 'html' },
    { label: 'CSS3', ext: 'css' },
  ],
}

/** Nicho 2 — o que desenha tela, no navegador e no celular. */
export const frontend: SkillNiche = {
  id: 'frontend',
  title: 'Front-end & mobile',
  // Angular, Tailwind CSS e jQuery vêm do README do perfil; HTML5 e CSS3
  // foram para Linguagens. Oito, para a pedaleira fechar 4+4.
  terms: [
    { label: 'React' },
    { label: 'Next.js' },
    { label: 'Angular' },
    { label: 'Vite' },
    { label: 'Flutter' },
    { label: 'Tailwind CSS' },
    { label: 'Bootstrap' },
    { label: 'jQuery' },
  ],
}

/**
 * Nicho 3 — o que roda no servidor.
 *
 * Até 24/09 era "Back-end & dados", com os bancos junto. Separados, do mesmo
 * jeito que ferramentas e processos foram separados: o servidor fica na
 * coluna do full stack, ao lado do front-end, e os bancos vão para a coluna
 * de Dados & IA.
 */
export const backend: SkillNiche = {
  id: 'backend',
  title: 'Back-end',
  terms: [
    { label: 'Node.js' },
    { label: 'NestJS' },
    { label: 'Prisma' },
    { label: 'ASP.NET MVC' },
    { label: 'Entity Framework' },
    // Do README do perfil (24/09).
    { label: 'Flask' },
  ],
}

/**
 * Nicho 3b — bancos de dados, separados do back-end em 24/09.
 *
 * Os quatro do README do perfil ("Databases"). SQLite entrou por lá; os
 * outros três já estavam no currículo.
 */
export const bancos: SkillNiche = {
  id: 'bancos',
  title: 'Bancos de dados',
  terms: [
    { label: 'PostgreSQL' },
    { label: 'Oracle Database' },
    { label: 'SQL Server' },
    { label: 'SQLite' },
  ],
}

/**
 * Nicho 4 — IA aplicada.
 *
 * Aqui moram **técnicas**: engenharia de prompt, RAG, embeddings e agentes
 * são como se usa um modelo, e as APIs de LLM são por onde.
 *
 * **PyTorch saiu em 24/09** e foi para a fita, com as outras bibliotecas dos
 * projetos. Era a única biblioteca Python da Stack inteira, e no meio de
 * técnicas lia deslocada (leitura do dono). No lugar entrou Transformers, que
 * é técnica e tem fonte: é a arquitetura do TCC (music-ai-generator).
 */
export const iaAplicada: SkillNiche = {
  id: 'ia-aplicada',
  title: 'IA aplicada',
  terms: [
    { label: 'Engenharia de prompt' },
    { label: 'RAG' },
    { label: 'Embeddings' },
    { label: 'Agentes' },
    { label: 'APIs de LLM' },
    { label: 'Transformers' },
    // Da ementa da pós (ver `education` em experience.ts), para a grade de
    // pads fechar 4x2 — pedido do dono em 24/09.
    { label: 'MCP' },
    { label: 'Fine-tuning' },
  ],
}

/** Nicho 5 — ferramentas do dia a dia, do versionamento ao design. */
export const ferramentas: SkillNiche = {
  id: 'ferramentas',
  title: 'Ferramentas',
  /*
   * Exatamente a seção "DevOps & Tools" do README do perfil. Até 24/09 o
   * nicho era "Ferramentas & processos", com levantamento de requisitos,
   * mapeamento de processos, QA e gestão de chamados — processo da
   * implantação, que não é o foco do portfólio e já está nas entregas da 3S,
   * na Experiência. Jupyter foi para a fita.
   */
  terms: [
    // "Git" e não "Git/GitHub": o badge do perfil é Git, e com GitHub
    // Actions logo abaixo o GitHub aparecia duas vezes.
    { label: 'Git' },
    { label: 'GitHub Actions' },
    { label: 'Docker' },
    { label: 'Vercel' },
    { label: 'Linux' },
    { label: 'Postman' },
    { label: 'DBeaver' },
    { label: 'VS Code' },
    { label: 'Figma' },
  ],
}

/**
 * A fita entre a Stack e os Projetos: bibliotecas e frameworks do **GitHub
 * inteiro** que a Stack não lista.
 *
 * Ela repetia a Stack termo a termo, e com a Stack inteira logo acima isso
 * era redundância (leitura do dono, 24/09). Agora carrega a camada de baixo —
 * o que um currículo de uma página não comporta.
 *
 * **Fonte:** varredura de todos os repositórios públicos de github.com/ikeda7
 * em 24/09 (33 repos): `package.json`, `requirements.txt`, `pubspec.yaml`,
 * `pom.xml`, imports de `.py` e `.ipynb`, e bibliotecas por CDN em HTML.
 * Ficaram de fora tipagens (`@types/*`), linters, plugins de build e o que a
 * Stack já mostra. O comentário de cada linha diz em que repositório está.
 *
 * Refazer a varredura: clonar os repos públicos e rodar o script descrito em
 * docs/PENDENCIAS.md ("Fita: de onde vem cada biblioteca").
 */
export const bibliotecasDoGithub: readonly string[] = [
  // Dados e ML
  'NumPy', // calc-numeric, computacao-grafica, data-science, desafio_indicium_imdb, music-ai-generator...
  'pandas', // data-science, desafio_indicium_imdb, intuitivecare, projeto-analise-algoritmos
  'Matplotlib', // calc-numeric, computacao-grafica, data-science, desafio_indicium_imdb, music-ai-generator
  'PyTorch', // music-ai-generator (TCC)
  'scikit-learn', // data-science, desafio_indicium_imdb
  'SciPy', // calc-numeric, desafio_indicium_imdb, music-ai-generator
  'seaborn', // data-science, desafio_indicium_imdb
  'SymPy', // calc-numeric
  'pretty_midi', // music-ai-generator
  'mido', // music-ai-generator
  'Jupyter', // desafio_indicium_imdb (saiu da Stack em 24/09)
  // Python web e automacao
  'Beautiful Soup', // intuitivecare
  'Requests', // intuitivecare
  'pdfplumber', // intuitivecare
  // Front-end
  'React Router', // banco-dados, inhouse-lol, linguagens-formais-automatos, pokedex-capacitacao-ejcomp
  'Angular Material', // desafiowebfullstack
  'Material UI', // banco-dados
  'Vue.js', // intuitivecare
  'Three.js', // seguranca-informacao, flowers2
  'Leaflet', // banco-dados
  'ApexCharts', // banco-dados
  'styled-components', // banco-dados
  'JointJS', // linguagens-formais-automatos
  'Motion', // este portfolio
  // Back-end
  'Express', // desafiowebfullstack, inhouse-lol
  'Zod', // inhouse-lol
  'JWT', // inhouse-lol (jsonwebtoken)
  'libSQL', // inhouse-lol
  'Spring Boot', // introducao-java
  'Spring Security', // introducao-java
  'Thymeleaf', // introducao-java
  'JPA', // introducao-java (EclipseLink)
  'PDFBox', // engenharia-software
  'pdf-lib', // merge-pdf
  // Mobile
  'Drift', // sports-control
  'Signals', // sports-control
  // Testes e qualidade
  'Vitest', // inhouse-lol, x9-game
  'Jest', // pokedex-capacitacao-ejcomp
  'Testing Library', // banco-dados, inhouse-lol, x9-game
  'Playwright', // inhouse-lol
  'Jasmine', // desafiowebfullstack
  'Biome', // x9-game
  'Husky', // linguagens-formais-automatos, x9-game
]

/**
 * A extensão é **selo ao lado do nome**, e não `python.py` colado.
 *
 * A ideia veio do dono e é boa: extensão de arquivo marca "isto é uma
 * linguagem" sem precisar de legenda. Mas escrita como nome de arquivo ela
 * produz `java.java`, `dart.dart` e `sql.sql` — que leem como erro de
 * digitação, não como padrão. Separada, funciona nos oito: o nome é o nome, e
 * o `.py` ao lado é a etiqueta.
 *
 * Fica no dado, e não no componente, porque a mesa e a fita precisam escrever
 * igual — dois lugares formatando o mesmo termo saem de sincronia na primeira
 * mudança.
 */
export function selo(termo: SkillTerm): string | null {
  return termo.ext ? '.' + termo.ext : null
}
