import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import MainPage from './pages/mainPage'
import SelectPage from './pages/selectPage'
import PostPage from './pages/postPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/select' element={<SelectPage />} />
          <Route path='/post' element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App