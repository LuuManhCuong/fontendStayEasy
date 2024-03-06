import React from "react";
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);
const Revenue = () => {
  // Dữ liệu doanh thu của tháng này và tháng trước
  const revenueThisMonth = [
    1000, 1500, 2000, 2500, 1800, 1200, 1900, 2300, 2600, 2700, 2800, 300,
  ];
  const revenueLastMonth = [
    900, 1400, 1800, 2200, 1700, 2000, 1700, 2100, 2400, 2500, 2600, 2800,
  ];

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
        data: revenueThisMonth,
        borderColor: "red",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Last Month",
        data: revenueLastMonth,
        borderColor: "rgba(192,75,192,1)",
        backgroundColor: "rgba(192,75,192,0.4)",
      },
    ],
  };

  return (
    <>
      <h3>Biểu đồ doanh thu</h3>
      <Line data={data} />
    </>
  );
};

export default Revenue;
