import type { Difficulty, Duration, Skill } from '@/data/games'
import {
  DIFFICULTY_LABELS,
  DURATION_LABELS,
  SKILL_LABELS,
} from '@/data/games'

export interface CatalogFilters {
  difficulty: Difficulty | 'all'
  skill: Skill | 'all'
  duration: Duration | 'all'
}

interface FiltersProps {
  filters: CatalogFilters
  onChange: (next: CatalogFilters) => void
  search: string
  onSearchChange: (value: string) => void
  resultCount: number
}

const DIFFICULTY_OPTIONS: Array<Difficulty | 'all'> = [
  'all',
  'easy',
  'medium',
  'hard',
]

const SKILL_OPTIONS: Array<Skill | 'all'> = [
  'all',
  'memory',
  'attention',
  'logic',
  'motor',
  'language',
  'emotion',
]

const DURATION_OPTIONS: Array<Duration | 'all'> = [
  'all',
  'short',
  'medium',
  'long',
]

export default function Filters({
  filters,
  onChange,
  search,
  onSearchChange,
  resultCount,
}: FiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block flex-1">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Поиск
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Название или описание…"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>
        <p className="text-sm text-slate-500 sm:pb-2">
          Найдено: <span className="font-semibold text-slate-800">{resultCount}</span>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-500">
            Сложность
          </span>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              onChange({
                ...filters,
                difficulty: e.target.value as CatalogFilters['difficulty'],
              })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'all' ? 'Все' : DIFFICULTY_LABELS[opt]}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-500">
            Навык
          </span>
          <select
            value={filters.skill}
            onChange={(e) =>
              onChange({
                ...filters,
                skill: e.target.value as CatalogFilters['skill'],
              })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {SKILL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'all' ? 'Все' : SKILL_LABELS[opt]}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-500">
            Длительность
          </span>
          <select
            value={filters.duration}
            onChange={(e) =>
              onChange({
                ...filters,
                duration: e.target.value as CatalogFilters['duration'],
              })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {DURATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'all' ? 'Все' : DURATION_LABELS[opt]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
