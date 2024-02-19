import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
function Explore() {
  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>
      <div>Explore</div>
      <Footer></Footer>
    </>
  ); 
}

export default Explore;
