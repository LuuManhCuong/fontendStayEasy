import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Experience from "./pages/Experience";
import Detail from "./pages/Detail";
import Inbox from "./pages/Inbox/Inbox";
import InboxGuest from "./components/InboxGuest/InboxGuest";
import ShowComponent from "./pages/Inbox/ShowComponent";
import SearchResult from "./pages/SearchResult";
import Account from "./pages/AccountSetting/Account";
import PersonalInfo from "./pages/AccountSetting/PersonalInfo";
import LoginAndSecurity from "./pages/AccountSetting/LoginAndSecurity";
import PaymentsPayouts from "./pages/AccountSetting/PaymentsPayouts";

import Login from "./pages/AccountSetting/Login";

import { UserContext } from "./components/UserContext";

import BookingPage from "./pages/booking/BookingsPage";
import BookingDetail from "./pages/booking/BookingDetail";
import Booking from "./pages/Booking";
import PaymentSuccsess from "./pages/PaymentSuccsess";
import CancelPayment from "./pages/CancelPayment";
import AdminDarhBoard from "./pages/admin/AdminDarhBoard";
import Statistic from "./components/Property/Statistic";
import ListProperty from "./components/Property/ListProperty";
import AddProperty from "./components/Property/AddProperty";
import UpdateProperty from "./components/Property/UpdateProperty";
import Layout from "./components/Property/Layout/Layout";
import Host from "./pages/host/Host";
import { ProtectedRoute } from "./redux-tookit/actions/ProtectedRoute";

function App() {
  // Sử dụng useSelector để truy cập các trạng thái từ Redux store
  const isAuthenticated = useContext(UserContext).isAuthenticated;

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search/result" element={<SearchResult />} />
          <Route path="/explore/detail/:id" element={<Detail />} />

          {/* property manager */}
          <Route path="/property" element={<Layout />}>
            <Route path="statistic" element={<Statistic />} />
            <Route path="list" element={<ListProperty />} />
            <Route path="add" element={<AddProperty />} />
            <Route path="update/:propertyId" element={<UpdateProperty />} />
          </Route>

          {/* booking */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/bookings/:id" element={<BookingDetail />} />
          <Route path="/payment/paypal/success" element={<PaymentSuccsess />} />
          <Route path="/payment/paypal/cancel" element={<CancelPayment />} />

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

          {/* host */}
          <Route
            path="/host"
            element={<Host />}
          />
        </Route>

        {/* login */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
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
      </Routes>
    </>
  );
}

export default App;
