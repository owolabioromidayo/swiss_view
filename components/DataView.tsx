import { 
    Flex, 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    TableContainer,
    Tr, 
    Th,
    Td,
    Button,
    StylesProvider,
    useMultiStyleConfig,
 } from "@chakra-ui/react";

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

import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { ChevronDownIcon } from "@chakra-ui/icons";

const axios = require('axios');
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
    return <Line width="50%" height="20%"  options={options} data={plt_data} />
}

function Graphs({labels, data, options}: 
    {labels: any[], data: GraphData, options:any}){
    return (<div style={{
    }}>
           {Object.keys(data).map((key, index) => 
                <Graph 
                    labels={labels}
                    data={data[key]}
                    title={key}
                    options={options}
                    key={index}
                />)}
    </div>)
}

function Table({data}: {data: GraphData}){
    const styles = useMultiStyleConfig('Table', {});
    return(
        <StylesProvider value={styles}>

            <TableContainer variant='striped'  style={{
                marginLeft: "auto",
                marginRight: "auto"
                // width: "70%"
            }} >
                    <Tr>
                        <Th> S/N </Th>
                        <Th> ext_temp </Th>
                        <Th> baro_pressure</Th>
                        <Th> wind_speed </Th>
                        <Th> wind_direction </Th>
                    </Tr>

                        { data.ext_temp.map(( val , index) => {
                                return (
                                <Tr key={index}>
                                    <Td> {index} </Td>
                                    <Td> {data.ext_temp[index]} </Td>
                                    <Td> {data.baro_pressure[index]} </Td>
                                    <Td> {data.wind_speed[index]} </Td>
                                    <Td> {data.wind_direction[index]}</Td>
                                </Tr>
                                )

                            })

                        }
            </TableContainer> 
        </StylesProvider>
    )
}

export default function DataView(){
    const [labels, setLabels] = useState<any[]>([]);
    const [isTable, setIsTable] = useState<boolean>(false);
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
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/sensor_data/get`,
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
        <Flex  direction="column" margin="10% 10% 2% 10%" padding="0px">
            <div style={{
                backgroundColor: "#e7e7e7",
                width: "100%",
                position: "relative"
            }}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Views</MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setIsTable(true)}>Table</MenuItem>
                        <MenuItem onClick={() => setIsTable(false)}>Graphs</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Filter By</MenuButton>
                    <MenuList>
                        <MenuItem> Week</MenuItem>
                        <MenuItem> Month</MenuItem>
                        <MenuItem> Year</MenuItem>
                    </MenuList>
                </Menu>

            </div>

           {isTable ? 
           <Table data={data}/> 
           : <Graphs  
                labels={labels}
                data={data}
                options={options}/>
                }

        </Flex>
       
    )
}