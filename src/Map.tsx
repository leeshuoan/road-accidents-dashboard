import { useState } from "react";
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
  center: {
    lat: number;
    lng: number;
  };
}

function Map({ trafficLayerVisible, mapKey, center }: MapProps) {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  // TODO: real time api data fetching?
  const coordinates = [
    { latitude: 1.34407423951517, longitude: 103.865998256174 },
    { latitude: 1.40044336198297, longitude: 103.773662806841 },
    { latitude: 1.40044336198297, longitude: 103.773662806841 },
    { latitude: 1.35971892496606, longitude: 103.857868945461 },
    { latitude: 1.32874122352198, longitude: 103.911813181262 },
    { latitude: 1.32133716235501, longitude: 103.753480048432 },
    { latitude: 1.32126859860157, longitude: 103.753638105868 },
    { latitude: 1.3407532507705, longitude: 103.946156220478 },
    { latitude: 1.32817416875941, longitude: 103.824604841192 },
    { latitude: 1.3313389574592, longitude: 103.879264458568 },
    { latitude: 1.39099977317238, longitude: 103.775914530481 },
    { latitude: 1.35081979946698, longitude: 103.857847371259 },
    { latitude: 1.41549569156645, longitude: 103.771414338789 },
    { latitude: 1.39563013293457, longitude: 103.857668749776 },
    { latitude: 1.415632901582, longitude: 103.77141433515 },
    { latitude: 1.35081979946698, longitude: 103.857847371259 },
    { latitude: 1.39487188622372, longitude: 103.906364288496 },
    { latitude: 1.39259354610074, longitude: 103.858028518547 },
    { latitude: 1.40049111547354, longitude: 103.895985776442 },
    { latitude: 1.32940351371593, longitude: 103.85223812356 },
    { latitude: 1.28940238006171, longitude: 103.860921308156 },
    { latitude: 1.28951487524148, longitude: 103.860806853187 },
    { latitude: 1.425245221717, longitude: 103.776840589105 },
    { latitude: 1.34029592549921, longitude: 103.805227544108 },
    { latitude: 1.33908628936634, longitude: 103.806519407087 },
  ];

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
            {coordinates.map((coord, index) => (
              <MarkerF
                key={index}
                position={{ lat: coord.latitude, lng: coord.longitude }}
                title="Accident"
                onMouseOver={() => setSelectedMarker(index)}
                onMouseOut={() => setSelectedMarker(null)}
              />
            ))}
            {trafficLayerVisible && <TrafficLayerF />}
            {selectedMarker !== null && (
              <InfoWindowF
                position={{
                  lat: coordinates[selectedMarker].latitude,
                  lng: coordinates[selectedMarker].longitude,
                }}
                options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  {/* Add your description content here */}
                  Accident occurred here
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
