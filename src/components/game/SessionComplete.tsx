import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Skill } from '@/data/games'
import type { GameResult } from '@/games/types'
import { getSessionConclusion, getSessionTitle } from '@/games/encouragement'
import GameMascot from '@/components/game/GameMascot'

interface SessionCompleteProps {
  gameTitle: string
  skill: Skill
  result: GameResult
  reducedMotion?: boolean
}

export default function SessionComplete({
  gameTitle,
  skill,
  result,
  reducedMotion,
}: SessionCompleteProps) {
  const starSlots = Array.from({ length: 3 }, (_, i) => i < result.stars)
  const title = getSessionTitle(result.score, result.maxScore)
  const conclusion = getSessionConclusion(skill, result.score, result.maxScore)

  return (
    <motion.div
      initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="kid-card mx-auto max-w-md p-6 text-center sm:p-8"
    >
      <div className="relative mx-auto mb-2 flex justify-center">
        <GameMascot skill={skill} mood="cheer" />
      </div>

      <h2 className="text-2xl font-extrabold text-brand-800">{title}</h2>
      <p className="mt-1 font-semibold text-brand-600">{gameTitle}</p>

      <div className="my-5 flex justify-center gap-2">
        {starSlots.map((filled, i) => (
          <motion.span
            key={i}
            initial={reducedMotion ? false : { scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: reducedMotion ? 0 : i * 0.15 }}
            className={`text-4xl ${filled ? '' : 'opacity-30 grayscale'}`}
          >
            ⭐
          </motion.span>
        ))}
      </div>

      <p className="text-lg font-semibold text-slate-700">
        {result.score} из {result.maxScore} очков
      </p>

      <div className="session-conclusion text-left">
        <p className="mb-1 font-extrabold text-brand-700">📝 Итог занятия</p>
        <p>{conclusion}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/catalog" className="btn-play inline-flex items-center justify-center gap-2">
          <Star className="h-5 w-5" />
          Ещё игры
        </Link>
        <Link
          to="/rewards"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-brand-200 bg-white/80 px-6 font-bold text-brand-700 transition hover:bg-brand-50"
        >
          Награды
        </Link>
      </div>
    </motion.div>
  )
}
