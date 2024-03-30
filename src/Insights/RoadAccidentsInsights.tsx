import TableauEmbed from "../components/TableauEmbed";
import MorningRush from "../assets/morning-rush.svg";
import Motorcycle from "../assets/motorcycle.svg";

const RoadAccidentsInsights = () => {
  return (
    <>
      <div className="pt-10 pb-16 bg-[#F2F2F2]">
        <div className="flex justify-between gap-5 w-11/12 mx-auto">
          <div>
            <p className="mb-2 text-3xl text-red-600 font-bold">
              Accident Patterns
            </p>
            <p className="mb-14 text-lg text-gray-600">
              Where are accidents most prone to happen in Singapore? At what
              times do accidents most commonly happen?
            </p>

            <p className="mb-2 text-md text-gray-600">
              Which highways are the most accident prone?
            </p>
            <div className="mb-14">
              <div className="flex items-end">
                <span className="text-3xl w-[65px] font-semibold">PIE</span>
                <div>
                  <span className="text-red-600 font-semibold italic">83</span>
                  <span className="pb-1 text-gray-600 italic">
                    &nbsp;total accidents
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <span className="text-lg w-[65px] text-gray-700">SLE</span>
                <div>
                  <span className="text-xs italic">30</span>
                  <span className="mb-1 pb-1 text-gray-600 text-xs italic">
                    &nbsp;total accidents
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <span className="text-lg w-[65px] text-gray-700">TPE</span>
                <div>
                  <span className="text-xs italic">29</span>
                  <span className="pb-1 text-gray-600 text-xs italic">
                    &nbsp;total accidents
                  </span>
                </div>
              </div>
            </div>

            <p className="mb-2 text-md text-gray-600">
              When are accidents most frequent?
            </p>
            <div className="mb-14 flex gap-1 justify-between">
              <div>
                <p className="text-2xl font-semibold">Monday</p>
                <p className="mb-1 text-2xl font-semibold">8 AM - 9 AM</p>
                <p className="text-sm text-gray-600">
                  Peak of <span className="font-bold text-red-500">9</span>{" "}
                  accidents on 18 March
                </p>
              </div>
              <img src={MorningRush} width={150} />
            </div>

            <p className="mb-2 text-md text-gray-600">
              Which time periods had the most accidents?
            </p>
            <div className="mb-14">
              <p className="text-2xl font-semibold">8 AM - 9 AM</p>
              <p className="text-gray-600">7 AM - 8 AM</p>
              <p className="text-gray-600">6 PM - 7 PM</p>
            </div>
          </div>
          <TableauEmbed url="https://public.tableau.com/views/dynamic_17113649522640/Dashboard?:language=en-GB&publish=yes&:sid=&:display_count=n&:origin=viz_share_link" />
        </div>

        <hr className="mt-16 border-t-1 border-gray-300" />

        <div className="mt-10 flex gap-5 justify-between w-11/12 mx-auto">
          <TableauEmbed url="https://public.tableau.com/views/Visualisations_17110383019890/TrafficAccidentsDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link" />
          <div>
            <p className="mb-2 text-2xl font-bold">Accident Statistics</p>
            <p className="mb-14 text-lg text-gray-600">
              The number of accidents yearly has been steadily increasing since
              the covid pandemic in 2020
            </p>

            <p className="mb-2 text-md text-gray-600">
              Which vehicles are the most accident prone?
            </p>
            <div className="mb-14">
              <span className="text-3xl font-semibold">Motor Cars</span>
              <div className="text-sm mb-2">
                <span className="pb-1 text-gray-500">Average of</span>
                <span className="text-red-600 font-semibold">&nbsp;20.5</span>
                <span className="pb-1 text-gray-500">
                  &nbsp;accidents each day in 2022
                </span>
              </div>

              <span className="text-xl">Motorcycles & Scooters</span>
              <div className="text-xs">
                <span className="pb-1 text-gray-500">Average of</span>
                <span className="text-red-600 font-semibold">&nbsp;11.2</span>
                <span className="pb-1 text-gray-500">
                  &nbsp;accidents each day in 2022
                </span>
              </div>
            </div>

            <div className="flex">
              <p className="mb-2 text-lg font-semibold">
                Motorcyclists & Pillion Riders make up majority of Accident
                Fatalities & Injuries
              </p>
              <img src={Motorcycle} width={70} />
            </div>
            <div className="mb-14">
              <table className="w-full text-center shadow-lg rtl:text-right text-gray-500">
                <thead>
                  <tr className="text-base bg-gray-200 border-b text-black">
                    <th></th>
                    <th>Fatalities</th>
                    <th>Injuries</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-100 hover:text-black">
                    <td className="pl-1">1.</td>
                    <td>Motorcyclists & Pillion Riders</td>
                    <td>Motorcyclists & Pillion Riders</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-100 hover:text-black">
                    <td className="pl-1">2.</td>
                    <td>Pedestrian</td>
                    <td>Motor Cars</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-100 hover:text-black">
                    <td className="pl-1">3.</td>
                    <td>Motor Cars</td>
                    <td>Pedestrian</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadAccidentsInsights;
