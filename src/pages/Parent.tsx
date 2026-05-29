import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function Parent() {
  const settings = useStore((s) => s.settings)
  const setSettings = useStore((s) => s.setSettings)
  const resetAttempts = useStore((s) => s.resetAttempts)
  const attemptsToday = useStore((s) => s.attemptsToday)
  const childProfile = useStore((s) => s.childProfile)
  const setProfile = useStore((s) => s.setProfile)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-lg space-y-6"
    >
      <h1 className="text-2xl font-bold text-slate-800">Родительская зона</h1>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Имя ребёнка</span>
          <input
            type="text"
            value={childProfile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        <label className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-700">Звук</span>
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => setSettings({ soundEnabled: e.target.checked })}
            className="h-5 w-5 rounded"
          />
        </label>

        <label className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-700">Музыка</span>
          <input
            type="checkbox"
            checked={settings.musicEnabled}
            onChange={(e) => setSettings({ musicEnabled: e.target.checked })}
            className="h-5 w-5 rounded"
          />
        </label>

        <label className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-700">Уменьшить анимации</span>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => setSettings({ reducedMotion: e.target.checked })}
            className="h-5 w-5 rounded"
          />
        </label>

        <button
          type="button"
          onClick={resetAttempts}
          className="w-full rounded-lg border border-slate-200 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Сбросить попытки за сегодня ({attemptsToday})
        </button>
      </div>
    </motion.section>
  )
}
