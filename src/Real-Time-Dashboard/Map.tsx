import { useState } from "react";
import { AccidentData } from "./Dashboard";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  TrafficLayerF,
  InfoWindowF,
} from "@react-google-maps/api";
import pin from "../assets/pin.png";

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
        <div id="map" className="h-[500px] w-full shadow-md">
          <GoogleMap
            key={mapKey}
            mapContainerStyle={{
              height: "100%",
              width: "100%",
            }}
            zoom={11.5}
            center={center}
          >
            {accidentData.map((accident, index) => (
              <MarkerF
                key={index}
                icon={{
                  url: pin,
                  scaledSize: new window.google.maps.Size(25, 25), 
                }}
                position={{ lat: accident.Latitude, lng: accident.Longitude }}
                title="Accident"
                onMouseOver={() => {
                  setSelectedMarker(index);
                }}
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
                  <b>
                    {new Date(
                      accidentData[selectedMarker].Timestamp
                    ).toLocaleTimeString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </b>
                  &nbsp;
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
