import { Center, Container} from "@chakra-ui/react";
import { Button} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";

const axios = require('axios');

export default function MLWidget({data, setNotification}: {data: any, setNotification: any}) {

    const [input, setInput] = useState<string>('0');

    const updateTrainingFreq = () => {
        //validate string to number, else raise error
            let newFreq = Number(input);
            if (isNaN(newFreq)){
                setNotification({
                    message: `Error occured in setting training frequency. Ensure your input 
                                is a number that is greater than 2 and try again.`,
                    type: "error"
                })
                setTimeout(() => setNotification({message: null, type: "notif"}), 500);

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
                    setTimeout(() => setNotification({message: null, type: "notif"}), 500);
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
        <Container right="0px" borderRadius="20%" marginTop="10px" >
            <div style={{backgroundColor: "#e7e7e7", paddingTop:"10px"}}>
                <Center>
                    <img src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_img`}
                     alt="Decision Tree" width="150px" height="200px" 
                     style={{background: "#e7e7e7"}}/>
                </Center>
                <br/>
                <Center>
                    <Link href={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_img`}isExternal>
                        <u>Model Image URL </u> <ExternalLinkIcon mx='2px' />
                    </Link>
                </Center>
                <br/>

                <div style={{paddingLeft: "15px"}}>
                    <p>Last Model Training Time :{data?.last_update_time}</p>
                    <p>N Samples Used: {data?.n_samples_used} </p>
                    <p>Training Frequency: <br/>
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
                    </Button></p>
                </div>
                
            <br/>
            </div>
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray",
                fontWeight: 'bold',
                fontSize: "18px"
            }}>ML Widget</h4>
        </Container>
    )
}