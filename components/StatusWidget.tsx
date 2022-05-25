

import { Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const axios = require('axios');

export default function StatusWidget(){
    const [data, setData] = useState({
        last_update_time : undefined, 
        station_status : undefined,
        update_frequency: undefined, 
        uptime : undefined, 
        battery_percentage: undefined 
    });

    useEffect(() => {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/status",
            withCredentials: false
        }).then((res: any) => {
            setData(res.data);
        })
    }, [])

    return (
        <Container backgroundColor="gray.200">
            <p>Status: {data?.station_status}</p>
            <p>Last Updated: {data?.last_update_time}</p>
            <p>Uptime: {data?.uptime} </p>
            <p>Battery Percentage: {data?.battery_percentage} </p>
            <p>Update Frequency: {data?.update_frequency} mins </p>
        </Container>
    )
}