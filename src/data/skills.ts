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
  code: 'LANG',
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
  code: 'UI',
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
  code: 'SRV',
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
 * Aqui moram **técnicas**, não bibliotecas: engenharia de prompt, RAG,
 * embeddings e agentes são como se usa um modelo. PyTorch e as APIs de LLM
 * entram porque o currículo as lista nesta linha, e porque são a ferramenta
 * concreta por trás das técnicas — sem elas o painel nomearia método sem dizer
 * em que é feito.
 */
export const iaAplicada: SkillNiche = {
  id: 'ia-aplicada',
  title: 'IA aplicada',
  code: 'AI',
  terms: [
    { label: 'Engenharia de prompt' },
    { label: 'RAG' },
    { label: 'Embeddings' },
    { label: 'Agentes' },
    { label: 'PyTorch' },
    { label: 'APIs de LLM' },
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
  code: 'OPS',
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
 * Os cinco nichos na ordem do currículo.
 *
 * Linguagens sai na frente porque é o único com tratamento próprio (a mesa, com o selo
 * de extensão no rótulo); os outros quatro dividem a grade abaixo.
 */
export const nichos: readonly SkillNiche[] = [
  linguagens,
  frontend,
  backend,
  iaAplicada,
  ferramentas,
]

/**
 * Fita de tecnologias exibida entre Habilidades e Projetos.
 *
 * Deriva dos nichos para não duplicar a fonte da verdade — e por isso ela
 * repete, por construção, tudo que a Stack mostra. Isso é reforço e não
 * redundância porque a função é outra: na Stack o termo é catálogo, na fita ele
 * é o controle que acende a tecnologia na página inteira.
 *
 * Fica de fora o que não é tecnologia: processo não é termo de foco, e
 * "Levantamento de requisitos" passando numa fita de stack só faria ruído.
 */
const NAO_SAO_TECNOLOGIA = new Set([
  'Levantamento de requisitos',
  'Mapeamento de processos',
  'QA e homologação',
  'Gestão de chamados',
])

export const marqueeItems: readonly string[] = nichos
  .flatMap((nicho) => nicho.terms.map((termo) => termo.label))
  .filter((label) => !NAO_SAO_TECNOLOGIA.has(label))

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
