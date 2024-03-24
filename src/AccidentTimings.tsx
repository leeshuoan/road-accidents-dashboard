import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { AccidentData } from './Real-Time-Dashboard/Dashboard';

const AccidentTimings = ({ accidentData }: {accidentData: AccidentData[]}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!accidentData.length || !chartRef.current) return;

    const getIntervalStart = (timestamp: string): number => {
      const date = new Date(timestamp);
      const hour = date.getHours();
      const intervalStartHour = hour - (hour % 4);
      date.setHours(intervalStartHour, 0, 0, 0);
      return date.getTime();
    };

    const intervalDataMap = new Map<number, number>();
    accidentData.forEach((d) => {
      const intervalStart = getIntervalStart(d.Timestamp);
      intervalDataMap.set(intervalStart, (intervalDataMap.get(intervalStart) || 0) + 1);
    });

    const data = Array.from(intervalDataMap.entries()).map(([time, count]) => ({
      x: time,
      y: count,
    }));

    const options = {
      chart: {
        type: 'line',
        height: 400,
      },
      series: [{
        name: 'Number of Accidents',
        data: data,
      }],
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm',
          }
        }
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function(value: number) {
            const intervalStart = new Date(value);
            const intervalEnd = new Date(value + (4 * 60 * 60 * 1000)); // Add 4 hours
            const startHour = intervalStart.getHours();
            const endHour = intervalEnd.getHours();
            return `${intervalStart.toDateString()} ${startHour}:00 - ${endHour}:00`;
          }
        },
        y: {
          formatter: function (value: number) {
            return value + " accidents";
          }
        }
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [accidentData]);

  return (
    <div>
      <p className='text-l font-bold mt-8'>ACCIDENTS BY TIME OF DAY</p>
      <div ref={chartRef}></div>
    </div>
  );
};

export default AccidentTimings;
