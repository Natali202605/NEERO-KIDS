import { X } from 'lucide-react'
import type { Game } from '@/data/games'
import {
  DIFFICULTY_LABELS,
  DURATION_LABELS,
  SKILL_LABELS,
} from '@/data/games'

interface GameModalProps {
  game: Game | null
  onClose: () => void
}

export default function GameModal({ game, onClose }: GameModalProps) {
  if (!game) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[85dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl sm:p-6 pb-safe">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="game-modal-title" className="text-xl font-bold text-slate-800">
            {game.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Закрыть окно"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-slate-500">Описание</dt>
            <dd className="text-slate-800">{game.description}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Инструкция</dt>
            <dd className="text-slate-800">{game.instruction}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Механика</dt>
            <dd className="text-slate-800">{game.mechanics}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Адаптация</dt>
            <dd className="text-slate-800">{game.adaptation}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Награды</dt>
            <dd className="text-slate-800">{game.rewards}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Сенсорный профиль</dt>
            <dd className="text-slate-800">
              {game.sensoryCue.name} · {game.sensoryCue.profile} · интенсивность{' '}
              {game.sensoryCue.intensity}
              <br />
              {game.sensoryCue.purpose}
              <br />
              Визуально: {game.sensoryCue.visualCue}
            </dd>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
              {DIFFICULTY_LABELS[game.difficulty]}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
              {DURATION_LABELS[game.duration]}
            </span>
            {game.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700"
              >
                {SKILL_LABELS[skill]}
              </span>
            ))}
          </div>
        </dl>
      </div>
    </div>
  )
}
