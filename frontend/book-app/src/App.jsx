import React from 'react'
import Home from './components/Home.jsx'
import Auth from './components/Auth.jsx'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <div>
      {/* <Home/> */}
      
      <Routes>
        <Route path='signUp' element={<Auth/>} />
        <Route path='home'element={<Home/>}  />
      </Routes>

    </div>
  )
}

export default App