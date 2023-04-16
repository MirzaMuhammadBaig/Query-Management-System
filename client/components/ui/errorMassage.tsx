import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function ErrorMassage({ children }: Props) {
  return <p className="text-red-500 text-sm">{children}</p>
}
