import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import Failure from "../../public/glasses.jpeg"
import Success from "../../public/success.webp"
function Popup(props) {
  let {isOpen, setIsOpen, details} = props

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Image
                  src={details.error ? Failure: Success}
                  width={200}
                  height={details.error ? 100 : 200}
                  alt="Comrade"
                  />

                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {details.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-500 text-md">
                      {details.message}
                    </p>
                  </div>

                  <div className="mt-4">
                   {details.error ?  <button
                      type="button"
                      className="inline-flex justify-center px-12 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md sm:px-6 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {details.buttonText}
                    </button> :  
                    <Link href={details.target}>
                    <button
                      type="button"
                      className="inline-flex justify-center px-12 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md sm:px-4 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {details.buttonText}
                    </button>
                    </Link>
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Popup;