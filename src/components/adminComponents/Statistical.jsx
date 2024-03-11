import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BarChart from "../chart/BarChart";
import "./common.scss";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import LineChart from "../chart/LineChart";
import axios from "axios";
import RevenuePieChart from "../chart/RevenuePieChart";
import RevenueManage from "./RevenueManage";
function Statistical() {
  // Dữ liệu doanh thu của tháng này và tháng trước ({lastMonth.revenue})
  // const revenueThisMonth = [
  //   1000, 1500, 2000, 2500, 1800, 1200, 1900, 2300, 2600, 2700, 2800, 300,
  // ];
  // const revenueLastMonth = [
  //   9, 1, 0, 2200, 1700, 2000, 1700, 2100, 2400, 2500, 2600, 2800,
  // ];
  const [revenueThisMonth, setRevenueThisMonth] = useState([]);
  const [revenueLastMonth, setRevenueLastMonth] = useState([]);
  const [statisticsMonthly, setStatisticsMonthly] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);
  const [dataCancelBooking, setDataCancelBooking] = useState([]);

  const countBooking = {
    label: "Room Bookings",
    data: dataBooking,
  };
  const countCancelBooking = {
    label: "Cancel Bookings",
    data: dataCancelBooking,
  };
  const amountPostThisMonth = {
    label: "Posts This Month",
    data: [6, 5, 0, 1, 5, 12, 4],
  };
  const amountPostLastMonth = {
    label: "Posts Last Month",
    data: [3, 6, 1, 10, 2, 6, 4],
  };

  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);

  // console.log("thisMonth: ", thisMonth);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/revenue`)
      .then(function (response) {
        // console.log("data: ", response.data);
        setThisMonth(response.data[0]);
        setLastMonth(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let compareRevenue =
    ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100;
  let compareTotalAccount =
    ((thisMonth.totalAccount - lastMonth.totalAccount) /
      lastMonth.totalAccount) *
    100;
  let compareTotalPost =
    ((thisMonth.totalPost - lastMonth.totalPost) / lastMonth.totalPost) * 100;
  let compareTotalBookings =
    ((thisMonth.totalBookings - lastMonth.totalBookings) /
      lastMonth.totalBookings) *
    100;

  // console.log("revenue daily: ", revenueDaily);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/admin/revenue/daily?date=2024-03-1`
      )
      .then(function (response) {
        // console.log("data: ", response.data);
        // Lấy ngày đầu tiên của tháng hiện tại
        const startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        const currentDate = new Date();
        const day = currentDate.getDate();
        // Tạo mảng mới để lưu trữ doanh thu của mỗi ngày trong tháng
        let revenueThisMonth = Array.from({ length: day }).fill(0);
        let revenueLastMonth = Array.from({ length: 31 }).fill(0);

        // Lặp qua mỗi phần tử trong dữ liệu trả về và gán doanh thu vào mảng mới
        response.data.currentMonthRevenue.forEach((item) => {
          // Lấy ngày từ chuỗi ngày trả về từ máy chủ
          const day = new Date(item.date).getDate();
          // Tính toán vị trí của ngày trong mảng mới
          const index = day - 1; // Giảm đi 1 để bắt đầu từ 0
          // Gán doanh thu vào vị trí tương ứng trong mảng mới
          revenueThisMonth[index] = item.revenue;
        });
        setRevenueThisMonth(revenueThisMonth);

        response.data.previousMonthRevenue.forEach((item) => {
          const day = new Date(item.date).getDate();
          const index = day - 1;
          revenueLastMonth[index] = item.revenue;
        });
        setRevenueLastMonth(revenueLastMonth);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/booking/daily`)
      .then(function (response) {
        console.log("data booking daily: ", response.data);
        const currentDate = new Date();
        const day = currentDate.getDate();
        // Tạo mảng mới để lưu trữ số booking của mỗi ngày trong tháng
        let bookingThisMonth = Array.from({ length: day }).fill(0);
        // Lưu dữ liệu số lượng đặt phòng của tháng hiện tại
        response.data.map((item) => {
          const day = new Date(item[0]).getDate();
          // console.log("day: ", day);
          const index = day - 1;
          bookingThisMonth[index] = item[1];
        });
        setDataBooking(bookingThisMonth);

        // Tạo mảng mới để lưu trữ số cancel booking của mỗi ngày trong tháng
        let cancelBookingThisMonth = Array.from({ length: day }).fill(0);
        // Lưu dữ liệu số lượng đặt phòng của tháng hiện tại
        response.data.map((item) => {
          const day = new Date(item[0]).getDate();
          // console.log("day: ", day);
          const index = day - 1;
          cancelBookingThisMonth[index] = item[2];
        });
        setDataCancelBooking(cancelBookingThisMonth);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/statistics/monthly`)
      .then(function (response) {
        console.log("data monthly: ", response.data);
        setStatisticsMonthly(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // console.log("cancel booking: ", dataCancelBooking);
  return (
    <div className="statistical">
      <Row className="statistical-broad">
        <h1>
          Thống kê được tính từ đầu tháng cho đến ngày hôm nay {thisMonth.date}
        </h1>
        <Col xs={3}>
          <div className="broad">
            <h2>Doanh thu</h2>
            <h1>
              {thisMonth.revenue}$
              {compareRevenue > 0 ? (
                <>
                  <AutoGraphIcon
                    style={{ color: "#0de10d", fontSize: "3rem" }}
                  ></AutoGraphIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Tăng {compareRevenue.toFixed(2)}% so với tháng trước (
                    {lastMonth.revenue})
                  </p>
                </>
              ) : (
                <>
                  <TrendingDownIcon
                    style={{ fontSize: "3rem", color: "black" }}
                  ></TrendingDownIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Giảm {Math.abs(compareRevenue.toFixed(2))}% so với tháng
                    trước ({lastMonth.revenue})
                  </p>
                </>
              )}
            </h1>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Lượt đăng ký tài khoản</h2>
            <h1>
              {thisMonth.totalAccount}
              {compareTotalAccount > 0 ? (
                <>
                  <AutoGraphIcon
                    style={{ color: "#0de10d", fontSize: "3rem" }}
                  ></AutoGraphIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Tăng {compareTotalAccount.toFixed(2)}% so với tháng trước (
                    {lastMonth.totalAccount})
                  </p>
                </>
              ) : (
                <>
                  <TrendingDownIcon
                    style={{ fontSize: "3rem", color: "black" }}
                  ></TrendingDownIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Giảm {Math.abs(compareTotalAccount.toFixed(2))}% so với
                    tháng trước ({lastMonth.totalAccount})
                  </p>
                </>
              )}
            </h1>
          </div>
        </Col>

        <Col xs={3}>
          <div className="broad">
            <h2>Bài đăng mới</h2>
            <h1>
              {thisMonth.totalPost}{" "}
              {compareTotalPost > 0 ? (
                <>
                  <AutoGraphIcon
                    style={{ color: "#0de10d", fontSize: "3rem" }}
                  ></AutoGraphIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Tăng {compareTotalPost.toFixed(2)}% so với tháng trước (
                    {lastMonth.totalPost})
                  </p>
                </>
              ) : (
                <>
                  <TrendingDownIcon
                    style={{ fontSize: "3rem", color: "black" }}
                  ></TrendingDownIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Giảm {Math.abs(compareTotalPost.toFixed(2))}% so với tháng
                    trước ({lastMonth.totalPost})
                  </p>
                </>
              )}
            </h1>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Lượt đặt phòng</h2>
            <h1>
              {thisMonth.totalBookings}{" "}
              {compareTotalBookings > 0 ? (
                <>
                  <AutoGraphIcon
                    style={{ color: "#0de10d", fontSize: "3rem" }}
                  ></AutoGraphIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Tăng {compareTotalBookings.toFixed(2)}% so với tháng trước (
                    {lastMonth.totalBookings})
                  </p>
                </>
              ) : (
                <>
                  <TrendingDownIcon
                    style={{ fontSize: "3rem", color: "black" }}
                  ></TrendingDownIcon>
                  <p style={{ fontSize: "1.4rem" }}>
                    Giảm {Math.abs(compareTotalBookings.toFixed(2))}% so với
                    tháng trước ({lastMonth.totalBookings})
                  </p>
                </>
              )}
            </h1>
          </div>
        </Col>
      </Row>

      <div className="chart-body">
        <Row>
          <Col xs={6}>
            <LineChart
              title={"Biểu đồ doanh thu tháng này"}
              dataThisMonth={revenueThisMonth}
              dataLastMonth={revenueLastMonth}
            ></LineChart>
          </Col>

          <Col xs={6}>
            <BarChart
              title={"Biểu đồ số lượt đặt phòng tháng này"}
              dataLabelOne={countBooking}
              dataLabelTwo={countCancelBooking}
            ></BarChart>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RevenueManage data={statisticsMonthly}></RevenueManage>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Statistical;
