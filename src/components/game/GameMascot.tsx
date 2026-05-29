import { motion } from 'framer-motion'
import type { Skill } from '@/data/games'
import type { MascotMood } from '@/games/encouragement'

const SKILL_COLORS: Record<Skill, { body: string; cheek: string; accent: string }> = {
  memory: { body: '#c4b5fd', cheek: '#f9a8d4', accent: '#8b5cf6' },
  attention: { body: '#7dd3fc', cheek: '#fda4af', accent: '#0ea5e9' },
  logic: { body: '#86efac', cheek: '#fcd34d', accent: '#22c55e' },
  motor: { body: '#fcd34d', cheek: '#fb923c', accent: '#f59e0b' },
  language: { body: '#93c5fd', cheek: '#f0abfc', accent: '#3b82f6' },
  emotion: { body: '#fda4af', cheek: '#fde68a', accent: '#f43f5e' },
}

interface GameMascotProps {
  skill: Skill
  mood?: MascotMood
  className?: string
}

export default function GameMascot({ skill, mood = 'think', className = '' }: GameMascotProps) {
  const c = SKILL_COLORS[skill]
  const eyeScaleY = mood === 'cheer' ? 0.6 : mood === 'support' ? 1.1 : 1
  const mouthPath =
    mood === 'cheer'
      ? 'M 38 58 Q 50 68 62 58'
      : mood === 'support'
        ? 'M 40 60 Q 50 55 60 60'
        : mood === 'happy'
          ? 'M 38 57 Q 50 65 62 57'
          : 'M 42 58 Q 50 62 58 58'

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      animate={mood === 'cheer' ? { y: [0, -6, 0] } : { y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-24 w-24 drop-shadow-lg sm:h-28 sm:w-28">
        <defs>
          <radialGradient id={`body-${skill}`} cx="40%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor={c.body} />
          </radialGradient>
          <filter id={`glow-${skill}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* тело — округлое как у Pixar */}
        <ellipse cx="50" cy="58" rx="32" ry="30" fill={`url(#body-${skill})`} filter={`url(#glow-${skill})`} />
        {/* уши/боковые шарики */}
        <circle cx="22" cy="48" r="10" fill={c.body} opacity="0.85" />
        <circle cx="78" cy="48" r="10" fill={c.body} opacity="0.85" />
        {/* глаза */}
        <ellipse cx="38" cy="46" rx="7" ry={7 * eyeScaleY} fill="white" />
        <ellipse cx="62" cy="46" rx="7" ry={7 * eyeScaleY} fill="white" />
        <circle cx="40" cy="46" r="3.5" fill="#1e293b" />
        <circle cx="64" cy="46" r="3.5" fill="#1e293b" />
        <circle cx="41" cy="44.5" r="1.2" fill="white" />
        <circle cx="65" cy="44.5" r="1.2" fill="white" />
        {/* щёки */}
        <circle cx="28" cy="54" r="5" fill={c.cheek} opacity="0.5" />
        <circle cx="72" cy="54" r="5" fill={c.cheek} opacity="0.5" />
        {/* рот */}
        <path d={mouthPath} stroke={c.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* блик на голове */}
        <ellipse cx="42" cy="32" rx="12" ry="6" fill="white" opacity="0.35" />
      </svg>
    </motion.div>
  )
}
