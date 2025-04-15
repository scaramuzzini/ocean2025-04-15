import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Ocean Brasil</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 3)}>
          Contagem: {count}
        </button>
      </div>
    </>
  )
}

export default App
