import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Formik, FormikHelpers } from "formik";
import { ReactNode } from "react";
import * as yup from "yup";
import axios from "axios";
import { myError } from "../lib/error";
import { useAppSelector } from "../state/hooks/hooks";

const Schema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  category: yup.string().required("Required"),
  imageSrc: yup.string().required("Required"),
  imageAlt: yup.string().required("Required"),
});

const initialValues = {
  name: "",
  description: "",
  category: "",
  imageSrc: "",
  imageAlt: "",
};

interface Values {
  name: string;
  description: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
}

interface Props {
  children?: ReactNode;
}

function ErrorMassage({ children }: Props) {
  return <p className="text-red-500 text-sm">{children}</p>;
}

export default function TemplateSidepanel({
  open,
  setOpen,
  setTemplates,
}: any) {
  const user: any = useAppSelector((state: any) => state.global.user.user);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Panel title
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        {/* <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        />{" "} */}
                        <Formik
                          initialValues={initialValues}
                          validationSchema={Schema}
                          onSubmit={async (
                            values: any,
                            { setSubmitting }: FormikHelpers<Values>
                          ) => {
                            try {
                              const savedTemplate: any = await axios.post(
                                "https://query-management-system.vercel.app/template/add",
                                { userId: user._id, ...values }
                              );

                              setTemplates((e: any) => [
                                savedTemplate.data,
                                ...e,
                              ]);
                              setSubmitting(false);
                              setOpen(false);
                            } catch (error: any) {
                              myError({ error });
                              setSubmitting(false);
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
                            <form
                              onSubmit={handleSubmit}
                              className="max-w-[700px] min-w-[400px] m-auto"
                            >
                              <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                  <h1 className="text-3xl font-bold mb-6">
                                    Login Form
                                  </h1>

                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6">
                                      <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Template Name
                                      </label>
                                      <input
                                        type="name"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        placeholder="Your name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                                          errors.name &&
                                          touched.name &&
                                          "border-red-500"
                                        }`}
                                      />
                                      {errors.name && touched.name && (
                                        <ErrorMassage>
                                          {errors.name}
                                        </ErrorMassage>
                                      )}
                                    </div>

                                    <div className="col-span-6">
                                      <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        category
                                      </label>
                                      <input
                                        type="text"
                                        name="category"
                                        id="category"
                                        placeholder="category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.category}
                                        className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                                          errors.category &&
                                          touched.category &&
                                          "border-red-500"
                                        }`}
                                      />
                                      {errors.category && touched.category && (
                                        <ErrorMassage>
                                          {errors.category}
                                        </ErrorMassage>
                                      )}
                                    </div>

                                    <div className="col-span-6">
                                      <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        description
                                      </label>
                                      <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        placeholder="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                                          errors.description &&
                                          touched.description &&
                                          "border-red-500"
                                        }`}
                                      />
                                      {errors.description &&
                                        touched.description && (
                                          <ErrorMassage>
                                            {errors.description}
                                          </ErrorMassage>
                                        )}
                                    </div>

                                    <div className="col-span-6">
                                      <label
                                        htmlFor="imageSrc"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        imageSrc
                                      </label>
                                      <input
                                        type="text"
                                        name="imageSrc"
                                        id="imageSrc"
                                        placeholder="imageSrc"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.imageSrc}
                                        className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                                          errors.imageSrc &&
                                          touched.imageSrc &&
                                          "border-red-500"
                                        }`}
                                      />
                                      {errors.imageSrc && touched.imageSrc && (
                                        <ErrorMassage>
                                          {errors.imageSrc}
                                        </ErrorMassage>
                                      )}
                                    </div>

                                    <div className="col-span-6">
                                      <label
                                        htmlFor="imageAlt"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        imageAlt
                                      </label>
                                      <input
                                        type="text"
                                        name="imageAlt"
                                        id="imageAlt"
                                        placeholder="imageAlt"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.imageAlt}
                                        className={`mt-1 block w-full px-4 py-2 border-2 border-slate-900 ${
                                          errors.imageAlt &&
                                          touched.imageAlt &&
                                          "border-red-500"
                                        }`}
                                      />
                                      {errors.imageAlt && touched.imageAlt && (
                                        <ErrorMassage>
                                          {errors.imageAlt}
                                        </ErrorMassage>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 py-3 text-right sm:px-6">
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
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
