import React, { useEffect, useState } from "react";
import { Button, Container, Flex, Icon, Switch, Text } from "@chakra-ui/react";

const axios = require('axios');

export default function SettingsView({ setNotification}) {

    const [mode, setMode] = useState<string>("");
    const [input, setInput] = useState<string>('0');
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
                setNotification({
                    message: `Mode has been changed to weather_api`,
                    type: "notif"
                })
            }else{
                setMode("machine_learning")
                setNotification({
                    message: `Mode has been changed to machine_learning`,
                    type: "notif"
                })
            }
            setTimeout(() => setNotification({message: null, type: "notif"}), 1000);
        })
        setTimeout(() => setDisableToggle(false), 2000);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/get_mode`,
            withCredentials: false
        }).then((res: any) => {
            setMode(res.data);
            setDisableToggle(false)
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


    const updateTrainingFreq = () => {
        //validate string to number, else raise error
            let newFreq = Number(input);
            if (isNaN(newFreq)){
                setNotification({
                    message: `Error occured in setting training frequency. Ensure your input 
                                is a number that is greater than 2 and try again.`,
                    type: "error"
                })
                setTimeout(() => setNotification({message: null, type: "notif"}), 1000);

            }

            else if (newFreq > 2){
                axios({
                    method: 'post',
                    url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/set_training_freq/${newFreq}`,
                    withCredentials: false
                }).then((res: any) => {
                   //success message here
                   setInput(newFreq.toString());
                    setNotification({
                        message: `Training Frequency has been updated!`,
                        type: "notif"
                    })
                    setTimeout(() => setNotification({message: null, type: "notif"}), 1000);
                })
            }
    } 
    

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/get_training_freq`,
            withCredentials: false
        }).then((res: any) => {
            setInput(res.data);
        })
    
    }, [])

    return (
        <Flex 
        direction="column" 
        backgroundColor ="lightgrey" 
        p={"5"} 
        w={"45%"} 
        borderRadius={"5%"} 
        marginTop="10px" 
        marginBottom="4%"
        >

                <p>
                    Machine Learning &nbsp;&nbsp;
                    <Switch 
                    size="md"
                    defaultChecked={mode == "machine_learning"} 
                    onChange={toggleMode} isDisabled={disableToggle}
                    isChecked={switchIsChecked}
                    />
                </p>
                <br />
                <p>Training Frequency: 
                    <input type="text" 
                    value={input} 
                    size={1}
                    onChange={(e) => setInput(e.target.value)}/> 
                    &nbsp; days &nbsp;&nbsp;
                    <Button 
                    size="md"
                    height={"80%"}
                    colorScheme='green' 
                    onClick={updateTrainingFreq}>
                        Set
                    </Button>
                </p>


        </Flex>
    )
}