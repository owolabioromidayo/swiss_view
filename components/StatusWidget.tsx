import { Container} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Switch } from '@chakra-ui/react'

const axios = require('axios');

export default function StatusWidget(){
    const [data, setData] = useState({
        last_update_time : undefined, 
        station_status : undefined,
        update_frequency: undefined, 
        uptime : 0, 
        battery_percentage: undefined 
    });

    const [mode, setMode] = useState<string>("");
    const [disableToggle, setDisableToggle] = useState<boolean>(true);
    const [switchIsChecked, setSwitchIsChecked] = useState<boolean>(false);

    const toggleMode = () => {
        setTimeout(() => setDisableToggle(true), 100);
        axios({
            method: 'post',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/toggle_mode`,
            withCredentials: false
        }).then((res: any) => {
            if(mode == "machine_learning"){
                setMode("weather_api")
            }else{
                setMode("machine_learning")
            }
        })
        setTimeout(() => setDisableToggle(false), 2000);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/status`,
            withCredentials: false
        }).then((res: any) => {
            setData(res.data);
        })
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/get_mode`,
            withCredentials: false
        }).then((res: any) => {
            setMode(res.data);
            setDisableToggle(false);
        })
    }, [])


    useEffect(() => {
        if(mode == "machine_learning"){
            setSwitchIsChecked(true);
        }else{
            setSwitchIsChecked(false);
        }
    }, 
    [mode])

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
                <p>Uptime: {(data.uptime / 60).toFixed(2)} hours </p>
                <p>Battery Percentage: {data?.battery_percentage}% </p>
                <p>Update Frequency: {data?.update_frequency} </p>

                <p>
                    Machine Learning &nbsp;&nbsp;
                    <Switch 
                    size="md"
                    defaultChecked={mode == "machine_learning"} 
                    onChange={toggleMode} isDisabled={disableToggle}
                    isChecked={switchIsChecked}
                    />     
                </p>
            </div>
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray"
            }}>Status Widget</h4>
        </Container>
    )
}
