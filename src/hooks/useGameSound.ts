import { useCallback, useRef } from 'react'

export function useGameSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null)

  const playTone = useCallback(
    (freq: number, duration = 0.12, type: OscillatorType = 'sine') => {
      if (!enabled || typeof window === 'undefined') return
      try {
        if (!ctxRef.current) ctxRef.current = new AudioContext()
        const ctx = ctxRef.current
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + duration)
      } catch {
        /* audio unavailable */
      }
    },
    [enabled],
  )

  return {
    success: () => playTone(523, 0.15),
    error: () => playTone(220, 0.2, 'triangle'),
    tap: () => playTone(440, 0.08),
    win: () => {
      playTone(523, 0.1)
      setTimeout(() => playTone(659, 0.1), 100)
      setTimeout(() => playTone(784, 0.15), 200)
    },
  }
}
