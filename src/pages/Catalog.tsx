import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Filters, { type CatalogFilters } from '@/components/catalog/Filters'
import GameCard from '@/components/catalog/GameCard'
import GameModal from '@/components/catalog/GameModal'
import { GAMES_BY_AGE, normalizeAgeGroup, type Game } from '@/data/games'
import { useDebounce } from '@/hooks/useDebounce'
import { useStore } from '@/store/useStore'

const DEFAULT_FILTERS: CatalogFilters = {
  difficulty: 'all',
  skill: 'all',
  duration: 'all',
}

export default function Catalog() {
  const rawAgeGroup = useStore((s) => s.childProfile.ageGroup)
  const attemptsToday = useStore((s) => s.attemptsToday)

  const ageGroup = normalizeAgeGroup(rawAgeGroup)

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS)
  const [modalGame, setModalGame] = useState<Game | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const filteredGames = useMemo(() => {
    const pool = GAMES_BY_AGE[ageGroup]
    const query = debouncedSearch.trim().toLowerCase()

    return pool.filter((game) => {
      if (filters.difficulty !== 'all' && game.difficulty !== filters.difficulty) {
        return false
      }
      if (filters.skill !== 'all' && !game.skills.includes(filters.skill)) {
        return false
      }
      if (filters.duration !== 'all' && game.duration !== filters.duration) {
        return false
      }
      if (!query) return true

      const haystack = [
        game.title,
        game.description,
        game.instruction,
        game.mechanics,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [ageGroup, debouncedSearch, filters])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <header>
        <h1 className="page-title">🎮 Каталог игр</h1>
        <p className="text-sm font-semibold text-brand-600">
          Возраст {ageGroup} · попыток сегодня: {attemptsToday} · {GAMES_BY_AGE[ageGroup].length} игр
        </p>
      </header>

      <Filters
        filters={filters}
        onChange={setFilters}
        search={search}
        onSearchChange={setSearch}
        resultCount={filteredGames.length}
      />

      {filteredGames.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Ничего не найдено. Измените фильтры или запрос.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <li key={game.id}>
              <GameCard game={game} onInfo={setModalGame} />
            </li>
          ))}
        </ul>
      )}

      <GameModal game={modalGame} onClose={() => setModalGame(null)} />
    </motion.section>
  )
}
