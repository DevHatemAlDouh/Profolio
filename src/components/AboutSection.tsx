import type { ReactNode } from 'react'

type AboutSectionProps = {
  eyebrow: string
  heading: ReactNode
  description: string
  skills: string[]
}

function AboutSection({ eyebrow, heading, description, skills }: AboutSectionProps) {
  return (
    <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#85906f]">{eyebrow}</p>
        <h2 className="max-w-md text-4xl leading-[1.05] font-medium tracking-[-0.06em] sm:text-5xl">{heading}</h2>
      </div>
      <div>
        <p className="max-w-2xl text-lg leading-8 text-[#60675c]">{description}</p>
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#e2e4dc] pt-6 sm:grid-cols-3">
          {skills.map((skill) => <div key={skill} className="rounded-xl border border-[#e5e7df] bg-white/55 px-3 py-3 text-xs font-medium text-[#51574d]">{skill}</div>)}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
