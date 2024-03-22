import React, { useContext, useEffect, useState } from "react";
import CommonHeader from "../../components/header/CommonHeader";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";

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
import { UserContext } from "../UserContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch } from "react-redux";
import { Alert } from "../Alert/Alert";

export default function Statistic({ role }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const user = useContext(UserContext).user
  const request = [
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
    {
      avatar: "/static/images/avatar/1.jpg",
      title: "Brunch this weekend?",
      name: "Ali Connors",
      content: "Ali Connors",
    },
  ];
  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {

    const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
    const client = Stomp.over(socket);
    client.debug = null;
    client.connect({}, () => {
    });

    setStompClient(client);

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, []);
  function acceptRoom() {
    // id của chủ phòng - người gửi thông báo
    console.log(user.id);
    // id của khác- người nhận thông báo
    let fakeIDUser = '2A0A5BF4-8280-4BCC-A3E2-58512A661DF4'
    console.log(fakeIDUser);
    let data = {
      senderId: user?.id,
      receiverId: fakeIDUser,
      content: `${user.firstName} ${user.lastName} vừa chấp nhận lịch đặt phòng của bạn`
    }
    stompClient.send(
      `/api/v1/stayeasy/app/notification/${data.receiverId.toLowerCase()}`,
      {},
      JSON.stringify(data)
    );
  }
  function cancelRoom() {
    // id của chủ phòng - người gửi thông báo
    console.log(user.id);
    // id của khác- người nhận thông báo
    let fakeIDUser = '2A0A5BF4-8280-4BCC-A3E2-58512A661DF4'
    console.log(fakeIDUser);
    let data = {
      senderId: user?.id,
      receiverId: fakeIDUser,
      content: `${user.firstName} ${user.lastName} vừa từ chối lịch đặt phòng của bạn`
    }
    stompClient.send(
      `/api/v1/stayeasy/app/notification/${data.receiverId.toLowerCase()}`,
      {},
      JSON.stringify(data)
    );
  }

  const navigate = useNavigate();

  // method logout
  const dispatch = useDispatch();

  useEffect(()=>{
    if(role&&!role.includes("ROLE_HOST")){
      Alert(3000, 'Thông báo', 'Bạn không có quyền truy cập. Hãy thử đăng nhập tài khoản khác','error', 'OK');
      navigate("/");
    }
  },[role]);

  return (
    <div className="w-[100%] bg-gray-100 px-4">
      {/* date area */}
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        className="mt-4 rounded-xl"
      />

      {/* Chart area */}
      <div className="flex my-4 gap-4">
        <div className="flex flex-col gap-4">
          {/* Chart 1 */}
          <Box
            className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white "
            sx={{ flexGrow: 4 }}
          >
            <h2 className="m-4">Doanh thu</h2>
            <p className="text-[3rem] font-medium text-center">23K </p>
            <SparkLineChart
              data={[1, 2, 4, 8, 6]}
              showHighlight={true}
              showTooltip={true}
              width={250}
              height={100}
            />
          </Box>

          {/* Chart 2 */}
          <Box
            className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white "
            sx={{ flexGrow: 4 }}
          >
            <h2 className="m-4">người thuê nhà</h2>
            <p className="text-[3rem] font-medium text-center">23K </p>
            <SparkLineChart
              data={[1, 2, 4, 8, 6]}
              showHighlight={true}
              showTooltip={true}
              width={250}
              height={100}
            />
          </Box>
        </div>

        {/* request area */}
        <Box
          className="flex flex-col max-w-[63rem] h-[41.5rem] rounded-xl shadow-xl bg-white "
          sx={{ flexGrow: 4 }}
        >
          <h2 className="m-4">Yêu cầu</h2>
          {/* list request */}
          <div className="w-[100%] h-full overflow-scroll">
            {request.map((e, i) => {
              return (
                <>
                  <button className="flex gap-3 py-2 px-4 w-full">
                    {/* <img src={e.avatar} /> */}
                    <div class="relative inline-flex items-center justify-center w-16 h-16  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
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
                    <div className='flex gap-2'>
                      <button onClick={acceptRoom} className='hover:border hover:border-[#E31C5F] text-2xl rounded-lg p-2 w-[8rem]'>Xác nhận</button>
                      <button onClick={cancelRoom} className='border border-[#E31C5F] text-2xl rounded-lg p-2 w-[8rem]'>Từ chối</button>
                    </div>
                  </button>
                  <Divider variant="inset" />
                </>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
}
