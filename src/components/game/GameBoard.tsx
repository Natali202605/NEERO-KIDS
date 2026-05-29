import { motion, AnimatePresence } from 'framer-motion'
import type { Skill } from '@/data/games'
import { moodFromFeedback } from '@/games/encouragement'
import GameMascot from '@/components/game/GameMascot'

interface GameBoardProps {
  skill: Skill
  praise?: string
  feedback?: 'ok' | 'fail' | null
  children: React.ReactNode
}

export default function GameBoard({ skill, praise, feedback = null, children }: GameBoardProps) {
  const mood = praise ? (feedback === 'fail' ? 'support' : 'cheer') : moodFromFeedback(feedback)

  return (
    <div className="relative">
      <GameMascot
        skill={skill}
        mood={mood}
        className="absolute -right-1 -top-2 z-20 sm:-right-2 sm:-top-4"
      />
      <AnimatePresence mode="wait">
        {praise && (
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
