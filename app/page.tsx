import { getResumeData, getAllTechnologies } from 'lib/get-resume'
import ScrollyCanvas from './components/scrolly-canvas'
import AboutCinematic from './components/about-cinematic'
import SkillsArsenal from './components/skills-arsenal'
import Journey from './components/journey'
import ContactCinematic from './components/contact-cinematic'
import Dock from './components/dock'
import WorkGrid from './components/work-grid'

export default function Page() {
  const resume = getResumeData()
  const headerSkills = getAllTechnologies().slice(0, 8)
  const currentJob = resume.experience.find((exp) => exp.isCurrent) || resume.experience[0]

  const tagline = `${resume.profileSummary.split('. ')[0]}.`
  const techCount = getAllTechnologies().length
  const years = Math.max(1, new Date().getFullYear() - 2023)

  const stats = [
    { value: `${years}+`, label: 'Years in embedded' },
    { value: `${techCount}+`, label: 'Technologies' },
    { value: '99.9%', label: 'Uptime delivered' },
    { value: 'Red Dot', label: 'Award-winning gateway' },
  ]

  return (
    <>
      <ScrollyCanvas
        name={resume.header.name}
        title={currentJob.title}
        skills={headerSkills}
        tagline={tagline}
      />
      <WorkGrid projects={resume.projects} />
      <AboutCinematic profileSummary={resume.profileSummary} stats={stats} />
      <SkillsArsenal skills={resume.skills} />
      <Journey experience={resume.experience} education={resume.education} />
      <ContactCinematic header={resume.header} />
      <Dock />
    </>
  )
}
