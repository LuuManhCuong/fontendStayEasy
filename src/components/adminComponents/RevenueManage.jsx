import React from "react";
import RevenuePieChart from "../chart/RevenuePieChart";
import { Col, Row } from "react-bootstrap";
import LineChart from "../chart/LineChart";

function RevenueManage() {
  // Dữ liệu doanh thu của tháng này và tháng trước
  const revenueThisMonth = [
    1000, 1500, 2000, 2500, 1800, 1200, 1900, 2300, 2600, 2700, 2800, 300,
  ];
  const revenueLastMonth = [
    900, 1400, 1800, 2200, 1700, 2000, 1700, 2100, 2400, 2500, 2600, 2800,
  ];
  return (
    <Row>
      <Col xs={6}>
        <LineChart
          title={"Biểu đồ doanh thu tháng này"}
          dataThisMonth={revenueThisMonth}
          dataLastMonth={revenueLastMonth}
        ></LineChart>
      </Col>
      <Col xs={6}>
        <RevenuePieChart></RevenuePieChart>
      </Col>
    </Row>
  );
}

export default RevenueManage;
