import { getResumeData, getAllTechnologies } from 'lib/get-resume'
import MainHeader from './components/header-new'
import About from './components/about'
import ExperienceSection from './components/experience'
import Skills from './components/skills'
import ProjectsResume from './components/projects-resume'
import Education from './components/education'
import Certifications from './components/certifications'
import Contact from './components/contact-new'

export default function Page() {
  const resumeData = getResumeData()
  const headerSkills = getAllTechnologies().slice(0, 6)
  const currentJob = resumeData.experience.find((exp) => exp.isCurrent) || resumeData.experience[0]

  return (
    <div className='flex flex-col gap-8'>
      <MainHeader header={resumeData.header} skills={headerSkills} currentJob={currentJob} />
      <About 
        currentJob={currentJob} 
        education={resumeData.education}
        notableProjects={resumeData.notableProjects}
        profileSummary={resumeData.profileSummary}
      />
      
      {/* Two-column grid for Experience + Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExperienceSection experiences={resumeData.experience} />
        <div className="flex flex-col gap-8">
          <Skills skills={resumeData.skills} />
          <Education education={resumeData.education} />
        </div>
      </div>
      
      <ProjectsResume projects={resumeData.projects} />
      <Certifications 
        certifications={resumeData.certifications} 
        activities={resumeData.activities}
        notableProjects={resumeData.notableProjects}
      />
      <Contact header={resumeData.header} />
    </div>
  )
}
