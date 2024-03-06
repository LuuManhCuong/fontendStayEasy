import React from "react";
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);
const LineChart = ({ title, dataThisMonth, dataLastMonth }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "This Month",
        data: dataThisMonth,
        borderColor: "red",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Last Month",
        data: dataLastMonth,
        borderColor: "rgba(192,75,192,1)",
        backgroundColor: "rgba(192,75,192,0.4)",
      },
    ],
  };

  return (
    <>
      <h3>{title}</h3>
      <Line data={data} />
    </>
  );
};

export default LineChart;
