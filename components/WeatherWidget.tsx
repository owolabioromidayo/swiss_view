import { Flex, Heading, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const axios = require('axios');

export default function WeatherWidget(){
    const [data, setData] = useState({
        icon_image_url : undefined,
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
            url: "http://127.0.0.1:5000/weather",
            withCredentials: false
        }).then( (res:any) => {
                setData(res.data);
            })
        }, [])


    return(
        <Flex 
        backgroundColor={"blue.100"}
        w="60%" 
        h="20%"
        direction={{ base: 'column-reverse', md: 'row' }}
        >
            <Flex>
                <img src={data?.icon_image_url} alt={data?.label} ></img>
                <p>{data?.label}</p>
            </Flex>
            <Flex>

                <p>Temperature: {data?.ext_temp} C</p>
                <p>Wind Direction: {data?.wind_direction}</p>
                <p>Wind Speed: {data?.wind_speed}</p>
                <p>Pressure: {data?.baro_pressure}</p>
                <p>Humidity: {data?.humidity}</p>
            </Flex>

        </Flex>
    )
}