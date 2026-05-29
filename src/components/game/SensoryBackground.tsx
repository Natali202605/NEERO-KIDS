import type { Game } from '@/data/games'

const CUE_STYLES: Record<string, string> = {
  'голубые волны': 'game-theme-sky',
  'зелёные листья': 'game-theme-mint',
  'тёплый закат': 'game-theme-peach',
  'мягкое сияние': 'game-theme-lilac',
  'пастельные круги': 'game-theme-bubble',
  'медленные облака': 'game-theme-cloud',
}

export function getSensoryClass(game: Game): string {
  return CUE_STYLES[game.sensoryCue.visualCue] ?? 'game-theme-bubble'
}

interface SensoryBackgroundProps {
  game: Game
  children: React.ReactNode
}

export default function SensoryBackground({ game, children }: SensoryBackgroundProps) {
  return (
    <div className={`game-arena relative min-h-[62vh] overflow-hidden rounded-3xl ${getSensoryClass(game)}`}>
      <div className="game-cloud game-cloud-1" aria-hidden />
      <div className="game-cloud game-cloud-2" aria-hidden />
      <div className="game-cloud game-cloud-3" aria-hidden />
      <div className="game-sparkle game-sparkle-1" aria-hidden>✦</div>
      <div className="game-sparkle game-sparkle-2" aria-hidden>✧</div>
      <div className="relative z-10 p-4 sm:p-6">{children}</div>
    </div>
  )
}
