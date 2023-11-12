import "@/styles/globals.css"
import Head from "next/head"
import PrimeReact from "primereact/api"
import "../styles/layout/layout.scss"
import "primereact/resources/primereact.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"

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

// // AppContext
// App.getInitialProps = async (context: any) => {
//   // const { ctx } = context;
//   // console.log(Object.keys(ctx));

//   console.log("context", context)

//   return {}
// }
