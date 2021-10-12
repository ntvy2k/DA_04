import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeLayout from '../components/Layouts/homeLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
