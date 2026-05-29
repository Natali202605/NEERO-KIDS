import { Link } from 'react-router-dom'
import { HelpCircle, Play } from 'lucide-react'
import type { Game } from '@/data/games'
import {
  DIFFICULTY_LABELS,
  DURATION_LABELS,
  SKILL_LABELS,
} from '@/data/games'

interface GameCardProps {
  game: Game
  onInfo: (game: Game) => void
}

const difficultyColors: Record<Game['difficulty'], string> = {
  easy: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  hard: 'bg-rose-100 text-rose-800',
}

export default function GameCard({ game, onInfo }: GameCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="font-semibold leading-snug text-slate-800">{game.title}</h2>
        <button
          type="button"
          onClick={() => onInfo(game)}
          className="shrink-0 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-brand-600"
          aria-label={`Подробнее: ${game.title}`}
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[game.difficulty]}`}
        >
          {DIFFICULTY_LABELS[game.difficulty]}
        </span>
        {game.skills.slice(0, 2).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700"
          >
            {SKILL_LABELS[skill]}
          </span>
        ))}
      </div>

      <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate-500">
        {game.description}
      </p>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">
          {DURATION_LABELS[game.duration]}
        </span>
        <Link
          to={`/session/${game.id}`}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white active:scale-95 hover:bg-brand-700"
        >
          <Play className="h-4 w-4" aria-hidden />
          Играть
        </Link>
      </div>
    </article>
  )
}
