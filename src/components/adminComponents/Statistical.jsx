import React from "react";
import { Col, Row } from "react-bootstrap";
import Revenue from "../chart/Revenue";
import BarChart from "../chart/BarChart";
import "./common.scss";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RevenuePieChart from "../chart/RevenuePieChart";
function Statistical() {
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

      <Row className="chart-body">
        <Col xs={6}>
          <Revenue></Revenue>
        </Col>
        <Col xs={6}>
          <RevenuePieChart></RevenuePieChart>
          <BarChart></BarChart>
        </Col>
      </Row>
    </div>
  );
}

export default Statistical;
