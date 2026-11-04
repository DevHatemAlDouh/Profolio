import type { ReactNode } from 'react'
import ArrowIcon from './ArrowIcon'
import HeroArtwork from './HeroArtwork'

type HeroSectionProps = {
  isGame: boolean
  role: string
  heading: ReactNode
  intro: string
  skills: string[]
}

function HeroSection({ isGame, role, heading, intro, skills }: HeroSectionProps) {
  return (
    <section id="home" className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:pt-24">
      <div>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e1e3d9] bg-white/70 px-3 py-1.5 text-xs text-[#61675c]">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#91b746] opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#789e32]" /></span>
          Available for select projects
        </div>
        <p className="mb-4 text-sm font-medium tracking-wide text-[#7b8175]">{role}</p>
        <h1 className="max-w-3xl text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.075em] text-[#20251f]">{heading}</h1>
        <p className="mt-7 max-w-lg text-base leading-7 text-[#6e7469] sm:text-lg sm:leading-8">{intro}</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-[#20251f] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#414a3b]">
            {isGame ? 'Explore my games' : 'Explore my work'} <span className="text-[#d6f36a] transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
          </a>
          <a href="#about" className="px-3 py-3 text-sm font-medium text-[#51574d] underline decoration-[#c6cbbd] underline-offset-4 transition-colors hover:text-[#20251f]">A little about me</a>
        </div>
        <div className="mt-14 border-t border-[#e2e4dc] pt-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#858b7e]">{isGame ? 'Tools of the trade' : 'Things I build with'}</p>
          <div className="mt-3 flex flex-wrap gap-2">{skills.slice(0, 4).map((skill) => <span key={skill} className="rounded-full border border-[#e1e3d9] bg-white/60 px-3 py-1.5 text-xs text-[#555d51]">{skill}</span>)}</div>
        </div>
      </div>
      <HeroArtwork isGame={isGame} />
    </section>
  )
}

export default HeroSection
