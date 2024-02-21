import React, { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import ListView from "../components/listView/ListView";
import { dataExploreSelector } from "../redux-tookit/selector";

import { dataExploreSlice } from "../redux-tookit/reducer/dataExploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { dataExplore, isLoading } = useSelector(dataExploreSelector);
  useEffect(() => {
    dispatch(dataExploreSlice.actions.getDataExploreRequest());
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
      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      {dataExplore.length > 0 && <ListView data={dataExplore}></ListView>}

      {!isLoading && dataExplore.length === 0 && (
        <h3>Không tìm thấy dữ liệu</h3>
      )}
      <Footer></Footer>
    </>
  );
}

export default Explore;
