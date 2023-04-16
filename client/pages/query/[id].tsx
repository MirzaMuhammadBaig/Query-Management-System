import QueryForm from "../../components/queryForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { myError } from "../../lib/error"

export default function Login() {
  const router = useRouter()
  const [template, setTemplate] = useState<any>(null)

  useEffect(() => {
    if (router.query.id === undefined) return
    const data = async () => {
      try {
        const savedTemplate = await axios.get(
          `https://query-management-system.vercel.app/template/get/${router.query.id}`
        )
        setTemplate(savedTemplate.data)
      } catch (error) {
        myError({ error })
      }
    }
    data()
  }, [router.query.id])

  return (
    <section className="mx-auto max-w-7xl p-9">
      <div className="grid grid-cols-1 gap-x-9 gap-y-9 lg:grid-cols-3">
        {template ? (
          <div className="group relative mb-7">
            <div className="relative h-80 w-full overflow-hidden shadow-lg rounded bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img
                src={template.imageSrc}
                alt={template.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-6 text-sm text-gray-500">
              <span className="absolute inset-0" />
              {template.category}
            </p>
            <h3 className="text-base font-semibold">{template.name}</h3>
            <div className="mt-4">
              <h2 className="mb-2 text-lg font-semibold">Document Required:</h2>
              <p>
                <b>Note:</b> Upload all the following content to Drive and share link with us
              </p>
              <ul className="space-y-1 max-w-md list-disc list-inside">
                <li>Media file (images, videos, Gifs etc)</li>
                <li>Content of all Pages</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="group relative mb-7" />
        )}

        <div className="lg:col-span-2">
          <QueryForm templateId={router.query.id} />
        </div>
      </div>
    </section>
  )
}
