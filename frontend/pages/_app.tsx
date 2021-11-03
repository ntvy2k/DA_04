import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="colorpage">
        <AnimatePresence exitBeforeEnter>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </AnimatePresence>
      </div>
    </Provider>
  )
}
export default MyApp
