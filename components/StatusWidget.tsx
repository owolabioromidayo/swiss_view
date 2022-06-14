import { Container} from "@chakra-ui/react";
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
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/status`,
            withCredentials: false
        }).then((res: any) => {
            setData(res.data);
        })
    }, [])

    return (
        <Container marginTop="10px" marginBottom="4%">

            <div style={{paddingBottom:"10px", paddingTop: "10px", backgroundColor: "#e7e7e7"}}>
                    {data?.station_status == "Online" ?  
                    <div style ={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        border: "10px solid #45e336",
                        display: "inline-block",
                    }}
                    /> : 
                    <div style ={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        border: "10px solid #ed1a33",
                        display: "inline-block",
                    }}
                    /> }
                <p>Status: {data?.station_status}</p>
                <p>Last Updated: {data?.last_update_time}</p>
                <p>Uptime: {data?.uptime} </p>
                <p>Battery Percentage: {data?.battery_percentage} </p>
                <p>Update Frequency: {data?.update_frequency} mins </p>
            </div>
            <h4 style={{
                height: "20%",
                backgroundColor: "lightgray"
            }}>Status Widget</h4>
        </Container>
    )
}
