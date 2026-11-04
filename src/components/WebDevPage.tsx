import PortfolioPage, { type PortfolioConfig } from './PortfolioPage'

const config: PortfolioConfig = {
  isGame: false,
  title: 'Hatem — Web Developer',
  role: 'INDEPENDENT WEB DEVELOPER',
  heading: <>The web, made<br /><span className="font-serif font-normal italic text-[#8b9b70]">wonderful.</span></>,
  intro: 'I’m Hatem — I build thoughtful, fast, and accessible web experiences, from the first sketch to the final interaction.',
  skills: ['React & TypeScript', 'Accessible UI', 'Responsive design', 'APIs & integrations', 'Performance', 'Design systems'],
  aboutEyebrow: 'HOW I LIKE TO BUILD FOR THE WEB',
  aboutHeading: <>Useful by nature.<br /><span className="font-serif font-normal italic text-[#8b9b70]">Human</span> by design.</>,
  aboutDescription: 'I care about the whole experience: quick load times, thoughtful interactions, accessible interfaces, and code that is a pleasure to maintain. I like collaborating early, staying curious, and shipping work that makes someone’s day a little easier.',
  contactEyebrow: 'HAVE A WEB PROJECT IN MIND?',
  contactHeading: <>Let&apos;s build<br /><span className="font-serif font-normal italic text-[#d6f36a]">something good.</span></>,
}

function WebDevPage() {
  return <PortfolioPage config={config} />
}

export default WebDevPage
