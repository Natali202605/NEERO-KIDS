import type { Difficulty, GameAgeGroup } from '@/data/games'
import type { RoundConfig } from './types'

const BASE: Record<Difficulty, RoundConfig> = {
  easy: { rounds: 3, optionCount: 3, sequenceLength: 3, reactionWindowMs: 2500 },
  medium: { rounds: 4, optionCount: 4, sequenceLength: 4, reactionWindowMs: 2000 },
  hard: { rounds: 5, optionCount: 5, sequenceLength: 5, reactionWindowMs: 1500 },
}

const AGE_TWEAK: Record<GameAgeGroup, Partial<RoundConfig>> = {
  '7-8': { optionCount: -1, sequenceLength: -1, reactionWindowMs: 500 },
  '9-10': {},
  '11+': { rounds: 1, sequenceLength: 1 },
}

export function getRoundConfig(
  difficulty: Difficulty,
  ageGroup: GameAgeGroup,
): RoundConfig {
  const base = BASE[difficulty]
  const tweak = AGE_TWEAK[ageGroup]

  return {
    rounds: Math.max(2, base.rounds + (tweak.rounds ?? 0)),
    optionCount: Math.max(2, base.optionCount + (tweak.optionCount ?? 0)),
    sequenceLength: Math.max(2, base.sequenceLength + (tweak.sequenceLength ?? 0)),
    reactionWindowMs: base.reactionWindowMs + (tweak.reactionWindowMs ?? 0),
  }
}

export function scoreToStars(score: number, maxScore: number): number {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  if (ratio >= 0.3) return 1
  return 0
}
