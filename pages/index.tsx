import type { NextPage } from 'next'
// import styles from '../styles/Home.module.css'

import { Center, Flex } from "@chakra-ui/react"
import MLWidget from "../components/MLWidget";
import WeatherWidget from "../components/WeatherWidget"
import dynamic from 'next/dynamic'
import DataView from "../components/DataView";
import { useState, useEffect } from 'react';
import WelcomeScreen from "../components/WelcomeScreen"
import StatusWidget from '../components/StatusWidget';
import Script from "next/script"


const Home:NextPage = () => {
    const MapWidget = dynamic(() => import('../components/MapWidget'), {
        ssr: false
      })

    const [welcome, setWelcome] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setWelcome(false), 1000);
    }, [])

    return(
    <>
    
        <Script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
        crossOrigin=''/>
         {/* <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGgp&v=weekly" async defer
        ></script> */}

        {welcome?  <WelcomeScreen />  :
        <Flex 
            h='100vh'
            w="100%"
            direction='row'>
            <Flex direction="column" w="100%">
                <Flex 
                w={{base: "auto", md: "100%", lg: "100%"}}
                direction={{base: "column", md: "column", lg: "row"}}>
                    <WeatherWidget />
                    <StatusWidget />
                    <MLWidget />
                </Flex>

                <DataView />
                {/* <Flex direction="row" px="5%"
                style = {{
                        // "& div": {
                        //     position: "relative",
                        //     width: "100%",
                        //     height: "200px"
                        // },
                        // position: "relative",
                        // width: "100%",
                        // height: "200px !important"
                        }}> */}
                    <div style={{
                        margin: "20px",
                        height: "20%"
                    }}>
                        <MapWidget />
                    </div>
            </Flex>
        </Flex>}
    </>
    )
}
export default Home;