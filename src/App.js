import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeRouter from '@/HomeRouter'
import Error404 from '@/views/errors/Error404'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home/*' element={<HomeRouter />} />

        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}