'use client'

import Link from 'next/link'
import { GradientText, FloatingElement, TextReveal, MagneticButton, PageTransition } from 'lib/animations'

export default function NotFound() {
  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[60vh] text-center dot-pattern relative">
      <FloatingElement amplitude={8} duration={5}>
        <h1 className="text-8xl md:text-9xl font-bold mb-4">
          <GradientText>404</GradientText>
        </h1>
      </FloatingElement>

      <div className="text-xl md:text-2xl text-neutral-300 mb-4">
        <TextReveal text="Oops, this page doesn't exist" mode="word" delay={0.2} />
      </div>

      <p className="text-neutral-500 text-sm mb-8 max-w-md">
        The page you're looking for may have been moved, deleted, or never existed.
      </p>

      <div className="flex gap-4">
        <MagneticButton>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Go Home
          </Link>
        </MagneticButton>
        <MagneticButton>
          <Link
            href="/blog"
            className="px-6 py-2.5 rounded-full border border-neutral-700 text-neutral-300 text-sm font-medium hover:border-accent/40 hover:text-white transition-colors"
          >
            Read Blog
          </Link>
        </MagneticButton>
      </div>
    </PageTransition>
  )
}
