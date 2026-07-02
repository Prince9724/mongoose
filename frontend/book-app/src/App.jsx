import React from 'react'
import Home from './components/Home.jsx'
import Auth from './components/Auth.jsx'
import { Route, Routes,Navigate   } from 'react-router'

const App = () => {
  return (
    <div>
      {/* <Home/> */}

      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='home' element={<Home />} />
        <Route path='*' element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  )
}

export default App