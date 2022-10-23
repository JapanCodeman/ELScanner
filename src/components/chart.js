import { Bar } from "react-chartjs-2";

export const BarChart = ({ classInfo }) => {
  return (
    <div>
      <Bar
        data={classInfo}
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