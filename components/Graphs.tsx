import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const axios = require('axios');

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type GraphData = {
        ext_temp : number[],
        baro_pressure: number[],
        wind_speed : number[],
        wind_direction: number[],
        humidity : number[],
}

function Graph({labels, data, title, options}: {labels: any[], data: number[], title: string, options: any}){
    let plt_data ={
        labels,
        datasets: [{
            label: title,
            data: labels.map( (_, i) => data[i]),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',   
        }]
    } 
    // options.plugins.title.text = title;
    return <Line width="50%" height="10%"  options={options} data={plt_data} />
}

export default function Graphs(){
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState<GraphData>({
        ext_temp : [],
        baro_pressure: [],
        wind_speed : [],
        wind_direction: [],
        humidity : [],
    });

    useEffect( () => {
        axios({
            method: 'get',
            url: "http://127.0.0.1:5000/sensor_data/get",
            withCredentials: false
        }).then( (res:any) => {
                let recv : GraphData = res.data;
                setData(recv);
                setLabels([...Array(recv.ext_temp.length).keys()]); //temporary (data is not yet time labelled)
            })
        }, [])


        let options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: '',
                },
            },
        };
        
    return(
        <Flex w="100%" direction="column">
            
            {Object.keys(data).map((key, index) => 
                <Graph 
                    labels={labels}
                    data={data[key]}
                    title={key}
                    options={options}
                    key={index}
                />)}
        </Flex>
       
    )
}