'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'

interface ScrollyCanvasProps {
  name: string
  title: string
  tagline: string
  skills: string[]
}

const FRAME_COUNT = 72
const FRAME_WIDTH = 960
const FRAME_HEIGHT = 1280
const PORTRAIT_SRC = '/portrait-cinematic.png'

type Frame = HTMLCanvasElement | HTMLImageElement

function drawCover(
  context: CanvasRenderingContext2D,
  source: Frame,
  canvasWidth: number,
  canvasHeight: number,
  zoom = 1,
  offsetX = 0,
  offsetY = 0
) {
  const sourceWidth = source instanceof HTMLImageElement ? source.naturalWidth : source.width
  const sourceHeight = source instanceof HTMLImageElement ? source.naturalHeight : source.height

  const scale = Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight) * zoom
  const drawWidth = sourceWidth * scale
  const drawHeight = sourceHeight * scale
  const x = (canvasWidth - drawWidth) / 2 + offsetX
  const y = (canvasHeight - drawHeight) / 2 + offsetY

  context.drawImage(source, x, y, drawWidth, drawHeight)
}

function paintCinematicGrade(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  const blue = context.createLinearGradient(0, 0, width, height)
  blue.addColorStop(0, `rgba(11, 31, 75, ${0.52 + progress * 0.12})`)
  blue.addColorStop(0.52, 'rgba(8, 13, 27, 0.04)')
  blue.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = blue
  context.fillRect(0, 0, width, height)

  const orange = context.createRadialGradient(width * 0.65, height * 0.7, 0, width * 0.65, height * 0.7, width * 0.9)
  orange.addColorStop(0, `rgba(234, 88, 12, ${0.18 + progress * 0.16})`)
  orange.addColorStop(0.42, 'rgba(127, 29, 29, 0.16)')
  orange.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = orange
  context.fillRect(0, 0, width, height)

  const vignette = context.createRadialGradient(width * 0.5, height * 0.42, width * 0.14, width * 0.5, height * 0.48, width * 0.72)
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
  vignette.addColorStop(0.62, 'rgba(0, 0, 0, 0.16)')
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.74)')
  context.fillStyle = vignette
  context.fillRect(0, 0, width, height)
}

function buildFrames(image: HTMLImageElement) {
  return Array.from({ length: FRAME_COUNT }, (_, index) => {
    const progress = index / (FRAME_COUNT - 1)
    const frame = document.createElement('canvas')
    const context = frame.getContext('2d')

    frame.width = FRAME_WIDTH
    frame.height = FRAME_HEIGHT

    if (!context) {
      return frame
    }

    context.fillStyle = '#06070c'
    context.fillRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT)

    context.save()
    context.translate(FRAME_WIDTH / 2, FRAME_HEIGHT / 2)
    context.rotate((progress - 0.5) * 0.018)
    context.translate(-FRAME_WIDTH / 2, -FRAME_HEIGHT / 2)
    drawCover(
      context,
      image,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      1.08 + progress * 0.12,
      (progress - 0.5) * -52,
      Math.sin(progress * Math.PI) * -42
    )
    context.restore()

    paintCinematicGrade(context, FRAME_WIDTH, FRAME_HEIGHT, progress)

    return frame
  })
}

export default function ScrollyCanvas({
  name,
  title,
  tagline,
  skills,
}: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<Frame[]>([])
  const frameRef = useRef(0)
  const [isReady, setIsReady] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const firstOpacity = useTransform(scrollYProgress, [0, 0.12, 0.26], [1, 1, 0])
  const firstY = useTransform(scrollYProgress, [0, 0.26], [0, -90])
  const secondOpacity = useTransform(scrollYProgress, [0.2, 0.32, 0.48, 0.58], [0, 1, 1, 0])
  const secondX = useTransform(scrollYProgress, [0.22, 0.58], [-80, 30])
  const thirdOpacity = useTransform(scrollYProgress, [0.5, 0.62, 0.78, 0.9], [0, 1, 1, 0])
  const thirdX = useTransform(scrollYProgress, [0.5, 0.9], [90, -24])
  const badgeOpacity = useTransform(scrollYProgress, [0.76, 0.9, 1], [0, 1, 1])

  const featuredSkills = useMemo(() => skills.slice(0, 5), [skills])

  useEffect(() => {
    let cancelled = false
    const image = new Image()

    image.src = PORTRAIT_SRC
    image.onload = () => {
      if (cancelled) {
        return
      }
      framesRef.current = buildFrames(image)
      setIsReady(true)
    }

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const render = () => {
      const parent = canvas.parentElement
      const width = parent?.clientWidth || window.innerWidth
      const height = parent?.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const frame = framesRef.current[frameRef.current]

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#06070c'
      context.fillRect(0, 0, width, height)

      if (frame) {
        drawCover(context, frame, width, height, 1)
      }

      context.fillStyle = 'rgba(2, 6, 23, 0.32)'
      context.fillRect(0, 0, width, height)
    }

    render()
    window.addEventListener('resize', render)

    return () => window.removeEventListener('resize', render)
  }, [isReady])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frames = framesRef.current

    if (!frames.length) {
      return
    }

    frameRef.current = Math.min(
      frames.length - 1,
      Math.max(0, Math.round(latest * (frames.length - 1)))
    )

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const parent = canvas?.parentElement

    if (!canvas || !context || !parent) {
      return
    }

    const width = parent.clientWidth
    const height = parent.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, width, height)
    context.fillStyle = '#06070c'
    context.fillRect(0, 0, width, height)
    drawCover(context, frames[frameRef.current], width, height, 1)
    context.fillStyle = 'rgba(2, 6, 23, 0.32)'
    context.fillRect(0, 0, width, height)
  })

  return (
    <section ref={containerRef} id="home" className="relative h-[500vh] bg-[#06070c]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-label={`${name} cinematic portrait animation`}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.14),transparent_22%),linear-gradient(90deg,rgba(2,6,23,0.78),transparent_32%,transparent_68%,rgba(2,6,23,0.8))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.76)_100%)]" />

        {!isReady && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(234,88,12,0.28),transparent_34%),radial-gradient(circle_at_26%_22%,rgba(59,130,246,0.32),transparent_32%),#06070c]" />
        )}

        <motion.div
          style={{ opacity: firstOpacity, y: firstY }}
          className="absolute inset-x-6 top-[17vh] z-10 mx-auto max-w-5xl text-center"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.42em] text-orange-200/80">
            Embedded systems / industrial IoT
          </p>
          <h1 className="font-sans text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            {name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-xl">
            {title}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: secondOpacity, x: secondX }}
          className="absolute left-6 top-[32vh] z-10 max-w-xl md:left-16 lg:left-24"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.38em] text-blue-200/80">
            What I build
          </p>
          <h2 className="font-sans text-4xl font-bold leading-tight text-white sm:text-6xl">
            I build secure digital experiences for real machines.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300">
            {tagline}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: thirdOpacity, x: thirdX }}
          className="absolute right-6 top-[36vh] z-10 max-w-xl text-right md:right-16 lg:right-24"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.38em] text-orange-200/80">
            Focus
          </p>
          <h2 className="font-sans text-4xl font-bold leading-tight text-white sm:text-6xl">
            Bridging firmware, cloud, and industrial reliability.
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: badgeOpacity }}
          className="absolute inset-x-6 bottom-12 z-10 mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3"
        >
          {featuredSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-neutral-100 shadow-2xl backdrop-blur-md"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
