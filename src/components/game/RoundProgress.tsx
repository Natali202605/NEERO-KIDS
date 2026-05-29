interface RoundProgressProps {
  current: number
  total: number
  score: number
}

export default function RoundProgress({ current, total, score }: RoundProgressProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              i < current
                ? 'bg-sun-400 scale-110 shadow-sm'
                : i === current
                  ? 'bg-brand-500 ring-2 ring-brand-300 ring-offset-1'
                  : 'bg-white/60'
            }`}
          />
        ))}
        </div>
      </div>
      <span className="text-xs font-bold text-brand-600 sm:text-sm">
        Раунд {current + 1}/{total}
      </span>
      <span className="neon-tile rounded-full px-3 py-1 text-sm font-bold text-brand-700">
        Очки: {score}
      </span>
    </div>
  )
}
