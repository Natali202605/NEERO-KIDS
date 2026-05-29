import type { Game } from '@/data/games'

export interface GameResult {
  score: number
  maxScore: number
  stars: number
}

export interface GameEngineProps {
  game: Game
  onComplete: (result: GameResult) => void
  reducedMotion?: boolean
  soundEnabled?: boolean
}

export interface RoundConfig {
  rounds: number
  optionCount: number
  sequenceLength: number
  reactionWindowMs: number
}
