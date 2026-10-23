import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LangProvider } from './i18n/lang.jsx'
import './styles/index.css'

// /?invite opens the family's invitation sender instead of the site.
const HostTool = lazy(() => import('./host/HostTool.jsx'))
const isHost = new URLSearchParams(window.location.search).has('invite')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      {isHost ? (
        <Suspense fallback={null}>
          <HostTool />
        </Suspense>
      ) : (
        <App />
      )}
    </LangProvider>
  </React.StrictMode>
)
