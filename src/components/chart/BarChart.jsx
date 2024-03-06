import React from "react";
import { Line, Chart, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Room Bookings",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },

      {
        label: "Cancel Bookings",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "red",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "red",
        data: [6, 5, 0, 1, 5, 5, 4],
      },
    ],
  };

  return (
    <div>
      <h3>Số lượng đặt phòng</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;