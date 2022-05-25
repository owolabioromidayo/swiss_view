import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const axios = require('axios');

export default function MLWidget(){
    const [data, setData] = useState({
        accuracy : undefined,
        description : undefined,
        datetime    : undefined,
        confusion_matrix : undefined
    });

    useEffect( () => {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/ml_info",
            withCredentials: false
        }).then( (res:any) => {
                setData(res.data);
            })
        }, [])

    return(
        <Flex backgroundColor="#ff0e0">
            <img src="http://127.0.0.1:5000/ml_img" alt="Decision Tree" width="400" height="400"/>
            <p>{data?.accuracy}</p>
            <p>{data?.description}</p>
            <p>{data?.datetime}</p>
            <p>{data?.confusion_matrix}</p>

        </Flex>
    )
}