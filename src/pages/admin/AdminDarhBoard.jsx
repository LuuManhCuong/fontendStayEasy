import React, { useState } from "react";
import "./admin.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Statistical from "../../components/adminComponents/Statistical";
import PostManage from "../../components/adminComponents/PostManage";
import BookingManage from "../../components/adminComponents/BookingManage";
import AccountManage from "../../components/adminComponents/AccountManage";
import Seting from "../../components/adminComponents/Seting";
import { Link } from "react-router-dom";
import ListProperty from "../../components/Property/ListProperty";

function AdminDarhBoard() {
  const sidebar = [
    { cate: "Thống kê", component: <Statistical></Statistical> },
    { cate: "Bài đăng", component: <PostManage></PostManage> },
    { cate: "Đặt phòng", component: <BookingManage></BookingManage> },
    { cate: "Tài khoản", component: <AccountManage></AccountManage> },
    { cate: "Cài đặt", component: <Seting></Seting> },
  ];

  const [isActive, setActive] = useState(sidebar[0]);
  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col xs={2}>
            <div className="sidebar">
              {sidebar.map((e, i) => (
                <Link to={e.link}>
                  <div
                    className={
                      isActive.cate === e.cate
                        ? "active sidebar-item"
                        : "sidebar-item"
                    }
                    key={i}
                    onClick={() => setActive(e)}
                  >
                    <h3>{e.cate} </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Col>
          <Col xs={10}>{isActive.component}</Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default AdminDarhBoard;
