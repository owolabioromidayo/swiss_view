import { Center, Container} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image"

const axios = require('axios');

export default function MLWidget() {
    const [data, setData] = useState({
        accuracy: undefined,
        description: undefined,
        datetime: undefined,
        confusion_matrix: undefined,
        training_freq: undefined,
        last_update_time: undefined,
        n_samples_used: undefined
    });

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_info`,
            withCredentials: false
        }).then((res: any) => {
            setData(res.data);
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
                <p>Model Accuracy: {data?.accuracy}%</p>
                <p>Last Model Training Time :{data?.last_update_time}</p>
                <p>N Samples Used: {data?.n_samples_used} </p>
                <p>Current Training Frequency: {data?.training_freq} days</p>
            </div>
            <h4 style={{
                height: "20%",
                backgroundColor: "lightgray"
            }}>ML Widget</h4>
        </Container>
    )
}