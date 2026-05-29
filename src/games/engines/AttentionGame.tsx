import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import GameBoard from '@/components/game/GameBoard'
import RoundProgress from '@/components/game/RoundProgress'
import { getRoundConfig } from '@/games/config'
import type { GameEngineProps } from '@/games/types'
import { useRoundFlow } from '@/games/useRoundFlow'
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
  const skill = game.skills[0] ?? 'attention'
  const gridSize = config.optionCount + 2

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

  const [target, setTarget] = useState('')
  const [grid, setGrid] = useState<string[]>([])
  const [found, setFound] = useState<Set<number>>(new Set())
  const [targetCount, setTargetCount] = useState(0)

  const setupRound = useCallback(() => {
    const t = ITEMS[Math.floor(Math.random() * ITEMS.length)]!
    const cells: string[] = []
    while (cells.length < gridSize) {
      const emoji = Math.random() > 0.35 ? t : ITEMS[Math.floor(Math.random() * ITEMS.length)]!
      cells.push(emoji)
    }
    let shuffled = shuffle(cells)
    let count = shuffled.filter((e) => e === t).length
    if (count === 0) {
      shuffled = [...shuffled]
      shuffled[0] = t
      count = shuffled.filter((e) => e === t).length
    }
    setTarget(t)
    setGrid(shuffled)
    setTargetCount(count)
    setFound(new Set())
  }, [gridSize])

  useEffect(() => {
    setupRound()
  }, [round, setupRound])

  const handleTap = (idx: number, emoji: string) => {
    if (found.has(idx) || busyRef.current) return
    if (emoji === target) {
      sound.success()
      const next = new Set(found)
      next.add(idx)
      setFound(next)
      if (next.size >= targetCount) {
        finishRound(true)
      }
    } else {
      sound.error()
      finishRound(false)
    }
  }

  const cols = Math.ceil(Math.sqrt(gridSize))

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
        Найди все: <span className="text-3xl">{target}</span>
      </p>
      <p className="mb-4 text-center text-sm font-semibold text-brand-600">
        Найдено: {found.size} / {targetCount}
      </p>

      <div
        className="mx-auto grid max-w-sm gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {grid.map((emoji, idx) => (
          <motion.button
            key={`${round}-${idx}-${emoji}`}
            type="button"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            onClick={() => handleTap(idx, emoji)}
            disabled={busyRef.current}
            className={`neon-tile flex min-h-[3.5rem] items-center justify-center rounded-xl text-2xl ${
              found.has(idx) ? 'neon-tile-found opacity-80' : ''
            }`}
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </GameBoard>
  )
}
