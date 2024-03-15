import { GoogleMap, LoadScript, MarkerF, TrafficLayerF } from '@react-google-maps/api';

interface MapProps {
  trafficLayerVisible: boolean;
  mapKey: number;
}

function Map({trafficLayerVisible, mapKey}: MapProps) {
  const defaultCenter = {
    lat: 1.3521,
    lng: 103.8198
  };

  const coordinates = [
    { latitude: 1.3440742395151700, longitude: 103.86599825617400 },
    { latitude: 1.4004433619829700, longitude: 103.7736628068410 },
    { latitude: 1.4004433619829700, longitude: 103.7736628068410 },
    { latitude: 1.3597189249660600, longitude: 103.85786894546100 },
    { latitude: 1.328741223521980, longitude: 103.91181318126200 },
    { latitude: 1.321337162355010, longitude: 103.7534800484320 },
    { latitude: 1.3212685986015700, longitude: 103.75363810586800 },
    { latitude: 1.3407532507705000, longitude: 103.94615622047800 },
    { latitude: 1.3281741687594100, longitude: 103.82460484119200 },
    { latitude: 1.3313389574592000, longitude: 103.87926445856800 },
    { latitude: 1.3909997731723800, longitude: 103.77591453048100 },
    { latitude: 1.3508197994669800, longitude: 103.857847371259 },
    { latitude: 1.4154956915664500, longitude: 103.77141433878900 },
    { latitude: 1.3956301329345700, longitude: 103.85766874977600 },
    { latitude: 1.4156329015820000, longitude: 103.7714143351500 },
    { latitude: 1.3508197994669800, longitude: 103.857847371259 },
    { latitude: 1.394871886223720, longitude: 103.90636428849600 },
    { latitude: 1.3925935461007400, longitude: 103.8580285185470 },
    { latitude: 1.4004911154735400, longitude: 103.895985776442 },
    { latitude: 1.3294035137159300, longitude: 103.85223812356000 },
    { latitude: 1.2894023800617100, longitude: 103.86092130815600 },
    { latitude: 1.289514875241480, longitude: 103.86080685318700 },
    { latitude: 1.4252452217170000, longitude: 103.77684058910500 },
    { latitude: 1.3402959254992100, longitude: 103.80522754410800 },
    { latitude: 1.3390862893663400, longitude: 103.80651940708700 }
  ];


  return (
    <div className='w-full h-screen'>
      <LoadScript googleMapsApiKey="AIzaSyCKEnQUKG9So2z23TYtvfUiFBahgWwzvRc">
        

        <div id="map" className='h-screen w-full'>
          <GoogleMap
            key={mapKey}
            mapContainerStyle={{
              height: "100%",
              width: "100%"
            }}
            zoom={12}
            center={defaultCenter}
          >
            {coordinates.map((coord, index) => (
              <MarkerF
                key={index}
                position={{ lat: coord.latitude, lng: coord.longitude }}
              />
            ))}
            {trafficLayerVisible && <TrafficLayerF />}
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
}

export default Map;
