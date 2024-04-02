import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import TableauEmbed from "../components/TableauEmbed";
import MorningRush from "../assets/morning-rush.svg";

const RoadAccidentsInsights = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: "line",
        height: 350,
        background: "transparent",
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: "Accident Fatalities",
          type: "line",
          data: [68, 39, 6],
          color: "#2563EB",
        },
        {
          name: "Accident Injuries",
          type: "line",
          data: [4222, 849, 2311],
          color: "#FF4560",
        },
      ],
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#2563EB",
          },
          labels: {
            style: {
              colors: "#2563EB",
            },
          },
          title: {
            text: "Accident Fatalities",
            style: {
              color: "#2563EB",
            },
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FF4560",
          },
          labels: {
            style: {
              colors: "#FF4560",
            },
          },
          title: {
            text: "Accident Injuries",
            style: {
              color: "#FF4560",
            },
          },
        },
      ],
      xaxis: {
        categories: [
          "Motor Cyclists & Pillion Riders",
          "Pedestrians",
          "Motor Cars",
        ],
        labels: {
          formatter: function (value: string) {
            if (value === "Motor Cyclists & Pillion Riders") {
              return "Motor Cyclists";
            } else {
              return value;
            }
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <>
      <div className="pt-10 pb-16 bg-[#F2F2F2]">
        <div className="flex justify-between gap-5 w-11/12 mx-auto">
          <div>
            <p className="mb-2 text-3xl text-red-600 font-bold">
              Accident Patterns
            </p>
            <p className="mb-14 text-lg text-justify text-gray-600">
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

            <div className="mb-14 flex gap-1">
              <div>
                <p className="mb-2 text-md text-gray-600">
                  When are accidents most frequent?
                </p>
                <p className="text-2xl font-semibold">Monday 8 AM - 9 AM</p>
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
          <TableauEmbed
            url="https://public.tableau.com/views/dynamic_17113649522640/Dashboard?:language=en-GB&publish=yes&:sid=&:display_count=n&:origin=viz_share_link"
            width="2000px"
            height="700px"
          />
        </div>

        <hr className="mt-16 border-t-1 border-gray-300" />

        <div className="mt-10 flex gap-5 justify-between w-11/12 mx-auto">
          <TableauEmbed
            url="https://public.tableau.com/views/Visualisations_17110383019890/TrafficAccidentsDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link"
            width="1800px"
            height="700px"
          />
          <div>
            <p className="text-2xl font-bold">Accident Statistics</p>
            <p className="mb-14 text-lg text-gray-600">
              The number of accidents yearly has been steadily increasing since
              the covid pandemic in 2020
            </p>

            <p className="mb-2 text-md text-gray-600">
              Which vehicles are the most accident prone?
            </p>
            <div className="mb-14">
              <span className="text-3xl font-semibold">Motor Cars</span>
              <div className="text-sm mb-3">
                <span className="pb-1 text-gray-500">Average of</span>
                <span className="text-red-600 font-semibold">&nbsp;20.5</span>
                <span className="pb-1 text-gray-500">
                  &nbsp;accidents each day in 2022
                </span>
              </div>

              <span className="text-xl">Motorcycles & Scooters</span>
              <div className="text-sm">
                <span className="pb-1 text-gray-500">Average of</span>
                <span className="text-red-600 font-semibold">&nbsp;11.2</span>
                <span className="pb-1 text-gray-500">
                  &nbsp;accidents each day in 2022
                </span>
              </div>
            </div>

            <p className="mb-2 text-md text-gray-600">
              Which demographic is the most prone to fatalities or injuries?
            </p>
            <div className="mb-3">
              <div ref={chartRef}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadAccidentsInsights;
