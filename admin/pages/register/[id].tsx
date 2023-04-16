import { useRouter } from "next/router"
import RegisterForm from "../../components/registerForm"

export default function Register() {
  const router = useRouter()
  const { id } = router.query

  return (
    <section className="h-[100vh] flex flex-col content-center justify-center">
      <RegisterForm id={id} />
    </section>
  )
}
