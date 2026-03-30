import { getResumeData, getAllTechnologies } from 'lib/get-resume'
import MainHeader from './components/header-new'
import About from './components/about'
import ExperienceSection from './components/experience'
import Skills from './components/skills'
import ProjectsResume from './components/projects-resume'
import Education from './components/education'
import Certifications from './components/certifications'
import Contact from './components/contact-new'
import { PageTransition } from 'lib/animations'

export default function Page() {
  const resumeData = getResumeData()
  const headerSkills = getAllTechnologies().slice(0, 8)
  const currentJob = resumeData.experience.find((exp) => exp.isCurrent) || resumeData.experience[0]

  return (
    <PageTransition className="flex flex-col gap-16 md:gap-24">
      <MainHeader header={resumeData.header} skills={headerSkills} currentJob={currentJob} />
      <About
        currentJob={currentJob}
        education={resumeData.education}
        notableProjects={resumeData.notableProjects}
        profileSummary={resumeData.profileSummary}
      />
      <ExperienceSection experiences={resumeData.experience} />
      <Skills skills={resumeData.skills} />
      <Education education={resumeData.education} />
      <ProjectsResume projects={resumeData.projects} />
      <Certifications
        certifications={resumeData.certifications}
        activities={resumeData.activities}
        notableProjects={resumeData.notableProjects}
      />
      <Contact header={resumeData.header} />
    </PageTransition>
  )
}
