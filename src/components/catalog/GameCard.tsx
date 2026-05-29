import { Link } from 'react-router-dom'
import { HelpCircle, Play } from 'lucide-react'
import type { Game } from '@/data/games'
import {
  DIFFICULTY_LABELS,
  DURATION_LABELS,
  SKILL_COLORS,
  SKILL_EMOJI,
  SKILL_LABELS,
} from '@/data/games'

interface GameCardProps {
  game: Game
  onInfo: (game: Game) => void
}

const difficultyColors: Record<Game['difficulty'], string> = {
  easy: 'bg-grass-400/20 text-grass-500 border-grass-400/30',
  medium: 'bg-sun-400/20 text-sun-500 border-sun-400/30',
  hard: 'bg-coral-400/20 text-coral-500 border-coral-400/30',
}

export default function GameCard({ game, onInfo }: GameCardProps) {
  const primarySkill = game.skills[0] ?? 'memory'
  const gradient = SKILL_COLORS[primarySkill]

  return (
    <article className="kid-card group flex h-full flex-col overflow-hidden transition hover:border-brand-400 hover:shadow-xl">
      <div className={`bg-gradient-to-r ${gradient} px-4 py-3`}>
        <div className="flex items-start justify-between gap-2">
          <span className="text-3xl">{SKILL_EMOJI[primarySkill]}</span>
          <button
            type="button"
            onClick={() => onInfo(game)}
            className="rounded-full bg-white/30 p-1.5 text-white backdrop-blur hover:bg-white/50"
            aria-label={`Подробнее: ${game.title}`}
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mt-1 font-extrabold leading-snug text-white drop-shadow">
          {game.title}
        </h2>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${difficultyColors[game.difficulty]}`}
          >
            {DIFFICULTY_LABELS[game.difficulty]}
          </span>
          {game.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700"
            >
              {SKILL_LABELS[skill]}
            </span>
          ))}
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-600">
          {game.description}
        </p>

        <div className="flex items-center justify-between gap-2 border-t border-brand-100 pt-3">
          <span className="text-xs font-semibold text-slate-500">
            ⏱ {DURATION_LABELS[game.duration]}
          </span>
          <Link
            to={`/session/${game.id}`}
            className="btn-play inline-flex min-h-11 items-center gap-1.5 px-4 py-2 text-sm"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden />
            Играть
          </Link>
        </div>
      </div>
    </article>
  )
}
