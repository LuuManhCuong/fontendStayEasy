import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";
import { useSelector } from "react-redux";
import { counterSelector } from "./redux-tookit/selector";

import Detail from "./pages/Detail";

import Inbox from "./pages/Inbox/Inbox";
import InboxGuest from "./components/InboxGuest/InboxGuest";
import ShowComponent from "./pages/Inbox/ShowComponent";

import Booking from "./pages/Booking";

import SearchResult from "./pages/SearchResult";

import Account from "./pages/AccountSetting/Account";
import PersonalInfo from "./pages/AccountSetting/PersonalInfo";
import LoginAndSecurity from "./pages/AccountSetting/LoginAndSecurity";
import PaymentsPayouts from "./pages/AccountSetting/PaymentsPayouts";
import { useEffect, useState } from "react";
import Login from "./pages/AccountSetting/Login";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const counter = useSelector(counterSelector);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("access_token")
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);

  // // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   setLoggedIn(localStorage.getItem("access_token"));
  // }, [localStorage.getItem("access_token")]);

  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/experience" element={<Experience></Experience>}></Route>
      <Route path="/explore" element={<Explore></Explore>}></Route>
      <Route
        path="/search/result"
        element={<SearchResult></SearchResult>}
      ></Route>
      <Route path="/explore/detail/:id" element={<Detail />} />
      {/* account setting */}
      <Route path="/account-settings" element={user ? <Account title="Tài khoản" /> : <Login/>}/>
      <Route path="/account-settings/personal-info" element={user ? <PersonalInfo title="Thông tin cá nhân"/> : <Login/>}/>
      <Route path="/account-settings/login-and-security" element={user ?<LoginAndSecurity title="Đăng nhập và bảo mật" />: <Login/>}/>
      <Route path="/account-settings/login-and-security/login-requests"element={user ? <LoginAndSecurity title="Đăng nhập và bảo mật" />: <Login/>}/>
      <Route path="/account-settings/login-and-security/shared-access" element={user ? <LoginAndSecurity title="Đăng nhập và bảo mật" />: <Login/>}
      />
      <Route
        path="/account-settings/payments/payment-methods"
        element={<PaymentsPayouts title="Thanh toán và Hoàn tiền" />}
      />
      <Route
        path="/account-settings/payments/payout-methods"
        element={<PaymentsPayouts title="Thanh toán và Hoàn tiền" />}
      />
      {/* inbox */}
      <Route
        path="/inbox"
        element={
          <ShowComponent>
            <Inbox> </Inbox>
          </ShowComponent>
        }
      />
      <Route
        path="/inbox/:roomId"
        element={
          <ShowComponent>
            <Inbox>
              {" "}
              <InboxGuest></InboxGuest>{" "}
            </Inbox>
          </ShowComponent>
        }
      />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
}

export default App;
