import type { TerminalLine } from '@/types/content'

interface TerminalCoverProps {
  readonly lines: readonly TerminalLine[]
}

const CLASSES: Record<TerminalLine['kind'], string> = {
  path: 'text-ink-faint',
  comment: 'text-ink-faint',
  command: 'text-ink',
  flag: 'text-ink-muted pl-4',
}

/**
 * Capa de terminal.
 *
 * Todos os comandos vêm do README do próprio repositório — para um projeto de
 * linha de comando, o terminal **é** a interface, então isto não é ilustração,
 * é o produto. Nenhuma saída foi inventada: só aparecem comandos e comentários
 * que existem no repo.
 */
export function TerminalCover({ lines }: TerminalCoverProps) {
  return (
    <div className="bg-panel-sunken h-full w-full overflow-hidden p-4">
      <pre className="font-mono text-[10px] leading-[1.7] whitespace-pre">
        {lines.map((line, index) => (
          <div key={index} className={CLASSES[line.kind]}>
            {line.kind === 'command' && <span className="text-accent-text">$ </span>}
            {line.kind === 'comment' && <span className="text-ink-faint"># </span>}
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  )
}
