import type { ResumeData } from './resume-types'

// Cache the parsed resume data
let cachedResume: ResumeData | null = null

/**
 * Get resume data - imports pre-generated JSON from build time
 * This works with static hosting (GitHub Pages, etc.)
 */
export function getResumeData(): ResumeData {
  if (cachedResume) {
    return cachedResume
  }

  // Import the pre-generated resume JSON
  // This file is created by scripts/build-resume.ts during the build process
  try {
    const resumeJson = require('../public/data/resume.json') as ResumeData
    cachedResume = resumeJson
    return resumeJson
  } catch (error) {
    console.error('Failed to load resume data:', error)
    // Return empty structure as fallback
    const fallback: ResumeData = {
      header: {
        name: 'Jayesh Chotaliya',
        location: 'Bangalore, India',
        email: '',
        phone: '',
        linkedin: '',
      },
      profileSummary: '',
      experience: [],
      skills: [],
      projects: [],
      education: [],
      certifications: [],
      activities: [],
      notableProjects: [],
    }
    return fallback
  }
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
