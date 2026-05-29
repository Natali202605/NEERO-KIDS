import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

const PLACEHOLDER_REWARDS = [
  { id: 'badge-1', title: 'Первая звезда', emoji: '⭐', cost: 1 },
  { id: 'badge-2', title: 'Исследователь', emoji: '🔭', cost: 5 },
  { id: 'badge-3', title: 'Мастер', emoji: '🏅', cost: 10 },
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
        <h1 className="page-title">🏆 Награды</h1>
        <p className="text-lg font-bold text-brand-600">Баланс: ⭐ {stars}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {PLACEHOLDER_REWARDS.map((reward) => {
          const unlocked = unlockedItems.some((item) => item.id === reward.id)
          const canAfford = stars >= reward.cost

          return (
            <li
              key={reward.id}
              className={`kid-card p-5 transition ${unlocked ? 'border-sun-400 bg-sun-50/50' : ''}`}
            >
              <span className="text-4xl">{reward.emoji}</span>
              <h2 className="mt-2 font-extrabold text-brand-800">{reward.title}</h2>
              <p className="text-sm font-semibold text-brand-600">
                Стоимость: {reward.cost} ⭐
              </p>
              <button
                type="button"
                disabled={unlocked || !canAfford}
                onClick={() => handleUnlock(reward.id, reward.cost)}
                className="mt-3 min-h-11 rounded-2xl bg-gradient-to-r from-sun-400 to-sun-500 px-5 py-2 text-sm font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-40"
              >
                {unlocked ? '🎉 Получено!' : 'Открыть'}
              </button>
            </li>
          )
        })}
      </ul>
    </motion.section>
  )
}
