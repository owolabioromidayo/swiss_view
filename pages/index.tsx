import type { NextPage } from 'next'
// import styles from '../styles/Home.module.css'

import { Flex } from "@chakra-ui/react"
import MLWidget from "../components/MLWidget";
import WeatherWidget from "../components/WeatherWidget"
import dynamic from 'next/dynamic'
import Graphs from "../components/Graphs";
import { useState, useEffect } from 'react';
import WelcomeScreen from "../components/WelcomeSCreen"
import StatusWidget from '../components/StatusWidget';

const Home:NextPage = () => {
    const MapWidget = dynamic(() => import('../components/MapWidget'), {
        ssr: false
      })

    const [welcome, setWelcome] = useState<boolean>(false);

    
    useEffect(() => {
        setWelcome(true);
        setTimeout(() => setWelcome(false), 1000);
    }, [])

    return(
    welcome?  <WelcomeScreen />  :
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
            <Flex direction="row" px="5%">
                <MapWidget />
            </Flex>
                <Graphs />
        </Flex>
      </Flex>
    )
}
export default Home;