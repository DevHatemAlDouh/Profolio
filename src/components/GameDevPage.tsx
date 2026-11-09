import PortfolioPage, { type PortfolioConfig } from './PortfolioPage'

const config: PortfolioConfig = {
  isGame: true,
  title: 'Hatem — Game Developer',
  role: 'INDEPENDENT GAME DEVELOPER',
  heading: <>Worlds to get<br /><span className="font-serif font-normal italic text-[#8b9b70]">lost</span> in.</>,
  intro: 'I’m Hatem — I build playful worlds, satisfying mechanics, and game experiences that stay with you.',
  skills: ['Gameplay programming', 'Prototyping', 'Game feel', 'World building', 'UI & HUD', 'Godot · GDScript'],
  aboutEyebrow: 'HOW I LIKE TO MAKE GAMES',
  aboutHeading: <>Curious worlds.<br /><span className="font-serif font-normal italic text-[#8b9b70]">Meaningful</span> play.</>,
  aboutDescription: 'Great games invite you in, teach you through play, and make every small action feel good. I love turning rough ideas into playable prototypes and polishing the details that make a world feel alive.',
  contactEyebrow: 'GOT A GAME IDEA?',
  contactHeading: <>Let&apos;s make<br /><span className="font-serif font-normal italic text-[#d6f36a]">play happen.</span></>,
}

type GameDevPageProps = {
  onPageChange: (isGame: boolean) => void
}

function GameDevPage({ onPageChange }: GameDevPageProps) {
  return <PortfolioPage config={config} onPageChange={onPageChange} />
}

export default GameDevPage
