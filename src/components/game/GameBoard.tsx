import { motion, AnimatePresence } from 'framer-motion'
import type { Skill } from '@/data/games'
import { moodFromFeedback } from '@/games/encouragement'
import type { RoundSummaryData } from '@/games/useRoundFlow'
import GameMascot from '@/components/game/GameMascot'
import RoundSummaryPanel from '@/components/game/RoundSummaryPanel'

interface GameBoardProps {
  skill: Skill
  praise?: string
  feedback?: 'ok' | 'fail' | null
  roundSummary?: RoundSummaryData | null
  onContinueRound?: () => void
  reducedMotion?: boolean
  children: React.ReactNode
}

export default function GameBoard({
  skill,
  praise,
  feedback = null,
  roundSummary,
  onContinueRound,
  reducedMotion,
  children,
}: GameBoardProps) {
  const mood = praise ? (feedback === 'fail' ? 'support' : 'cheer') : moodFromFeedback(feedback)

  if (roundSummary && onContinueRound) {
    return (
      <RoundSummaryPanel
        skill={skill}
        summary={roundSummary}
        onContinue={onContinueRound}
        reducedMotion={reducedMotion}
      />
    )
  }

  return (
    <div className="relative pt-2">
      <GameMascot
        skill={skill}
        mood={mood}
        className="absolute -left-1 -top-4 z-20 sm:-left-2 sm:-top-6"
      />
      <AnimatePresence mode="wait">
        {praise && !roundSummary && (
          <motion.div
            key={praise}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            className="encourage-bubble mx-auto mb-4 max-w-sm text-center"
          >
            {praise}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="game-panel">{children}</div>
    </div>
  )
}
