import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  Head from "next/head"
import {ChakraProvider} from "@chakra-ui/react"
import theme from '../themes'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <div>
      <Head>
      <link rel="shortcut icon" href="/swisicon.png" />
        <title>S.W.I.S.S</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />  
      </ChakraProvider>
    </div>
  ) 
}

export default MyApp
