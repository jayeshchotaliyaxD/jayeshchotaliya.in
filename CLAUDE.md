# CLAUDE.md

## Project Overview

Personal portfolio and blog website for Jayesh Chotaliya, deployed at `https://jayeshchotaliya.in`. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Statically exported to GitHub Pages.

## Key Commands

- `npm run dev` — Start dev server (runs `prebuild` first to parse resume)
- `npm run build` — Build static site to `out/` (runs `prebuild` first)
- `npm run deploy:resume` — Build, commit, and push resume changes

There are no tests, linter, or formatter configured.

## Architecture

### Resume-as-CMS Pipeline

The portfolio content is driven by a single LaTeX file parsed at build time:

1. **Source of truth:** `content/resume.tex` (LaTeX)
2. **Build script:** `scripts/build-resume.ts` (runs via `prebuild`/`predev` hooks)
3. **Parser:** `lib/resume-parser.ts` (regex-based LaTeX → TypeScript)
4. **Types:** `lib/resume-types.ts`
5. **Runtime loader:** `lib/get-resume.ts` (reads `public/data/resume.json`)

When editing portfolio content (experience, skills, education, etc.), modify `content/resume.tex` — not the components.

### Content Systems

- **Blog posts:** MDX files in `app/blog/posts/`, parsed by `app/blog/utils.ts`
- **Projects:** MDX files in `app/projects/content/`, parsed by `app/projects/utils.ts`

### Static Export

`next.config.js` sets `output: 'export'` — the entire site is pre-rendered as static HTML. No server-side features (API routes, middleware, etc.) work at runtime.

## Directory Layout

```
app/              # Next.js App Router pages and components
  components/     # React components (20 files)
  blog/posts/     # MDX blog posts
  projects/content/ # MDX project pages
content/          # resume.tex (LaTeX source)
lib/              # Resume parser, types, loader, animations
scripts/          # Build-time scripts
public/           # Static assets, generated resume.json
```

## Tech Stack

- Next.js 16, React 19, TypeScript (strict: false, strictNullChecks: true)
- Tailwind CSS v4 (alpha) via `@tailwindcss/postcss`
- Framer Motion (animations), next-mdx-remote (MDX rendering), sugar-high (syntax highlighting)
- Fonts: Playfair Display (serif) + Manrope (sans-serif)
- Dark-only theme

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to `main` using Node 20. Custom domain via `CNAME` file.
