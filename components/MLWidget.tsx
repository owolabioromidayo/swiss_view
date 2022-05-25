import { Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
            url: "http://127.0.0.1:5000/ml_info",
            withCredentials: false
        }).then((res: any) => {
            setData(res.data);
        })
    }, [])

    return (
        <Container right="0px" backgroundColor="green.200">
            <img src="http://127.0.0.1:5000/ml_img" alt="Decision Tree" width="80%" height="80%" />
            <p>Model Accuracy: {data?.accuracy}%</p>
            <p>Last Model Training Time :{data?.last_update_time}</p>
            <p>N Samples Used: {data?.n_samples_used} </p>
            <p>Current Training Frequency: {data?.training_freq} days</p>
        </Container>
    )
}