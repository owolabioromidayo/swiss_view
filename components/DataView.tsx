import { 
    Flex, 
    Menu, 
    Center,
    IconButton,
    MenuButton, 
    MenuItem, 
    MenuList, 
    TableContainer,
    Tr, 
    Th,
    Td,
    Button,
    Table,
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
import { ChevronDownIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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
        humidity : number[],
        gas_resistance: number[],
        battery_percentage: number[],
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
    {labels: Date[], data: GraphData, options:any}){
        let newLabels: string[] = [];
        labels.forEach((value: Date, index: number) => {
            if (index % 15 == 0){
                newLabels.push(value.toDateString().slice(4))
            }else{
                newLabels.push("")
            }
        })
    return (<div style={{
    }}>
           {Object.keys(data).filter(k => k != "datetime").map((key, index) => 
                <Graph 
                    labels={newLabels}
                    data={data[key]}
                    title={key}
                    options={options}
                    key={index}
                />)}
    </div>)
}

function TableView({data, labels}: {data: GraphData, labels: Date[]}){
    const pageRows = 20;
    const maxPages = Math.ceil(labels.length / pageRows);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const pageTurn = (side: number) => {
       
        if (side == -1){ //left
            (pageNumber == 1) ? pageNumber : setPageNumber(pageNumber-1)
        }else {//right
            (pageNumber == maxPages) ? pageNumber : setPageNumber(pageNumber+1)
        }
    }

    return(
        <div>
            <TableContainer >
                <Table variant="simple">
                    <Tr>
                        <Th> S/N </Th>
                        <Th>datetime</Th>
                        <Th> ext_temp</Th>
                        <Th> baro_pressure</Th>
                        <Th> wind_speed </Th>
                        <Th> battery_percentage </Th>
                        <Th> gas_resistance</Th>
                    </Tr>

                        { data.ext_temp
                        .filter((_,v) =>  (pageNumber-1)*pageRows-1 < v  && v < pageNumber*pageRows )
                        .map(( _,index) => {
                                let nIndex = index + (pageNumber-1)*pageRows;
                                return (
                                <Tr key={nIndex} backgroundColor={ (nIndex % 2 === 1)?"#6dc7c4" : "white"}>
                                    <Td> {nIndex+1} </Td>
                                    <Td>{labels[nIndex].toDateString()}</Td>
                                    <Td> {data.ext_temp[nIndex]} </Td>
                                    <Td> {data.baro_pressure[nIndex]} </Td>
                                    <Td> {data.wind_speed[nIndex]} </Td>
                                    <Td> {data.battery_percentage[nIndex]} </Td>
                                    <Td> {data.gas_resistance[nIndex]} </Td>
                                </Tr>
                                )
                            })}
                </Table>
            </TableContainer> 
            
            <Center backgroundColor="lightgray" w="100%" >

                <IconButton aria-label="left-page-turn" backgroundColor="lightgray" 
                icon={<ArrowBackIcon />} onClick={() => pageTurn(-1)} w={6} h={6} />

                &nbsp;&nbsp;{pageNumber} / {maxPages} pages &nbsp;&nbsp;

                <IconButton aria-label="right-page-turn" backgroundColor="lightgray" 
                icon={<ArrowForwardIcon />} onClick={() => pageTurn(1)} w={6} h={6}/>
            </Center>
    
        </div>
    )
}

export default function DataView(){
    const [labels, setLabels] = useState<Date[]>([]);
    const [isTable, setIsTable] = useState<boolean>(false);
    const [data, setData] = useState<GraphData>({
        ext_temp : [],
        baro_pressure: [],
        wind_speed : [],
        humidity : [],
        gas_resistance: [],
        battery_percentage: [],
    });


    useEffect( () => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/sensor_data/get`,
            withCredentials: false
        }).then( (res:any) => {
                let recv : GraphData = res.data;
                setData(recv);
                setLabels(res.data.datetime.map(k => new Date(k))); 
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
            scales: {
                x: {
                    ticks: {
                        align: "center",
                        maxRotation: 0,
                        minRotation: 0
                    }
                }
            }
        };
        
    return(
        <Flex  direction="column" margin="0% 10% 2% 10%" padding="10% 0px 30px 0px">
            <div style={{
                backgroundColor: "#e7e7e7",
                width: "100%",
                position: "relative"
            }}>
                <Menu>
                    <MenuButton backgroundColor="lightgray" borderRadius="0px" 
                        as={Button} rightIcon={<ChevronDownIcon />}>Views</MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => setIsTable(false)}>Graphs</MenuItem>
                        <MenuItem onClick={() => setIsTable(true)}>Table</MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton backgroundColor="lightgray"  borderRadius="0px"
                        as={Button} rightIcon={<ChevronDownIcon />}>Filter By</MenuButton>
                    <MenuList>
                        <MenuItem> Week</MenuItem>
                        <MenuItem> Month</MenuItem>
                        <MenuItem> Year</MenuItem>
                    </MenuList>
                </Menu>

            </div>

           {isTable ? 
           <Center><TableView data={data} labels={labels}/></Center>
           : <Graphs  
                labels={labels}
                data={data}
                options={options}/>
                }

        </Flex>
       
    )
}