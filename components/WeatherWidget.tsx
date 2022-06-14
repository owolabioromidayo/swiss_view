import { Flex, Container, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image"
import { useBreakpointValue } from '@chakra-ui/react'


const axios = require('axios');

export default function WeatherWidget(){
    const [data, setData] = useState({
        icon_image_url : "",
        label : undefined,
        wind_speed : undefined,
        wind_direction : undefined,
        baro_pressure : undefined,
        ext_temp: undefined,
        humidity: undefined

    });

    useEffect( () => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather`,
            withCredentials: false
        }).then( (res:any) => {
                setData(res.data);
            })
        }, [])

    
    const imSize = useBreakpointValue({base: "100%", md:"100px", sm:"80px"})


    return(
        <Container left="0px" height="100%"  marginTop="10px" marginBottom="3%">
            <Flex
            backgroundColor="#e7e7e7"
            paddingBottom="10px"
            paddingTop="10px"
            direction={{ base: 'column', md: 'row', sm: "row" }}
            >
                <Flex direction="column">
                    <Image src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather_img`} alt={data?.label} 
                    width={imSize} height={imSize}/>
                    <p>{data?.label}</p>
                </Flex>
                <Flex direction="column" px="10%">
                    <p>Temperature: {data?.ext_temp} C</p>
                    <p>Wind Direction: {data?.wind_direction}</p>
                    <p>Wind Speed: {data?.wind_speed}</p>
                    <p>Pressure: {data?.baro_pressure}</p>
                    <p>Humidity: {data?.humidity}</p>
                </Flex>

            </Flex>
            <h4 style={{
                height: "20%",
                backgroundColor: "lightgray"
            }}>Weather Widget</h4>
        </Container>
    )
}