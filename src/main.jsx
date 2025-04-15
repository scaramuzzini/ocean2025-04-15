import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Starlink from './Starlink.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Starlink />
  </StrictMode>,
)
