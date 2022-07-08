// import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

//  let MapContainer = (props:any) => {
//     const lat: number = parseFloat(process.env.NEXT_PUBLIC_LATITUDE || '');
//     const lng: number = parseFloat(process.env.NEXT_PUBLIC_LONGITUDE || '');
//     return(
//         <Map
//             google = {props.google}
//             zoom= {20}
//             style={{width: "80%", height :"30%", float: "top"}}
//             initialCenter = {
//                 {lat, lng}
//             }
//         >
//             <Marker label={"Weather Station"} 
//                 position={{lat, lng}}/>
//         </Map>
//     )
// }

// export default GoogleApiWrapper({
//     apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
// })(MapContainer)



import * as React from "react";
import { Flex, Box } from "@chakra-ui/react"
import { createRoot } from "react-dom/client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapContainer: React.FunctionComponent = () => {
    const lat: number = parseFloat(process.env.NEXT_PUBLIC_LATITUDE || '');
    const lng: number = parseFloat(process.env.NEXT_PUBLIC_LONGITUDE || '');
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(15); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: lat,
    lng: lng,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };


// Really not important; But if a use case pops up, add it
// It just returns the data points of the map...and you can customize the map position with it
//   const form = (
//     <div
//       style={{
//         padding: "1rem",
//         flexBasis: "250px",
//         height: "100%",
//         overflow: "auto",
//       }}
//     >
//       <label htmlFor="zoom">Zoom</label>
//       <input
//         type="number"
//         id="zoom"
//         name="zoom"
//         value={zoom}
//         onChange={(event) => setZoom(Number(event.target.value))}
//       />
//       <br />
//       <label htmlFor="lat">Latitude</label>
//       <input
//         type="number"
//         id="lat"
//         name="lat"
//         value={center.lat}
//         onChange={(event) =>
//           setCenter({ ...center, lat: Number(event.target.value) })
//         }
//       />
//       <br />
//       <label htmlFor="lng">Longitude</label>
//       <input
//         type="number"
//         id="lng"
//         name="lng"
//         value={center.lng}
//         onChange={(event) =>
//           setCenter({ ...center, lng: Number(event.target.value) })
//         }
//       />
//       <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
//       {clicks.map((latLng, i) => (
//         <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
//       ))}
//       <button onClick={() => setClicks([])}>Clear</button>
//     </div>
//   );

  return (
    // <div style={{ display: "flex", height: "300px", width:"1200px", marginTop: "-80px" }}>
      <Flex h="300px" w="700px" ml={-80} >
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%", borderRadius: "10px", borderWidth: '1px', borderColor: 'black' }}
        >
             <Marker label={"Weather Station"} 
              position={{lat, lng}}/>

          {/* {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))} */}
        </Map>
      </Wrapper>
      </Flex>
  );
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

window.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<MapContainer />);
});


export default MapContainer; {};

