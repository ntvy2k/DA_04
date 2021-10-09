import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
