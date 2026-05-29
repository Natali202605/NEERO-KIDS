import { motion } from 'framer-motion'
import type { Skill } from '@/data/games'
import { CHARACTER_NAMES } from '@/games/encouragement'
import type { MascotMood } from '@/games/encouragement'

interface GameMascotProps {
  skill: Skill
  mood?: MascotMood
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function GameMascot({
  skill,
  mood = 'think',
  size = 'md',
  className = '',
}: GameMascotProps) {
  const sizeClass =
    size === 'lg' ? 'h-32 w-32 sm:h-36 sm:w-36' : size === 'sm' ? 'h-16 w-16' : 'h-24 w-24 sm:h-28 sm:w-28'

  const bounce = mood === 'cheer' ? { y: [0, -8, 0] } : { y: [0, -4, 0] }

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      animate={bounce}
      transition={{ repeat: Infinity, duration: mood === 'cheer' ? 1.8 : 2.8, ease: 'easeInOut' }}
      aria-hidden
    >
      <div className="character-glow relative">
        {skill === 'memory' && <BunnyMascot mood={mood} className={sizeClass} />}
        {skill === 'attention' && <OwlMascot mood={mood} className={sizeClass} />}
        {skill === 'logic' && <FoxMascot mood={mood} className={sizeClass} />}
        {skill === 'motor' && <BoltMascot mood={mood} className={sizeClass} />}
        {skill === 'language' && <ParrotMascot mood={mood} className={sizeClass} />}
        {skill === 'emotion' && <BearMascot mood={mood} className={sizeClass} />}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-extrabold text-brand-700 shadow-sm sm:text-[10px]">
          {CHARACTER_NAMES[skill].name}
        </span>
      </div>
    </motion.div>
  )
}

function MascotSvg({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <svg viewBox="0 0 120 120" className={`drop-shadow-xl ${className}`}>
      {children}
    </svg>
  )
}

function BunnyMascot({ mood, className }: { mood: MascotMood; className: string }) {
  const smile = mood === 'cheer' || mood === 'happy'
  return (
    <MascotSvg className={className}>
      <defs>
        <radialGradient id="bunny-body" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="100%" stopColor="#c084fc" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="28" rx="12" ry="28" fill="#e9d5ff" />
      <ellipse cx="90" cy="28" rx="12" ry="28" fill="#e9d5ff" />
      <ellipse cx="60" cy="72" rx="38" ry="34" fill="url(#bunny-body)" />
      <circle cx="46" cy="66" r="8" fill="white" />
      <circle cx="74" cy="66" r="8" fill="white" />
      <circle cx="48" cy="66" r="4" fill="#312e81" />
      <circle cx="76" cy="66" r="4" fill="#312e81" />
      <circle cx="50" cy="64" r="1.5" fill="white" />
      <circle cx="78" cy="64" r="1.5" fill="white" />
      <ellipse cx="38" cy="78" rx="6" ry="4" fill="#f9a8d4" opacity="0.6" />
      <ellipse cx="82" cy="78" rx="6" ry="4" fill="#f9a8d4" opacity="0.6" />
      {smile ? (
        <path d="M 48 84 Q 60 94 72 84" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 52 86 Q 60 82 68 86" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      <text x="88" y="40" fontSize="14">⭐</text>
    </MascotSvg>
  )
}

function OwlMascot({ mood, className }: { mood: MascotMood; className: string }) {
  return (
    <MascotSvg className={className}>
      <defs>
        <radialGradient id="owl-body" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#0284c7" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="68" rx="40" ry="38" fill="url(#owl-body)" />
      <circle cx="60" cy="55" r="28" fill="#e0f2fe" />
      <circle cx="48" cy="54" r="12" fill="white" />
      <circle cx="72" cy="54" r="12" fill="white" />
      <circle cx="48" cy="54" r="6" fill="#0c4a6e" />
      <circle cx="72" cy="54" r="6" fill="#0c4a6e" />
      <circle cx="50" cy="52" r="2" fill="white" />
      <circle cx="74" cy="52" r="2" fill="white" />
      <polygon points="60,68 54,78 66,78" fill="#f59e0b" />
      <path
        d={mood === 'cheer' ? 'M 48 88 Q 60 98 72 88' : 'M 50 90 Q 60 86 70 90'}
        stroke="#0369a1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <text x="82" y="35" fontSize="16">🔍</text>
    </MascotSvg>
  )
}

function FoxMascot({ mood, className }: { mood: MascotMood; className: string }) {
  return (
    <MascotSvg className={className}>
      <polygon points="30,50 45,20 55,50" fill="#fb923c" />
      <polygon points="90,50 75,20 65,50" fill="#fb923c" />
      <ellipse cx="60" cy="72" rx="36" ry="32" fill="#fdba74" />
      <ellipse cx="60" cy="78" rx="18" ry="14" fill="#fff7ed" />
      <circle cx="48" cy="66" r="7" fill="white" />
      <circle cx="72" cy="66" r="7" fill="white" />
      <circle cx="49" cy="66" r="3.5" fill="#431407" />
      <circle cx="73" cy="66" r="3.5" fill="#431407" />
      <circle cx="60" cy="76" r="4" fill="#431407" />
      <path
        d={mood === 'cheer' ? 'M 48 86 Q 60 96 72 86' : 'M 50 88 Q 60 84 70 88'}
        stroke="#c2410c"
        strokeWidth="2.5"
        fill="none"
      />
      <text x="82" y="38" fontSize="14">🧩</text>
    </MascotSvg>
  )
}

function BoltMascot({ mood, className }: { mood: MascotMood; className: string }) {
  return (
    <MascotSvg className={className}>
      <ellipse cx="60" cy="72" rx="38" ry="34" fill="#fde047" />
      <ellipse cx="60" cy="78" rx="22" ry="18" fill="#fef9c3" />
      <circle cx="46" cy="64" r="8" fill="white" />
      <circle cx="74" cy="64" r="8" fill="white" />
      <circle cx="48" cy="64" r="4" fill="#713f12" />
      <circle cx="76" cy="64" r="4" fill="#713f12" />
      <path
        d={mood === 'cheer' ? 'M 48 84 Q 60 94 72 84' : 'M 50 86 Q 60 82 70 86'}
        stroke="#ca8a04"
        strokeWidth="2.5"
        fill="none"
      />
      <polygon points="60,18 54,38 62,38 56,52 72,32 64,32 68,18" fill="#facc15" stroke="#eab308" strokeWidth="1" />
    </MascotSvg>
  )
}

function ParrotMascot({ mood, className }: { mood: MascotMood; className: string }) {
  return (
    <MascotSvg className={className}>
      <ellipse cx="60" cy="74" rx="34" ry="30" fill="#60a5fa" />
      <circle cx="60" cy="50" r="26" fill="#93c5fd" />
      <circle cx="50" cy="48" r="8" fill="white" />
      <circle cx="70" cy="48" r="8" fill="white" />
      <circle cx="51" cy="48" r="4" fill="#1e3a8a" />
      <circle cx="71" cy="48" r="4" fill="#1e3a8a" />
      <polygon points="60,56 52,64 68,64" fill="#f59e0b" />
      <path
        d={mood === 'cheer' ? 'M 48 82 Q 60 90 72 82' : 'M 50 84 Q 60 80 70 84'}
        stroke="#1d4ed8"
        strokeWidth="2"
        fill="none"
      />
      <rect x="78" y="30" width="22" height="16" rx="6" fill="white" opacity="0.9" />
      <text x="82" y="42" fontSize="10" fill="#1d4ed8">Аа</text>
    </MascotSvg>
  )
}

function BearMascot({ mood, className }: { mood: MascotMood; className: string }) {
  return (
    <MascotSvg className={className}>
      <circle cx="28" cy="38" r="14" fill="#fda4af" />
      <circle cx="92" cy="38" r="14" fill="#fda4af" />
      <ellipse cx="60" cy="72" rx="40" ry="36" fill="#fb7185" />
      <ellipse cx="60" cy="78" rx="20" ry="16" fill="#fecdd3" />
      <circle cx="46" cy="64" r="8" fill="white" />
      <circle cx="74" cy="64" r="8" fill="white" />
      <circle cx="48" cy="64" r="4" fill="#881337" />
      <circle cx="76" cy="64" r="4" fill="#881337" />
      <ellipse cx="60" cy="74" rx="5" ry="4" fill="#be123c" />
      <path
        d={mood === 'cheer' || mood === 'support' ? 'M 46 86 Q 60 96 74 86' : 'M 48 88 Q 60 84 72 88'}
        stroke="#be123c"
        strokeWidth="2.5"
        fill="none"
      />
      <text x="80" y="32" fontSize="16">💛</text>
    </MascotSvg>
  )
}
