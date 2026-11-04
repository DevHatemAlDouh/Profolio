import { useEffect, type ReactNode } from 'react'
import { useProfolioRepositories } from '../hooks/useProfolioRepositories'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'
import HeroSection from './HeroSection'
import PortfolioHeader from './PortfolioHeader'
import ProjectsSection from './ProjectsSection'

export type PortfolioConfig = {
  isGame: boolean
  title: string
  role: string
  heading: ReactNode
  intro: string
  skills: string[]
  aboutEyebrow: string
  aboutHeading: ReactNode
  aboutDescription: string
  contactEyebrow: string
  contactHeading: ReactNode
}

type PortfolioPageProps = {
  config: PortfolioConfig
  onPageChange: (isGame: boolean) => void
}

function PortfolioPage({ config, onPageChange }: PortfolioPageProps) {
  const { repositories, cacheUpdatedAt, loading, error } = useProfolioRepositories()
  const projects = repositories.filter((repository) => repository.isGame === config.isGame)

  useEffect(() => {
    document.title = config.title
  }, [config.title])

  return (
    <main className="tech-theme min-h-screen font-sans">
      <PortfolioHeader isGame={config.isGame} onPageChange={onPageChange} />
      <HeroSection
        isGame={config.isGame}
        role={config.role}
        heading={config.heading}
        intro={config.intro}
        skills={config.skills}
      />
      <ProjectsSection
        isGame={config.isGame}
        projects={projects}
        cacheUpdatedAt={cacheUpdatedAt}
        loading={loading}
        error={error}
      />
      <AboutSection
        eyebrow={config.aboutEyebrow}
        heading={config.aboutHeading}
        description={config.aboutDescription}
        skills={config.skills}
      />
      <ContactSection eyebrow={config.contactEyebrow} heading={config.contactHeading} />
    </main>
  )
}

export default PortfolioPage
