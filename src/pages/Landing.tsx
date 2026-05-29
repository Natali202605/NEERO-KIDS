import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Gift, Sparkles, Star } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function Landing() {
  const childProfile = useStore((s) => s.childProfile)
  const streak = useStore((s) => s.streak)
  const stars = useStore((s) => s.stars)

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-lavender-500 p-6 text-white shadow-xl sm:p-8">
        <div className="absolute -right-6 -top-6 text-8xl opacity-20">🌟</div>
        <div className="absolute -bottom-4 -left-4 text-6xl opacity-20">🧠</div>
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-sun-300" />
            <span className="text-sm font-bold uppercase tracking-wide text-brand-100">
              НейроЛето
            </span>
          </div>
          <h1 className="text-3xl font-black sm:text-4xl">
            Привет, {childProfile.name}! 👋
          </h1>
          <p className="mt-2 text-lg text-brand-100">
            Группа {childProfile.ageGroup} · серия {streak} дней
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 font-bold backdrop-blur">
            <Star className="h-5 w-5 fill-sun-400 text-sun-400" />
            {stars} звёзд
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/catalog"
          className="kid-card group flex min-h-[5.5rem] items-center gap-4 p-5 transition hover:border-brand-400 hover:shadow-xl active:scale-[0.98]"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-3xl shadow-md transition group-hover:scale-105">
            🎮
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-brand-800">Каталог игр</h2>
            <p className="text-sm text-brand-600">300+ приключений для мозга</p>
          </div>
        </Link>

        <Link
          to="/rewards"
          className="kid-card group flex min-h-[5.5rem] items-center gap-4 p-5 transition hover:border-sun-400 hover:shadow-xl active:scale-[0.98]"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-400 to-coral-400 text-3xl shadow-md transition group-hover:scale-105">
            🏆
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-brand-800">Награды</h2>
            <p className="text-sm text-brand-600">Собирай звёзды и бейджи</p>
          </div>
        </Link>
      </div>

      <div className="kid-card p-5">
        <h3 className="font-extrabold text-brand-800">Как играть?</h3>
        <ol className="mt-3 space-y-2 text-sm text-slate-600">
          <li className="flex gap-2">
            <span className="font-bold text-brand-600">1.</span>
            Выбери игру в каталоге
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-brand-600">2.</span>
            Пройди раунды и набирай очки
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-brand-600">3.</span>
            Получи до 3 звёзд за сессию ⭐
          </li>
        </ol>
      </div>
    </motion.section>
  )
}
