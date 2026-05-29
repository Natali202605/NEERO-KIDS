import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import GameBoard from '@/components/game/GameBoard'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useRoundFlow } from '@/games/useRoundFlow'
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
  const skill = game.skills[0] ?? 'logic'

  const { round, score, praise, finishRound, busyRef } = useRoundFlow({
    totalRounds: config.rounds,
    onComplete,
  })

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
    const correct = len % 2 === 0 ? base : alt
    setPattern(seq)
    setAnswer(correct)
    const opts = [correct, ...SHAPES.filter((s) => s !== correct).slice(0, config.optionCount - 1)]
    setOptions([...new Set(opts)].sort(() => Math.random() - 0.5))
    setFeedback(null)
  }, [config.optionCount, config.sequenceLength])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handlePick = (shape: string) => {
    if (feedback || busyRef.current) return
    if (shape === answer) {
      sound.success()
      setFeedback('ok')
      finishRound(true)
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
        🧩 Что дальше в ряду?
      </p>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {pattern.map((s, i) => (
          <span
            key={i}
            className="neon-tile flex h-14 w-14 items-center justify-center rounded-xl text-3xl"
          >
            {s}
          </span>
        ))}
        <span className="neon-tile flex h-14 w-14 items-center justify-center rounded-xl border-2 border-dashed border-brand-300 text-3xl font-bold text-brand-500">
          ?
        </span>
      </div>

      <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-3">
        {options.map((shape, i) => (
          <motion.button
            key={`${round}-${i}-${shape}`}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handlePick(shape)}
            disabled={busyRef.current}
            className="neon-tile flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
          >
            {shape}
          </motion.button>
        ))}
      </div>
    </GameBoard>
  )
}
