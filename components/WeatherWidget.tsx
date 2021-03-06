import { Flex, Alert, AlertIcon, AlertTitle, Box, Heading, SimpleGrid, Image, Text } from "@chakra-ui/react";
import {InfoIcon} from '@chakra-ui/icons'

import { useBreakpointValue } from '@chakra-ui/react'
import { time } from "console";
import { useState, useEffect } from "react";

export default function WeatherWidget({data, uv}: {data: any, uv:number}){
    // const imSize = useBreakpointValue({base: "200px", md:"200px", sm:"200px"})
    
    const breakPoints = [2,5,7,10]
    const colors = ["green.300", "yellow.300", "orange.300", "red.300", "purple.300"]
    const [uvColor, setUVColor] = useState("green")
    
    useEffect(() => {
      let id = 0;
      breakPoints.forEach((v) => {
        if (uv > v){
          id++;
        }
      })
      setUVColor(colors[id])
      
    }, [uv])


  



    return(
        // <Container left="0px" height="100%"  marginTop="10px" marginBottom="3%">
        //     <Flex
        //     backgroundColor="#e7e7e7"
        //     paddingBottom="10px"
        //     paddingTop="10px"
        //     direction={{ base: 'row', md: 'row', sm: "column" }}>
        //         <Center>
        //             <Flex direction="column">
        //                 <img src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather_img`} alt={data?.label} 
        //                 width="100px" height={imSize}/>
        //                 <p><b>{(data?.label || "").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</b></p>
        //             </Flex>
        //         </Center>

        //         <Flex direction="column" px="20px">
        //             <p>Temperature: {data?.ext_temp}°C</p>
        //             <p>Wind Direction: {data?.wind_direction}</p>
        //             <p>Wind Speed: {data?.wind_speed}</p>
        //             <p>Pressure: {data?.baro_pressure}</p>
        //             <p>Humidity: {data?.humidity}</p>
        //         </Flex>
                

        //     </Flex>
        //     <h4 style={{
        //         height: "40px",
        //         backgroundColor: "lightgray",
        //         fontWeight: 'bold',
        //         fontSize: "17px"
        //     }}>Weather Widget</h4>
        // </Container>

        <Flex justifyContent="space-between">
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 2 }}
                spacing={{ base: 10, md: 10 }}
                mt={10}
                ml={-16}
              >
                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={28}
                  borderRadius="md"
                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/wind.png" alt="wind_icon" w={16} mr={5} />
                    <Flex direction="column">
                      <Text fontWeight={400} fontSize={14} color="gray.500">
                        Wind Speed
                      </Text>
                      <Heading fontWeight={500}>
                        {data.wind_speed}km/h
                      </Heading>
                      <Text mt={2} >Direction: {data.wind_direction} </Text>
                    </Flex>
                    
                  </Flex>
                </Box>

                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={20}
                  borderRadius="md"
                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/barometer.png" alt="pressure" w={16} mr={5} />
                    <Flex direction="column">
                      <Text fontWeight={400} fontSize={14} color="gray.500">
                        Pressure
                      </Text>
                      <Heading fontWeight={500}>
                        {data.baro_pressure}psi
                      </Heading>
                    </Flex>
                  </Flex>
                </Box>

                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={28}
                  borderRadius="md"
                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/sun.png" alt="uv_index" w={16} mr={5} />
                    <Flex direction="column">
                      <Text fontWeight={400} fontSize={14} color="gray.500">
                        UV Index
                      </Text>
                      <Heading fontWeight={500}>{uv}</Heading>
                    </Flex>
                  </Flex>
                  <Flex backgroundColor={uvColor} borderRadius="md" mt={2} ml={-2} w={80} p={5}>
        
                    <InfoIcon fontSize={18} /> &nbsp;
                    UV Level: &nbsp; <b>{uv <= 2 ? "Low" : uv <= 5? "Medium": 
                    uv <= 7? "High" : uv <= 10? "Very High" : "Extremely High"}</b> 
                  </Flex>
                </Box>

                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={20}
                  borderRadius="md"
                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/humidity.png" alt="humidity" w={16} mr={5} />
                    <Flex direction="column">
                      <Text fontWeight={400} fontSize={14} color="gray.500">
                        Humidity
                      </Text>
                      <Heading fontWeight={500}>
                        {data.humidity}%
                      </Heading>
                    </Flex>
                  </Flex>
                </Box>
              {/* <Flex>
                <DataView />
                <Flex justify="center" mt={20} pb={20} borderRadius={20}>
                  <MapWidget />
                </Flex>
              </Flex> */}
              </SimpleGrid>


             
            </Flex>
    )
}