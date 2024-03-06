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

        <div className="layout row g-0">
          <div className="col-6 col-md-2 border">
            <Sidebar />
          </div>
    
          <div className="col-6 col-md-10 border">
            <Outlet/>
          </div>
        </div>

        <Footer/>

    </div>
  );
}
