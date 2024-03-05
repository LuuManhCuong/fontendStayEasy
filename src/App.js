import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
import Login from "./pages/AccountSetting/Login";
import { ProtectedRoute, isAuthenticated } from "./pages/ProtectedRoute";
import AdminDarhBoard from "./pages/AdminDarhBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/search/result" element={<SearchResult />} />
      <Route path="/explore/detail/:id" element={<Detail />} />

      {/* account setting */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin-dashboard"
          element={<AdminDarhBoard></AdminDarhBoard>}
        />

        <Route
          path="/account-settings"
          element={<Account title="Tài khoản" />}
        />
        <Route
          path="/account-settings/personal-info"
          element={<PersonalInfo title="Thông tin cá nhân" />}
        />

        {/* Đăng nhập và bảo mật */}
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

        {/* Thanh toán và Hoàn tiền */}
        <Route
          path="/account-settings/payments/payment-methods"
          element={<PaymentsPayouts title="Thanh toán và Hoàn tiền" />}
        />
        <Route
          path="/account-settings/payments/payout-methods"
          element={<PaymentsPayouts title="Thanh toán và Hoàn tiền" />}
        />
      </Route>

      {/* login */}
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
      />

      {/* inbox */}
      <Route
        path="/inbox"
        element={
          <ShowComponent>
            <Inbox />
          </ShowComponent>
        }
      />
      <Route
        path="/inbox/:roomId"
        element={
          <ShowComponent>
            <Inbox>
              {" "}
              <InboxGuest />{" "}
            </Inbox>
          </ShowComponent>
        }
      />

      {/* booking */}
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
}

export default App;
