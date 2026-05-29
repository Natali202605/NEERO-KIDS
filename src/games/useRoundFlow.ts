import { useCallback, useRef, useState } from 'react'
import type { Skill } from '@/data/games'
import { scoreToStars } from '@/games/config'
import {
  pickRandom,
  FAIL_PHRASES,
  SUCCESS_PHRASES,
  getIntellectualLevel,
  getTrainingTip,
  getRoundInsight,
} from '@/games/encouragement'
import type { GameResult } from '@/games/types'

export interface RoundSummaryData {
  round: number
  totalRounds: number
  score: number
  success: boolean
  praise: string
  insight: string
  level: ReturnType<typeof getIntellectualLevel>
  trainTip: string
}

interface UseRoundFlowOptions {
  skill: Skill
  totalRounds: number
  onComplete: (result: GameResult) => void
}

export function useRoundFlow({ skill, totalRounds, onComplete }: UseRoundFlowOptions) {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [praise, setPraise] = useState('')
  const [feedback, setFeedback] = useState<'ok' | 'fail' | null>(null)
  const [roundSummary, setRoundSummary] = useState<RoundSummaryData | null>(null)

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
      }

      const praiseText = success ? pickRandom(SUCCESS_PHRASES) : pickRandom(FAIL_PHRASES)
      setPraise(praiseText)
      setFeedback(success ? 'ok' : 'fail')

      const currentScore = scoreRef.current
      const ratio = totalRounds > 0 ? currentScore / totalRounds : 0

      setRoundSummary({
        round: roundRef.current,
        totalRounds,
        score: currentScore,
        success,
        praise: praiseText,
        insight: getRoundInsight(skill, roundRef.current, totalRounds, success),
        level: getIntellectualLevel(currentScore, totalRounds),
        trainTip: getTrainingTip(skill, ratio),
      })
    },
    [skill, totalRounds],
  )

  const continueRound = useCallback(() => {
    setPraise('')
    setFeedback(null)
    setRoundSummary(null)

    const currentRound = roundRef.current
    if (currentRound + 1 >= totalRounds) {
      onComplete({
        score: scoreRef.current,
        maxScore: totalRounds,
        stars: scoreToStars(scoreRef.current, totalRounds),
      })
    } else {
      setRound((r) => r + 1)
      busyRef.current = false
    }
  }, [totalRounds, onComplete])

  roundRef.current = round

  return {
    round,
    score,
    praise,
    feedback,
    roundSummary,
    finishRound,
    continueRound,
    busyRef,
  }
}
