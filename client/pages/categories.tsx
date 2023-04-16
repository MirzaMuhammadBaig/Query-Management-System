import Head from "next/head"
import { Fragment, useState, useMemo, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { FunnelIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"
import { myError } from "../lib/error"

const subCategories = [
  { name: "car", href: "#" },
  { name: "bike", href: "#" },
  { name: "cycle", href: "#" },
]

export default function Category() {
  const router = useRouter()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [templates, setTemplates] = useState([])
  const [filter, setFilter] = useState("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const data = async () => {
      try {
        const getAllTemplates = await fetch(
          "https://query-management-system.vercel.app/category/get",
          {
            method: "GET",
          }
        )
        const AllTemplates = await getAllTemplates.json()
        setTemplates(AllTemplates)
      } catch (error) {
        myError({ error })
      }
    }
    data()
  }, [])

  function handleOpen({ id }: any) {
    router.push(`/templates/${id}`)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white">
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      <li>
                        <span onClick={() => setFilter("all")} className="block px-2 py-3">
                          All
                        </span>
                      </li>
                      {categories.map((item: any, index) => (
                        <li key={index}>
                          <span onClick={() => setFilter(item)} className="block px-2 py-3">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-12 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Categories</h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-8 pb-24 mx-5">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
              {templates.map((template: any) => {
                return (
                  <div
                    key={template._id}
                    className="group relative mb-7"
                    onClick={() => handleOpen({ id: template.category })}
                  >
                    <div className="relative h-80 w-full mb-5 overflow-hidden shadow-lg rounded bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={template.imageSrc}
                        alt={template.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{template.name}</h3>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
      </main>
    </>
  )
}