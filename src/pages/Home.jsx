import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listView/ListView";
import Filter from "../components/filter/Filter";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterSelector, dataHomeSelector } from "../redux-tookit/selector";
import axios from "axios";
import { dataHomeSlice } from "../redux-tookit/reducer/dataHomeSlice";

function Home() {
  const dispatch = useDispatch();
  const { dataHome } = useSelector(dataHomeSelector);
  console.log("dataHome: ", { dataHome });

  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/property`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());

        console.log(error);
      });
  }, []);

  return (
    <>
      <Header page="home"></Header>
      <Filter page="home"></Filter>
      <ListView data={dataHome}></ListView>
      <Footer></Footer>
    </>
  );
}

export default Home;
