import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";

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
import { useSelector } from "react-redux";
import { counterSelector } from "./redux-tookit/selector";

function App() {
  // const [user, setuser] = useState(
  //   localStorage.getItem("access_token")
  // );

  // // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   setuser(localStorage.getItem("access_token"));
  // });
  const counter = useSelector(counterSelector);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);

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
      <Route path="/account-settings" element={<Account title="Tài khoản" />} />
      <Route
        path="/account-settings/personal-info"
        element={<PersonalInfo title="Thông tin cá nhân" />}
      />
      <Route
        path="/account-settings/login-and-security"
        element={<LoginAndSecurity title="Đăng nhập và bảo mật" />}
      />
      <Route
        path="/account-settings/login-and-security/login-requests"
        element={<LoginAndSecurity title="Đăng nhập và bảo mật" />}
      />
      <Route
        path="/account-settings/login-and-security/shared-access"
        element={<LoginAndSecurity title="Đăng nhập và bảo mật" />}
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
