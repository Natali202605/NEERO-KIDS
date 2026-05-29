export type GameAgeGroup = '7-8' | '9-10' | '11+'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Skill =
  | 'memory'
  | 'attention'
  | 'logic'
  | 'motor'
  | 'language'
  | 'emotion'

export type Duration = 'short' | 'medium' | 'long'

export interface SensoryCue {
  name: string
  profile: string
  intensity: 'low' | 'medium' | 'high'
  purpose: string
  visualCue: string
}

export interface Game {
  id: string
  title: string
  ageGroup: GameAgeGroup
  difficulty: Difficulty
  skills: Skill[]
  duration: Duration
  description: string
  instruction: string
  mechanics: string
  adaptation: string
  rewards: string
  sensoryCue: SensoryCue
}

const SKILLS: Skill[] = [
  'memory',
  'attention',
  'logic',
  'motor',
  'language',
  'emotion',
]

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']
const DURATIONS: Duration[] = ['short', 'medium', 'long']

export const DURATION_LABELS: Record<Duration, string> = {
  short: '5–7 мин',
  medium: '8–12 мин',
  long: '13–18 мин',
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Лёгкая',
  medium: 'Средняя',
  hard: 'Сложная',
}

export const SKILL_LABELS: Record<Skill, string> = {
  memory: 'Память',
  attention: 'Внимание',
  logic: 'Логика',
  motor: 'Моторика',
  language: 'Речь',
  emotion: 'Эмоции',
}

export const AGE_GROUP_LABELS: Record<GameAgeGroup, string> = {
  '7-8': '7–8 лет',
  '9-10': '9–10 лет',
  '11+': '11 лет и старше',
}

export const INTENSITY_LABELS: Record<SensoryCue['intensity'], string> = {
  low: 'низкая',
  medium: 'средняя',
  high: 'высокая',
}

const THEME_PREFIXES = [
  'Звёздный',
  'Лесной',
  'Морской',
  'Горный',
  'Солнечный',
  'Лунный',
  'Радужный',
  'Снежный',
  'Весенний',
  'Осенний',
]

const THEME_NOUNS = [
  'лабиринт',
  'квест',
  'пазл',
  'марафон',
  'тренажёр',
  'сад',
  'мост',
  'мостик',
  'остров',
  'городок',
]

const SENSORY_PROFILES = [
  'спокойный',
  'бодрящий',
  'сбалансированный',
  'мягкий',
  'яркий',
]

const VISUAL_CUES = [
  'голубые волны',
  'зелёные листья',
  'тёплый закат',
  'мягкое сияние',
  'пастельные круги',
  'медленные облака',
]

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length]!
}

function buildGames(ageGroup: GameAgeGroup, slug: string): Game[] {
  return Array.from({ length: 100 }, (_, index) => {
    const n = index + 1
    const primarySkill = pick(SKILLS, index)
    const secondarySkill = pick(SKILLS, index + 2)
    const difficulty = pick(DIFFICULTIES, index + n)
    const duration = pick(DURATIONS, index + 1)
    const prefix = pick(THEME_PREFIXES, index)
    const noun = pick(THEME_NOUNS, index + 3)
    const intensity = pick(
      ['low', 'medium', 'high'] as const,
      index,
    )

    return {
      id: `${slug}-${String(n).padStart(3, '0')}`,
      title: `${prefix} ${noun} ${n}`,
      ageGroup,
      difficulty,
      skills: [primarySkill, secondarySkill],
      duration,
      description: `Упражнение для детей ${AGE_GROUP_LABELS[ageGroup]}: развивает «${SKILL_LABELS[primarySkill]}» и «${SKILL_LABELS[secondarySkill]}» в игровой форме.`,
      instruction: `Смотри на подсказки на экране. Пройди раунд ${n}, внимательно выполняя задания.`,
      mechanics: `Пошаговые задания с обратной связью. Сложность: ${DIFFICULTY_LABELS[difficulty]}. Длительность: ${DURATION_LABELS[duration]}.`,
      adaptation: `Если устал — делай медленнее. Если всё получается — попробуй пройти ещё один раунд.`,
      rewards: `Можно получить до 3 звёзд за точность и завершение без подсказок.`,
      sensoryCue: {
        name: `Профиль «${pick(SENSORY_PROFILES, index)}»`,
        profile: pick(SENSORY_PROFILES, index + 1),
        intensity,
        purpose: 'Поддержка концентрации и снижение перегрузки',
        visualCue: pick(VISUAL_CUES, index),
      },
    }
  })
}

export const GAMES_7_8 = buildGames('7-8', 'g78')
export const GAMES_9_10 = buildGames('9-10', 'g910')
export const GAMES_11PLUS = buildGames('11+', 'g11')

export const ALL_GAMES: Game[] = [
  ...GAMES_7_8,
  ...GAMES_9_10,
  ...GAMES_11PLUS,
]

export const GAMES_BY_AGE: Record<GameAgeGroup, Game[]> = {
  '7-8': GAMES_7_8,
  '9-10': GAMES_9_10,
  '11+': GAMES_11PLUS,
}

export function getGameById(id: string): Game | undefined {
  return ALL_GAMES.find((g) => g.id === id)
}

export const SKILL_EMOJI: Record<Skill, string> = {
  memory: '🧠',
  attention: '👀',
  logic: '🧩',
  motor: '⚡',
  language: '📖',
  emotion: '💛',
}

export const SKILL_COLORS: Record<Skill, string> = {
  memory: 'from-lavender-400 to-brand-500',
  attention: 'from-sky-400 to-brand-600',
  logic: 'from-grass-400 to-brand-600',
  motor: 'from-sun-400 to-coral-400',
  language: 'from-brand-400 to-lavender-500',
  emotion: 'from-coral-400 to-sun-400',
}

/** Сопоставление legacy-групп из localStorage с актуальными */
export function normalizeAgeGroup(
  value: string | undefined,
): GameAgeGroup {
  if (value === '7-8' || value === '9-10' || value === '11+') return value
  if (value === '3-4') return '7-8'
  if (value === '5-6') return '9-10'
  return '11+'
}
