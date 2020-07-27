import React from 'react'
import './App.scss'
import Frame from './components/Frame'
import { degToRadian } from './utils'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Frame width={300} height={200} rotateAngle={degToRadian(-45)} center={{ x: 800, y: 300 }} />
      </header>
    </div>
  )
}

export default App
