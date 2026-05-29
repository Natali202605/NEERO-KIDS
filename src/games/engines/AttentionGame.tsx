import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig, scoreToStars } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useGameSound } from '@/hooks/useGameSound'

const ITEMS = ['⭐', '🌙', '🌸', '🦋', '🍎', '🎈', '🐱', '🌈', '⚽', '🎵']

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}

export default function AttentionGame({
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
  const [target, setTarget] = useState('')
  const [grid, setGrid] = useState<string[]>([])
  const [found, setFound] = useState<Set<number>>(new Set())
  const [targetIndices, setTargetIndices] = useState<Set<number>>(new Set())

  const gridSize = config.optionCount + 2

  const setupRound = useCallback(() => {
    const t = ITEMS[Math.floor(Math.random() * ITEMS.length)]!
    const cells: string[] = []
    while (cells.length < gridSize) {
      const emoji = Math.random() > 0.35 ? t : ITEMS[Math.floor(Math.random() * ITEMS.length)]!
      cells.push(emoji)
    }
    if (targets.size === 0) {
      cells[0] = t
    }
    const shuffled = shuffle(cells)
    const indices = new Set<number>()
    shuffled.forEach((emoji, i) => {
      if (emoji === t) indices.add(i)
    })
    setTarget(t)
    setGrid(shuffled)
    setTargetIndices(indices)
    setFound(new Set())
  }, [gridSize])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handleTap = (idx: number, emoji: string) => {
    if (found.has(idx)) return
    if (emoji === target) {
      sound.success()
      const next = new Set(found)
      next.add(idx)
      setFound(next)
      if (next.size >= targetIndices.size) {
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
        }, 500)
      }
    } else {
      sound.error()
    }
  }

  return (
    <div>
      <RoundProgress current={round} total={config.rounds} score={score} />
      <p className="mb-2 text-center text-lg font-bold text-white drop-shadow">
        Найди все: <span className="text-3xl">{target}</span>
      </p>
      <p className="mb-4 text-center text-sm text-white/80">
        Найдено: {found.size} / {targetIndices.size}
      </p>

      <div
        className="mx-auto grid max-w-sm gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(gridSize))}, 1fr)` }}
      >
        {grid.map((emoji, idx) => (
          <motion.button
            key={idx}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handleTap(idx, emoji)}
            className={`flex min-h-[3.5rem] items-center justify-center rounded-xl text-2xl shadow-md transition ${
              found.has(idx)
                ? 'bg-white/30 ring-2 ring-sun-400'
                : 'bg-white/90 hover:bg-white active:scale-95'
            }`}
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
