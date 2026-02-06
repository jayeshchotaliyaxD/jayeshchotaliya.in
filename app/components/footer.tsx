import { 
  SiGithub, 
  SiLinkedin, 
} from 'react-icons/si';

const socialLinks = [
  { name: 'github', url: 'https://github.com/jayeshchotaliyaxD', icon: SiGithub },
  { name: 'linkedin', url: 'https://linkedin.com/in/jayeshchotaliya', icon: SiLinkedin },
]

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="mt-8 flex flex-row space-x-4">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <a
              className="flex items-center transition-all text-neutral-600 hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.url}
              aria-label={link.name}
            >
              <link.icon />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-neutral-500 text-xs">
        © {new Date().getFullYear()} Jayesh Chotaliya | Embedded Software Engineer
      </p>
    </footer>
  )
}