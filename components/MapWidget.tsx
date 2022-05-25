import { Box, Flex } from '@chakra-ui/react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

// import 'leaflet/dist/leaflet.css';

export default function MapWidget(){

    const lat: number = 7.441042
    const long: number  = 3.892104

    return(
    // <Box w="200px" h="200px" border="20px" borderColor="blackAlpha.400">
    
        <div style={{width: "300px",  height: "300px", overflow: "hidden"}}>
            <MapContainer center={[lat, long]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, long]}>
                    <Popup>
                    Weather Station is<br /> here.
                    </Popup>
                </Marker>
            </MapContainer>
    
        </div>
    
    )

}