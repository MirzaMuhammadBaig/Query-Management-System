import { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  query: any
}
export default function QueryModal({ open, setOpen, query }: Props) {
  const cancelButtonRef = useRef(null)
  console.log(query, "query")

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-[80vh] sm:my-8 sm:w-4/5">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h1" className="text-3xl font-medium leading-6 ">
                      Query Details
                    </Dialog.Title>
                    <div className="mt-10 w-full overflow-y-scroll h-[55vh]">
                      <div className="my-4">
                        <h1 className="text-lg font-bold">Project Id:</h1>
                        <p className="mb-3 font-light ">{query.projectId}</p>
                      </div>
                      <div className="my-4">
                        <h1 className="text-lg font-bold">Content Link (Drive Link):</h1>
                        <a
                          className="my-3 text-blue-600"
                          target="_blank"
                          rel="noreferrer"
                          href={query.driveLink}
                        >
                          {query.driveLink}
                        </a>
                      </div>
                      <div className="my-4">
                        <h1 className="text-lg font-bold">Message:</h1>
                        <p className="mb-3 font-light ">{query.message}</p>
                      </div>
                      <div className="my-4">
                        <h1 className="text-lg font-bold">Content:</h1>
                        <p className="font-light ">{query.content}</p>
                      </div>
                      <div className="my-4">
                        <h1 className="text-lg font-bold">Logo Info:</h1>
                        <p className="font-light ">{query.logo}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 sm:flex sm:flex-row-reverse sm:px-6">
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
