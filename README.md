# 🧠 НейроЛето (NeuroSummer)

**Веб-приложение для когнитивного развития детей 7–11 лет**  
🌟 300+ нейроигр | 📱 PWA (офлайн) | 🔒 Local-First (без серверов)

## 📋 О проекте

«НейроЛето» — образовательное PWA-приложение, которое заменяет бессмысленные летние развлечения структурированными 15-минутными сессиями для тренировки мозга.

### Особенности

- 🚀 **100% локально:** данные хранятся в браузере. PWA с офлайн-кешем через Service Worker.
- 🎮 **300 игр:** разделены по возрастам (7–8, 9–10, 11+) и навыкам (внимание, память, логика и др.).
- 🎨 **Canvas Engines:** 10 оптимизированных игровых механик на чистом JS/Canvas (в roadmap).
- 👨‍👩‍👧 **Родительский контроль:** локальный PIN, статистика, экспорт прогресса (частично реализовано).
- 🔊 **Звуковой дизайн:** Web Audio API синтезатор без внешних файлов (в roadmap).

### Текущий статус MVP

| Модуль | Статус |
|--------|--------|
| Каркас React + Vite + TS + Tailwind | ✅ |
| Роутинг, Layout, ErrorBoundary | ✅ |
| Zustand + persist (localStorage) | ✅ |
| Каталог 300 игр + фильтры + поиск | ✅ |
| Страницы Landing / Session / Parent / Rewards | ✅ (заглушки) |
| IndexedDB вместо localStorage | 🔜 |
| vite-plugin-pwa | ✅ |
| Canvas-движки игр | 🔜 |
| Web Audio синтезатор | 🔜 |

## 🛠 Технологии

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **State:** Zustand (`persist` → localStorage, fallback в память)
- **Routing:** React Router v6
- **UI:** Framer Motion, Lucide React
- **Graphics (planned):** HTML5 Canvas (Custom Engines)
- **PWA:** vite-plugin-pwa (Service Worker, Manifest, офлайн)

## 🚀 Запуск проекта

### Требования

- Node.js 18+
- npm 9+

### Установка и запуск

```bash
cd игра
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

### Сборка

```bash
npm run build
npm run preview
```

## 🗺 Маршруты

| URL | Страница | Описание |
|-----|----------|----------|
| `/` | Landing | Главная |
| `/catalog` | Catalog | Каталог игр (автофильтр по возрасту) |
| `/session/:gameId` | Session | Игровая сессия |
| `/parent` | Parent | Родительская зона / настройки |
| `/rewards` | Rewards | Награды и достижения |

## 📂 Структура проекта

```
игра/
├── public/
│   └── vite.svg                 # Иконка
├── src/
│   ├── components/
│   │   ├── catalog/
│   │   │   ├── Filters.tsx      # Фильтры каталога (сложность, навык, длительность)
│   │   │   ├── GameCard.tsx     # Карточка игры
│   │   │   └── GameModal.tsx    # Модалка с описанием игры
│   │   ├── ErrorBoundary.tsx    # Обработка ошибок React
│   │   ├── Layout.tsx           # Хедер + safe-area + мобильные отступы
│   │   └── MobileNav.tsx        # Нижняя навигация (мобильные)
│   ├── data/
│   │   └── games.ts             # 300 игр: GAMES_7_8, GAMES_9_10, GAMES_11PLUS
│   ├── hooks/
│   │   └── useDebounce.ts       # Debounce для поиска в каталоге
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Catalog.tsx
│   │   ├── Session.tsx
│   │   ├── Parent.tsx
│   │   └── Rewards.tsx
│   ├── store/
│   │   └── useStore.ts          # Zustand: профиль, звёзды, streak, настройки
│   ├── App.tsx                  # Роутинг + Suspense
│   ├── main.tsx                 # Точка входа
│   └── index.css                # Tailwind directives
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## 🎮 Данные игр

Файл `src/data/games.ts` содержит **300 игр** (100 на каждую возрастную группу):

- **Экспорты:** `GAMES_7_8`, `GAMES_9_10`, `GAMES_11PLUS`
- **Поля:** `id`, `title`, `ageGroup`, `difficulty`, `skills`, `duration`, `description`, `instruction`, `mechanics`, `adaptation`, `rewards`, `sensoryCue`
- **sensoryCue:** `{ name, profile, intensity, purpose, visualCue }`

Каталог автоматически фильтрует игры по `childProfile.ageGroup` из Zustand-store.

## 🔒 Local-First

- Нет внешних API, облачных БД и CDN для данных приложения.
- Состояние пользователя сохраняется локально (ключ `neuroleto-store` в localStorage).
- Все фильтры и поиск выполняются на клиенте через `useMemo`.

## ⚙️ Настройки PWA

Приложение поддерживает установку на устройство.

- **Android:** Меню браузера → «Установить приложение»
- **iOS:** Кнопка «Поделиться» → «На экран „Домой“»

> **Примечание:** после `npm run build` и деплоя статики приложение кешируется и работает офлайн. В dev-режиме PWA также включён (`devOptions.enabled`).

## 📜 Лицензия

Private / Educational Use Only.
