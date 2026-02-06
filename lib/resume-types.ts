// Resume data types - parsed from LaTeX resume

export interface ResumeHeader {
  name: string
  location: string
  email: string
  phone: string
  linkedin: string
}

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  technologies: string[]
  isCurrent: boolean
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Project {
  name: string
  organization: string
  date: string
  bullets: string[]
}

export interface Education {
  degree: string
  institution: string
  grade: string
  period: string
  location?: string
}

export interface Certification {
  name: string
  organization: string
  period: string
}

export interface ResumeData {
  header: ResumeHeader
  profileSummary: string
  experience: Experience[]
  skills: SkillCategory[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  activities: string[]
  notableProjects: string[]
}
