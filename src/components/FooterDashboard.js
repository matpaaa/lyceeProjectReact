import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'


export default function FooterDashboard() {
  return (
    <footer className='flex flex-col-reverse gap-2 md:flex-row md:gap-0 justify-between items-center py-5 px-10 w-full'>
        <p className='text-neutral-500 font-thin text-center'>&copy; Mathys Paoly - Romain Pellieux Abram</p>
        <div className='flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-xl bg-red-500 cursor-pointer'>
          <FaSignOutAlt className='w-5 h-5 text-white' />
          <p className='text-white'>Logout</p>
        </div>
    </footer>
  )
}