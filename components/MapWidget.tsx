import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

 let MapContainer = (props:any) => {
    const lat: number = parseFloat(process.env.NEXT_PUBLIC_LATITUDE || '');
    const lng: number = parseFloat(process.env.NEXT_PUBLIC_LONGITUDE || '');
    return(
        <Map
            google = {props.google}
            zoom= {20}
            style={{width: "80%", height :"30%", float: "top"}}
            initialCenter = {
                {lat, lng}
            }
        >
            <Marker name={"Weather Station"} 
                posiition={{lat, lng}}/>
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
})(MapContainer)