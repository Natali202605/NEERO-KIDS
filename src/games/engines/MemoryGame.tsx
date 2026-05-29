import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig, scoreToStars } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useGameSound } from '@/hooks/useGameSound'

const COLORS = [
  { id: 'red', bg: 'bg-coral-400', emoji: '🔴' },
  { id: 'blue', bg: 'bg-sky-400', emoji: '🔵' },
  { id: 'green', bg: 'bg-grass-400', emoji: '🟢' },
  { id: 'yellow', bg: 'bg-sun-400', emoji: '🟡' },
  { id: 'purple', bg: 'bg-lavender-400', emoji: '🟣' },
]

export default function MemoryGame({
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
  const palette = COLORS.slice(0, config.optionCount)

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'show' | 'input'>('show')
  const [sequence, setSequence] = useState<string[]>([])
  const [inputIdx, setInputIdx] = useState(0)
  const [highlight, setHighlight] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'ok' | 'fail' | null>(null)

  const startRound = useCallback(() => {
    const seq = Array.from({ length: config.sequenceLength }, () => {
      const pick = palette[Math.floor(Math.random() * palette.length)]!
      return pick.id
    })
    setSequence(seq)
    setInputIdx(0)
    setPhase('show')
    setFeedback(null)
  }, [config.sequenceLength, palette])

  useEffect(() => {
    startRound()
  }, [round, startRound])

  useEffect(() => {
    if (phase !== 'show' || sequence.length === 0) return

    let i = 0
    const showNext = () => {
      if (i >= sequence.length) {
        setHighlight(null)
        setPhase('input')
        return
      }
      setHighlight(sequence[i]!)
      sound.tap()
      i++
      setTimeout(showNext, reducedMotion ? 500 : 700)
    }
    const t = setTimeout(showNext, 400)
    return () => clearTimeout(t)
  }, [phase, sequence, reducedMotion, sound])

  const handleTap = (id: string) => {
    if (phase !== 'input') return
    const expected = sequence[inputIdx]
    if (id === expected) {
      sound.success()
      const next = inputIdx + 1
      setInputIdx(next)
      if (next >= sequence.length) {
        setFeedback('ok')
        setScore((s) => s + 1)
        setTimeout(() => {
          if (round + 1 >= config.rounds) {
            const max = config.rounds
            onComplete({ score: score + 1, maxScore: max, stars: scoreToStars(score + 1, max) })
          } else {
            setRound((r) => r + 1)
          }
        }, 600)
      }
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
        {phase === 'show' ? '👀 Запомни порядок!' : '👆 Повтори!'}
      </p>

      {feedback === 'ok' && (
        <p className="mb-2 text-center text-xl font-bold text-sun-300">✨ Отлично!</p>
      )}
      {feedback === 'fail' && (
        <p className="mb-2 text-center text-xl font-bold text-white/90">Попробуем ещё!</p>
      )}

      <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
        {palette.map((c) => (
          <motion.button
            key={c.id}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.92 }}
            onClick={() => handleTap(c.id)}
            disabled={phase === 'show'}
            className={`flex min-h-[4.5rem] items-center justify-center rounded-2xl text-4xl shadow-lg transition ${
              c.bg
            } ${highlight === c.id ? 'ring-4 ring-white scale-105' : ''} ${
              phase === 'show' ? 'opacity-80' : 'hover:brightness-110 active:brightness-95'
            }`}
          >
            {c.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
