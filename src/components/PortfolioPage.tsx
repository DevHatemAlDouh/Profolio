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
}

function PortfolioPage({ config }: PortfolioPageProps) {
  const { repositories, loading, error } = useProfolioRepositories()
  const projects = repositories.filter((repository) => {
    const isGameRepository =
      repository.language === 'GDScript' ||
      repository.topics.some((topic) => ['game', 'gamedev', 'godot'].includes(topic.toLowerCase())) ||
      /game|fabric|bonga|hox|alphabet/i.test(repository.name)
    return isGameRepository === config.isGame
  })

  useEffect(() => {
    document.title = config.title
  }, [config.title])

  return (
    <main className="tech-theme min-h-screen font-sans">
      <PortfolioHeader isGame={config.isGame} />
      <HeroSection
        isGame={config.isGame}
        role={config.role}
        heading={config.heading}
        intro={config.intro}
        skills={config.skills}
      />
      <ProjectsSection isGame={config.isGame} projects={projects} loading={loading} error={error} />
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
