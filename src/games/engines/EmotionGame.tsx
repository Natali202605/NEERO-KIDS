import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig, scoreToStars } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
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

  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [scene, setScene] = useState(SCENES[0]!)
  const [options, setOptions] = useState<typeof SCENES>([])
  const [feedback, setFeedback] = useState<'ok' | 'fail' | null>(null)

  const setupRound = useCallback(() => {
    const s = SCENES[Math.floor(Math.random() * SCENES.length)]!
    const others = SCENES.filter((x) => x.emotion !== s.emotion)
      .sort(() => Math.random() - 0.5)
      .slice(0, config.optionCount - 1)
    setScene(s)
    setOptions([s, ...others].sort(() => Math.random() - 0.5))
    setFeedback(null)
  }, [config.optionCount])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handlePick = (emotion: string) => {
    if (feedback) return
    if (emotion === scene.emotion) {
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
        💛 Какая эмоция подходит?
      </p>
      <p className="mb-6 rounded-2xl bg-white/90 p-4 text-center text-base font-semibold text-brand-800 shadow-md sm:text-lg">
        {scene.text}
      </p>

      {feedback === 'ok' && <p className="mb-2 text-center font-bold text-sun-300">✨ Верно!</p>}
      {feedback === 'fail' && <p className="mb-2 text-center font-bold text-white/90">Подумай ещё!</p>}

      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-3">
        {options.map((opt) => (
          <motion.button
            key={opt.emotion}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handlePick(opt.emotion)}
            className="flex min-h-[5rem] min-w-[5rem] flex-col items-center justify-center rounded-2xl bg-white px-3 shadow-lg hover:brightness-105"
          >
            <span className="text-4xl">{opt.emotion}</span>
            <span className="text-xs font-bold text-slate-600">{opt.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
