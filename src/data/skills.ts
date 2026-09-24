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
  unidade: ['linguagem', 'linguagens'],
  terms: [
    { label: 'Python', ext: 'py' },
    { label: 'TypeScript', ext: 'ts' },
    { label: 'JavaScript', ext: 'js' },
    { label: 'PHP', ext: 'php' },
    { label: 'C#', ext: 'cs' },
    { label: 'Java', ext: 'java' },
    { label: 'Dart', ext: 'dart' },
    { label: 'SQL', ext: 'sql' },
  ],
}

/** Nicho 2 — o que desenha tela, no navegador e no celular. */
export const frontend: SkillNiche = {
  id: 'frontend',
  title: 'Front-end & mobile',
  unidade: ['pedal', 'pedais'],
  terms: [
    { label: 'React' },
    { label: 'Next.js' },
    { label: 'Vite' },
    { label: 'Flutter' },
    { label: 'HTML5' },
    { label: 'CSS3' },
    { label: 'Bootstrap' },
  ],
}

/** Nicho 3 — o que roda no servidor e o que guarda o dado. */
export const backend: SkillNiche = {
  id: 'backend',
  title: 'Back-end & dados',
  unidade: ['módulo', 'módulos'],
  terms: [
    { label: 'Node.js' },
    { label: 'NestJS' },
    { label: 'Prisma' },
    { label: 'ASP.NET MVC' },
    { label: 'Entity Framework' },
    { label: 'Oracle Database' },
    { label: 'SQL Server' },
    { label: 'PostgreSQL' },
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
  unidade: ['pad', 'pads'],
  terms: [
    { label: 'Engenharia de prompt' },
    { label: 'RAG' },
    { label: 'Embeddings' },
    { label: 'Agentes' },
    { label: 'APIs de LLM' },
    { label: 'Transformers' },
  ],
}

/**
 * Nicho 5 — ferramentas e processos.
 *
 * O currículo junta os dois numa linha só, e faz sentido: são as duas metades
 * do trabalho de implantação. Ferramenta é o que se abre; processo é o que se
 * conduz. Um portfólio de dev que mostra só ferramenta esconde metade do que
 * este currículo tem.
 */
export const ferramentas: SkillNiche = {
  id: 'ferramentas',
  title: 'Ferramentas & processos',
  unidade: ['pista', 'pistas'],
  terms: [
    { label: 'Git/GitHub' },
    { label: 'Docker' },
    { label: 'Vercel' },
    { label: 'DBeaver' },
    { label: 'Jupyter' },
    { label: 'Levantamento de requisitos' },
    { label: 'Mapeamento de processos' },
    { label: 'QA e homologação' },
    { label: 'Gestão de chamados' },
  ],
}

/**
 * A fita entre a Stack e os Projetos: as bibliotecas **dos projetos**.
 *
 * Ela repetia a Stack termo a termo, e com a Stack inteira na tela logo
 * acima isso era redundância (leitura do dono, 24/09). Agora carrega o que a
 * Stack não tem: as bibliotecas e ferramentas que aparecem no código dos
 * projetos mas não na lista do currículo — a camada de baixo, que um
 * currículo de uma página não comporta.
 *
 * Cada uma foi conferida no repositório (import, requirements, package.json
 * ou pubspec), e o comentário diz onde. Nenhuma entra "porque combina".
 */
export const bibliotecasDosProjetos: readonly string[] = [
  'PyTorch', // music-ai-generator (TCC)
  'NumPy', // music-ai-generator, desafio_indicium_imdb
  'pandas', // desafio_indicium_imdb, intuitivecare
  'scikit-learn', // desafio_indicium_imdb
  'SciPy', // desafio_indicium_imdb
  'Matplotlib', // music-ai-generator, desafio_indicium_imdb
  'seaborn', // desafio_indicium_imdb
  'pretty_midi', // music-ai-generator
  'mido', // music-ai-generator
  'Flask', // intuitivecare
  'Beautiful Soup', // intuitivecare
  'pdfplumber', // intuitivecare
  'Vue.js', // intuitivecare (api/index.html)
  'Tailwind CSS', // intuitivecare, este portfolio
  'React Router', // pokedex-capacitacao-ejcomp
  'Three.js', // flowers2
  'Drift', // sports-control (pubspec.yaml)
  'Motion', // este portfolio
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
