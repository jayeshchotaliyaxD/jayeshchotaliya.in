'use client'

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  animate,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import { type ReactNode, useRef, useEffect, useState, useCallback } from 'react'

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

// Fade-in on scroll component
interface FadeInViewProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeInView({ children, delay = 0, className = '' }: FadeInViewProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade-in without vertical movement
interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for list items
interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item (must be child of StaggerContainer)
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hover scale effect for cards
interface HoverScaleProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function HoverScale({ children, scale = 1.02, className = '' }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Hover lift effect (scale + shadow)
interface HoverLiftProps {
  children: ReactNode
  className?: string
}

export function HoverLift({ children, className = '' }: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated underline on hover
interface AnimatedLinkProps {
  children: ReactNode
  href: string
  className?: string
  external?: boolean
}

export function AnimatedLink({ children, href, className = '', external = false }: AnimatedLinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover="hover"
      {...externalProps}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-current"
        initial={{ width: '100%' }}
        variants={{
          hover: { width: '0%', transition: { duration: 0.2 } },
        }}
      />
    </motion.a>
  )
}

// Section wrapper with consistent animation
interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Animated tag/badge
interface AnimatedBadgeProps {
  children: ReactNode
  className?: string
}

export function AnimatedBadge({ children, className = '' }: AnimatedBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

// ========================
// Advanced Animation Components
// ========================

// Text reveal — staggers words or characters on scroll
interface TextRevealProps {
  text: string
  mode?: 'word' | 'character'
  className?: string
  delay?: number
}

export function TextReveal({ text, mode = 'word', className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const units = mode === 'word' ? text.split(' ') : text.split('')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: delay + i * 0.05, ease: 'easeOut' }}
          className="inline-block"
        >
          {unit}
          {mode === 'word' && i < units.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

// Parallax section — subtle vertical parallax on scroll
interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.3, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 50, speed * -50])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

// CountUp — animated number counter triggered on viewport entry
interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, end, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayValue(v.toFixed(decimals)),
      })
      return controls.stop
    }
  }, [isInView, end, duration, motionValue, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

// GradientText — animated gradient text
interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  to?: string
}

export function GradientText({
  children,
  className = '',
  from = '#4c97f8',
  to = '#a855f7',
}: GradientTextProps) {
  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </span>
  )
}

// MagneticButton — cursor-following magnetic hover effect
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = '', strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((e.clientX - centerX) * strength)
      y.set((e.clientY - centerY) * strength)
    },
    [strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

// PageTransition — mount fade-in animation wrapper
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// FloatingElement — gentle infinite floating/bobbing animation
interface FloatingElementProps {
  children: ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
}

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 4,
  delay = 0,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// AnimatedGradientBorder — card with rotating gradient border
interface AnimatedGradientBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: string
}

export function AnimatedGradientBorder({
  children,
  className = '',
  borderRadius = '0.75rem',
}: AnimatedGradientBorderProps) {
  return (
    <div className={`relative p-[1px] overflow-hidden ${className}`} style={{ borderRadius }}>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg, #4c97f8, #a855f7, #ec4899, #4c97f8)',
          borderRadius,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="relative bg-neutral-900 h-full"
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
      >
        {children}
      </div>
    </div>
  )
}
