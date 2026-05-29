import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import type { GameAgeGroup } from '@/data/games'

/** Актуальные группы + legacy для миграции localStorage */
export type AgeGroup = GameAgeGroup | '3-4' | '5-6'

export interface ChildProfile {
  ageGroup: AgeGroup
  name: string
}

export interface AppSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  reducedMotion: boolean
}

export interface UnlockedItem {
  id: string
  unlockedAt: number
}

interface AppState {
  childProfile: ChildProfile
  stars: number
  streak: number
  unlockedItems: UnlockedItem[]
  settings: AppSettings
  attemptsToday: number
  updateStars: (delta: number) => void
  addAttempt: () => void
  resetAttempts: () => void
  setProfile: (profile: Partial<ChildProfile>) => void
  setSettings: (settings: Partial<AppSettings>) => void
  unlockItem: (id: string) => void
}

const STORAGE_KEY = 'neuroleto-store'

const defaultProfile: ChildProfile = {
  ageGroup: '9-10',
  name: 'Игрок',
}

const defaultSettings: AppSettings = {
  soundEnabled: true,
  musicEnabled: true,
  reducedMotion: false,
}

/** localStorage с fallback в память, если хранилище недоступно */
function createSafeStorage(): StateStorage {
  let memoryStore: Record<string, string> = {}

  const memoryStorage: StateStorage = {
    getItem: (name) => memoryStore[name] ?? null,
    setItem: (name, value) => {
      memoryStore[name] = value
    },
    removeItem: (name) => {
      delete memoryStore[name]
    },
  }

  if (typeof window === 'undefined') {
    return memoryStorage
  }

  try {
    const testKey = '__storage_test__'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return {
      getItem: (name) => window.localStorage.getItem(name),
      setItem: (name, value) => window.localStorage.setItem(name, value),
      removeItem: (name) => window.localStorage.removeItem(name),
    }
  } catch {
    return memoryStorage
  }
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      childProfile: defaultProfile,
      stars: 0,
      streak: 0,
      unlockedItems: [],
      settings: defaultSettings,
      attemptsToday: 0,

      updateStars: (delta) =>
        set((state) => ({
          stars: Math.max(0, state.stars + delta),
          streak: delta > 0 ? state.streak + 1 : state.streak,
        })),

      addAttempt: () =>
        set((state) => ({
          attemptsToday: state.attemptsToday + 1,
        })),

      resetAttempts: () => set({ attemptsToday: 0 }),

      setProfile: (profile) =>
        set((state) => ({
          childProfile: { ...state.childProfile, ...profile },
        })),

      setSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      unlockItem: (id) => {
        const { unlockedItems } = get()
        if (unlockedItems.some((item) => item.id === id)) return
        set({
          unlockedItems: [
            ...unlockedItems,
            { id, unlockedAt: Date.now() },
          ],
        })
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(createSafeStorage),
      partialize: (state) => ({
        childProfile: state.childProfile,
        stars: state.stars,
        streak: state.streak,
        unlockedItems: state.unlockedItems,
        settings: state.settings,
        attemptsToday: state.attemptsToday,
      }),
    },
  ),
)
