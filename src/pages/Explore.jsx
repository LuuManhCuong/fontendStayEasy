import React, { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ListView from "../components/listView/ListView";
import { dataExploreSelector } from "../redux-tookit/selector";


import { dataExploreSlice } from "../redux-tookit/reducer/dataExploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { dataExplore } = useSelector(dataExploreSelector);

  useEffect(() => {
    // Dispatch action để hiển thị trạng thái đang tải
    dispatch(dataExploreSlice.actions.getDataExploreRequest());

    // Gọi API để lấy dữ liệu
    axios
      .get("http://localhost:8080/explore")
      .then(function (response) {
        dispatch(dataExploreSlice.actions.getDataExploreSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataExploreSlice.actions.getDataExploreFailure());
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>
      {dataExplore && <ListView data={dataExplore}></ListView>}
      <Footer></Footer>
    </>
  );
}

export default Explore;
