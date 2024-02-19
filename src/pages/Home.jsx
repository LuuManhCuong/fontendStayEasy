import React from "react";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "./home/ListView";
import Filter from "../components/filter/Filter";

function Home() {
  return (
    <>
      <Header page="home"></Header>
      <Filter></Filter>
      <ListView></ListView>
      <Footer></Footer>
    </>
  );
}

export default Home;
