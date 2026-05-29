import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Star } from 'lucide-react'
import type { Skill } from '@/data/games'
import { SKILL_LABELS } from '@/data/games'
import type { GameResult } from '@/games/types'
import {
  CHARACTER_NAMES,
  getEmotionWarmSummary,
  getIntellectualLevel,
  getSessionConclusion,
  getSessionTitle,
  getTrainingTip,
} from '@/games/encouragement'
import GameMascot from '@/components/game/GameMascot'

interface SessionCompleteProps {
  gameTitle: string
  skill: Skill
  result: GameResult
  reducedMotion?: boolean
  onPlayAgain: () => void
}

export default function SessionComplete({
  gameTitle,
  skill,
  result,
  reducedMotion,
  onPlayAgain,
}: SessionCompleteProps) {
  const starSlots = Array.from({ length: 3 }, (_, i) => i < result.stars)
  const ratio = result.maxScore > 0 ? result.score / result.maxScore : 0
  const title = getSessionTitle(result.score, result.maxScore)
  const conclusion = getSessionConclusion(skill, result.score, result.maxScore)
  const level = getIntellectualLevel(result.score, result.maxScore)
  const trainTip = getTrainingTip(skill, ratio)
  const character = CHARACTER_NAMES[skill]

  return (
    <motion.div
      initial={reducedMotion ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="complete-card mx-auto max-w-md p-6 sm:p-8"
    >
      <div className="flex justify-center pb-1">
        <GameMascot skill={skill} mood="cheer" size="lg" />
      </div>
      <p className="text-center text-xs font-bold text-brand-500">{character.name}</p>

      <h2 className="mt-2 text-center text-2xl font-extrabold text-brand-800">{title}</h2>
      <p className="mt-1 text-center font-semibold text-brand-600">{gameTitle}</p>

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

      <p className="text-center text-lg font-semibold text-brand-700">
        {result.score} из {result.maxScore} очков
      </p>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 p-4">
        <p className="font-extrabold text-brand-700">
          {level.emoji} Интеллектуальный уровень: {level.label}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-brand-800">{level.description}</p>
      </div>

      <div className="warm-tip mt-3">
        <p className="text-xs font-extrabold text-brand-600">🎯 Навык: {SKILL_LABELS[skill]}</p>
        <p className="mt-1 text-sm leading-relaxed text-brand-800">
          <span className="font-bold">Что тренировать: </span>
          {trainTip}
        </p>
      </div>

      <div className="session-conclusion mt-3 text-left">
        <p className="mb-1 font-extrabold text-brand-700">💌 Итог от {character.name}</p>
        <p className="leading-relaxed">{conclusion}</p>
      </div>

      {skill === 'emotion' && (
        <div className="emotion-warm-box mt-3">
          <p className="font-extrabold text-rose-600">🤗 Тёплый итог об эмоциях</p>
          <p className="mt-2 text-sm leading-relaxed text-rose-900/80">
            {getEmotionWarmSummary(result.score, result.maxScore)}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button type="button" onClick={onPlayAgain} className="btn-play flex items-center justify-center gap-2">
          <RotateCcw className="h-5 w-5" />
          Играть снова
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/catalog"
            className="btn-back flex flex-1 items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Назад
          </Link>
          <Link
            to="/rewards"
            className="btn-soft flex flex-1 items-center justify-center gap-2"
          >
            <Star className="h-5 w-5" />
            Награды
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
