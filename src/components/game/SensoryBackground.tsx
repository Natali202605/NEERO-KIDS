import type { Game } from '@/data/games'

const CUE_STYLES: Record<string, string> = {
  'голубые волны': 'sensory-waves',
  'зелёные листья': 'sensory-leaves',
  'тёплый закат': 'sensory-sunset',
  'мягкое сияние': 'sensory-glow',
  'пастельные круги': 'sensory-bubbles',
  'медленные облака': 'sensory-clouds',
}

export function getSensoryClass(game: Game): string {
  return CUE_STYLES[game.sensoryCue.visualCue] ?? 'sensory-bubbles'
}

interface SensoryBackgroundProps {
  game: Game
  children: React.ReactNode
}

export default function SensoryBackground({ game, children }: SensoryBackgroundProps) {
  return (
    <div className={`relative min-h-[60vh] overflow-hidden rounded-3xl ${getSensoryClass(game)}`}>
      <div className="relative z-10 p-4 sm:p-6">{children}</div>
    </div>
  )
}
