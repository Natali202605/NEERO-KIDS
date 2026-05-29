import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import GameBoard from '@/components/game/GameBoard'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useRoundFlow } from '@/games/useRoundFlow'
import { useGameSound } from '@/hooks/useGameSound'

const SCENES = [
  { text: 'Тебе подарили сюрприз!', emotion: '😊', label: 'Радость' },
  { text: 'Друг не поделился игрушкой', emotion: '😢', label: 'Грусть' },
  { text: 'Внезапно громкий звук!', emotion: '😨', label: 'Страх' },
  { text: 'Кто-то толкнул в очереди', emotion: '😠', label: 'Злость' },
  { text: 'Неожиданная приятная новость', emotion: '😲', label: 'Удивление' },
  { text: 'Долго ждёшь в очереди', emotion: '😤', label: 'Раздражение' },
]

export default function EmotionGame({
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
  const skill = game.skills[0] ?? 'emotion'

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

  const [scene, setScene] = useState(SCENES[0]!)
  const [options, setOptions] = useState<typeof SCENES>([])

  const setupRound = useCallback(() => {
    const s = SCENES[Math.floor(Math.random() * SCENES.length)]!
    const others = SCENES.filter((x) => x.emotion !== s.emotion)
      .sort(() => Math.random() - 0.5)
      .slice(0, config.optionCount - 1)
    setScene(s)
    setOptions([s, ...others].sort(() => Math.random() - 0.5))
  }, [config.optionCount])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handlePick = (emotion: string) => {
    if (busyRef.current) return
    if (emotion === scene.emotion) {
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
        💛 Какая эмоция подходит?
      </p>
      <p className="mb-6 rounded-2xl neon-tile p-4 text-center text-base font-semibold text-brand-800 sm:text-lg">
        {scene.text}
      </p>

      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={`${round}-${i}-${opt.emotion}`}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handlePick(opt.emotion)}
            disabled={busyRef.current}
            className="neon-tile flex min-h-[5rem] min-w-[5rem] flex-col items-center justify-center rounded-2xl px-3"
          >
            <span className="text-4xl">{opt.emotion}</span>
            <span className="text-xs font-bold text-brand-700">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </GameBoard>
  )
}
