import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function ElementNavLink({ destination, icon, text }) {

  const location = useLocation()

  return (
    <NavLink to={destination} className={`flex flex-row items-center justify-center gap-2 py-2 px-5 rounded-xl text-neutral-500 hover:bg-neutral-100 ${destination === location.pathname && 'bg-neutral-100 text-indigo-500'}`}>
        {icon}
        <p className='text-neutral-500 text-lg'> {text} </p>
    </NavLink>
  )
}
