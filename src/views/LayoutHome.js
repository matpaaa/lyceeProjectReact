import React, {useContext, useEffect} from 'react'
import HeaderDashboard  from '@/components/HeaderDashboard'
import FooterDashboard  from '@/components/FooterDashboard'
import { Outlet } from 'react-router-dom'
import { ContextAPI } from '@/_utils/RequestAPI.js'


export default function LayoutHome() {
  const { requestAPI, imageDatabase } = useContext(ContextAPI)

  useEffect(() => {
    requestAPI.getImages()
  }, [])

  return (
    <section className='flex flex-col w-full h-screen overflow-y-hidden bg-white'>
        <HeaderDashboard />

        <Outlet />

        <FooterDashboard />
    </section>
  )
}