import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Gift, Home, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Главная', icon: Home, emoji: '🏠', end: true },
  { to: '/catalog', label: 'Игры', icon: BookOpen, emoji: '🎮', end: false },
  { to: '/rewards', label: 'Награды', icon: Gift, emoji: '🏆', end: false },
  { to: '/parent', label: 'Родителям', icon: Settings, emoji: '⚙️', end: false },
] as const

export default function MobileNav() {
  const { pathname } = useLocation()

  const isActive = (to: string, end: boolean) =>
    end ? pathname === to : pathname.startsWith(to)

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-brand-200/60 bg-white/95 pb-safe backdrop-blur-md md:hidden"
      aria-label="Мобильная навигация"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around">
        {NAV_ITEMS.map(({ to, label, icon: Icon, emoji, end }) => {
          const active = isActive(to, end)
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex min-h-[3.5rem] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-bold transition active:scale-95 ${
                  active
                    ? 'text-brand-600'
                    : 'text-slate-400 hover:text-brand-500'
                }`}
              >
                {active ? (
                  <span className="text-xl">{emoji}</span>
                ) : (
                  <Icon className="h-5 w-5" aria-hidden />
                )}
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
