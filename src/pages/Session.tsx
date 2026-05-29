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
  const [sessionKey, setSessionKey] = useState(0)
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

  const handlePlayAgain = () => {
    setResult(null)
    setSessionKey((k) => k + 1)
  }

  if (!game) {
    return (
      <section className="space-y-6 text-center">
        <p className="text-lg font-bold text-brand-800">Игра не найдена 😕</p>
        <Link to="/catalog" className="btn-back inline-flex">
          <ArrowLeft className="h-5 w-5" />
          Назад
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
        onPlayAgain={handlePlayAgain}
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
        <Link to="/catalog" className="btn-back shrink-0">
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Назад</span>
        </Link>
        <div className="min-w-0 flex-1 rounded-2xl bg-gradient-to-r from-brand-100/80 to-lavender-400/20 px-3 py-2">
          <h1 className="truncate text-lg font-extrabold text-brand-800 sm:text-xl">
            {SKILL_EMOJI[primarySkill]} {game.title}
          </h1>
          <p className="text-xs font-semibold text-brand-600 sm:text-sm">
            {SKILL_LABELS[primarySkill]} · {DIFFICULTY_LABELS[game.difficulty]}
          </p>
        </div>
      </div>

      <SensoryBackground game={game}>
        <GameEngine
          key={sessionKey}
          game={game}
          onComplete={handleComplete}
          reducedMotion={settings.reducedMotion}
          soundEnabled={settings.soundEnabled}
        />
      </SensoryBackground>

      <p className="text-center text-sm font-medium text-brand-600/90">{game.instruction}</p>
    </motion.section>
  )
}
