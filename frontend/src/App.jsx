import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App