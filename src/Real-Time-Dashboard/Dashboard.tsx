import { useEffect, useState } from "react";
import Map from "./Map";
import AccidentList from "./AccidentList";
import AccidentTimings from "./AccidentTimings";

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
  const [timeRange, setTimeRange] = useState<string>("all");
  const [trafficLayerVisible, setTrafficLayerVisible] =
    useState<boolean>(false);
  const [mapData, setMapData] = useState<AccidentData[]>([]);
  const [accidentData, setAccidentData] = useState<AccidentData[]>([]);

  const toggleTrafficLayer = () => {
    setTrafficLayerVisible(!trafficLayerVisible);
    setMapKey(mapKey + 1);
  };

  const filterAccidentsByTimeRange = (timeRange: string) => {
    const now = new Date();
    setTimeRange(timeRange);
    let filteredData: AccidentData[] = [];
    switch (timeRange) {
      case "24h":
        filteredData = accidentData.filter((accident) => {
          const accidentDate = new Date(accident.Timestamp);
          return now.getTime() - accidentDate.getTime() <= 24 * 60 * 60 * 1000;
        });
        break;
      case "7d":
        filteredData = accidentData.filter((accident) => {
          const accidentDate = new Date(accident.Timestamp);
          return (
            now.getTime() - accidentDate.getTime() <= 7 * 24 * 60 * 60 * 1000
          );
        });
        break;
      default:
        filteredData = accidentData;
        break;
    }
    setMapData(filteredData);
  };

  useEffect(() => {
    fetch(
      "https://kxsfbbgbxc.execute-api.ap-southeast-1.amazonaws.com/RoadAccidentsAPI"
    )
      .then((response) => response.json())
      .then((data) => {
        setAccidentData(data);
        console.log(accidentData);
        setMapData(data);
      });
  }, []);

  return (
    <>
      <div className="lg:flex space-between gap-5">
        <div className="w-full">
          <Map
            trafficLayerVisible={trafficLayerVisible}
            mapKey={mapKey}
            center={center}
            accidentData={mapData}
          />
          <div className="mb-2 mt-2 flex">
            <p className="mr-2">Filter:</p>
            <select
              className="block border-gray-400 rounded-md shadow-sm"
              value={timeRange}
              onChange={(e) => filterAccidentsByTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="7d">Past 7 Days</option>
              <option value="24h">Past 24 Hours</option>
            </select>
            <div className="ml-4 inline-flex items-center">
              <label
                className="relative flex items-center rounded-full cursor-pointer"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  className="before:content[''] bg-white border-gray-400 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-9 before:w-9 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
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
                className="mt-px pl-1 font-light text-gray-700 cursor-pointer select-none"
                htmlFor="check"
              >
                {trafficLayerVisible
                  ? "Hide Traffic Layer"
                  : "Show Traffic Layer"}
              </label>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="hidden lg:block text-2xl font-bold text-red-600">
            Live Accidents
          </div>
          <div className="hidden lg:block text-xs text-gray-500 italic mb-4">
            Last Updated: {new Date().toLocaleString()}
          </div>
          <AccidentList accidentData={accidentData} />
        </div>
      </div>
      <AccidentTimings accidentData={accidentData}/>
    </>
  );
};

export type { AccidentData };
export default Dashboard;
