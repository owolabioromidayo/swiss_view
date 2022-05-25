import type { NextPage } from 'next'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'

import { Flex } from "@chakra-ui/react"
import MapWidget from "../components/MapWidget";
import MLWidget from "../components/MLWidget";
import WeatherWidget from "../components/WeatherWidget"
import dynamic from 'next/dynamic'
import Graphs from "../components/Graphs";

const Home:NextPage = () => {
    const MapWidget = dynamic(() => import('../components/MapWidget'), {
        ssr: false
      })

    return(
    <Flex 
        h='100vh'
        direction='row'>
        <Head>
        <title>S.W.I.S.S.</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
            integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        />
        </Head>
        <Flex direction="column">
            <Flex direction="row">
                <WeatherWidget />
                <MLWidget />
            </Flex>
            <MapWidget />
            <Graphs />
        </Flex>
      </Flex>
    )
}
export default Home;