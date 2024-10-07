import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  } catch (error) {
    console.error('Error rendering the app:', error)
    rootElement.innerHTML = '<div style="color: red; padding: 20px;">An error occurred while loading the application. Please check the console for more details.</div>'
  }
} else {
  console.error('Root element not found')
}