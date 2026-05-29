import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import './index.css'

registerSW({
  immediate: true,
  onOfflineReady() {
    console.info('[PWA] Приложение готово к офлайн-работе')
  },
})

const basename = import.meta.env.PROD ? '/NEERO-KIDS' : ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)