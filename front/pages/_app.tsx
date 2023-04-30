import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
