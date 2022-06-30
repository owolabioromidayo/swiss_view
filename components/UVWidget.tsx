import { Center, Container } from '@chakra-ui/react';
import {useEffect, useState} from 'react';


export default function UVWidget({data} : {data : number}){
    const TextDetails = [{
            text: "Low!",
            color: "#46eb34",
            qualifier :"No Protection Needed."
        },
        {
            text: "Moderate",
            color: "##f2d03a",
            qualifier :"Protection Needed. Seek shade."
        },
        {
            text: "High",
            color: "#db6d1f",
            qualifier :"Put on Sunscreen."
        },
        {
            text: "Very High",
            color: "#b81113",
            qualifier :"Extra Protection needed. More sunscreen."
        },
        {
            text: "Extreme",
            color: "#a72ab5",
            qualifier :"Very High Levels. Use a lot of sunscreen."
        }]

    const breakPoints = [2, 5, 7, 10];
    const [textProps, setTextProps] = useState<number>(0);

    useEffect(() => {
        let id = 0;
        breakPoints.forEach((val) => {
            if (data > val){
                id++;
            }
        })
        setTextProps(Math.min(id,4));
    }, [data])

    return( 
    
        <Container marginTop="10px" marginBottom="4%">

                <div style={{paddingBottom:"10px", paddingTop: "10px", backgroundColor: "#e7e7e7"}}>
                    <Center>
                        <div style ={{
                            height: "120px",
                            width: "120px",
                            borderRadius: "50%",
                            border: `10px solid ${TextDetails[textProps].color}`,
                            display: "inline-block",
                            position: "relative"
                        }}> 
                            <p style={{textAlign:"center", 
                                color:TextDetails[textProps].color, 
                                position:"absolute",
                                 top:"38%", 
                                 right:"29%", 
                                 fontSize:20,
                            }}>
                                <b>{TextDetails[textProps].text}</b>
                            </p>
                        </div>
                    </Center>
                        <br />
                    <Center>
                        <p>UV Level is on <b>{data}</b>/11. </p> 
                    </Center>
                    <Center>
                        <p><b>{TextDetails[textProps].qualifier}</b></p>
                    </Center>
                </div>

            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray",
                fontWeight: 'bold',
                fontSize: "17px"
            }}>UV Widget</h4>
        </Container>
    )
    
}