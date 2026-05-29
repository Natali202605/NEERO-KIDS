import type { Skill } from '@/data/games'

export const SUCCESS_PHRASES = [
  'Супер! Ты молодец! 🌟',
  'Отлично получилось! ✨',
  'Умничка! Так держать! 💫',
  'Вау! Как здорово! 🎉',
  'Ты настоящий чемпион! 🏆',
  'Блестяще! Продолжай! ⭐',
  'Здорово! Мозг растёт! 🧠',
  'Прекрасная работа! 🌈',
]

export const FAIL_PHRASES = [
  'Ничего страшного — попробуй ещё! 💪',
  'У тебя получится! Я верю в тебя! 🤗',
  'Ошибки помогают учиться! 📚',
  'Сделай глубокий вдох и попробуй снова! 🌸',
  'Каждая попытка делает тебя сильнее! 💛',
]

export const START_PHRASES = [
  'Привет! Я помогу тебе! Поехали! 🚀',
  'Готов? Вместе справимся! 💫',
  'Сейчас будет интересно! 🎮',
]

export function pickRandom(arr: readonly string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export function getSessionConclusion(
  skill: Skill,
  score: number,
  maxScore: number,
): string {
  const ratio = maxScore > 0 ? score / maxScore : 0

  const skillMessages: Record<Skill, { great: string; good: string; try: string }> = {
    memory: {
      great: 'Ты отлично тренировал память! Запоминать стало легче — мозг стал сильнее.',
      good: 'Память растёт с каждой игрой. Продолжай — скоро запоминать будет ещё проще!',
      try: 'Память — как мышца: чем больше тренируешь, тем сильнее. Попробуй ещё раз!',
    },
    attention: {
      great: 'Твоё внимание сегодня на высоте! Ты замечаешь детали — это суперсила.',
      good: 'Концентрация улучшается! Каждая игра учит замечать важное.',
      try: 'Внимание тренируется постепенно. Не сдавайся — получится!',
    },
    logic: {
      great: 'Логика работает блестяще! Ты умеешь находить закономерности.',
      good: 'Мыслить логически — это навык. Ты уже на правильном пути!',
      try: 'Загадки помогают мозгу думать. Попробуй ещё — ты близко к цели!',
    },
    motor: {
      great: 'Молниеносная реакция! Координация и скорость на отличном уровне.',
      good: 'Руки становятся быстрее и точнее. Отличная тренировка!',
      try: 'Реакция тренируется с практикой. Следующий раз будет лучше!',
    },
    language: {
      great: 'Слова и картинки — твоя сильная сторона! Речь развивается здорово.',
      good: 'С каждой игрой словарь растёт. Ты молодец!',
      try: 'Язык развивается через игру. Продолжай — слова запомнятся!',
    },
    emotion: {
      great: 'Ты прекрасно понимаешь чувства! Эмоциональный интеллект — твоя сила.',
      good: 'Умение распознавать эмоции — важный навык. Ты на верном пути!',
      try: 'Чувства бывают разные — это нормально. Продолжай учиться понимать их!',
    },
  }

  const msgs = skillMessages[skill]
  if (ratio >= 0.8) return msgs.great
  if (ratio >= 0.4) return msgs.good
  return msgs.try
}

export function getSessionTitle(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio >= 0.9) return 'Ты звезда! 🌟'
  if (ratio >= 0.6) return 'Молодец! 🎉'
  if (ratio >= 0.3) return 'Хорошая попытка! 💪'
  return 'Ты старался — это главное! 🤗'
}

export type MascotMood = 'happy' | 'think' | 'cheer' | 'support'

export function moodFromFeedback(feedback: 'ok' | 'fail' | null): MascotMood {
  if (feedback === 'ok') return 'cheer'
  if (feedback === 'fail') return 'support'
  return 'think'
}
