import "@/styles/globals.css"
import "@/styles/layout/style.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from "next/app"

import "../styles/globals.css"
import "../styles/timeline.css"
import "../styles/creatorpost.css"
import "../styles/login.css"
import "../styles/common.css"
import "../styles/leftdrawer.css"
import "../styles/recommend.css"
import "../styles/membership.css"
import "../styles/primereact-theme.css"
import "../styles/payment.css"
import "../styles/modal.css"
import "../styles/alarm.css"
import "../styles/gallery.css"
import "../styles/creatorproduct.css"
import "../styles/Toggle.css"
import "../styles/freefollow.css"
import "../styles/problem.css"
import "../styles/button.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

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
