import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
// import { BarChart } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

export const BarChart = ({ chartData }) => {
  // ChartJS.register(
  //   Bar,
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Legend
  // )
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Words Read by Class"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
};