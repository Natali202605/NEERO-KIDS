import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig, scoreToStars } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useGameSound } from '@/hooks/useGameSound'

const SHAPES = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠']

export default function LogicGame({
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
  const [pattern, setPattern] = useState<string[]>([])
  const [answer, setAnswer] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'ok' | 'fail' | null>(null)

  const setupRound = useCallback(() => {
    const len = config.sequenceLength
    const base = SHAPES[Math.floor(Math.random() * config.optionCount)]!
    const alt = SHAPES.find((s) => s !== base) ?? SHAPES[0]!
    const seq: string[] = []
    for (let i = 0; i < len; i++) seq.push(i % 2 === 0 ? base : alt)
    const correct = seq.length % 2 === 0 ? base : alt
    setPattern(seq)
    setAnswer(correct)
    const opts = [correct, ...SHAPES.filter((s) => s !== correct).slice(0, config.optionCount - 1)]
    setOptions(opts.sort(() => Math.random() - 0.5))
    setFeedback(null)
  }, [config.optionCount, config.sequenceLength])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handlePick = (shape: string) => {
    if (feedback) return
    if (shape === answer) {
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
      <p className="mb-4 text-center text-lg font-bold text-white drop-shadow">
        🧩 Что дальше в ряду?
      </p>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {pattern.map((s, i) => (
          <span key={i} className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/90 text-3xl shadow-md">
            {s}
          </span>
        ))}
        <span className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-dashed border-white/80 bg-white/30 text-3xl font-bold text-white">
          ?
        </span>
      </div>

      {feedback === 'ok' && <p className="mb-2 text-center font-bold text-sun-300">✨ Верно!</p>}
      {feedback === 'fail' && <p className="mb-2 text-center font-bold text-white/90">Не страшно!</p>}

      <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-3">
        {options.map((shape) => (
          <motion.button
            key={shape}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handlePick(shape)}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-lg hover:brightness-105 active:scale-95"
          >
            {shape}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
