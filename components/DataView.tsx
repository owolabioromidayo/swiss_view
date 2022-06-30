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
    Box,
    Table,
    useBreakpointValue,
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

type filterState =
    | "day"
    | "week"
    | "month"
    | "year"
    | "null"
    ;

function Graph({labels, data, title, options, w}: {labels: any[], data: number[], title: string, options: any, w: string}){
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
    return <div style={{width: w, height: "300px"}}><Line options={options} data={plt_data} /></div>
}

function Graphs({labels, data, options, filter}: 
    {labels: Date[], data: GraphData, options:any, filter:filterState}){
        const graphW = useBreakpointValue({sm: "500px",  md:"500px", lg:"500px", '2xl':"650px"});
        let newLabels: string[] = [];

        let skipInterval  = {
            "day": 0,
            "week": 3,
            "month": 8,
            "year": 15,
            "null" : 15
        };
        
        labels.forEach((value: Date, index: number) => {
            if (index % (skipInterval[filter]+1) == 0){
                newLabels.push(value.toDateString().slice(4))
            }else{
                newLabels.push("")
            }
        })

    return (<div>
        {Object.keys(data).filter(k => k != "datetime").map((key, index, arr) =>{
            if (index % 2 != 0){
                return;
            }
            if(index == arr.length - 1){
                return(
                <Center><Graph 
                    labels={newLabels}
                    data={data[key]}
                    title={key}
                    options={options}
                    key={index}
                    w={graphW}
                /></Center>)
            }
            let nextKey = arr[index+1];
            return(
            <Center key={index}>
                <Flex direction={{base:"column", sm:"column", md:"column", lg:"row", xl: "row", '2xl': "row"  }} key={index}>
                <Graph 
                    labels={newLabels}
                    data={data[key]}
                    title={key}
                    options={options}
                    key={index}
                    w={graphW}
                />
                <Graph 
                    labels={newLabels}
                    data={data[nextKey]}
                    title={nextKey}
                    options={options}
                    key={index+1}
                    w={graphW}
                />
            </Flex>
            </Center> )
        })}
     </div>)
}

function TableView({data, labels}: {data: GraphData, labels: Date[]}){
    const pageRows = 20;
    const maxPages = Math.ceil(labels.length / pageRows);
    const [pageNumber, setPageNumber] = useState<number>(1);


    useEffect(() => setPageNumber(1), [data]);

    const pageTurn = (side: number) => {
       
        if (side == -1){ //left
            (pageNumber == 1) ? pageNumber : setPageNumber(pageNumber-1)
        }else {//right
            (pageNumber == maxPages) ? pageNumber : setPageNumber(pageNumber+1)
        }
    }

    return(
        <div>
            <Box overflowX="auto" >
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

                        { labels.length == 0 ? null:  data.ext_temp
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
            </Box>
            
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

    const [filteredData, setFilteredData] = useState<GraphData>({
        ext_temp : [],
        baro_pressure: [],
        wind_speed : [],
        humidity : [],
        gas_resistance: [],
        battery_percentage: [],
    });

    const [filteredLabels, setFilteredLabels] = useState<Date[]>([]);
    const [timeFilter, setTimeFilter] = useState<filterState>("null");


    useEffect( () => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/sensor_data/get`,
            withCredentials: false
        }).then( (res:any) => {
                let recv : GraphData = res.data;
                setData(recv);
                setLabels(res.data.datetime.map(k => new Date(k)));
                setTimeFilter("year");
            })
        }, [])

    useEffect(() => {
        if(timeFilter == "null"){
            //filter is null
            setFilteredData(data);
            setFilteredLabels(labels);
            return;
        }

        //get new indexes
        let newIdxs: number[] = [];

        const refDate = new Date();
        const refDateYear = refDate.getFullYear();
        const refDateMonth = refDate.getMonth();
        const refDateDate= refDate.getDate();

        if (timeFilter == "year"){
            labels.forEach((date, idx) => {
                if (date.getFullYear() == refDateYear){
                    newIdxs.push(idx);
                }
            })
        } else if (timeFilter == "month"){
            labels.forEach((date, idx) => {
                if (date.getMonth() == refDateMonth && date.getFullYear() == refDateYear){
                    newIdxs.push(idx);
                }
            })
        }else if(timeFilter == "week"){
            labels.forEach((date, idx) => {
                if (refDateDate - date.getDate() <= 7 && date.getMonth() == refDateMonth && date.getFullYear() == refDateYear){
                    newIdxs.push(idx);
                }
            })
        }else if (timeFilter == "day"){ //filter == day
            labels.forEach((date, idx) => {
                if (date.getDate() == refDateDate 
                    && date.getMonth() == refDateMonth 
                    && date.getFullYear() == refDateYear){
                    newIdxs.push(idx);
                }
            })
        }


        let newData: GraphData = {
            ext_temp : [],
            baro_pressure: [],
            wind_speed : [],
            humidity : [],
            gas_resistance: [],
            battery_percentage: [],
        };

        let newLabels : Date[] = [];

        //filter by new idxs
        Object.keys(data).filter((k) => k != "datetime").forEach((k) => {
            newData[k] = data[k].filter((_, idx:number) => newIdxs.includes(idx));
        })
        
        newLabels = labels.filter((_, idx:number) => newIdxs.includes(idx));

        setFilteredData(newData);
        setFilteredLabels(newLabels);


    }, [timeFilter, data, labels])

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
                        <MenuItem onClick={() => setTimeFilter("day")}> Day</MenuItem>
                        <MenuItem onClick={() => setTimeFilter("week")}> Week</MenuItem>
                        <MenuItem onClick={() => setTimeFilter("month")}> Month</MenuItem>
                        <MenuItem onClick={() => setTimeFilter("year")}> Year</MenuItem>
                        <MenuItem onClick={() => setTimeFilter("null")}> --</MenuItem>
                    </MenuList>
                </Menu>

            </div>

            <Center><h2>
                        <b>{timeFilter === "null" ? 
                            "Showing Posts from All Time" : (timeFilter == "day") ?
                             "Showing posts from Yesterday" :  
                             `Showing Posts from Last ${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`}
                        </b>
                    </h2>
            </Center>

           {isTable ? 
           <Center><TableView data={filteredData} labels={filteredLabels}/></Center>
           : <Graphs  
                labels={filteredLabels}
                data={filteredData}
                filter={timeFilter}
                options={options}/>
            }

        </Flex>
       
    )
}