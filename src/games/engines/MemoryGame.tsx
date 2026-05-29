import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GameBoard from '@/components/game/GameBoard'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useRoundFlow } from '@/games/useRoundFlow'
import { useGameSound } from '@/hooks/useGameSound'

const COLORS = [
  { id: 'red', cls: 'neon-tile-color-red', emoji: '🔴' },
  { id: 'blue', cls: 'neon-tile-color-blue', emoji: '🔵' },
  { id: 'green', cls: 'neon-tile-color-green', emoji: '🟢' },
  { id: 'yellow', cls: 'neon-tile-color-yellow', emoji: '🟡' },
  { id: 'purple', cls: 'neon-tile-color-purple', emoji: '🟣' },
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
  const skill = game.skills[0] ?? 'memory'

  const { round, score, praise, finishRound, busyRef } = useRoundFlow({
    totalRounds: config.rounds,
    onComplete,
  })

  const [phase, setPhase] = useState<'show' | 'input'>('show')
  const [sequence, setSequence] = useState<string[]>([])
  const [inputIdx, setInputIdx] = useState(0)
  const [highlight, setHighlight] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'ok' | 'fail' | null>(null)
  const timersRef = useRef<number[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

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
    return clearTimers
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
      timersRef.current.push(window.setTimeout(showNext, reducedMotion ? 500 : 700))
    }
    timersRef.current.push(window.setTimeout(showNext, 400))
    return clearTimers
  }, [phase, sequence, reducedMotion, sound])

  const handleTap = (id: string) => {
    if (phase !== 'input' || busyRef.current) return
    const expected = sequence[inputIdx]
    if (id === expected) {
      sound.success()
      const next = inputIdx + 1
      setInputIdx(next)
      if (next >= sequence.length) {
        setFeedback('ok')
        finishRound(true)
      }
    } else {
      sound.error()
      setFeedback('fail')
      finishRound(false)
    }
  }

  return (
    <GameBoard skill={skill} praise={praise} feedback={feedback}>
      <RoundProgress current={round} total={config.rounds} score={score} />
      <p className="mb-4 text-center text-lg font-extrabold text-brand-800">
        {phase === 'show' ? '👀 Запомни порядок!' : '👆 Повтори!'}
      </p>

      <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
        {palette.map((c) => (
          <motion.button
            key={c.id}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.92 }}
            onClick={() => handleTap(c.id)}
            disabled={phase === 'show' || busyRef.current}
            className={`neon-tile flex min-h-[4.5rem] items-center justify-center rounded-2xl text-4xl ${c.cls} ${
              highlight === c.id ? 'neon-tile-active' : ''
            } ${phase === 'show' ? 'opacity-85' : ''}`}
          >
            {c.emoji}
          </motion.button>
        ))}
      </div>
    </GameBoard>
  )
}
