import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Gift } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function Landing() {
  const childProfile = useStore((s) => s.childProfile)
  const streak = useStore((s) => s.streak)

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Привет, {childProfile.name}!</h1>
        <p className="mt-2 text-brand-100">
          Группа {childProfile.ageGroup} · серия {streak} дней
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/catalog"
          className="flex min-h-[4.5rem] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition active:scale-[0.98] hover:border-brand-300 hover:shadow-md sm:p-6"
        >
          <BookOpen className="h-10 w-10 text-brand-600" />
          <div>
            <h2 className="font-semibold text-slate-800">Каталог игр</h2>
            <p className="text-sm text-slate-500">Выбери упражнение</p>
          </div>
        </Link>

        <Link
          to="/rewards"
          className="flex min-h-[4.5rem] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition active:scale-[0.98] hover:border-brand-300 hover:shadow-md sm:p-6"
        >
          <Gift className="h-10 w-10 text-amber-500" />
          <div>
            <h2 className="font-semibold text-slate-800">Награды</h2>
            <p className="text-sm text-slate-500">Твои достижения</p>
          </div>
        </Link>
      </div>
    </motion.section>
  )
}
