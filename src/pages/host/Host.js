import React, { useState } from 'react'
import CommonHeader from '../../components/header/CommonHeader'
import Footer from '../../components/footer/Footer'
import { Link } from 'react-router-dom';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
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

  return (
    <>
        <CommonHeader padding={8}/>
        <div className='mt-[8.1rem] max-[769px]:mt-0'>
            <div className='flex'>
                <Card className="h-[calc(100vh-0)] w-full max-w-[24rem] py-4 px-2 shadow-xl shadow-blue-gray-900/5">
                    <List>
                        <Link to="/host">
                            <ListItem>
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-7 w-7 max-[1055px]:h-12  max-[1055px]:w-12" />
                                </ListItemPrefix>
                                <h4 className='max-[1055px]:hidden w-full'>Trang chủ</h4>
                            </ListItem>
                        </Link>
                        <ListItem>
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-7 w-7 max-[1055px]:h-12  max-[1055px]:w-12" />
                            </ListItemPrefix>
                            <h4 className='max-[1055px]:hidden'>Quản lý tài sản</h4>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <InboxIcon className="h-7 w-7 max-[1055px]:h-12  max-[1055px]:w-12" />
                            </ListItemPrefix>
                            <h4 className='max-[1055px]:hidden'>Tin nhắn và thông báo</h4>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-7 w-7 max-[1055px]:h-12  max-[1055px]:w-12" />
                            </ListItemPrefix>
                            <h4 className='max-[1055px]:hidden'>Thông tin cá nhân</h4>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-7 w-7 max-[1055px]:h-12  max-[1055px]:w-12" />
                            </ListItemPrefix>
                            <h4 className='max-[1055px]:hidden'>Cài đặt</h4>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-7 w-7 max-[1055px]:h-12  max-[1055px]:w-12" />
                            </ListItemPrefix>
                            <h4 className='max-[1055px]:hidden'>Đăng xuất</h4>
                        </ListItem>
                    </List>
                </Card>
                <div className='w-[100%] bg-gray-100 px-4'>
                    <DateRangePicker
                        onChange={item => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                    />
                    <div className='flex my-4 gap-4'>
                        <div className='flex flex-col gap-4'>
                            <Box className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                                <h2 className='m-4'>hello</h2>
                                <p className='text-[3rem] font-medium text-center'>23K </p>
                                <SparkLineChart
                                    data={[1, 2, 4, 8, 6]}
                                    showHighlight={true}
                                    showTooltip={true}
                                    width={250}
                                    height={100}
                                />
                            </Box>
                            <Box className="flex flex-col w-[24.5rem] h-[20rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                                <h2 className='m-4'>hello</h2>
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
                        <Box className="flex flex-col w-[63rem] h-[41.5rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                            <h2 className='m-4'>Yêu cầu</h2>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Summer BBQ"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            to Scott, Alex, Jennifer
                                        </Typography>
                                        {" — Wish I could come, but I'm out of town this…"}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary="Oui Oui"
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Sandra Adams
                                        </Typography>
                                        {' — Do you have Paris recommendations? Have you ever…'}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                </div>
                <div>
                    <Box className="flex flex-col h-[41.5rem] rounded-xl shadow-xl bg-white " sx={{ flexGrow: 4 }}>
                        <h2 className='m-4'>Yêu cầu</h2>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary="Summer BBQ"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {" — Wish I could come, but I'm out of town this…"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary="Oui Oui"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
