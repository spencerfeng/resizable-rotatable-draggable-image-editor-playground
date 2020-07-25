import React from 'react'
import './App.scss'
import Frame from './components/Frame'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Frame width={400} height={200} rotateAngle={-45} center={{ x: 800, y: 300 }} />
      </header>
    </div>
  )
}

export default App
