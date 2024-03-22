import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Dropdown, DropdownButton, DropdownToggle } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  counterSelector,
  keySearchSelector,
} from "../../redux-tookit/selector";
import { keySearchSlice } from "../../redux-tookit/reducer/keySearchSlice";
import Authenticate from "../auth/Authenticate";
import Authenticated from "../auth/Authenticated";
import "./header.scss";
import { dataHomeSlice } from "../../redux-tookit/reducer/dataHomeSlice";
import { UserContext } from "../UserContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function formatDateToYYMMDD(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

function Header({ page }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keySearch } = useSelector(keySearchSelector);
  const today = new Date();

  const [checkin, setCheckin] = React.useState(new Date());
  let timeStamp = today.getTime() + 86400000;
  const [checkout, setCheckout] = React.useState(new Date(timeStamp));
  const [showHistory, setShowHistory] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState("Tìm kiếm...");
  const [suggest, setSuggest] = useState("");
  const [address, setAddress] = useState("");
  const [stompClient, setStompClient] = useState(null);

  function handleSearchHome() {
    setShowHistory(false);
    const formattedCheckin = formatDateToYYMMDD(new Date(checkin));
    const formattedCheckout = formatDateToYYMMDD(new Date(checkout));
    if (address?.length > 0) {
      navigate("/search/result");
      dispatch(keySearchSlice.actions.setPageSearch(page));
      dispatch(keySearchSlice.actions.setAdderss(address));
      dispatch(keySearchSlice.actions.setCheckinDate(formattedCheckin));
      dispatch(keySearchSlice.actions.setCheckoutDate(formattedCheckout));
    }
  }

  const counter = useSelector(counterSelector);

  //check login and get user from userContext
  const isAuthenticated = useContext(UserContext).isAuthenticated;
  const user = useContext(UserContext).user;

  React.useEffect(() => {
    setCheckout(new Date(checkin.getTime() + 86400000));
  }, [checkin]);

  React.useEffect(() => {
    if (keySearch?.length === 0) {
      setShowHistory(false);
    }
  }, [keySearch]);

  React.useEffect(() => {
    if (address?.length === 0) {
      setShowHistory(false);
    }
  }, [address]);

  // suggest explore
  React.useEffect(() => {
    if (page === "explore") {
      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/explore/search/suggest?keySearch=${keySearch}`
        )
        .then(function (response) {
          setSuggest(response.data);
        })
        .catch(function (error) { });
    } else if (page === "home") {
      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/property/search/suggest?address=${address}`
        )
        .then(function (response) {
          setSuggest([...new Set(response.data.map((e) => e.address))]);
          // console.log("Data suggest: ", [
          //   ...new Set(response.data.map((e) => e.address)),
          // ]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [keySearch, page, address]);

  function handleSearch(page) {
    setShowHistory(false);
    if (keySearch.length > 0) {
      navigate("/search/result");
      dispatch(keySearchSlice.actions.setKeySearch(keySearch));
      dispatch(keySearchSlice.actions.setPageSearch(page));
    } else {
      setPlaceholder("Nhập từ khóa tìm kiếm!!!");
    }
  }
  const [notificationList, setNotificationList] = useState([])
  useEffect(() => {
    if(user){

      fetch(`http://localhost:8080/api/v1/stayeasy/notification/user/get`, {
        headers: {
          "Authorization": `BEARER ${localStorage.getItem('access_token')}`,
        }
      })
        .then(data => data.json())
        .then(data => {
          setNotificationList(data)
        })
    }

  }, [user])


  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
    const client = Stomp.over(socket);
    client.debug = null;
    if (user) {
      client.connect({}, () => {
        if (client.connected) {
          client.subscribe(`/api/v1/stayeasy/notification/${user.id}`, (notification) => {
            const receivedNotification = JSON.parse(notification.body);
            console.log(receivedNotification);
            setNotificationList((prevNotifications) => [...prevNotifications, receivedNotification]);
          });
        }
      });
    }

    setStompClient(client);

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };


  }, [user]);
  return (
    <header className="header">
      <div className="cate z-[1000] flex w-[100%] px-[6.2rem] top-0 items-center bg-white max-[320px]:px-10 justify-between">
        <div className="w-[33%] max-[1204px]:w-[20%]">
          <a href="/">
            <svg width="102" height="32" color="#FF385C">
              <path
                d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                fill="currentcolor"
              ></path>
              <path
                d="M41.6847 24.1196C40.8856 24.1196 40.1505 23.9594 39.4792 23.6391C38.808 23.3188 38.2327 22.8703 37.7212 22.2937C37.2098 21.7172 36.8263 21.0445 36.5386 20.3078C36.2509 19.539 36.123 18.7062 36.123 17.8093C36.123 16.9124 36.2829 16.0475 36.5705 15.2787C36.8582 14.51 37.2737 13.8373 37.7852 13.2287C38.2966 12.6521 38.9039 12.1716 39.6071 11.8513C40.3103 11.531 41.0455 11.3708 41.8765 11.3708C42.6756 11.3708 43.3788 11.531 44.0181 11.8833C44.6574 12.2037 45.1688 12.6841 45.5843 13.2927L45.6802 11.7232H48.6209V23.7992H45.6802L45.5843 22.0375C45.1688 22.6781 44.6254 23.1906 43.9222 23.575C43.2829 23.9274 42.5158 24.1196 41.6847 24.1196ZM42.4519 21.2367C43.0272 21.2367 43.5386 21.0765 44.0181 20.7882C44.4656 20.4679 44.8172 20.0515 45.1049 19.539C45.3606 19.0265 45.4884 18.4179 45.4884 17.7452C45.4884 17.0725 45.3606 16.4639 45.1049 15.9514C44.8492 15.4389 44.4656 15.0225 44.0181 14.7022C43.5706 14.3818 43.0272 14.2537 42.4519 14.2537C41.8765 14.2537 41.3651 14.4139 40.8856 14.7022C40.4382 15.0225 40.0866 15.4389 39.7989 15.9514C39.5432 16.4639 39.4153 17.0725 39.4153 17.7452C39.4153 18.4179 39.5432 19.0265 39.7989 19.539C40.0546 20.0515 40.4382 20.4679 40.8856 20.7882C41.3651 21.0765 41.8765 21.2367 42.4519 21.2367ZM53.6392 8.4559C53.6392 8.80825 53.5753 9.12858 53.4154 9.38483C53.2556 9.64109 53.0319 9.86531 52.7442 10.0255C52.4565 10.1856 52.1369 10.2497 51.8173 10.2497C51.4976 10.2497 51.178 10.1856 50.8903 10.0255C50.6026 9.86531 50.3789 9.64109 50.2191 9.38483C50.0592 9.09654 49.9953 8.80825 49.9953 8.4559C49.9953 8.10355 50.0592 7.78323 50.2191 7.52697C50.3789 7.23868 50.6026 7.04649 50.8903 6.88633C51.178 6.72617 51.4976 6.66211 51.8173 6.66211C52.1369 6.66211 52.4565 6.72617 52.7442 6.88633C53.0319 7.04649 53.2556 7.27072 53.4154 7.52697C53.5433 7.78323 53.6392 8.07152 53.6392 8.4559ZM50.2191 23.7672V11.6911H53.4154V23.7672H50.2191V23.7672ZM61.9498 14.8623V14.8943C61.79 14.8303 61.5982 14.7982 61.4383 14.7662C61.2466 14.7342 61.0867 14.7342 60.895 14.7342C60 14.7342 59.3287 14.9904 58.8812 15.535C58.4018 16.0795 58.178 16.8483 58.178 17.8413V23.7672H54.9817V11.6911H57.9223L58.0182 13.517C58.3379 12.8763 58.7214 12.3958 59.2648 12.0435C59.7762 11.6911 60.3835 11.531 61.0867 11.531C61.3105 11.531 61.5342 11.563 61.726 11.595C61.8219 11.6271 61.8858 11.6271 61.9498 11.6591V14.8623ZM63.2283 23.7672V6.72617H66.4247V13.2287C66.8722 12.6521 67.3836 12.2036 68.0229 11.8513C68.6622 11.531 69.3654 11.3388 70.1645 11.3388C70.9635 11.3388 71.6987 11.4989 72.3699 11.8193C73.0412 12.1396 73.6165 12.588 74.128 13.1646C74.6394 13.7412 75.0229 14.4139 75.3106 15.1506C75.5983 15.9194 75.7261 16.7522 75.7261 17.6491C75.7261 18.546 75.5663 19.4109 75.2787 20.1796C74.991 20.9484 74.5755 21.6211 74.064 22.2297C73.5526 22.8063 72.9453 23.2867 72.2421 23.6071C71.5389 23.9274 70.8037 24.0875 69.9727 24.0875C69.1736 24.0875 68.4704 23.9274 67.8311 23.575C67.1918 23.2547 66.6804 22.7742 66.2649 22.1656L66.169 23.7352L63.2283 23.7672ZM69.3973 21.2367C69.9727 21.2367 70.4841 21.0765 70.9635 20.7882C71.411 20.4679 71.7626 20.0515 72.0503 19.539C72.306 19.0265 72.4339 18.4179 72.4339 17.7452C72.4339 17.0725 72.306 16.4639 72.0503 15.9514C71.7626 15.4389 71.411 15.0225 70.9635 14.7022C70.5161 14.3818 69.9727 14.2537 69.3973 14.2537C68.822 14.2537 68.3106 14.4139 67.8311 14.7022C67.3836 15.0225 67.032 15.4389 66.7443 15.9514C66.4886 16.4639 66.3608 17.0725 66.3608 17.7452C66.3608 18.4179 66.4886 19.0265 66.7443 19.539C67 20.0515 67.3836 20.4679 67.8311 20.7882C68.3106 21.0765 68.822 21.2367 69.3973 21.2367ZM76.9408 23.7672V11.6911H79.8814L79.9773 13.2607C80.3289 12.6841 80.8084 12.2357 81.4157 11.8833C82.023 11.531 82.7262 11.3708 83.5253 11.3708C84.4203 11.3708 85.1874 11.595 85.8267 12.0115C86.4979 12.4279 87.0094 13.0365 87.361 13.8053C87.7126 14.574 87.9043 15.5029 87.9043 16.56V23.7992H84.708V16.9764C84.708 16.1436 84.5162 15.4709 84.1326 14.9904C83.7491 14.51 83.2376 14.2537 82.5664 14.2537C82.0869 14.2537 81.6714 14.3498 81.2878 14.574C80.9362 14.7982 80.6486 15.0865 80.4248 15.503C80.2011 15.8873 80.1052 16.3678 80.1052 16.8483V23.7672H76.9408V23.7672ZM89.5025 23.7672V6.72617H92.6989V13.2287C93.1464 12.6521 93.6578 12.2036 94.2971 11.8513C94.9364 11.531 95.6396 11.3388 96.4387 11.3388C97.2378 11.3388 97.9729 11.4989 98.6442 11.8193C99.3154 12.1396 99.8907 12.588 100.402 13.1646C100.914 13.7412 101.297 14.4139 101.585 15.1506C101.873 15.9194 102 16.7522 102 17.6491C102 18.546 101.841 19.4109 101.553 20.1796C101.265 20.9484 100.85 21.6211 100.338 22.2297C99.8268 22.8063 99.2195 23.2867 98.5163 23.6071C97.8131 23.9274 97.0779 24.0875 96.2469 24.0875C95.4478 24.0875 94.7446 23.9274 94.1053 23.575C93.466 23.2547 92.9546 22.7742 92.5391 22.1656L92.4432 23.7352L89.5025 23.7672ZM95.7035 21.2367C96.2788 21.2367 96.7903 21.0765 97.2697 20.7882C97.7172 20.4679 98.0688 20.0515 98.3565 19.539C98.6122 19.0265 98.7401 18.4179 98.7401 17.7452C98.7401 17.0725 98.6122 16.4639 98.3565 15.9514C98.1008 15.4389 97.7172 15.0225 97.2697 14.7022C96.8222 14.3818 96.2788 14.2537 95.7035 14.2537C95.1281 14.2537 94.6167 14.4139 94.1373 14.7022C93.6898 15.0225 93.3382 15.4389 93.0505 15.9514C92.7628 16.4639 92.6669 17.0725 92.6669 17.7452C92.6669 18.4179 92.7948 19.0265 93.0505 19.539C93.3062 20.0515 93.6898 20.4679 94.1373 20.7882C94.6167 21.0765 95.0962 21.2367 95.7035 21.2367Z"
                fill="currentcolor"
              ></path>
            </svg>
          </a>
        </div>
        <div className="flex justify-center w-[33%] max-[1204px]:w-[55%] min-[768px]:flex max-[768px]:hidden gap-5 text-[1.7rem]">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "font-medium nav-item" : "nav-item"
            }
          >
            Chỗ ở
          </NavLink>
          <NavLink
            to="/experience"
            className={(navData) =>
              navData.isActive ? "font-medium nav-item" : "nav-item"
            }
          >
            Trải nghiệm
          </NavLink>
          <NavLink
            to="/explore"
            className={(navData) =>
              navData.isActive ? "font-medium nav-item" : "nav-item"
            }
          >
            Khám phá
          </NavLink>
        </div>

        <div className="justify-end items-center w-[33%] max-[1204px]:w-[20%] gap-2 font-medium text-2xl flex">
          <NavLink
            to="/host/register"
            className={(navData) =>
              navData.isActive
                ? "active hover:bg-gray-100 p-3 rounded-2xl text-[1.5rem]"
                : "hover:bg-gray-100 p-3 rounded-full text-[1.5rem]"
            }
          >
            Cho thuê chỗ ở qua Stayeasy
          </NavLink>
          <button
            className="hover:bg-gray-100 p-3 mt-1 rounded-[100%]"
            onClick={() => { }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              className="block h-7 w-7"
            >
              <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z"></path>
            </svg>
          </button>
          {/* Thông Báo */}
          {
            isAuthenticated ?
              <div className="flex mr-4">
                <Dropdown>
                  <DropdownToggle
                    bsPrefix="false"
                    className="bg-transparent border-white p-2"
                    id="dropdown-basic"
                  >
                    <div className="flex justify-center items-center gap-3 px-[0.6rem] py-2 bg-transparent border border-transparent rounded-full hover:shadow-md">
                      <i style={{ color: 'black', fontSize: '17px' }} className="fa-regular fa-bell"></i> <Badge bg="secondary">{notificationList.length > 99 ? '99+' : notificationList.length}</Badge>
                    </div>
                  </DropdownToggle>
                  <Dropdown.Menu style={{ height: '300px', width: '200px', overflowY: 'scroll' }}>
                    {
                      notificationList <= 0 ? <p>Hiện chưa có thông báo nào</p> :
                        [...notificationList].reverse().map(e => (
                          <Dropdown.Item href="#" key={e.id}>
                            <p>{e.content}</p>
                          </Dropdown.Item>
                        ))
                    }

                  </Dropdown.Menu>
                </Dropdown>
              </div> :
              <></>

          }
          {/* Menu */}
          <div className="flex mr-4">
            <Dropdown>
              <DropdownToggle
                bsPrefix="false"
                className="bg-transparent border-white p-0"
                id="dropdown-basic"
              >
                <div className="flex justify-center items-center gap-3 px-[0.6rem] py-2 bg-transparent border border-transparent rounded-full hover:shadow-md">
                  <svg className="ml-3 h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                  {/* <p style={{ margin:"0", color:"black", fontSize:"1.6rem", fontWeight:"500"}}>{user?.lastName || ""}</p> */}
                  {user && user?.avatar ? (
                    <img className="w-[3.3rem] h-[3.3rem] rounded-full" alt="avatar" src={user?.avatar} />
                  ) : user && !user?.avatar ? (
                    <div class="relative inline-flex items-center justify-center w-[3.3rem] h-[3.3rem] overflow-hidden bg-black rounded-full dark:bg-gray-600">
                      <span class="font-medium text-2xl text-white dark:text-gray-300">
                        {user?.lastName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      className="block, h-[3.3rem] w-[3.3rem]"
                    >
                      <path
                        fill="gray"
                        d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"
                      ></path>
                    </svg>
                  )}
                </div>
              </DropdownToggle>
              {isAuthenticated ? <Authenticated /> : <Authenticate />}
            </Dropdown>
          </div>
        </div>
      </div>

      {page === "home" ? (
        <div className="relative search-wrap shadow-md z-100">
          <div className="search-address">
            <label className="text-[1.4rem]" htmlFor="keySearch">
              Địa điểm
            </label>
            <input
              type="text"
              className="search-text text-[1.4rem]"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setShowHistory(true);
              }}
              id="keySerch"
              name="keySearch"
              placeholder="Tìm kiếm địa điểm..."
            ></input>
            {showHistory & (suggest?.length > 0) ? (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Gợi ý</h2>

                <ul className="suggest">
                  {suggest.map((e, i) => (
                    <h3
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAddress(e);
                        setShowHistory(false);
                      }}
                    >
                      {e}
                    </h3>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="checkin text-[1.4rem]">
            <label htmlFor="">Nhận phòng</label>
            <DatePicker
              className="search-text"
              selected={checkin}
              onChange={(date) => setCheckin(date)}
              minDate={today}
            />
          </div>
          <div className="checkout text-[1.4rem]">
            <label htmlFor="">Trả phòng</label>
            <DatePicker
              className="search-text"
              selected={checkout}
              onChange={(date) => setCheckout(date)}
              minDate={checkin.getTime() + 86400000}
            />
          </div>
          <SearchIcon
            onClick={() => handleSearchHome()}
            className="search-btn"
          ></SearchIcon>
        </div>
      ) : page === "explore" ? (
        <div className="search-wrap">
          <div className="search-address">
            <label htmlFor="keySearch">{page}</label>
            <input
              type="text"
              className="search-text"
              value={keySearch}
              onChange={(e) => {
                dispatch(keySearchSlice.actions.setKeySearch(e.target.value));
                setShowHistory(true);
              }}
              id="keySerch"
              name="keySearch"
              placeholder={placeholder}
            />
            {showHistory & (suggest?.length > 0) ? (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Gợi ý</h2>
                <ul className="suggest">
                  {suggest.map((e, i) => (
                    <Link
                      className="suggest-item"
                      key={i}
                      to={`/explore/detail/${e.propertyId}`}
                      onClick={() => {
                        setShowHistory(false);
                      }}
                    >
                      <img src={e.thumbnail} alt="thumbnail" />
                      <h3>{e.propertyName}</h3>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}

            {suggest?.length === 0 ? (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Không tìm thấy thông tin</h2>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="clear"
            onClick={() => {
              dispatch(keySearchSlice.actions.setKeySearch(""));
              navigate("/explore");
            }}
          >
            <HighlightOffIcon className="clear-btn"></HighlightOffIcon>
          </div>
          <SearchIcon
            onClick={() => handleSearch("explore")}
            className="search-btn"
          ></SearchIcon>
        </div>
      ) : page === "experience" ? (
        <div className="search-wrap">
          <div className="search-address">
            <label htmlFor="keySearch">{page}</label>
            <input
              type="text"
              className="search-text"
              value={keySearch}
              onChange={(e) => {
                dispatch(keySearchSlice.actions.setKeySearch(e.target.value));
                setShowHistory(true);
              }}
              id="keySerch"
              name="keySearch"
              placeholder={placeholder}
            />
            {showHistory && (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Gợi ý</h2>
                <ul className="history-item">
                  <li>kết quả 1</li>
                  <li>kết quả 2</li>
                  <li>kết quả 3</li>
                </ul>
                <h2>Lịch sử tìm kiếm</h2>
                <ul className="history-item">
                  <li>kết quả 1</li>
                  <li>kết quả 2</li>
                  <li>kết quả 3</li>
                </ul>
              </div>
            )}
          </div>

          <div
            className="clear"
            onClick={() => {
              dispatch(keySearchSlice.actions.setKeySearch(""));
              navigate("/explore");
            }}
          >
            <HighlightOffIcon className="clear-btn"></HighlightOffIcon>
          </div>
          <SearchIcon
            onClick={() => handleSearch("experience")}
            className="search-btn"
          ></SearchIcon>
        </div>
      ) : (
        " "
      )}
    </header>
  );
}

export default Header;
