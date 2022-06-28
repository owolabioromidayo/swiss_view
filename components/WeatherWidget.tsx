import { Flex, Container } from "@chakra-ui/react";
import Image from "next/image"
import { useBreakpointValue } from '@chakra-ui/react'

export default function WeatherWidget({data}: {data: any}){
    const imSize = useBreakpointValue({base: "100%", md:"100px", sm:"80px"})

    return(
        <Container left="0px" height="100%"  marginTop="10px" marginBottom="3%">
            <Flex
            backgroundColor="#e7e7e7"
            paddingBottom="10px"
            paddingTop="10px"
            direction={{ base: 'column', md: 'row', sm: "row" }}>
                <Flex direction="column">
                    <Image src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather_img`} alt={data?.label} 
                    width={imSize} height={imSize}/>
                    <p>&nbsp;&nbsp;<b>{data?.label}</b></p>
                </Flex>
                <Flex direction="column" px="10%">
                    <p>Temperature: {data?.ext_temp}°C</p>
                    <p>Wind Direction: {data?.wind_direction}</p>
                    <p>Wind Speed: {data?.wind_speed}</p>
                    <p>Pressure: {data?.baro_pressure}</p>
                    <p>Humidity: {data?.humidity}</p>
                    <p>UV: {data?.uv}</p>
                </Flex>

            </Flex>
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray"
            }}>Weather Widget</h4>
        </Container>
    )
}