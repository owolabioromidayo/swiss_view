import '../styles/globals.css'
import type { AppProps } from 'next/app'
<<<<<<< HEAD
import  Head from "next/head"
=======
>>>>>>> b51ebeb51a68548ab2886cf252508079bb9353f0
import {ChakraProvider} from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  return(
<<<<<<< HEAD
    <div>
      <Head>
        <title>S.W.I.S.S</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />  
      </ChakraProvider>
    </div>
=======
    <ChakraProvider>
      <Component {...pageProps} />  
    </ChakraProvider>
>>>>>>> b51ebeb51a68548ab2886cf252508079bb9353f0
  ) 
}

export default MyApp
