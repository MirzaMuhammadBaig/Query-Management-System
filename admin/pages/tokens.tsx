import axios from "axios"
import { useEffect, useState } from "react"
import AddTokenModal from "../components/addTokenModel"
import { myError } from "../lib/error"

const AddToken = () => {
  const copy = async (token: any) => {
    await navigator.clipboard.writeText(token)
    alert(`Copied Token: ${token}`)
  }

  const [tokens, setTokens] = useState([])

  useEffect(() => {
    const data = async () => {
      try {
        const savedUser = await axios.get(`https://query-management-system.vercel.app/token/get`)
        setTokens(savedUser.data)
      } catch (error) {
        myError({ error })
      }
    }
    data()
  }, [])

  return (
    <>
      <div className="bg-gray-50 h-[90vh]">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 lg:px-8 flex flex-wrap items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Created Tokens</h1>
            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
              <AddTokenModal setTokens={setTokens} />
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 mt-5 ">
          <table className="w-full text-sm text-left border">
            <thead className="text-xs uppercase border-b">
              <tr>
                <th scope="col" className="py-3 px-6">
                  S.No
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Created At
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Copy Link</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token: any, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap ">
                      {index + 1}
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      <p className="truncate">{token.email}</p>
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      <p className="truncate">{token.createdAt}</p>
                    </th>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => copy(token.token)}
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                      >
                        Copy Token
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default AddToken
