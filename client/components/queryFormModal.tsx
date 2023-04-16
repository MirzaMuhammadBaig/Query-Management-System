import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import QueryForm from "./queryForm"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function QueryFormModal({ open, setOpen }: Props) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-[90vh] sm:my-8 sm:w-4/5">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start justify-between">
                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                      <h1 className="text-2xl font-bold">Query Form</h1>
                      <QueryForm />
                    </div>

                    <div className="max-w-sm">
                      <a href="#">
                        <img
                          src="https://media.gettyimages.com/id/184944186/photo/quaid-e-azam.jpg?s=612x612&w=gi&k=20&c=Nr9cDm0BY-yx1eu7bUGN3QGk87VybswqcqTwT05S-U8="
                          alt=""
                        />
                      </a>
                      <div className="p-5">
                        <a href="#">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight">
                            Noteworthy technology acquisitions 2021
                          </h5>
                        </a>
                        <p className="mb-3 font-normal ">
                          Here are the biggest enterprise technology acquisitions of 2021 so far, in
                          reverse chronological order.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className=" inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
