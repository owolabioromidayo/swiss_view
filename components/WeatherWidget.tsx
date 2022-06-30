import { Flex, Container, Center } from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/react'

export default function WeatherWidget({data}: {data: any}){
    const imSize = useBreakpointValue({base: "200px", md:"200px", sm:"200px"})

    return(
        <Container left="0px" height="100%"  marginTop="10px" marginBottom="3%">
            <Flex
            backgroundColor="#e7e7e7"
            paddingBottom="10px"
            paddingTop="10px"
            direction={{ base: 'row', md: 'row', sm: "column" }}>
                <Center>
                    <Flex direction="column">
                        <img src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather_img`} alt={data?.label} 
                        width="100px" height={imSize}/>
                        <p>&nbsp;&nbsp;<b>{(data?.label || "").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</b></p>
                    </Flex>
                </Center>

                <Flex direction="column" px="20px">
                    <p>Temperature: {data?.ext_temp}°C</p>
                    <p>Wind Direction: {data?.wind_direction}</p>
                    <p>Wind Speed: {data?.wind_speed}</p>
                    <p>Pressure: {data?.baro_pressure}</p>
                    <p>Humidity: {data?.humidity}</p>
                </Flex>
                

            </Flex>
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray",
                fontWeight: 'bold',
                fontSize: "17px"
            }}>Weather Widget</h4>
        </Container>
    )
}