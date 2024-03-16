import { useEffect, useState } from "react";
import Map from "./Map";
import TwitterTimeline from "./TwitterTimeline";

interface AccidentData {
  Type: string;
  Latitude: number;
  Longitude: number;
  CurrentDateTime: string;
  Message: string;
  Content: string;
  Timestamp: string;
}

const Dashboard = () => {
  const [center] = useState({ lat: 1.3521, lng: 103.8198 });
  const [mapKey, setMapKey] = useState<number>(0);
  const [trafficLayerVisible, setTrafficLayerVisible] =
    useState<boolean>(false);
  const [accidentData, setAccidentData] = useState<AccidentData[]>([
    {
      Type: "",
      Latitude: 0,
      Longitude: 0,
      CurrentDateTime: "",
      Message: "",
      Content: "",
      Timestamp: "",
    },
  ]);

  const toggleTrafficLayer = () => {
    setTrafficLayerVisible(!trafficLayerVisible);
    setMapKey(mapKey + 1);
  };

  useEffect(() => {
    fetch(
      "https://kxsfbbgbxc.execute-api.ap-southeast-1.amazonaws.com/RoadAccidentsAPI"
    )
      .then((response) => response.json())
      .then((data) => {
        setAccidentData(data);
      });
  }, []);

  return (
    <>
      <div className="text-2xl text-center font-bold mb-5">
        Road Accidents Dashboard
      </div>
      <div className="lg:flex space-between gap-5">
        <Map
          trafficLayerVisible={trafficLayerVisible}
          mapKey={mapKey}
          center={center}
          accidentData={accidentData}
        />
        <div className="lg:w-1/3">
          <div className="hidden lg:block text-l font-bold">Map Settings</div>
          <div className="mb-4 inline-flex items-center">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="check"
            >
              <input
                type="checkbox"
                className="before:content[''] bg-white border-gray-400 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="check"
                checked={trafficLayerVisible}
                onChange={toggleTrafficLayer}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="mt-px pl-3 font-light text-gray-700 cursor-pointer select-none"
              htmlFor="check"
            >
              {trafficLayerVisible
                ? "Hide Traffic Layer"
                : "Show Traffic Layer"}
            </label>
          </div>
          <TwitterTimeline />
        </div>
      </div>
    </>
  );
};

export type { AccidentData };
export default Dashboard;
