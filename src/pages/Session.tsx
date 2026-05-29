import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import SensoryBackground from '@/components/game/SensoryBackground'
import SessionComplete from '@/components/game/SessionComplete'
import GameEngine from '@/games/GameEngine'
import type { GameResult } from '@/games/types'
import {
  DIFFICULTY_LABELS,
  getGameById,
  SKILL_EMOJI,
  SKILL_LABELS,
} from '@/data/games'
import { useGameSound } from '@/hooks/useGameSound'
import { useStore } from '@/store/useStore'

export default function Session() {
  const { gameId } = useParams<{ gameId: string }>()
  const game = gameId ? getGameById(gameId) : undefined

  const addAttempt = useStore((s) => s.addAttempt)
  const updateStars = useStore((s) => s.updateStars)
  const settings = useStore((s) => s.settings)
  const unlockItem = useStore((s) => s.unlockItem)
  const stars = useStore((s) => s.stars)

  const [result, setResult] = useState<GameResult | null>(null)
  const sound = useGameSound(settings.soundEnabled)

  const handleComplete = (gameResult: GameResult) => {
    addAttempt()
    if (gameResult.stars > 0) {
      updateStars(gameResult.stars)
    }
    sound.win()
    if (stars + gameResult.stars >= 1) unlockItem('badge-1')
    if (stars + gameResult.stars >= 5) unlockItem('badge-2')
    setResult(gameResult)
  }

  if (!game) {
    return (
      <section className="space-y-6 text-center">
        <p className="text-lg font-bold text-brand-800">Игра не найдена 😕</p>
        <Link to="/catalog" className="btn-play inline-flex">
          В каталог
        </Link>
      </section>
    )
  }

  const primarySkill = game.skills[0] ?? 'memory'

  if (result) {
    return (
      <SessionComplete
        gameTitle={game.title}
        skill={primarySkill}
        result={result}
        reducedMotion={settings.reducedMotion}
      />
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <Link
          to="/catalog"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-white/70 text-brand-700 shadow-sm backdrop-blur hover:bg-white/90"
          aria-label="Назад в каталог"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-extrabold text-brand-800 sm:text-xl">
            {SKILL_EMOJI[primarySkill]} {game.title}
          </h1>
          <p className="text-xs text-brand-600 sm:text-sm">
            {SKILL_LABELS[primarySkill]} · {DIFFICULTY_LABELS[game.difficulty]}
          </p>
        </div>
      </div>

      <SensoryBackground game={game}>
        <GameEngine
          game={game}
          onComplete={handleComplete}
          reducedMotion={settings.reducedMotion}
          soundEnabled={settings.soundEnabled}
        />
      </SensoryBackground>

      <p className="text-center text-sm font-medium text-brand-600/80">{game.instruction}</p>
    </motion.section>
  )
}
