import { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { AccidentData } from "./Dashboard";

const AccidentTimings = ({
  accidentData,
}: {
  accidentData: AccidentData[];
}) => {
  const chartRef = useRef<any>(null);
  const [granularity, setGranularity] = useState("2-hour");

  useEffect(() => {
    if (!accidentData.length) return;

    const getIntervalStart = (
      timestamp: string,
      granularity: string
    ): string => {
      const date = new Date(timestamp);
      const hour = date.getHours();
      let intervalStartHour = hour;
      if (granularity === "1-hour") {
        return `${hour < 10 ? "0" + hour : hour}:00-${
          hour + 1 < 10 ? "0" + (hour + 1) : hour + 1
        }:00`;
      } else if (granularity === "2-hour") {
        intervalStartHour = hour - (hour % 2);
        return `${
          intervalStartHour < 10 ? "0" + intervalStartHour : intervalStartHour
        }:00-${
          intervalStartHour + 2 < 10
            ? "0" + (intervalStartHour + 2)
            : intervalStartHour + 2
        }:00`;
      } else {
        intervalStartHour = hour - (hour % 4);
        return `${
          intervalStartHour < 10 ? "0" + intervalStartHour : intervalStartHour
        }:00-${
          intervalStartHour + 4 < 10
            ? "0" + (intervalStartHour + 4)
            : intervalStartHour + 4
        }:00`;
      }
    };

    const intervals: string[] =
      granularity === "1-hour"
        ? [
            "00:00-01:00",
            "01:00-02:00",
            "02:00-03:00",
            "03:00-04:00",
            "04:00-05:00",
            "05:00-06:00",
            "06:00-07:00",
            "07:00-08:00",
            "08:00-09:00",
            "09:00-10:00",
            "10:00-11:00",
            "11:00-12:00",
            "12:00-13:00",
            "13:00-14:00",
            "14:00-15:00",
            "15:00-16:00",
            "16:00-17:00",
            "17:00-18:00",
            "18:00-19:00",
            "19:00-20:00",
            "20:00-21:00",
            "21:00-22:00",
            "22:00-23:00",
            "23:00-24:00",
          ]
        : granularity === "2-hour"
        ? [
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
            "22:00-24:00",
          ]
        : [
            "00:00-04:00",
            "04:00-08:00",
            "08:00-12:00",
            "12:00-16:00",
            "16:00-20:00",
            "20:00-24:00",
          ];

    const intervalDataMap = new Map<string, number>();
    intervals.forEach((interval) => intervalDataMap.set(interval, 0));

    accidentData.forEach((d) => {
      const intervalStart = getIntervalStart(d.Timestamp, granularity);
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
      colors: ["#DC2638"],
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

    if (!chartRef.current.chart) {
      chartRef.current.chart = new ApexCharts(chartRef.current, options);
      chartRef.current.chart.render();
    } else {
      chartRef.current.chart.updateOptions(options, false);
      chartRef.current.chart.updateSeries([
        {
          name: "Number of Accidents",
          data: data,
        },
      ]);
    }
  }, [accidentData, granularity]);

  const handleGranularityChange = (granularity: string) => {
    setGranularity(granularity);
  };

  return (
    <div className="shadow-lg p-5">
      {/* <p className="text-lg font-bold">ACCIDENTS BY TIME OF DAY</p> */}
      <div className="flex items-center">
        <div className="flex">
          <button
            className={`py-1 px-4 border ${
              granularity === "1-hour"
                ? "bg-gray-200 border-red-600 border-b-4 border-0"
                : ""
            }`}
            onClick={() => handleGranularityChange("1-hour")}
          >
            1-hour
          </button>
          <button
            className={`py-1 px-4 border ${
              granularity === "2-hour"
                ? "bg-gray-200 border-red-600 border-b-4 border-0"
                : ""
            }`}
            onClick={() => handleGranularityChange("2-hour")}
          >
            2-hour
          </button>
          <button
            className={`py-1 px-4 border ${
              granularity === "4-hour"
                ? "bg-gray-200 border-red-600 border-b-4 border-0"
                : ""
            }`}
            onClick={() => handleGranularityChange("4-hour")}
          >
            4-hour
          </button>
        </div>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default AccidentTimings;
