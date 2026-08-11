import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Firma visual de la invitación: un tallo delgado, dorado, que crece
 * de arriba hacia abajo a medida que la persona avanza en la historia.
 * En la parte superior del tramo recorrido aparece un pequeño brote.
 * Se mantiene deliberadamente fino y silencioso: es guía, no decoración.
 */
export function GrowthRail() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.3 })
  const budTop = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-2 z-40 hidden w-6 sm:left-4 sm:block md:left-8"
      aria-hidden="true"
    >
      <div className="relative h-full w-px bg-border/60">
        <motion.div
          style={{ scaleY: progress }}
          className="absolute inset-x-0 top-0 h-full w-px origin-top bg-accent/70"
        />
        <motion.svg
          style={{ top: budTop }}
          className="absolute -left-[7px] h-4 w-4 -translate-y-1/2"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 14V6M8 6C8 6 4 6 4 3C4 3 8 2 8 6ZM8 6C8 6 12 6 12 3C12 3 8 2 8 6Z"
            stroke="rgb(var(--accent))"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </div>
  )
}
