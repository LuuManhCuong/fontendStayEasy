import React, { useEffect, useState } from "react";
import "./common.scss";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import axios from "axios";

import Box from "@mui/material/Box";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { MdOutlineSsidChart } from "react-icons/md";
import { Card } from "./Statistical";

function Calendar({ propertyId }) {
  console.log("id: ", propertyId);
  const [data, setData] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);

  useEffect(() => {
    if (propertyId) {
      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/admin/booking?propertyId=${propertyId}`
        )
        .then(function (response) {
          console.log("data: ", response.data);

          const newState = response.data.map((booking, index) => ({
            startDate: new Date(booking.checkIn),
            endDate: new Date(booking.checkOut),
            key: `selection${index + 1}`,
            defaultDate: booking.checkIn + " " + booking.checkOut,
            autoFocus: false,
          }));
          // setState(newState);
          setData(newState);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/admin/statistics?propertyId=${propertyId}`
        )
        .then(function (response) {
          console.table(response.data);
          setThisMonth(response.data[0]);
          setLastMonth(response.data[1]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [propertyId]);

  let compareRevenue =
    ((thisMonth?.revenue - lastMonth?.revenue) / lastMonth?.revenue) * 100;
  let compareTotalBookings =
    ((thisMonth.totalBookings - lastMonth.totalBookings) /
      lastMonth.totalBookings) *
    100;
  let comparetoTalLike =
    ((thisMonth?.totalLike - lastMonth?.totalLike) / lastMonth?.totalLike) *
    100;

  let compareTotalCancelBookings =
    ((thisMonth?.totalCancelBookings - lastMonth?.totalCancelBookings) /
      lastMonth?.totalCancelBookings) *
    100;
  console.log("cp: ", compareRevenue || thisMonth?.revenue);
  // Chỉ render DateRangePicker khi state đã được khởi tạo
  return (
    <div className="rounded-lg w-full">
      <h1>Thống kê từ đầu tháng</h1>
      <div className="flex justify-between py-10">
        <Card
          title="Doanh thu ($)"
          condition={compareRevenue || 0}
          compare={compareRevenue.toFixed(2)}
          thisMonth={thisMonth?.revenue}
          lastMonth={lastMonth.revenue}
        />

        <Card
          title="Lượt đặt phòng"
          condition={compareTotalBookings || 0}
          compare={compareTotalBookings.toFixed(2)}
          thisMonth={thisMonth?.totalBookings}
          lastMonth={lastMonth.totalBookings}
        />
        <Card
          title="Lượt hủy phòng"
          condition={compareTotalCancelBookings || 0}
          compare={compareTotalCancelBookings.toFixed(2)}
          thisMonth={thisMonth?.totalCancelBooking}
          lastMonth={lastMonth.totalCancelBooking}
        />
        <Card
          title="Lượt yêu thích"
          condition={comparetoTalLike || 0}
          compare={comparetoTalLike.toFixed(2)}
          thisMonth={thisMonth?.totalLike}
          lastMonth={lastMonth.totalLike}
        />
      </div>

      <div className="w-full py-10">
      <h1>Lịch đặt phòng sắp tới</h1>
        <DateRangePicker
          onChange={(item) => setState([{ ...state, ...item }])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          onRangeFocusChange={(item) => item}
          months={2}
          ranges={data}
          minDate={new Date()} // Vô hiệu hóa ngày quá khứ
          direction="horizontal"
        />
      </div>
    </div>
  );
}

export default Calendar;


