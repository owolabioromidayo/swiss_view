import { Center, Container} from "@chakra-ui/react";
import { Button} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import Image from "next/image"

const axios = require('axios');

export default function MLWidget() {
    const [data, setData] = useState({
        accuracy: undefined,
        description: undefined,
        // datetime: undefined,
        // confusion_matrix: undefined,
        last_update_time: undefined,
        n_samples_used: undefined
    });

    const [input, setInput] = useState<string>('0');

    const updateTrainingFreq = () => {

        //validate string to number, else raise error
        try{
            let newFreq = Number(input);
            if (newFreq > 2){
                axios({
                    method: 'post',
                    url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/set_training_freq/${newFreq}`,
                    withCredentials: false
                }).then((res: any) => {
                   //success message here
                })
            }
        } catch(e){
            //raise error, reset training freq
        }

    }

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_info`,
            withCredentials: false
        }).then((res: any) => {
            setData(res.data);
        })

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
                    <Image src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_img`}
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
                <p>Last Model Training Time :{data?.last_update_time}</p>
                <p>N Samples Used: {data?.n_samples_used} </p>

                
                <p>Training Frequency: &nbsp; 
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
            <br/>
            </div>
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray"
            }}>ML Widget</h4>
        </Container>
    )
}