import React from "react";
import { Col, Row } from "react-bootstrap";
import Revenue from "../chart/Revenue";
import BarChart from "../chart/BarChart";
import "./common.scss";
function Statistical() {
  return (
    <div className="statistical">
      <Row>
        <Col xs={3}>
          <div className="broad">
            <h2>Doanh thu</h2>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Tài Khoản</h2>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Đặt phòng</h2>
          </div>
        </Col>
        <Col xs={3}>
          <div className="broad">
            <h2>Bài viết</h2>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <Revenue></Revenue>
        </Col>
        <Col xs={6}>
          <BarChart></BarChart>
        </Col>
      </Row>
    </div>
  );
}

export default Statistical;
