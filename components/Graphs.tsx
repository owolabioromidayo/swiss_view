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


        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },
            },
        };
        

    const plt_data = {
    labels,
    datasets: [
    {
        label: 'Temperature',
        data: labels.map( (_, i) => data["ext_temp"][i]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
    ],
};
        

    return(
        <div>
            {/* we need to separate into charts */}
            <Line options={options} data={plt_data} />
        </div>
       
    )
}