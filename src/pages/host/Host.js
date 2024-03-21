import React, { useState } from "react";
import CommonHeader from "../../components/header/CommonHeader";
import Footer from "../../components/footer/Footer";
import { Link, Outlet } from "react-router-dom";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function Host() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const sideBar = [
    {
      title: "Trang chủ",
      icon: (
        <PresentationChartBarIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/host/property/statistic",
    },
    {
      title: "Quản lý tài sản",
      icon: (
        <ShoppingBagIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/host/property/list",
    },
    {
      title: "Tin nhắn và thông báo",
      icon: (
        <InboxIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/host/inbox",
    },
    {
      title: "Thông tin cá nhân",
      icon: (
        <UserCircleIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/host/profile",
    },
    {
      title: "Cài đặt",
      icon: (
        <Cog6ToothIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/host/setting",
    },
  ];

  
  const inbox = [
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: " — I'll be in your neighborhood doing errands this…",
    },
  ];

  return (
    <>
      <CommonHeader padding={8} />
      <div className="mt-[8.1rem] bg-gray-100 max-[769px]:mt-0 max-h-[calc(100vh-0)] flex">
        {/* <div className='flex w-[100vw]'> */}
        {/* left menu */}
        <Card className="h-[81vh] shadow-none fixed rounded-none max-w-[15vw] w-full py-4 px-2 border-r-2">
          <List>
            {sideBar.map((e, i) => {
              return (
                <Link to={e.link} key={i}>
                  <ListItem>
                    <ListItemPrefix>{e.icon}</ListItemPrefix>
                    <h4 className="max-[1270px]:hidden w-full">{e.title}</h4>
                  </ListItem>
                </Link>
              );
            })}
            <button onClick="">
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon
                    color="#000"
                    className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12"
                  />
                </ListItemPrefix>
                <h4 className="max-[1270px]:hidden w-full">Đăng xuất</h4>
              </ListItem>
            </button>
          </List>
        </Card>

        <div className="px-2 w-[65vw] ml-[15vw] mb-32">
          <Outlet />
        </div>

        {/* inbox area */}
        <div className="w-[20vw] py-4">
          <Box className="max-w-[100%] rounded-xl h-[60vh] bg-white pt-2">
            <h2 className="m-4">Tin nhắn</h2>
            {/* list inbox */}
            <div className="w-[100%] h-[51vh] z-10 overflow-scroll">
              {inbox.map((e, i) => {
                return (
                  <>
                    {/* sửa lại thành thẻ Link để xem chi tiết tin nhắn */}
                    <button className="flex items-center gap-3 py-2 px-4 w-full">
                      {/* <img src={e.avatar} /> */}
                      <div class="relative inline-flex items-center justify-center w-[5rem] h-[3.7rem] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                        <span class="font-medium text-3xl text-gray-200 dark:text-gray-300">
                          U
                        </span>
                      </div>
                      <div className="text-start">
                        <h4>{e.title}</h4>
                        <p className="text-xl">
                          <span className="font-medium">{e.name}</span>{" "}
                          {e.content}
                        </p>
                      </div>
                    </button>
                    <Divider variant="inset" />
                  </>
                );
              })}
            </div>
          </Box>
        </div>
        {/* </div> */}
      </div>
      <div className="fixed bg-white w-full" style={{bottom: 0}}><Footer/></div>
    </>
  );
}