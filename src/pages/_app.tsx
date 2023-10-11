import "@/styles/globals.css"
import "@/styles/layout/style.scss"
import type { AppProps } from "next/app"

import { Provider } from "react-redux"
import { persistor, store } from "../redux/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="wrap">
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
