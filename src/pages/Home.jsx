import React from "react";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "./home/ListView";

function Home() {
  return (
    <>
      <Header page="home"></Header>
      <ListView></ListView>
      <Footer></Footer>
    </>
  );
}

export default Home;
