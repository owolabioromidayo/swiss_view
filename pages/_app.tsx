import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  Head from "next/head"
import {ChakraProvider} from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <div>
      <Head>
        <title>S.W.I.S.S</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />  
      </ChakraProvider>
    </div>
  ) 
}

export default MyApp
