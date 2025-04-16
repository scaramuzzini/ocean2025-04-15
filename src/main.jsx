import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Starlink from './Starlink.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Starlink />
  </StrictMode>,
)
