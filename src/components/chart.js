import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

export const BarChart = ({ chartData }) => {
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
              display: false,
              position: "bottom"
           }
          }
        }}
      />
    </div>
  );
};