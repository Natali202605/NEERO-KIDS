import { Link, Outlet, useLocation } from 'react-router-dom'
import { Settings, Sparkles } from 'lucide-react'
import { normalizeAgeGroup, type GameAgeGroup } from '@/data/games'
import MobileNav from '@/components/MobileNav'
import { useStore, type AgeGroup } from '@/store/useStore'

const AGE_GROUPS: GameAgeGroup[] = ['7-8', '9-10', '11+']

const ageLabels: Record<GameAgeGroup, string> = {
  '7-8': '7–8 лет',
  '9-10': '9–10 лет',
  '11+': '11+ лет',
}

export default function Layout() {
  const location = useLocation()
  const stars = useStore((s) => s.stars)
  const childProfile = useStore((s) => s.childProfile)
  const setProfile = useStore((s) => s.setProfile)

  const isSession = location.pathname.startsWith('/session')
  const ageGroup = normalizeAgeGroup(childProfile.ageGroup)

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 pt-safe backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-3">
          <Link
            to="/"
            className="flex min-h-11 min-w-11 items-center gap-2 font-bold text-brand-700"
          >
            <Sparkles className="h-6 w-6 shrink-0" aria-hidden />
            <span className="text-base sm:text-lg">НейроЛето</span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <span
              className="inline-flex min-h-9 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 sm:px-3 sm:text-sm"
              aria-label={`Звёзды: ${stars}`}
            >
              ⭐ {stars}
            </span>

            {!isSession && (
              <select
                value={ageGroup}
                onChange={(e) =>
                  setProfile({ ageGroup: e.target.value as AgeGroup })
                }
                className="min-h-11 max-w-[7.5rem] rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700 sm:max-w-none sm:px-2 sm:text-sm"
                aria-label="Возрастная группа"
              >
                {AGE_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {ageLabels[group]}
                  </option>
                ))}
              </select>
            )}

            <Link
              to="/parent"
              className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-brand-700 md:inline-flex"
              aria-label="Настройки"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main
        className={`mx-auto w-full max-w-5xl flex-1 px-3 py-4 sm:px-4 sm:py-6 ${
          isSession ? 'pb-4 sm:pb-6' : 'pb-nav-safe md:pb-6'
        }`}
      >
        <Outlet />
      </main>

      {!isSession && <MobileNav />}
    </div>
  )
}
