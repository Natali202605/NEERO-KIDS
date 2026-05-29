import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function Session() {
  const { gameId } = useParams<{ gameId: string }>()
  const addAttempt = useStore((s) => s.addAttempt)
  const updateStars = useStore((s) => s.updateStars)
  const attemptsToday = useStore((s) => s.attemptsToday)

  const handleComplete = () => {
    addAttempt()
    updateStars(1)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Link
        to="/catalog"
        className="inline-flex min-h-11 items-center gap-1 text-sm text-brand-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад в каталог
      </Link>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-12">
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Сессия: {gameId ?? 'неизвестно'}
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Заглушка игровой сессии · попыток: {attemptsToday}
        </p>

        <button
          type="button"
          onClick={handleComplete}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-medium text-white active:scale-[0.98] hover:bg-brand-700 sm:w-auto"
        >
          <Star className="h-5 w-5" />
          Завершить (+1 ⭐)
        </button>
      </div>
    </motion.section>
  )
}
