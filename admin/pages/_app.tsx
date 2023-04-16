import "../styles/globals.css"
import type { AppProps } from "next/app"
import Header from "../components/header"

import { store, persistor } from "../state/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const { id } = router.query

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header path={router.pathname} id={id} />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
