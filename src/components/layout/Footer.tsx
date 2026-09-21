import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-line border-t px-6 py-[26px]">
      <div className="text-ink-faint mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.12em] uppercase">
        <span>{site.footer.left}</span>
        <span>{site.footer.right}</span>
      </div>
    </footer>
  )
}
