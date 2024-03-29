import TableauEmbed from "../components/TableauEmbed";
import MorningRush from "../assets/morning-rush.svg";

const RoadAccidentsInsights = () => {
  return (
    <>
      <div className="pt-10 pb-16 bg-[#F2F2F2] shadow-md">
        <div className="flex justify-between w-11/12 mx-auto">
          <div>
            <p className="mb-10 text-3xl text-red-600 font-bold">
              Accident Patterns
            </p>
            <p className="mb-3 text-md text-gray-700">
              Which highways are the most accident prone?
            </p>
            <div className="mb-14">
              <div className="flex items-end">
                <span className="text-3xl w-[60px] font-semibold">PIE</span>
                <div>
                  <span className="text-red-600 font-semibold italic">83</span>
                  <span className="pb-1 text-gray-500 italic">
                    &nbsp;total accidents
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <span className="text-lg w-[60px] text-gray-700">SLE</span>
                <div>
                  <span className="text-xs italic">30</span>
                  <span className="mb-1 pb-1 text-gray-500 text-xs italic">
                    &nbsp;total accidents
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <span className="text-lg w-[60px] text-gray-700">TPE</span>
                <div>
                  <span className="text-xs italic">29</span>
                  <span className="pb-1 text-gray-500 text-xs italic">
                    &nbsp;total accidents
                  </span>
                </div>
              </div>
            </div>
            <p className="mb-3 text-md text-gray-700">
              When do the most accidents occur?
            </p>
            <div className="mb-14 flex justify-between">
              <div>
                <p className="text-3xl font-semibold">Monday</p>
                <p className="mb-1 text-2xl font-semibold">8 AM - 9 AM</p>
                <p className="text-sm text-gray-500">
                  Peak of <span className="font-bold">9</span> accidents
                  <br />
                  on 18 March
                </p>
              </div>
              <img src={MorningRush} width={150} />
            </div>

            <p className="mb-3 text-md text-gray-700">
              Which time periods had the most accidents?
            </p>
            <div className="space-y-2">
              <p className="text-2xl font-semibold">8 AM - 9 AM</p>
              <span className="text-gray-600">
                7 AM - 8 AM
                <br />
              </span>
              <span className="text-gray-600">6 PM - 7 PM</span>
            </div>
          </div>
          <TableauEmbed url="https://public.tableau.com/views/dynamic_17113649522640/Dashboard?:language=en-GB&publish=yes&:sid=&:display_count=n&:origin=viz_share_link" />
        </div>
      </div>

      <TableauEmbed url="https://public.tableau.com/views/Visualisations_17110383019890/TrafficAccidentsDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link" />
    </>
  );
};

export default RoadAccidentsInsights;
