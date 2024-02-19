import React from "react";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Filter from "../components/filter/Filter";
function Home() {
  return (
    <>
      <Header page="home"></Header>
      <Filter></Filter>
      <div>Home</div>
      <Footer></Footer>
    </>
  );
}

export default Home;
