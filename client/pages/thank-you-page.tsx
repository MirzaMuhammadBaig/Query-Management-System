import Head from "next/head"
import { Fragment, useState, useMemo } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { FunnelIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/router"

const subCategories = [
  { name: "car", href: "#" },
  { name: "bike", href: "#" },
  { name: "cycle", href: "#" },
]

export default function ThankYouPage() {
  const router = useRouter()

  function handleOpen({ id }: any) {
    router.push(`/query/${id}`)
  }

  return (
    <>
      <Head>
        <title>Thank You Page</title>
        <meta name="description" content="Thank You Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white">
        <div className="text-center py-12 max-w-3xl m-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Thank You submitting query
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit magnis, dignissim sodales ut
            posuere netus justo sed turpis ligula, leo mus integer egestas blandit scelerisque
            hendrerit.
          </p>
        </div>
      </main>
    </>
  )
}
