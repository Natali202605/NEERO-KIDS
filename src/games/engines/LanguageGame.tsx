import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig, scoreToStars } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
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

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(PAIRS[0]!)
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'ok' | 'fail' | null>(null)

  const setupRound = useCallback(() => {
    const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)]!
    const others = PAIRS.filter((p) => p.emoji !== pair.emoji)
      .sort(() => Math.random() - 0.5)
      .slice(0, config.optionCount - 1)
      .map((p) => p.emoji)
    setTarget(pair)
    setOptions([pair.emoji, ...others].sort(() => Math.random() - 0.5))
    setFeedback(null)
  }, [config.optionCount])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handlePick = (emoji: string) => {
    if (feedback) return
    if (emoji === target.emoji) {
      sound.success()
      setFeedback('ok')
      const newScore = score + 1
      setScore(newScore)
      setTimeout(() => {
        if (round + 1 >= config.rounds) {
          onComplete({
            score: newScore,
            maxScore: config.rounds,
            stars: scoreToStars(newScore, config.rounds),
          })
        } else {
          setRound((r) => r + 1)
        }
      }, 600)
    } else {
      sound.error()
      setFeedback('fail')
      setTimeout(() => {
        if (round + 1 >= config.rounds) {
          onComplete({ score, maxScore: config.rounds, stars: scoreToStars(score, config.rounds) })
        } else {
          setRound((r) => r + 1)
        }
      }, 800)
    }
  }

  return (
    <div>
      <RoundProgress current={round} total={config.rounds} score={score} />
      <p className="mb-2 text-center text-lg font-bold text-white drop-shadow">
        📖 Найди картинку для слова:
      </p>
      <p className="mb-6 text-center text-3xl font-extrabold text-sun-300 drop-shadow">
        {target.word}
      </p>

      {feedback === 'ok' && <p className="mb-2 text-center font-bold text-sun-300">✨ Верно!</p>}
      {feedback === 'fail' && <p className="mb-2 text-center font-bold text-white/90">Попробуем ещё!</p>}

      <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-3">
        {options.map((emoji) => (
          <motion.button
            key={emoji}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handlePick(emoji)}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-lg hover:brightness-105"
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
