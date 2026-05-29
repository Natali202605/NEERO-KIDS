import { useCallback, useRef, useState } from 'react'
import { scoreToStars } from '@/games/config'
import { pickRandom, FAIL_PHRASES, SUCCESS_PHRASES } from '@/games/encouragement'
import type { GameResult } from '@/games/types'

interface UseRoundFlowOptions {
  totalRounds: number
  onComplete: (result: GameResult) => void
  successDelay?: number
  failDelay?: number
}

export function useRoundFlow({
  totalRounds,
  onComplete,
  successDelay = 700,
  failDelay = 800,
}: UseRoundFlowOptions) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [praise, setPraise] = useState('')
  const scoreRef = useRef(0)
  const roundRef = useRef(0)
  const busyRef = useRef(false)

  const finishRound = useCallback(
    (success: boolean) => {
      if (busyRef.current) return
      busyRef.current = true

      if (success) {
        scoreRef.current += 1
        setScore(scoreRef.current)
        setPraise(pickRandom(SUCCESS_PHRASES))
      } else {
        setPraise(pickRandom(FAIL_PHRASES))
      }

      const delay = success ? successDelay : failDelay
      window.setTimeout(() => {
        busyRef.current = false
        const currentRound = roundRef.current

        if (currentRound + 1 >= totalRounds) {
          onComplete({
            score: scoreRef.current,
            maxScore: totalRounds,
            stars: scoreToStars(scoreRef.current, totalRounds),
          })
        } else {
          setPraise('')
          setRound((r) => r + 1)
        }
      }, delay)
    },
    [totalRounds, onComplete, successDelay, failDelay],
  )

  roundRef.current = round

  return { round, score, praise, finishRound, setPraise, busyRef }
}
