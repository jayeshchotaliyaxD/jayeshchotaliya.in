'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineMap,
  HiOutlineMail,
  HiOutlineDocumentText,
} from 'react-icons/hi'
import type { IconType } from 'react-icons'

interface DockItem {
  id: string
  label: string
  href: string
  icon: IconType
  external?: boolean
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: HiOutlineHome },
  { id: 'about', label: 'About', href: '#about', icon: HiOutlineUser },
  { id: 'skills', label: 'Skills', href: '#skills', icon: HiOutlineSparkles },
  { id: 'journey', label: 'Journey', href: '#journey', icon: HiOutlineMap },
  { id: 'contact', label: 'Contact', href: '#contact', icon: HiOutlineMail },
  {
    id: 'resume',
    label: 'Résumé',
    href: '/resume.pdf',
    icon: HiOutlineDocumentText,
    external: true,
  },
]

export default function Dock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      aria-label="Section navigation"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 1 }}
      className="fixed bottom-5 left-1/2 z-50 flex h-16 -translate-x-1/2 items-end gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 pb-3 backdrop-blur-xl"
    >
      {DOCK_ITEMS.map((item) => (
        <DockIcon key={item.id} mouseX={mouseX} item={item} />
      ))}
    </motion.nav>
  )
}

function DockIcon({ mouseX, item }: { mouseX: MotionValue; item: DockItem }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-140, 0, 140], [40, 76, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const Icon = item.icon

  return (
    <a
      ref={ref}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className="group relative"
    >
      <motion.span
        style={{ width }}
        className="flex aspect-square w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:bg-accent/20 hover:text-white"
      >
        <Icon className="h-1/2 w-1/2" />
      </motion.span>

      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
    </a>
  )
}
