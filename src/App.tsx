import React from 'react'
import logo from './logo.svg'
import './App.scss'
import Frame from './components/Frame'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Frame width={400} height={200} rotateAngle={-45} center={{ x: 800, y: 300 }} />
      </header>
    </div>
  )
}

export default App
