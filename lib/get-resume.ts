import path from 'path'
import { loadResumeFromFile } from './resume-parser'
import type { ResumeData } from './resume-types'

// Cache the parsed resume data
let cachedResume: ResumeData | null = null

/**
 * Get resume data - loads and parses LaTeX file at build time
 * Results are cached for the duration of the build
 */
export function getResumeData(): ResumeData {
  if (cachedResume) {
    return cachedResume
  }

  const resumePath = path.join(process.cwd(), 'content', 'resume.tex')
  cachedResume = loadResumeFromFile(resumePath)
  
  return cachedResume
}

/**
 * Get current experience (first entry marked as current)
 */
export function getCurrentExperience() {
  const resume = getResumeData()
  return resume.experience.find((exp) => exp.isCurrent) || resume.experience[0]
}

/**
 * Get previous experiences (all except current)
 */
export function getPreviousExperiences() {
  const resume = getResumeData()
  return resume.experience.filter((exp) => !exp.isCurrent)
}

/**
 * Get skills grouped by category
 */
export function getSkillsByCategory() {
  const resume = getResumeData()
  return resume.skills
}

/**
 * Get all unique technologies from experience
 */
export function getAllTechnologies(): string[] {
  const resume = getResumeData()
  const techSet = new Set<string>()
  
  resume.experience.forEach((exp) => {
    exp.technologies.forEach((tech) => techSet.add(tech))
  })
  
  return Array.from(techSet)
}
