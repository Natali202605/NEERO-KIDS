import { Link } from 'react-router-dom'
import { Play, X } from 'lucide-react'
import type { Game } from '@/data/games'
import {
  DIFFICULTY_LABELS,
  DURATION_LABELS,
  INTENSITY_LABELS,
  SKILL_EMOJI,
  SKILL_LABELS,
} from '@/data/games'

interface GameModalProps {
  game: Game | null
  onClose: () => void
}

export default function GameModal({ game, onClose }: GameModalProps) {
  if (!game) return null

  const primarySkill = game.skills[0] ?? 'memory'

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-900/40 backdrop-blur-sm"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:max-h-[90vh] sm:max-w-lg sm:rounded-3xl sm:p-6 pb-safe">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <span className="text-3xl">{SKILL_EMOJI[primarySkill]}</span>
            <h2 id="game-modal-title" className="mt-1 text-xl font-extrabold text-brand-800">
              {game.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-brand-50 p-2 text-brand-600 hover:bg-brand-100"
            aria-label="Закрыть окно"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <dl className="space-y-3 text-sm">
          <div className="rounded-2xl bg-brand-50 p-3">
            <dt className="font-bold text-brand-600">Описание</dt>
            <dd className="mt-1 text-slate-700">{game.description}</dd>
          </div>
          <div>
            <dt className="font-bold text-brand-600">Как играть</dt>
            <dd className="mt-1 text-slate-700">{game.instruction}</dd>
          </div>
          <div>
            <dt className="font-bold text-brand-600">Механика</dt>
            <dd className="mt-1 text-slate-700">{game.mechanics}</dd>
          </div>
          <div>
            <dt className="font-bold text-brand-600">Награды</dt>
            <dd className="mt-1 text-slate-700">{game.rewards}</dd>
          </div>
          <div>
            <dt className="font-bold text-brand-600">Сенсорный профиль</dt>
            <dd className="mt-1 text-slate-700">
              {game.sensoryCue.name} · {game.sensoryCue.profile} · интенсивность{' '}
              {INTENSITY_LABELS[game.sensoryCue.intensity]}
              <br />
              {game.sensoryCue.purpose}
              <br />
              Оформление: {game.sensoryCue.visualCue}
            </dd>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-sun-500">
              {DIFFICULTY_LABELS[game.difficulty]}
            </span>
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
              {DURATION_LABELS[game.duration]}
            </span>
            {game.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-lavender-400/20 px-3 py-1 text-xs font-bold text-lavender-500"
              >
                {SKILL_LABELS[skill]}
              </span>
            ))}
          </div>
        </dl>

        <Link
          to={`/session/${game.id}`}
          onClick={onClose}
          className="btn-play mt-5 flex w-full items-center justify-center gap-2"
        >
          <Play className="h-5 w-5 fill-current" />
          Начать игру!
        </Link>
      </div>
    </div>
  )
}
