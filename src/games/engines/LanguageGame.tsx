import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import GameBoard from '@/components/game/GameBoard'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useRoundFlow } from '@/games/useRoundFlow'
import { useGameSound } from '@/hooks/useGameSound'

const PAIRS = [
  { word: 'Яблоко', emoji: '🍎' },
  { word: 'Солнце', emoji: '☀️' },
  { word: 'Кот', emoji: '🐱' },
  { word: 'Дом', emoji: '🏠' },
  { word: 'Машина', emoji: '🚗' },
  { word: 'Цветок', emoji: '🌸' },
  { word: 'Книга', emoji: '📚' },
  { word: 'Мяч', emoji: '⚽' },
]

export default function LanguageGame({
  game,
  onComplete,
  reducedMotion,
  soundEnabled,
}: GameEngineProps) {
  const config = useMemo(
    () => getRoundConfig(game.difficulty, game.ageGroup),
    [game.difficulty, game.ageGroup],
  )
  const sound = useGameSound(soundEnabled ?? true)
  const skill = game.skills[0] ?? 'language'

  const {
    round,
    score,
    praise,
    feedback,
    roundSummary,
    finishRound,
    continueRound,
    busyRef,
  } = useRoundFlow({
    skill,
    totalRounds: config.rounds,
    onComplete,
  })

  const [target, setTarget] = useState(PAIRS[0]!)
  const [options, setOptions] = useState<string[]>([])

  const setupRound = useCallback(() => {
    const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)]!
    const others = PAIRS.filter((p) => p.emoji !== pair.emoji)
      .sort(() => Math.random() - 0.5)
      .slice(0, config.optionCount - 1)
      .map((p) => p.emoji)
    setTarget(pair)
    setOptions([pair.emoji, ...others].sort(() => Math.random() - 0.5))
  }, [config.optionCount])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handlePick = (emoji: string) => {
    if (busyRef.current) return
    if (emoji === target.emoji) {
      sound.success()
      finishRound(true)
    } else {
      sound.error()
      finishRound(false)
    }
  }

  return (
    <GameBoard
      skill={skill}
      praise={praise}
      feedback={feedback}
      roundSummary={roundSummary}
      onContinueRound={continueRound}
      reducedMotion={reducedMotion}
    >
      <RoundProgress current={round} total={config.rounds} score={score} />
      <p className="mb-2 text-center text-lg font-extrabold text-brand-800">
        📖 Найди картинку для слова:
      </p>
      <p className="mb-6 text-center text-3xl font-extrabold text-brand-600">
        {target.word}
      </p>

      <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-3">
        {options.map((emoji, i) => (
          <motion.button
            key={`${round}-${i}-${emoji}`}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handlePick(emoji)}
            disabled={busyRef.current}
            className="neon-tile flex h-20 w-20 items-center justify-center rounded-2xl text-5xl"
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </GameBoard>
  )
}
