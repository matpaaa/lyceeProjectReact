import React, {useContext, useRef, useState} from 'react'
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import { ContextAPI } from '@/_utils/RequestAPI.js'


const Row = ({ data, deleteFunction, renameFunction, printImage }) => {
  return (
    <tr className='text-neutral-500 text-lg' onContextMenu={(e) => renameFunction(e, data.name)}>
      <td> {data.name} </td>
      <td> {data.size} </td>
      <td> {data.type} </td>
      <td className='w-auto p-2 rounded-full text-red-500' onClick={() => deleteFunction(data.name)}> <FaTrash className='text-xl cursor-pointer' /> </td>
      <td className='w-auto p-2 rounded-full text-indigo-500' onClick={() => printImage(data.name)}> <FaPencilAlt className='text-xl cursor-pointer' /> </td>
    </tr>
  )
}

export default function Images() {

  const { requestAPI, imageDatabase } = useContext(ContextAPI)

  const [image, setImage] = useState(null)
  const [successSend, setSuccessSend] = useState(null)
  const [errorSend, setErrorSend] = useState(null)

  const [nameRename, setNameRename] = useState('')

  const inputFileRef = useRef(null)
  const inputNewNameImage = useRef(null)

  const handleClickAddImage = () => {
      if (inputFileRef.current) {
          inputFileRef.current.click()
      }
  }

  const handleChangeImage = (event) => {
      setImage(event.target.files[0])
  }

  const handleClickSendImage = () => {
      if (image) {
          const formData = new FormData()
          formData.append('image', image)

          requestAPI.sendImage(formData)
      }
  }

  const handleDeletedImage = (name) => {
    if (name) {
      requestAPI.deleteImage(name)
    }
  }

  const handleRenameImage = (e, name) => {
    if (e && name) {
      e.preventDefault()
      setNameRename(name)
      document.querySelector('#modal_edit_name').showModal()
    }
  }

  const sendNewName = () => {
    const newName = inputNewNameImage.current.value

    requestAPI.renameImage(nameRename, newName)
      .then(_ => inputNewNameImage.current.value = '')
  }

  const printImage = (name) => {
    requestAPI.printImage(name)
      .then(status => {
        if (status === 200) {
          //
        } else {
          //
        }
      })
  }

  return (
    
    <section className='py-5 px-10 w-full h-full flex flex-col items-center justify-start gap-10'>

      <dialog id="modal_edit_name" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-xl text-black mb-5">Actual name: {nameRename} </h3>
          
          <input ref={inputNewNameImage} type='text' className='py-2 px-4 bg-neutral-100 text-neutral-500 rounded-xl focus:outline-none' placeholder='Enter new image name' />

          <div className="modal-action">
            <form method="dialog" className='flex flex-row items-center justify-center gap-2'>
              <button onClick={sendNewName} className="py-2 px-4 text-white bg-indigo-500 rounded-xl">Save</button>
              <button className="py-2 px-4 text-white bg-red-500 rounded-xl">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className='flex flex-row items-center justify-center gap-10 bg-neutral-100 rounded-xl py-2 px-20'>
          <input ref={inputFileRef} type='file' onChange={(e) => handleChangeImage(e)} className='hidden' />

          <button onClick={handleClickAddImage}>
              {
                  image ? (
                      <p className='text-lg text-neutral-400'>Image selected: {image.name} </p>
                  ) : (
                      <p className='text-lg text-neutral-400'>Select an image</p>
                  )
              }
          </button>

          <button onClick={handleClickSendImage}>
              <FaPlus className='w-9 h-9 text-neutral-500 p-2 rounded-full bg-transparent' />
          </button>
      </div>

      {
          successSend && (
              <p className='font-bold'>Image upload successful</p>
          )
      }

      {
          errorSend && (
              <p className='font-bold'>Image upload failed</p>
          )
      }

      <div className='overflow-y-auto h-[600px] w-full'>
        {
          imageDatabase && imageDatabase.length !== 0 ? (
            <table className="table">
              <thead>
                <tr className='text-black font-bold text-lg'>
                  <th>Name</th>
                  <th>Size (bytes)</th>
                  <th>Type</th>
                  <th>Delete</th>
                  <th>Draw</th>
                </tr>
              </thead>
              <tbody>
                {imageDatabase.map((data, index) => (
                  <Row key={index} data={data} deleteFunction={handleDeletedImage} renameFunction={handleRenameImage} printImage={printImage} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-neutral-500 font-bold text-2xl'>Images not found</p>
          )
        }

      </div>
    </section>
  )
}