import React from "react";
import { Col, Row } from "react-bootstrap";
import BarChart from "../chart/BarChart";
import "./common.scss";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import LineChart from "../chart/LineChart";

function Statistical() {
  // Dữ liệu doanh thu của tháng này và tháng trước
  const revenueThisMonth = [
    1000, 1500, 2000, 2500, 1800, 1200, 1900, 2300, 2600, 2700, 2800, 300,
  ];
  const revenueLastMonth = [
    900, 1400, 1800, 2200, 1700, 2000, 1700, 2100, 2400, 2500, 2600, 2800,
  ];

  const dataLabelOne = {
    label: "Room Bookings",
    data: [65, 59, 80, 81, 56, 55, 40],
  };
  const dataLabelTwo = {
    label: "Cancel Bookings",
    data: [6, 5, 0, 1, 5, 5, 4],
  };
  const amountPostThisMonth = {
    label: "Posts This Month",
    data: [6, 5, 0, 1, 5, 12, 4],
  };
  const amountPostLastMonth = {
    label: "Posts Last Month",
    data: [3, 6, 1, 10, 2, 6, 4],
  };

  return (
    <div className="statistical">
      <Row className="statistical-broad">
        <Col xs={3}>
          <div className="broad">
            <h2>Doanh thu</h2>
            <h1>
              1340$ <AutoGraphIcon></AutoGraphIcon>
            </h1>
            <p>Tăng 12% so với tháng trước</p>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Tài Khoản</h2>
            <h1>
              4653 <AutoGraphIcon></AutoGraphIcon>
            </h1>
            <p>Tăng 10% so với tháng trước</p>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Lượt đặt phòng</h2>
            <h1>
              156 <TrendingDownIcon></TrendingDownIcon>
            </h1>
            <p>Giảm 2% so với tháng trước</p>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Bài viết</h2>
            <h1>
              356 <TrendingDownIcon></TrendingDownIcon>
            </h1>
            <p>Giảm 5% so với tháng trước</p>
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
              title={"Biểu đồ số lượng đặt phòng"}
              dataLabelOne={dataLabelOne}
              dataLabelTwo={dataLabelTwo}
            ></BarChart>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <LineChart
              title={"Biểu đồ lưu lượng truy cập website"}
              dataThisMonth={revenueThisMonth}
              dataLastMonth={revenueLastMonth}
            ></LineChart>
          </Col>
          <Col xs={6}>
            <BarChart
              title={"Biểu đồ số lượng bài đăng"}
              dataLabelOne={amountPostThisMonth}
              dataLabelTwo={amountPostLastMonth}
            ></BarChart>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Statistical;
