import React from "react";
import Sidebar from "../../Property/Sidebar";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function DefaultLayout() {
  const location = useLocation();
  const isPropertyPath = location.pathname.startsWith("/property");
  return (
    <div>
      <Header />
      <div class="row g-0">
        {isPropertyPath && (
          <div class="col-sm-6 col-md-2">
            <Sidebar />
          </div>
        )}
        <div class="col-6 col-md-10 border">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
