import { useState, useEffect } from "react"
import axios from "axios"
import QueryModal from "../components/queryModal"
import { myError } from "../lib/error"

export default function Home() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState({})
  const [queries, setQueries] = useState<any>([])

  useEffect(() => {
    const data = async () => {
      try {
        const savedUser = await axios.get(`https://query-management-system.vercel.app/query/get`)
        setQueries(savedUser.data)
      } catch (error) {
        myError({ error })
      }
    }
    data()
  }, [])

  const handleQuery = (query: any) => {
    setQuery(query)
    setOpen(true)
  }

  const handleDelivered = async ({ id }: any) => {
    try {
      await axios.post(`https://query-management-system.vercel.app/query/delivered/${id}`)

      setQueries((current: any) =>
        current.map((obj: any) => {
          if (obj._id === id) {
            return { ...obj, status: "delivered" }
          }
          return obj
        })
      )
    } catch (error) {
      myError({ error })
    }
  }

  return (
    <>
      <QueryModal open={open} setOpen={setOpen} query={query} />

      <div className="bg-gray-50 h-[90vh]">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 lg:flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Queries</h1>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 mt-5">
          <table className="w-full text-sm text-left border">
            <thead className="text-xs uppercase border-b">
              <tr>
                <th scope="col" className="py-3 px-6">
                  S.No
                </th>
                <th scope="col" className="py-3 px-6">
                  id
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query: any, index: any) => (
                <tr key={index} className="bg-white border-b">
                  <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
                    {index + 1}
                  </th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap">
                    <p className="truncate w-96">{query.message}</p>
                  </th>
                  <td className="py-4 px-6 flex justify-center items-center">
                    {query.status === "pending" ? (
                      <button
                        onClick={() => handleDelivered({ id: query._id, index })}
                        type="button"
                        className=" border flex items-center border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 mr-4"
                      >
                        Deliver
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="red"
                          className="w-4 h-4 ml-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </button>
                    ) : (
                      <span className=" border flex items-center border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1 mr-4">
                        Delivered
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="green"
                          className="w-4 h-4 ml-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    )}

                    <p
                      onClick={() => handleQuery(query)}
                      className="font-medium text-blue-600 cursor-pointer hover:underline"
                    >
                      View
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
