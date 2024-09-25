import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from '@/views/Menu'
import Images from '@/views/Images'
import Error404 from '@/views/errors/Error404'
import LayoutHome from '@/views/LayoutHome'
import Command from '@/views/Command'

export default function HomeRouter() {
  return (
    <Routes>
        <Route element={<LayoutHome />}>
            <Route index element={<Menu />} />

            <Route path='/menu' element={<Menu />} />
            <Route path='/images' element={<Images />} />
            <Route path='/command' element={<Command />} />
        </Route>

        <Route path='/*' element={<Error404 />} />
    </Routes>
  )
}