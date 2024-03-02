import React from "react";
import Sidebar from "../Sidebar";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Outlet } from "react-router-dom";
import "../Property.css"

export default function Layout() {
  return (
    <div>

        <Header/>

        <div class="layout row g-0">
          <div class="col-sm-6 col-md-2">
            <Sidebar />
          </div>
    
          <div class="col-6 col-md-10 border">
            <Outlet/>
          </div>
        </div>

        <Footer/>

    </div>
  );
}
