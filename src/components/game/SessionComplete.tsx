import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Trophy } from 'lucide-react'
import type { GameResult } from '@/games/types'

interface SessionCompleteProps {
  gameTitle: string
  result: GameResult
  reducedMotion?: boolean
}

export default function SessionComplete({
  gameTitle,
  result,
  reducedMotion,
}: SessionCompleteProps) {
  const stars = Array.from({ length: 3 }, (_, i) => i < result.stars)

  return (
    <motion.div
      initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="kid-card mx-auto max-w-md p-6 text-center sm:p-8"
    >
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sun-400 to-coral-400 shadow-lg">
        <Trophy className="h-10 w-10 text-white" />
      </div>

      <h2 className="text-2xl font-extrabold text-brand-800">Молодец!</h2>
      <p className="mt-1 text-brand-600">{gameTitle}</p>

      <div className="my-5 flex justify-center gap-2">
        {stars.map((filled, i) => (
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/catalog" className="btn-play inline-flex items-center justify-center gap-2">
          <Star className="h-5 w-5" />
          Ещё игры
        </Link>
        <Link
          to="/rewards"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-brand-200 bg-white px-6 font-bold text-brand-700 transition hover:bg-brand-50"
        >
          Награды
        </Link>
      </div>
    </motion.div>
  )
}
