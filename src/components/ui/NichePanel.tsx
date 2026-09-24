import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

import { BotaoTecnologia } from '@/components/ui/BotaoTecnologia'
import { Panel } from '@/components/ui/Panel'
import { VIEWPORT, revealVariants, staggerVariants } from '@/lib/motion'
import { contagem } from '@/lib/contagem'
import type { SkillNiche } from '@/types/content'

interface NichePanelProps {
  readonly nicho: SkillNiche
}

/**
 * Um nicho da Stack como lista vertical de canais.
 *
 * **Lista de uma coluna, e isso é a correção de um defeito.** Os termos ficavam
 * numa grade que quebrava sozinha, e grade que quebra sozinha deixa órfão: o
 * painel de sete tópicos numa grade de duas colunas saía 2+2+2+1, com a última
 * linha carregando um item sozinho. A leitura foi direta — "fica uma linha só
 * com o item e a outra linha de cima completa".
 *
 * Com uma coluna não existe última linha incompleta, em nenhuma largura e para
 * qualquer quantidade de termos. O alinhamento deixa de depender de a conta
 * fechar.
 *
 * As linhas são `flex-1`: painéis lado a lado esticam até a altura do mais
 * alto, e sem isso o de seis termos ficaria com um vão morto embaixo enquanto o
 * de nove encostava na borda.
 *
 * **As linhas entram em cadeia, não de uma vez.** A disposição estava certa e
 * ainda assim a seção lia como engessada: quatro blocos que aparecem prontos,
 * ao mesmo tempo, não têm ritmo. O LED acende junto com a linha e cresce no
 * hover — é o que transforma a lista num painel de equipamento em vez de uma
 * tabela.
 */
export function NichePanel({ nicho }: NichePanelProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    /*
     * O canto conta os termos ("7 termos") em vez de ser string cravada.
     * Numero que descreve uma lista sai da lista — ja erramos isso antes, com
     * um painel dizendo "CH 01–05" com seis canais na tela.
     */
    <Panel title={nicho.title} code={contagem(nicho.terms.length, ...nicho.unidade)} fill>
      <m.ul
        className="divide-line flex flex-1 flex-col divide-y"
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={VIEWPORT}
        variants={staggerVariants}
      >
        {nicho.terms.map((termo) => (
          <m.li
            key={termo.label}
            className="group/linha flex-1"
            variants={prefersReducedMotion ? undefined : revealVariants}
          >
            <BotaoTecnologia
              termo={termo.label}
              className="text-ink-muted hover:text-ink relative flex h-full w-full items-center gap-3 px-[18px] py-2.5 text-left font-mono text-[11px] tracking-[0.06em] transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-[rgb(var(--accent-rgb)/0.9)] before:transition-all before:duration-300 before:content-[''] hover:bg-[rgb(var(--accent-rgb)/0.07)] hover:before:w-[3px]"
              classNameAtivo="text-accent-text bg-[rgb(var(--accent-rgb)/0.1)] before:w-[3px]"
            >
              <span
                aria-hidden="true"
                className="bg-accent glow-led size-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover/linha:scale-150"
              />
              {termo.label}
            </BotaoTecnologia>
          </m.li>
        ))}
      </m.ul>
    </Panel>
  )
}
