# jayeshchotaliya.in

Personal portfolio website for **Jayesh Chotaliya** - Embedded Software Engineer at ABB.

## Features

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (Dark theme)
- **Animations:** Framer Motion
- **Content:** LaTeX resume auto-parsing + MDX support
- **SEO:** Optimized with sitemap, robots.txt, and JSON-LD schema
- **Analytics:** Vercel Speed Insights & Web Analytics
- **OG Images:** Dynamic Open Graph image generation

## LaTeX Resume Integration

The portfolio automatically parses your LaTeX resume at build time:

1. Edit `content/resume.tex` with your updated resume
2. Build the site - the parser extracts all data automatically
3. Deploy - all sections update from the single LaTeX source

## Running Locally

```bash
# Clone the repository
git clone https://github.com/jayeshchotaliyaxD/jayeshchotaliya.in.git
cd jayeshchotaliya.in

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
├── components/     # React components
├── page.tsx        # Homepage
content/
├── resume.tex      # LaTeX resume (source of truth)
lib/
├── resume-parser.ts    # LaTeX → TypeScript parser
├── resume-types.ts     # Type definitions
├── get-resume.ts       # Build-time data loader
├── animations.tsx      # Framer Motion components
```

## License

MIT © [Jayesh Chotaliya](https://github.com/jayeshchotaliyaxD)