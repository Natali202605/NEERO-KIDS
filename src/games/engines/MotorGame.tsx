import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig, scoreToStars } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useGameSound } from '@/hooks/useGameSound'

type Phase = 'wait' | 'ready' | 'go' | 'done' | 'early'

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

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<Phase>('wait')
  const timerRef = useRef<number | null>(null)

  const finishRound = useCallback(
    (success: boolean) => {
      const newScore = success ? score + 1 : score
      if (success) setScore(newScore)
      setPhase('done')
      setTimeout(() => {
        if (round + 1 >= config.rounds) {
          onComplete({
            score: newScore,
            maxScore: config.rounds,
            stars: scoreToStars(newScore, config.rounds),
          })
        } else {
          setRound((r) => r + 1)
          setPhase('wait')
        }
      }, 700)
    },
    [round, score, config.rounds, onComplete],
  )

  useEffect(() => {
    if (phase !== 'wait') return
    const delay = 800 + Math.random() * 2000
    timerRef.current = window.setTimeout(() => {
      setPhase('go')
      sound.tap()
    }, delay)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [phase, round, sound])

  useEffect(() => {
    if (phase !== 'go') return
    timerRef.current = window.setTimeout(() => {
      sound.error()
      finishRound(false)
    }, config.reactionWindowMs)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [phase, config.reactionWindowMs, finishRound, sound])

  const handleTap = () => {
    if (phase === 'wait') {
      sound.error()
      setPhase('early')
      setTimeout(() => finishRound(false), 600)
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
        ? '🟢 ЖМИ!'
        : phase === 'early'
          ? '😅 Рано! Жди сигнал'
          : phase === 'done'
            ? '✨'
            : ''

  return (
    <div>
      <RoundProgress current={round} total={config.rounds} score={score} />
      <p className="mb-6 text-center text-lg font-bold text-white drop-shadow">
        ⚡ Реакция — нажми вовремя!
      </p>

      <motion.button
        type="button"
        whileTap={reducedMotion ? undefined : { scale: 0.95 }}
        onClick={handleTap}
        className={`mx-auto flex h-48 w-48 items-center justify-center rounded-full text-2xl font-extrabold shadow-2xl transition sm:h-56 sm:w-56 ${
          phase === 'go'
            ? 'bg-grass-400 text-white animate-pulse ring-4 ring-white'
            : phase === 'early'
              ? 'bg-coral-400 text-white'
              : 'bg-white/90 text-brand-700 hover:bg-white'
        }`}
      >
        {label}
      </motion.button>
    </div>
  )
}
