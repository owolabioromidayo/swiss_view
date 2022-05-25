import {Box} from '@chakra-ui/react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function MapWidget(){
    const lat: number = 7.441042
    const long: number  = 3.892104

    return(
     <Box w="100%" style={{height: "300px", overflow: "hidden"}} border="8px solid">
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
     </Box>
    // <div style={{width: "100%", height: "300px", overflow: "hidden", border: "8px solid" }} id="map"></div>

    
    )
}