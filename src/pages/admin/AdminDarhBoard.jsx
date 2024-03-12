import React, { useState } from "react";
import "./admin.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Statistical from "../../components/adminComponents/Statistical";
import PostManage from "../../components/adminComponents/PostManage";
import BookingManage from "../../components/adminComponents/BookingManage";
import AccountManage from "../../components/adminComponents/AccountManage";
import Seting from "../../components/adminComponents/Seting";
import { Link } from "react-router-dom";

import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";

function AdminDarhBoard() {
  const sidebar = [
    { cate: "Thống kê", component: <Statistical></Statistical> },
    // { cate: "Doanh thu", component: <RevenueManage></RevenueManage> },
    { cate: "Bài đăng", component: <PostManage></PostManage> },
    // { cate: "Đặt phòng", component: <BookingManage></BookingManage> },
    { cate: "Tài khoản", component: <AccountManage></AccountManage> },
    { cate: "Cài đặt", component: <Seting></Seting> },
  ];

  const [isActive, setActive] = useState(sidebar[0]);
  return (
    <>
      <Header></Header>
      <div className="flex h-full">
        {/* right menu */}
        <Card className="h-[calc(100vh-0)] w-full max-w-[24rem] py-4 px-2 shadow-xl shadow-blue-gray-900/5">
          <List>
            {sidebar.map((e, i) => {
              return (
                <Link to={e.link} onClick={() => setActive(e)}>
                  <ListItem>
                    <ListItemPrefix>{e.icon}</ListItemPrefix>
                    <h4 className="max-[1200px]:hidden w-full">{e.cate}</h4>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Card>
        <div className="w-full p-4 bg-gray-100">{isActive.component}</div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default AdminDarhBoard;
