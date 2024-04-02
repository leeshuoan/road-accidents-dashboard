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
            height="700px"
          />
          <div>
            <p className="mb-2 text-2xl font-bold">Singapore's Bus Network</p>
            <p className="mb-14 text-lg text-gray-600">
              Singapore's Bus Network forms a significant part of public
              transport in Singapore. Analysing this network could inform
              policies and initiatives geared towards optimising public
              transportation systems and potentially mitigate the impact of
              increased vehicular traffic on road safety
            </p>

            <p className="mb-2 text-lg font-semibold">
              The most passenger tap-ins are concentrated in Woodlands, Jurong
              West, Tampines
            </p>
          </div>
        </div>
      </div>
      <div className="pt-10 pb-16 bg-[#F2F2F2]">
        <div className="flex justify-between gap-5 w-11/12 mx-auto">
          <div>
            <p className="mb-2 text-2xl font-bold">Singapore's Mrt Network</p>
            <p className="mb-14 text-lg text-gray-600">
              Singapore's Mrt Network forms a significant part of public
              transport in Singapore. Analysing this network could inform
              policies and initiatives geared towards optimising public
              transportation systems and potentially mitigate the impact of
              increased vehicular traffic on road safety
            </p>

            <p className="text-md text-gray-600">
              Which stations have the most traffic?
            </p>

            <div className="pt-4" ref={chartRef}></div>
          </div>
          <TableauEmbed
            url="https://public.tableau.com/views/Visualisations_17110383019890/MRTDashboard?:language=en-GB&:sid=&:display_count=n&:origin=viz_share_link"
            width="4200px"
            height="700px"
          />
        </div>
      </div>
    </>
  );
};

export default PublicTransportInsights;
