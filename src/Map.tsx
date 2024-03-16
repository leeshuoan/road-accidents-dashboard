import { useState } from "react";
import { AccidentData } from "./Dashboard";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  TrafficLayerF,
  InfoWindowF,
} from "@react-google-maps/api";

interface MapProps {
  trafficLayerVisible: boolean;
  mapKey: number;
  center: { lat: number; lng: number };
  accidentData: AccidentData[];
}

function Map({ trafficLayerVisible, mapKey, center, accidentData }: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyCKEnQUKG9So2z23TYtvfUiFBahgWwzvRc">
        {/* TODO: Last Updated: XX:XX:XX?
        Button to refresh and fetch new data and re-render map? */}
        <div id="map" className="h-[700px] w-full">
          <GoogleMap
            key={mapKey}
            mapContainerStyle={{
              height: "100%",
              width: "100%",
            }}
            zoom={12}
            center={center}
          >
            {accidentData.map((accident, index) => (
              <MarkerF
                key={index}
                position={{ lat: accident.Latitude, lng: accident.Longitude }}
                title="Accident"
                onMouseOver={() => {setSelectedMarker(index)}}
                onMouseOut={() => setSelectedMarker(null)}
              />
            ))}
            {trafficLayerVisible && <TrafficLayerF />}
            {selectedMarker !== null && (
              <InfoWindowF
                position={{
                  lat: accidentData[selectedMarker].Latitude,
                  lng: accidentData[selectedMarker].Longitude,
                }}
                options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <b>{new Date(accidentData[selectedMarker].Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b>
                  {accidentData[selectedMarker].Content}
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>
      </LoadScript>
    </>
  );
}

export default Map;
