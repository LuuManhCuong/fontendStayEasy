import React, { useState } from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import Footer from '../../components/footer/Footer'
import { Link } from 'react-router-dom';

import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon } from "@heroicons/react/24/solid";

import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

export default function Host() {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
    ]);

    const sideBar = [
        {title: "Trang chủ", icon: <PresentationChartBarIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />, link: "/host"},
        {title: "Quản lý tài sản", icon: <ShoppingBagIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />, link: "/host/property-manager"},
        {title: "Tin nhắn và thông báo", icon: <InboxIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />, link: "/host/inbox"},
        {title: "Thông tin cá nhân", icon: <UserCircleIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />, link: "/host/profile"},
        {title: "Cài đặt", icon: <Cog6ToothIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />, link: "/host/setting"},
    ]

    const request = [
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: "Ali Connors"}
    ]

    const inbox = [
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"},
        {avatar: "/static/images/avatar/1.jpg", title: "Brunch this weekend?", name: "Ali Connors", content: " — I'll be in your neighborhood doing errands this…"}
    ]

  return (
    <>
        <CommonHeader padding={8}/>
        <div className='mt-[8.1rem] max-[769px]:mt-0 max-h-[calc(100vh-0)]'>
            <div className='flex'>
                {/* right menu */}
                <Card className="h-[calc(100vh-0)] w-full max-w-[24rem] py-4 px-2">
                    <List>
                        {sideBar.map((e, i) => {
                            return(
                                <Link to={e.link} key={i}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            {e.icon}
                                        </ListItemPrefix>
                                        <h4 className='max-[1270px]:hidden w-full'>{e.title}</h4>
                                    </ListItem>
                                </Link>
                            );
                        })}
                        <button onClick="">
                            <ListItem>
                                <ListItemPrefix>
                                    <PowerIcon color='#000' className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
                                </ListItemPrefix>
                                <h4 className='max-[1270px]:hidden w-full'>Đăng xuất</h4>
                            </ListItem>
                        </button>
                    </List>
                </Card>
                <div className='w-[100%] bg-gray-100 px-4'>
                    {/* date area */}
                    <DateRangePicker
                        onChange={item => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                        className='mt-4 rounded-xl'
                    />

                    {/* Chart area */}
                    <div className='flex my-4 gap-4'>
                        <div className='flex flex-col gap-4'>
                            {/* Chart 1 */}
                            <Box className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                                <h2 className='m-4'>Doanh thu</h2>
                                <p className='text-[3rem] font-medium text-center'>23K </p>
                                <SparkLineChart
                                    data={[1, 2, 4, 8, 6]}
                                    showHighlight={true}
                                    showTooltip={true}
                                    width={250}
                                    height={100}
                                />
                            </Box>

                            {/* Chart 2 */}
                            <Box className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                                <h2 className='m-4'>người thuê nhà</h2>
                                <p className='text-[3rem] font-medium text-center'>23K </p>
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
                        <Box className="flex flex-col max-w-[63rem] h-[41.5rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                            <h2 className='m-4'>Yêu cầu</h2>
                            {/* list request */}
                            <div className='w-[100%] h-full overflow-scroll'>
                                {request.map((e, i) => {
                                    return(
                                        <>
                                        <div className='flex justify-between items-center py-2 px-4 w-full'>
                                            {/* <img src={e.avatar} /> */}
                                            <div className='flex gap-3 py-2 w-full'>
                                                <div class="relative inline-flex items-center justify-center w-16 h-16  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                                                    <span class="font-medium text-3xl text-gray-200 dark:text-gray-300">
                                                        U
                                                    </span>
                                                </div>
                                                <div className='text-start'>
                                                    <h4>{e.title}</h4>
                                                    <p className='text-xl'><span className='font-medium'>{e.name}</span> {e.content}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                <button onClick="" className='hover:border hover:border-[#E31C5F] text-2xl rounded-lg p-2 w-[8rem]'>Xác nhận</button>
                                                <button onClick="" className='border border-[#E31C5F] text-2xl rounded-lg p-2 w-[8rem]'>Từ chối</button>
                                            </div>
                                        </div>
                                        <Divider variant="inset" />
                                        </>
                                    );
                                })}
                            </div>
                        </Box>
                    </div>
                </div>

                {/* inbox area */}
                <div className='h-[calc(100vh-0)] w-[100%] bg-gray-100 p-4'>
                    <Box className="max-w-[100%] h-[84.7rem] rounded-xl shadow-xl bg-white pt-2">
                        <h2 className='m-4'>Tin nhắn</h2>
                        {/* list inbox */}
                        <div className='w-[100%] h-[79rem] overflow-scroll'>
                            {inbox.map((e, i) => {
                                return(
                                    <>
                                    {/* sửa lại thành thẻ Link để xem chi tiết tin nhắn */}
                                    <button className='flex items-center gap-3 py-2 px-4 w-full'>
                                        {/* <img src={e.avatar} /> */}
                                        <div class="relative inline-flex items-center justify-center w-[5rem] h-[3.7rem] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                                            <span class="font-medium text-3xl text-gray-200 dark:text-gray-300">
                                                U
                                            </span>
                                        </div>
                                        <div className='text-start'>
                                            <h4>{e.title}</h4>
                                            <p className='text-xl'><span className='font-medium'>{e.name}</span> {e.content}</p>
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
        </div>
        <Footer />
    </>
  )
}
