import React from 'react'
import ElementNavLink from '@/components/ElementNavLink'
import { FaHome, FaImages, FaGamepad } from 'react-icons/fa'

const DEFAULT_STYLES_ICON = 'w-4 h-4'

const LINKS = [
    {
        icon: <FaHome className={DEFAULT_STYLES_ICON} />,
        destination: '/home/menu',
        text: 'Home'
    },
    {
        icon: <FaImages className={DEFAULT_STYLES_ICON} />,
        destination: '/home/images',
        text: 'Images'
    },
    {
        icon: <FaGamepad className={DEFAULT_STYLES_ICON} />,
        destination: '/home/command',
        text: 'Command'
    },
]

export default function HeaderDashboard() {
  return (
    <header className='flex flex-col gap-2 md:flex-row md:gap-0 justify-between items-center py-5 px-10 w-full'>
        <h1 className='text-3xl font-bold text-indigo-500'>Project</h1>
        <nav className='flex flex-col gap-2 sm:flex-row justify-center items-center sm:gap-5'>
            {
                LINKS.map((link, index) => (
                    <ElementNavLink key={index} destination={link.destination} icon={link.icon} text={link.text} />
                ))
            }
        </nav>
    </header>
  )
}