import TableauEmbed from "../components/TableauEmbed";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const PublicTransportInsights = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: "bar",
        height: 250,
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      series: [
        {
          name: "Total Tap In Volume",
          data: [1867454, 1691868, 1580323, 1569922, 1566200],
        },
      ],
      xaxis: {
        categories: ["Jurong East", "Orchard", "Serangoon", "Newton", "Bugis"],
        labels: {
          formatter: function (value: number) {
            if (value % 500000 === 0) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
              return "";
            }
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
      colors: ["#DC2626"],
      dataLabels: {
        position: "center",
        formatter: function (value: number) {
          return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
      title: {
        text: "Total Tap In Volume by MRT Station",
        align: "center",
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
          <TableauEmbed
            url="https://public.tableau.com/views/Visualisations_17110383019890/BusDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link"
            width="4200px"
            height="800px"
          />
          <div>
            <p className="mb-2 text-2xl font-bold">Singapore's Bus Network</p>
            <p className="mb-12 w-[350px] text-lg text-justify text-gray-600">
              Singapore's Bus Network serves as a crucial element in last mile
              connectivity between places in Singapore. The extensiveness of
              connectivity greatly influences the need for a private vehicle,
              especially to places that are out of the way.
            </p>

            <p className="text-gray-600 text-sm pt-3">
              TOTAL NUMBER OF BUS STOPS
            </p>
            <p className="mb-3 font-bold text-4xl">5,103</p>

            <p className="text-gray-600 text-sm pt-3">
              TOTAL NUMBER OF BUS SERVICES
            </p>
            <p className="mb-12 font-bold text-4xl">352</p>

            <p className="mb-2 text-md text-gray-600">
              Most passenger tap-ins are concentrated in
            </p>
            <p className="mb-12 text-lg font-semibold">
              Woodlands, Jurong West, Tampines
            </p>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-16 bg-[#F2F2F2]">
        <div className="flex justify-between gap-5 w-11/12 mx-auto">
          <div>
            <p className="mb-2 text-2xl font-bold">Singapore's MRT Network</p>
            <p className="mb-12 w-[400px] text-lg text-justify text-gray-600">
              Singapore's MRT Network forms the backbone of Singapore's
              transport system, bringing people to the main parts of the island
              quickly and efficiently. A more thorough analysis can identify
              gaps in the network for future station planning.
            </p>

            <p className="text-gray-600 text-sm pt-3">
              TOTAL NUMBER OF MRT STATIONS
            </p>
            <p className="mb-3 font-bold text-4xl">134</p>

            <p className="text-gray-600 text-sm pt-3">
              TOTAL NUMBER OF MRT LINES
            </p>
            <p className="mb-12 font-bold text-4xl">
              9
              <span className="pl-1 text-sm italic font-normal text-gray-500">
                &nbsp;including 3 LRT lines
              </span>
            </p>

            <p className="text-md text-gray-600">
              Which stations have the most traffic?
            </p>

            <div className="pt-4" ref={chartRef}></div>
          </div>
          <TableauEmbed
            url="https://public.tableau.com/views/Visualisations_17110383019890/MRTDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link"
            width="4200px"
            height="800px"
          />
        </div>
      </div>
    </>
  );
};

export default PublicTransportInsights;
