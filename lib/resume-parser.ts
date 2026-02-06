import fs from 'fs'
import path from 'path'
import type {
  ResumeData,
  ResumeHeader,
  Experience,
  SkillCategory,
  Project,
  Education,
  Certification,
} from './resume-types'

/**
 * Parse LaTeX resume file and extract structured data
 */
export function parseResumeTeX(content: string): ResumeData {
  return {
    header: parseHeader(content),
    profileSummary: parseProfileSummary(content),
    experience: parseExperience(content),
    skills: parseSkills(content),
    projects: parseProjects(content),
    education: parseEducation(content),
    certifications: parseCertifications(content),
    activities: parseActivities(content),
    notableProjects: parseNotableProjects(content),
  }
}

/**
 * Parse profile summary section
 */
function parseProfileSummary(content: string): string {
  const section = extractSection(content, 'Profile Summary')
  if (!section) {
    return ''
  }

  return cleanLatex(section)
}

/**
 * Clean LaTeX formatting from text
 */
function cleanLatex(text: string): string {
  return text
    .replace(/\\textbf\{([^}]*)\}/g, '$1')
    .replace(/\\textit\{([^}]*)\}/g, '$1')
    .replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1')
    .replace(/\\_/g, '_')
    .replace(/\\&/g, '&')
    .replace(/\\\\/g, '')
    .replace(/\\%/g, '%')
    .replace(/\{|\}/g, '')
    .replace(/~~/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Extract section content between section markers
 */
function extractSection(content: string, sectionName: string): string {
  const sectionPattern = new RegExp(
    `\\\\section\\*\\{${sectionName}\\}([\\s\\S]*?)(?=\\\\section\\*\\{|\\\\end\\{document\\})`,
    'i'
  )
  const match = content.match(sectionPattern)
  return match ? match[1] : ''
}

/**
 * Parse header information
 */
function parseHeader(content: string): ResumeHeader {
  // Extract name
  const nameMatch = content.match(/\\large\s*\\textbf\{([^}]+)\}/)
  const name = nameMatch ? cleanLatex(nameMatch[1]) : ''

  // Extract header line with contact info
  const headerLine = content.match(/Bangalore, India[^\\]+/)
  const headerText = headerLine ? headerLine[0] : ''

  // Extract email
  const emailMatch = content.match(/\\href\{mailto:([^}]+)\}/)
  const email = emailMatch ? emailMatch[1] : ''

  // Extract phone
  const phoneMatch = headerText.match(/\+91\s*[\d\s]+/)
  const phone = phoneMatch ? phoneMatch[0].replace(/\s+/g, ' ').trim() : ''

  // Extract LinkedIn
  const linkedinMatch = content.match(/\\href\{https:\/\/linkedin\.com\/in\/([^}]+)\}/)
  const linkedin = linkedinMatch ? linkedinMatch[1] : ''

  return {
    name,
    location: 'Bangalore, India',
    email,
    phone,
    linkedin,
  }
}

/**
 * Parse professional experience section
 */
function parseExperience(content: string): Experience[] {
  const section = extractSection(content, 'Professional Experience')
  const experiences: Experience[] = []

  // Split by job entries (look for title pattern)
  const jobPattern = /\\textbf\{([^}]+)\}\s*\\hfill\s*\\textit\{([^}]+)\}\\\\[\s\n]*\\textbf\{([^}]+)\},\s*([^\\]+)/g
  
  let match
  let lastIndex = 0
  const matches: Array<{ title: string; period: string; company: string; location: string; startIndex: number; endIndex: number }> = []
  
  while ((match = jobPattern.exec(section)) !== null) {
    matches.push({
      title: cleanLatex(match[1]),
      period: cleanLatex(match[2]),
      company: cleanLatex(match[3]),
      location: cleanLatex(match[4]),
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  // Extract bullets and technologies for each job
  for (let i = 0; i < matches.length; i++) {
    const job = matches[i]
    const nextStart = matches[i + 1]?.startIndex ?? section.length
    const jobContent = section.slice(job.endIndex, nextStart)

    // Extract bullet points
    const bulletPattern = /\\item\s+([^\n]+)/g
    const bullets: string[] = []
    let bulletMatch
    while ((bulletMatch = bulletPattern.exec(jobContent)) !== null) {
      bullets.push(cleanLatex(bulletMatch[1]))
    }

    // Extract technologies
    const techMatch = jobContent.match(/\\textbf\{Technologies:\}\s*([^\n]+)/)
    const technologies = techMatch
      ? cleanLatex(techMatch[1]).split(',').map((t) => t.trim()).filter(Boolean)
      : []

    experiences.push({
      title: job.title,
      company: job.company,
      location: job.location,
      period: job.period,
      bullets,
      technologies,
      isCurrent: job.period.toLowerCase().includes('present'),
    })
  }

  return experiences
}

/**
 * Parse technical skills section
 */
function parseSkills(content: string): SkillCategory[] {
  const section = extractSection(content, 'Technical Skills')
  const skills: SkillCategory[] = []

  // Match skill categories
  const categoryPattern = /\\textbf\{([^}]+):\}\s*([^\n\\]+)/g
  let match
  
  while ((match = categoryPattern.exec(section)) !== null) {
    const category = cleanLatex(match[1])
    const skillList = cleanLatex(match[2])
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    
    skills.push({ category, skills: skillList })
  }

  return skills
}

/**
 * Parse projects section
 */
function parseProjects(content: string): Project[] {
  const section = extractSection(content, 'Projects')
  const projects: Project[] = []

  // Match project entries
  const projectPattern = /\\textbf\{([^}]+)\}\s*\|\s*([^\\]+)\\hfill\s*\\textit\{([^}]+)\}/g
  let match
  const projectMatches: Array<{ name: string; org: string; date: string; startIndex: number; endIndex: number }> = []
  
  while ((match = projectPattern.exec(section)) !== null) {
    projectMatches.push({
      name: cleanLatex(match[1]),
      org: cleanLatex(match[2]),
      date: cleanLatex(match[3]),
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  // Extract bullets for each project
  for (let i = 0; i < projectMatches.length; i++) {
    const proj = projectMatches[i]
    const nextStart = projectMatches[i + 1]?.startIndex ?? section.length
    const projContent = section.slice(proj.endIndex, nextStart)

    const bulletPattern = /\\item\s+([^\n]+)/g
    const bullets: string[] = []
    let bulletMatch
    while ((bulletMatch = bulletPattern.exec(projContent)) !== null) {
      bullets.push(cleanLatex(bulletMatch[1]))
    }

    projects.push({
      name: proj.name,
      organization: proj.org,
      date: proj.date,
      bullets,
    })
  }

  return projects
}

/**
 * Parse education section
 */
function parseEducation(content: string): Education[] {
  const section = extractSection(content, 'Education')
  const education: Education[] = []

  // Bachelor's degree pattern
  const bachelorMatch = section.match(
    /\\textbf\{([^}]+)\}\s*\|\s*([^\\]+)\\hfill\s*\\textit\{([^}]+)\}\\\\[\s\n]*([^\\]+)/
  )
  if (bachelorMatch) {
    education.push({
      degree: cleanLatex(bachelorMatch[1]),
      grade: cleanLatex(bachelorMatch[2]),
      period: cleanLatex(bachelorMatch[3]),
      institution: cleanLatex(bachelorMatch[4]),
      location: 'India',
    })
  }

  // Secondary education patterns
  const secondaryPattern = /\\textbf\{([^}]+)\}\s*\|\s*(\d+%)\s*\\hfill\s*\\textit\{([^}]+)\}\s*\|\s*([^\\]+)/g
  let match
  while ((match = secondaryPattern.exec(section)) !== null) {
    education.push({
      degree: cleanLatex(match[1]),
      grade: match[2],
      period: cleanLatex(match[3]),
      institution: cleanLatex(match[4]),
    })
  }

  return education
}

/**
 * Parse certifications section
 */
function parseCertifications(content: string): Certification[] {
  const section = extractSection(content, 'Certifications & Activities')
  const certifications: Certification[] = []

  // Match certification entries
  const certMatch = section.match(
    /\\textbf\{([^}]+)\}\s*\|\s*([^\\]+)\\hfill\s*\\textit\{([^}]+)\}/
  )
  if (certMatch) {
    certifications.push({
      name: cleanLatex(certMatch[1]),
      organization: cleanLatex(certMatch[2]),
      period: cleanLatex(certMatch[3]),
    })
  }

  return certifications
}

/**
 * Parse leadership/activities
 */
function parseActivities(content: string): string[] {
  const section = extractSection(content, 'Certifications & Activities')
  
  const activityMatch = section.match(/\\textbf\{Leadership:\}\s*([^\n]+)/)
  if (activityMatch) {
    return cleanLatex(activityMatch[1])
      .split('|')
      .map((a) => a.trim())
      .filter(Boolean)
  }
  
  return []
}

/**
 * Parse notable projects
 */
function parseNotableProjects(content: string): string[] {
  const section = extractSection(content, 'Certifications & Activities')
  
  const notableMatch = section.match(/\\textbf\{Notable Projects:\}\s*([^\n]+)/)
  if (notableMatch) {
    return [cleanLatex(notableMatch[1])]
  }
  
  return []
}

/**
 * Load and parse resume from file
 */
export function loadResumeFromFile(filePath: string): ResumeData {
  const content = fs.readFileSync(filePath, 'utf-8')
  return parseResumeTeX(content)
}
