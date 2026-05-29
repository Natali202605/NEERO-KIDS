import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { Skill } from '@/data/games'
import type { RoundSummaryData } from '@/games/useRoundFlow'
import GameMascot from '@/components/game/GameMascot'

interface RoundSummaryPanelProps {
  skill: Skill
  summary: RoundSummaryData
  onContinue: () => void
  reducedMotion?: boolean
}

export default function RoundSummaryPanel({
  skill,
  summary,
  onContinue,
  reducedMotion,
}: RoundSummaryPanelProps) {
  const progressPct = Math.round(((summary.round + 1) / summary.totalRounds) * 100)

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="round-summary mx-auto max-w-sm"
    >
      <div className="flex justify-center pb-2">
        <GameMascot skill={skill} mood={summary.success ? 'cheer' : 'support'} size="sm" />
      </div>

      <p className="text-center text-base font-extrabold text-brand-800">{summary.praise}</p>
      <p className="mt-2 text-center text-sm font-semibold text-brand-600">{summary.insight}</p>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs font-bold text-brand-700">
          <span>Прогресс</span>
          <span>
            Раунд {summary.round + 1} из {summary.totalRounds}
          </span>
        </div>
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-lavender-400/20 to-sky-400/20 p-3">
        <p className="text-xs font-extrabold uppercase tracking-wide text-brand-600">
          {summary.level.emoji} {summary.level.label}
        </p>
        <p className="mt-1 text-sm text-brand-800">{summary.level.description}</p>
      </div>

      <div className="warm-tip mt-3">
        <p className="text-xs font-extrabold text-coral-500">💡 Что тренировать</p>
        <p className="mt-1 text-sm leading-relaxed text-brand-800">{summary.trainTip}</p>
      </div>

      <button type="button" onClick={onContinue} className="btn-play mt-4 flex w-full items-center justify-center gap-2">
        {summary.round + 1 >= summary.totalRounds ? 'Завершить игру' : 'Продолжить'}
        <ChevronRight className="h-5 w-5" />
      </button>
    </motion.div>
  )
}
