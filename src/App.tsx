import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'

const Landing = lazy(() => import('@/pages/Landing'))
const Catalog = lazy(() => import('@/pages/Catalog'))
const Session = lazy(() => import('@/pages/Session'))
const Parent = lazy(() => import('@/pages/Parent'))
const Rewards = lazy(() => import('@/pages/Rewards'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            {/* URL: /catalog */}
            <Route path="catalog" element={<Catalog />} />
            <Route path="session/:gameId" element={<Session />} />
            <Route path="parent" element={<Parent />} />
            <Route path="rewards" element={<Rewards />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
