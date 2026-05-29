import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

const PLACEHOLDER_REWARDS = [
  { id: 'badge-1', title: 'Первая звезда', cost: 1 },
  { id: 'badge-2', title: 'Исследователь', cost: 5 },
  { id: 'badge-3', title: 'Мастер', cost: 10 },
] as const

export default function Rewards() {
  const stars = useStore((s) => s.stars)
  const unlockedItems = useStore((s) => s.unlockedItems)
  const unlockItem = useStore((s) => s.unlockItem)
  const updateStars = useStore((s) => s.updateStars)

  const handleUnlock = (id: string, cost: number) => {
    if (stars < cost) return
    if (unlockedItems.some((item) => item.id === id)) return
    updateStars(-cost)
    unlockItem(id)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Награды</h1>
        <p className="text-slate-500">Баланс: ⭐ {stars}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {PLACEHOLDER_REWARDS.map((reward) => {
          const unlocked = unlockedItems.some((item) => item.id === reward.id)
          const canAfford = stars >= reward.cost

          return (
            <li
              key={reward.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold text-slate-800">{reward.title}</h2>
              <p className="text-sm text-slate-500">Стоимость: {reward.cost} ⭐</p>
              <button
                type="button"
                disabled={unlocked || !canAfford}
                onClick={() => handleUnlock(reward.id, reward.cost)}
                className="mt-3 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {unlocked ? 'Получено' : 'Открыть'}
              </button>
            </li>
          )
        })}
      </ul>
    </motion.section>
  )
}
