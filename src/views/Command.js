import React, { useRef, useState } from 'react'
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCog, FaMousePointer, FaTimes } from "react-icons/fa"


const Button = ({ arrow, handleStepFunction, direction, value }) => {
    return (
        <div onClick={() => handleStepFunction(direction, value)} className='w-40 h-40 bg-neutral-100 rounded-xl p-5 text-neutral-500 flex justify-center items-center hover:bg-neutral-200 cursor-pointer active:text-indigo-500'>
            {arrow}
        </div>
    )
}

export default function Command() {

    const [settingsMenu, setSettingsMenu] = useState(false)

    const inputStepRef  = useRef(null)
    const inputSpeedRef = useRef(null)
    const inputDrawRef  = useRef(null)

    const handleStep = (direction, value) => {
        const stepValue = inputStepRef.current.value
        const speedValue = inputSpeedRef.current.value
        //const checkboxValue = inputDrawRef.current.check
    
        console.log(stepValue)
        console.log(speedValue)
        //console.log(checkboxValue)
    
        console.log(direction, parseInt(value) * parseInt(speedValue))
    }

    return (
        <>
            {settingsMenu && (
                <div className='bg-transparent w-96 py-20 h-[60%] absolute z-10 top-0 right-0'>
                    <div className='bg-white shadow h-full w-full p-5 flex flex-col items-start justify-between'>
                        <div className='flex flex-row justify-between items-center w-full'>
                            <h2 className='text-2xl font-semibold text-black'>Settings</h2>
                            <button onClick={() => setSettingsMenu(false)} className='p-2 bg-neutral-100 text-neutral-500 hover:text-indigo-500 rounded-full'>
                                <FaTimes className='w-5 h-5' />
                            </button>
                        </div>

                        <input ref={inputStepRef} type='number' placeholder='Enter number step per click' className='bg-neutral-100 rounded-xl py-2 px-6 text-neutral-500 focus:outline-none' />

                        <div className='flex flex-col w-full gap-2'>
                            <p className='text-neutral-500'>Select speed:</p>
                            <input ref={inputSpeedRef} type="range" min={0} max="100" className="range [--range-shdw:#6366f1]" />
                        </div>


                        <div className='flex flex-row justify-center gap-5 items-center w-full'>
                            <p className='text-lg text-neutral-500'>Press button to draw with button:</p>
                            <input ref={inputDrawRef} type="checkbox" className="checkbox border-neutral-500 [--chkbg:theme(colors.indigo.500)] [--chkfg:theme(text.neutral.500)] checked:border-indigo-500" />
                        </div>

                        <div className='w-full flex flex-row justify-end items-center'>
                            <button className='py-2 px-6 rounded-xl bg-indigo-500 font-bold text-white'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <section className='py-5 px-10 w-full h-full flex flex-col items-center justify-start gap-5'>
                <div className='flex flex-col justify-center items-center w-full gap-5 relative pt-20'>
                    <button onClick={() => setSettingsMenu(true)} className='p-2 bg-neutral-100 text-neutral-500 hover:text-indigo-500 rounded-full absolute right-0 top-0'>
                        <FaCog className='w-5 h-5' />
                    </button>

                    <div className='absolute top-0 left-0 flex flex-col justify-start items-center'>
                        <h2 className='text-xl text-black'>Positions :</h2>
                        <p className='text-black'>X : <span className='text-indigo-500'>00</span> </p>
                        <p className='text-black'>Y : <span className='text-indigo-500'>00</span> </p>
                    </div>

                    <Button direction={'x'} handleStepFunction={handleStep} value={1} arrow={<FaArrowAltCircleUp className='w-12 h-12' />} />
                    <div className='flex flex-row justify-center items-center gap-10'>
                        <Button direction={'z'} handleStepFunction={handleStep} value={1} arrow={<FaArrowAltCircleLeft className='w-12 h-12' />} />
                        <Button direction={'y'} handleStepFunction={handleStep} value={1} arrow={<FaMousePointer className='w-10 h-10' />} />
                        <Button direction={'z'} handleStepFunction={handleStep} value={1} arrow={<FaArrowAltCircleRight className='w-12 h-12' />} />
                    </div>
                    <Button direction={'x'} handleStepFunction={handleStep} value={-1} arrow={<FaArrowAltCircleDown className='w-12 h-12' />} />
                </div>
            </section>
        
        </>
  )
}