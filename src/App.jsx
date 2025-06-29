import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import MainPage from './pages/mainPage'
import SelectPage from './pages/selectPage'
import PostPage from './pages/postPage'
import Login_Register from './pages/login_register'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/select' element={<SelectPage />} />
          <Route path='/post' element={<PostPage />} />

          <Route path='/entries' element={<Login_Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App