import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import axios from "axios";
import ListView from "../components/listView/ListView";
function Explore() {
  const [dataExpore, setDataExplore] = React.useState();
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/explore")
      .then(function (response) {
        // handle success
        setDataExplore(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>
      {dataExpore && <ListView data={dataExpore}></ListView>}
      <Footer></Footer>
    </>
  );
}

export default Explore;
