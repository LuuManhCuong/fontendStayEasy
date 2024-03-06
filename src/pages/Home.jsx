import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listview/ListView";
import Filter from "../components/filter/Filter";
import Filters from "../components/filter/Filters";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  counterSelector,
  dataHomeSelector,
  grouptSelector,
} from "../redux-tookit/selector";
import axios from "axios";
import { dataHomeSlice } from "../redux-tookit/reducer/dataHomeSlice";
import { counterSlice } from "../redux-tookit/reducer/counterSlice";

function Home() {
  const dispatch = useDispatch();
  const { dataHome, isLoading } = useSelector(dataHomeSelector);

  const { reloadLike } = useSelector(grouptSelector);
  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/property`)
      .then(function (response) {
        dispatch(counterSlice.actions.totalRecord(response.data.length));
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());

        console.log(error);
      });
  }, [reloadLike]);

  return (
    <>
      <Header page="home"></Header>
      <Filter />
      {dataHome.length > 0 && <ListView data={dataHome}></ListView>}

      {isLoading ? (
        <Stack
          sx={{ width: "100%", height: "5px", color: "grey.500" }}
          spacing={2}
        >
          <LinearProgress color="secondary" />
        </Stack>
      ) : (
        <div style={{ height: "5px" }}></div>
      )}

      {!isLoading && dataHome.length === 0 && <h3>Không tìm thấy dữ liệu</h3>}
      <div className="fixed w-full bottom-0 z-50 bg-white">
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
