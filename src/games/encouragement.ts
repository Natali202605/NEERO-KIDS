import type { Skill } from '@/data/games'

export const SUCCESS_PHRASES = [
  'Как здорово у тебя получилось! Я так рад за тебя! 🌟',
  'Ты большой молодец — я горжусь тобой! ✨',
  'Умничка! Каждый шаг делает тебя сильнее! 💫',
  'Вау! Это было здорово — продолжай в том же духе! 🎉',
  'Ты справился — это настоящая победа! 🏆',
  'Блестяще! Ты растёшь с каждым раундом! ⭐',
  'Здорово! Твой мозг сегодня работает отлично! 🧠',
  'Прекрасно! Я вижу, как ты стараешься! 🌈',
]

export const FAIL_PHRASES = [
  'Ничего страшного, солнышко. Давай попробуем ещё раз — я рядом! 🤗',
  'Ошибки — это нормально. Ты уже молодец, что пробуешь! 💛',
  'Сделай глубокий вдох… У тебя обязательно получится! 🌸',
  'Я верю в тебя! Каждая попытка — маленький шаг вперёд! 💪',
  'Ты старался — и это самое главное. Попробуем снова? 🌷',
]

export const CHARACTER_NAMES: Record<Skill, { name: string; role: string }> = {
  memory: { name: 'Зайка Памяти', role: 'помогает запоминать' },
  attention: { name: 'Сова Виола', role: 'учит замечать детали' },
  logic: { name: 'Лисёнок Логик', role: 'разгадывает загадки' },
  motor: { name: 'Бычок Блиц', role: 'тренирует ловкость' },
  language: { name: 'Попугай Словик', role: 'играет со словами' },
  emotion: { name: 'Мишка Тёплый', role: 'понимает чувства' },
}

export interface IntellectualLevel {
  label: string
  emoji: string
  description: string
}

export function getIntellectualLevel(score: number, maxScore: number): IntellectualLevel {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio >= 0.85)
    return {
      label: 'Яркий уровень',
      emoji: '🌟',
      description: 'Ты уверенно справляешься — мозг работает бодро и сосредоточенно!',
    }
  if (ratio >= 0.55)
    return {
      label: 'Растущий уровень',
      emoji: '🌱',
      description: 'Ты хорошо стараешься — навык крепнет с каждым раундом.',
    }
  if (ratio >= 0.25)
    return {
      label: 'Начинающий уровень',
      emoji: '🌸',
      description: 'Ты делаешь первые шаги — это очень ценно и важно!',
    }
  return {
    label: 'Знакомство с навыком',
    emoji: '💫',
    description: 'Ты только знакомишься с заданием — не торопись, я рядом.',
  }
}

export function getTrainingTip(skill: Skill, ratio: number): string {
  const tips: Record<Skill, { high: string; mid: string; low: string }> = {
    memory: {
      high: 'Можно попробовать игры посложнее — память у тебя крепкая!',
      mid: 'Продолжай игры на память: повторяй последовательности вслух — так легче.',
      low: 'Начни с коротких раундов. Запоминай по одному элементу — без спешки.',
    },
    attention: {
      high: 'Отличная концентрация! Попробуй игры с большим полем.',
      mid: 'Тренируй внимание: перед ответом посмотри на всё поле целиком.',
      low: 'Ищи по одной картинке за раз. Можно делать паузу между раундами.',
    },
    logic: {
      high: 'Логика сильная! Ищи закономерности — они тебе уже знакомы.',
      mid: 'Смотри на ряд и спрашивай себя: «Что повторяется?»',
      low: 'Начни с простых рядов из двух цветов. Главное — не спешить.',
    },
    motor: {
      high: 'Быстрая реакция! Можно ускорять темп в следующих играх.',
      mid: 'Жди сигнал спокойно — торопиться не нужно, только после зелёного.',
      low: 'Сначала научись ждать: смотри на кнопку и дыши ровно.',
    },
    language: {
      high: 'Слова даются легко! Читай вслух названия — так интереснее.',
      mid: 'Произноси слово вслух и ищи картинку — связь станет крепче.',
      low: 'Назови слово медленно и найди похожую картинку. Без давления.',
    },
    emotion: {
      high: 'Ты тонко чувствуешь эмоции — это большая сила и дар.',
      mid: 'Спроси себя: «Что бы я почувствовал на месте героя?»',
      low: 'Эмоции бывают разные — все они важны. Смотри на лицо и ситуацию.',
    },
  }
  const t = tips[skill]
  if (ratio >= 0.7) return t.high
  if (ratio >= 0.35) return t.mid
  return t.low
}

export function getRoundInsight(
  skill: Skill,
  round: number,
  total: number,
  success: boolean,
): string {
  if (success) {
    const ok: Record<Skill, string[]> = {
      memory: ['Ты запомнил — молодец!', 'Память сработала отлично!'],
      attention: ['Ты всё нашёл — зоркий глаз!', 'Внимание не подвело!'],
      logic: ['Верный ответ — логика сильная!', 'Ты увидел закономерность!'],
      motor: ['Метко и вовремя — супер!', 'Реакция на высоте!'],
      language: ['Слово и картинка — вместе!', 'Язык растёт!'],
      emotion: ['Ты понял чувство — это важно!', 'Эмпатия — твоя сила!'],
    }
    return pickRandom(ok[skill])
  }
  const gentle: Record<Skill, string[]> = {
    memory: ['Посмотри ещё раз — я помогу!', 'Запоминать учатся постепенно.'],
    attention: ['Не все нашлись — попробуем снова!', 'Детали приходят с практикой.'],
    logic: ['Загадка не простая — это нормально!', 'Подумай ещё — получится!'],
    motor: ['Реакция тренируется — не сдавайся!', 'В следующий раз поймаешь момент!'],
    language: ['Слово запомнится в следующий раз!', 'Язык растёт шаг за шагом.'],
    emotion: ['Чувства бывают сложными — ты старался!', 'Понимать эмоции — это путь.'],
  }
  return pickRandom(gentle[skill])
}

export function getEmotionWarmSummary(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio >= 0.8)
    return 'Ты очень чутко понимаешь чувства — своё и чужое. Это помогает дружить, договариваться и чувствовать себя увереннее. Продолжай бережно относиться к эмоциям — они все важны.'
  if (ratio >= 0.5)
    return 'Ты уже хорошо замечаешь эмоции. Иногда можно остановиться и спросить себя: «Что я сейчас чувствую?» — это делает тебя спокойнее и добрее к себе и другим.'
  return 'Понимать чувства — навык, который растёт с любовью и терпением. Не спеши: каждая игра — маленький разговор с собой. Ты на верном пути, и я горжусь твоими стараниями.'
}

export function getSessionConclusion(
  skill: Skill,
  score: number,
  maxScore: number,
): string {
  const ratio = maxScore > 0 ? score / maxScore : 0
  const char = CHARACTER_NAMES[skill]

  const skillMessages: Record<Skill, { great: string; good: string; try: string }> = {
    memory: {
      great: `${char.name} радуется: ты отлично тренировал память! Запоминать стало легче — это значит, мозг растёт.`,
      good: 'Память — как сад: поливаешь — и она расцветает. Продолжай играть — скоро будет ещё легче!',
      try: 'Память любит спокойствие и повторение. Попробуй ещё раз — без спешки, в своём темпе.',
    },
    attention: {
      great: 'Твоё внимание сегодня сияет! Ты замечаешь детали — это настоящая суперсила.',
      good: 'Концентрация крепнет с каждой игрой. Ты уже на верном пути — так держать!',
      try: 'Внимание тренируется нежно и постепенно. Каждая попытка — маленькая победа.',
    },
    logic: {
      great: 'Логика работает блестяще! Ты умеешь видеть закономерности — это очень ценно.',
      good: 'Думать логически — навык, который растёт. Ты уже делаешь большие шаги!',
      try: 'Загадки учат мозг думать. Не торопись — в следующий раз получится лучше.',
    },
    motor: {
      great: 'Быстрая и точная реакция! Тело и мозг работают дружно — здорово!',
      good: 'Ловкость и скорость улучшаются. Каждая игра — маленькая тренировка чемпиона.',
      try: 'Реакция приходит с практикой. Дыши спокойно — следующий раз будет легче.',
    },
    language: {
      great: 'Слова и картинки — твоя сильная сторона! Речь развивается красиво и уверенно.',
      good: 'С каждой игрой словарь растёт. Читай и говори вслух — так интереснее!',
      try: 'Язык раскрывается через игру. Не бойся ошибок — они помогают учиться.',
    },
    emotion: {
      great: getEmotionWarmSummary(score, maxScore),
      good: getEmotionWarmSummary(score, maxScore),
      try: getEmotionWarmSummary(score, maxScore),
    },
  }

  const msgs = skillMessages[skill]
  if (ratio >= 0.8) return msgs.great
  if (ratio >= 0.4) return msgs.good
  return msgs.try
}

export function getSessionTitle(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio >= 0.9) return 'Ты настоящая звезда! 🌟'
  if (ratio >= 0.6) return 'Я так горжусь тобой! 🎉'
  if (ratio >= 0.3) return 'Ты старался — это главное! 💛'
  return 'Ты молодец, что попробовал! 🤗'
}

export function pickRandom(arr: readonly string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export type MascotMood = 'happy' | 'think' | 'cheer' | 'support'

export function moodFromFeedback(feedback: 'ok' | 'fail' | null): MascotMood {
  if (feedback === 'ok') return 'cheer'
  if (feedback === 'fail') return 'support'
  return 'think'
}
