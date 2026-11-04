import ArrowIcon from './ArrowIcon'

type PortfolioHeaderProps = {
  isGame: boolean
  onPageChange: (isGame: boolean) => void
}

function PortfolioHeader({ isGame, onPageChange }: PortfolioHeaderProps) {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-12">
      <a href="/" className="flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight" aria-label="Hatem portfolio home">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#20251f] text-sm text-[#d6f36a]">H.</span>
        <span className="hidden sm:inline">Hatem<span className="text-[#90968b]">/Portfolio</span></span>
      </a>
      <nav aria-label="Portfolio focus" className="flex items-center gap-1 rounded-full border border-[#e1e3d9] bg-white/70 p-1 text-[11px] sm:gap-2 sm:text-sm">
        <button type="button" aria-pressed={!isGame} onClick={() => onPageChange(false)} className={`rounded-full px-3 py-2 transition-colors sm:px-4 ${!isGame ? 'bg-[#20251f] font-medium text-white' : 'text-[#62685e] hover:text-[#20251f]'}`}>Web development</button>
        <button type="button" aria-pressed={isGame} onClick={() => onPageChange(true)} className={`rounded-full px-3 py-2 transition-colors sm:px-4 ${isGame ? 'bg-[#20251f] font-medium text-white' : 'text-[#62685e] hover:text-[#20251f]'}`}>Game development</button>
      </nav>
      <a href="#contact" className="group hidden shrink-0 items-center gap-2 rounded-full border border-[#d9dbd2] px-4 py-2 text-sm font-medium transition-colors hover:border-[#20251f] hover:bg-[#20251f] hover:text-white sm:inline-flex">
        Let&apos;s talk <span className="transition-transform group-hover:translate-x-0.5"><ArrowIcon diagonal /></span>
      </a>
    </header>
  )
}

export default PortfolioHeader
