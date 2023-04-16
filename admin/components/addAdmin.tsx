import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Formik, FormikHelpers } from "formik"
import * as yup from "yup"
import axios from "axios"
import ErrorMessage from "./errorMessage"
import { useAppSelector } from "../state/hooks/hooks"
import { myError } from "../lib/error"

const Schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
})

const initialValues = {
  email: "",
}

interface Values {
  email: string
}

export default function AddAdmin({ setTokens }: any) {
  const [addToken, setAddToken] = useState(false)
  const cancelButtonRef = useRef(null)

  const user: any = useAppSelector((state: any) => state.global.user)

  return (
    <>
      <button
        onClick={() => setAddToken(true)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:mt-1"
      >
        Add New Admin
      </button>
      <Transition.Root show={addToken} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setAddToken}
        >
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-50 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={Schema}
                        onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
                          console.log(user.user._id, "user.user._id")

                          try {
                            const savedToken = await axios.post(
                              `https://query-management-system.vercel.app/auth/add-admin`,
                              {
                                userId: user.user._id,
                                ...values,
                              }
                            )

                            setTokens((e: any) => [...e, savedToken.data])
                            setAddToken(false)
                            setSubmitting(false)
                          } catch (error: any) {
                            myError({ error })
                            setSubmitting(false)
                          }
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                        }) => (
                          <form onSubmit={handleSubmit} className="max-w-[700px] m-auto ">
                            <div className="">
                              <h1 className="text-3xl font-bold mb-6">Add Admin</h1>

                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    placeholder="Admin Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={`mt-1 block w-full px-4 py-2 border-b border-gray-400 bg-gray-50 ${
                                      errors.email && touched.email && "border-red-500"
                                    }`}
                                  />
                                  {errors.email && touched.email && (
                                    <ErrorMessage>{errors.email}</ErrorMessage>
                                  )}
                                </div>
                              </div>
                              <div className="px-3 py-3 text-right sm:px-6">
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className={`inline-flex justify-center px-7 py-2 bg-slate-900 text-slate-50 ${
                                    isSubmitting && "bg-slate-600"
                                  }`}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
