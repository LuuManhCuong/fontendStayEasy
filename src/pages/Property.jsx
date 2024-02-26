import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PropertyManager from "../components/Property/PropertyManager";
import Sidebar from "../components/Property/Sidebar";

export default function Property() {
  return (
    <div>
      <Header />

      <div class="row g-0">
        <div class="col-sm-6 col-md-2"><Sidebar/></div>
        <div class="col-6 col-md-10"><PropertyManager/></div>
      </div>

      <Footer />
    </div>
  );
}
