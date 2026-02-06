import fs from 'fs'
import path from 'path'
import { parseResumeTeX } from '../lib/resume-parser'

/**
 * Build-time script to parse LaTeX resume and generate JSON
 * Run this before building the Next.js app
 */
function buildResume() {
  const resumePath = path.join(process.cwd(), 'content', 'resume.tex')
  
  if (!fs.existsSync(resumePath)) {
    console.error(`Error: Resume file not found at ${resumePath}`)
    process.exit(1)
  }

  console.log(`Parsing resume from ${resumePath}...`)
  
  const content = fs.readFileSync(resumePath, 'utf-8')
  const resumeData = parseResumeTeX(content)

  // Create directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'public', 'data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Write JSON file
  const outputPath = path.join(outputDir, 'resume.json')
  fs.writeFileSync(outputPath, JSON.stringify(resumeData, null, 2), 'utf-8')

  console.log(`✓ Resume data generated at ${outputPath}`)
  console.log(`  - Profile summary: ${resumeData.profileSummary ? 'yes' : 'no'}`)
  console.log(`  - Experience: ${resumeData.experience.length} roles`)
  console.log(`  - Skills: ${resumeData.skills.length} categories`)
  console.log(`  - Projects: ${resumeData.projects.length} projects`)
  console.log(`  - Education: ${resumeData.education.length} entries`)
}

buildResume()
