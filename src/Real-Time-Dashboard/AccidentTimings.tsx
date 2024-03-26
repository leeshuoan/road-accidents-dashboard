import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { AccidentData } from "./Dashboard";

const AccidentTimings = ({
  accidentData,
}: {
  accidentData: AccidentData[];
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!accidentData.length || !chartRef.current) return;

    const getIntervalStart = (timestamp: string): string => {
      const date = new Date(timestamp);
      const hour = date.getHours();
      const intervalStartHour = hour - (hour % 2);
      return `${intervalStartHour < 10 ? '0' + intervalStartHour : intervalStartHour}:00-${intervalStartHour + 2 < 10 ? '0' + (intervalStartHour + 2) : intervalStartHour + 2}:00`;
    };

    const intervals = [
      "00:00-02:00",
      "02:00-04:00",
      "04:00-06:00",
      "06:00-08:00",
      "08:00-10:00",
      "10:00-12:00",
      "12:00-14:00",
      "14:00-16:00",
      "16:00-18:00",
      "18:00-20:00",
      "20:00-22:00",
      "22:00-00:00",
    ]

    const intervalDataMap = new Map<string, number>(); 
    intervals.forEach((interval) => intervalDataMap.set(interval, 0));

    accidentData.forEach((d) => {
      const intervalStart = getIntervalStart(d.Timestamp);
      intervalDataMap.set(
        intervalStart,
        (intervalDataMap.get(intervalStart) || 0) + 1
      );
    });

    const data = Array.from(intervalDataMap.entries()).map(([time, count]) => ({
      x: time,
      y: count,
    }));

    const options = {
      chart: {
        type: "line",
        height: 400,
      },
      colors: ["#EF4444"],
      series: [
        {
          name: "Number of Accidents",
          data: data,
        },
      ],
      xaxis: {
        type: "category", 
        categories: Array.from(intervalDataMap.keys()), 
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (value: number) {
            return value + " accidents";
          },
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [accidentData]);

  return (
    <div>
      <p className="text-l font-bold mt-8">ACCIDENTS BY TIME OF DAY</p>
      <div ref={chartRef}></div>
    </div>
  );
};

export default AccidentTimings;
