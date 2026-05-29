import type { ComponentType } from 'react'
import type { Skill } from '@/data/games'
import type { GameEngineProps } from './types'
import MemoryGame from './engines/MemoryGame'
import AttentionGame from './engines/AttentionGame'
import LogicGame from './engines/LogicGame'
import MotorGame from './engines/MotorGame'
import LanguageGame from './engines/LanguageGame'
import EmotionGame from './engines/EmotionGame'

const ENGINES: Record<Skill, ComponentType<GameEngineProps>> = {
  memory: MemoryGame,
  attention: AttentionGame,
  logic: LogicGame,
  motor: MotorGame,
  language: LanguageGame,
  emotion: EmotionGame,
}

export default function GameEngine(props: GameEngineProps) {
  const skill = props.game.skills[0] ?? 'memory'
  const Engine = ENGINES[skill] ?? MemoryGame
  return <Engine {...props} />
}
