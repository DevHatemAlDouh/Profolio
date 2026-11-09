import type { ReactNode } from 'react'
import ArrowIcon from './ArrowIcon'

type ContactSectionProps = {
  eyebrow: string
  heading: ReactNode
}

function ContactSection({ eyebrow, heading }: ContactSectionProps) {
  const year = new Date().getFullYear()

  return (
    <section id="contact" className="px-5 pb-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#20251f] px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#c2d48f]">{eyebrow}</p>
            <h2 className="max-w-2xl text-4xl leading-[1.04] font-medium tracking-[-0.06em] sm:text-6xl">{heading}</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">Have a project, a question, or just want to say hello? My inbox is always open.</p>
          </div>
          <a href="mailto:hatemaldouh@gmail.com" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#d6f36a] px-6 py-4 text-sm font-semibold text-[#20251f] transition-colors hover:bg-white">
            Say hello <span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
          </a>
        </div>
      </div>
      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-1 py-6 text-xs text-[#83897e] sm:flex-row">
        <p>© {year} Hatem. Made with care.</p>
        <div className="flex gap-5">
          <a href="https://www.linkedin.com/in/hatem-al-douh-abb86122a/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#20251f]">LinkedIn</a>
          <a href="https://github.com/DevHatemAlDouh" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#20251f]">GitHub</a>
          <a href="mailto:hatemaldouh@gmail.com" className="transition-colors hover:text-[#20251f]">Email</a>
        </div>
      </footer>
    </section>
  )
}

export default ContactSection
