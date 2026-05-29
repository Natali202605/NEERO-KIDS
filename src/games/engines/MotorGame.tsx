import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GameBoard from '@/components/game/GameBoard'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useRoundFlow } from '@/games/useRoundFlow'
import { useGameSound } from '@/hooks/useGameSound'

type Phase = 'wait' | 'go' | 'early'

export default function MotorGame({
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
  const skill = game.skills[0] ?? 'motor'
  const timerRef = useRef<number | null>(null)

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

  const [phase, setPhase] = useState<Phase>('wait')

  useEffect(() => {
    if (roundSummary) return
    setPhase('wait')
    const delay = 800 + Math.random() * 2000
    timerRef.current = window.setTimeout(() => {
      if (!busyRef.current) setPhase('go')
      sound.tap()
    }, delay)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [round, roundSummary, sound, busyRef])

  useEffect(() => {
    if (phase !== 'go' || roundSummary) return
    timerRef.current = window.setTimeout(() => {
      sound.error()
      finishRound(false)
    }, config.reactionWindowMs)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [phase, config.reactionWindowMs, finishRound, sound, roundSummary])

  const handleTap = () => {
    if (busyRef.current || roundSummary) return
    if (phase === 'wait') {
      sound.error()
      setPhase('early')
      window.setTimeout(() => finishRound(false), 400)
    } else if (phase === 'go') {
      if (timerRef.current) clearTimeout(timerRef.current)
      sound.success()
      finishRound(true)
    }
  }

  const label =
    phase === 'wait'
      ? '⏳ Жди зелёный...'
      : phase === 'go'
        ? '🟢 Нажми!'
        : '😅 Рано!'

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
      <p className="mb-6 text-center text-lg font-extrabold text-brand-800">
        ⚡ Реакция — нажми вовремя!
      </p>

      <motion.button
        type="button"
        whileTap={reducedMotion ? undefined : { scale: 0.95 }}
        onClick={handleTap}
        disabled={busyRef.current || !!roundSummary}
        className={`neon-tile mx-auto flex h-48 w-48 items-center justify-center rounded-full text-xl font-extrabold sm:h-56 sm:w-56 ${
          phase === 'go'
            ? 'neon-tile-active bg-gradient-to-br from-emerald-300 to-emerald-400 text-white animate-pulse'
            : phase === 'early'
              ? 'bg-gradient-to-br from-rose-300 to-rose-400 text-white'
              : 'text-brand-700'
        }`}
      >
        {label}
      </motion.button>
    </GameBoard>
  )
}
