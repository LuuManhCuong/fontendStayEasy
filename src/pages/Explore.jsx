import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import ListView from "../components/listview/ListView";
import {
  counterSelector,
  dataExploreSelector,
  keySearchSelector,
} from "../redux-tookit/selector";

import { dataExploreSlice } from "../redux-tookit/reducer/dataExploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { keySearch } = useSelector(keySearchSelector);
  const { counter, totalRecord } = useSelector(counterSelector);
  const { dataExplore, isLoading } = useSelector(dataExploreSelector);
  const [page, setPage] = useState(1);
  console.log("total recoe: ", Math.ceil(totalRecord / 8));
  const fetchData = () => {
    if (page >= Math.ceil(totalRecord / 8)) {
      setPage(Math.ceil(totalRecord / 8));
    }
    axios
      // .get("http://localhost:8080/explore")
      .get(
        `http://localhost:8080/explore/search?keySearch=${keySearch}&page=${page}&size=${8}`
      )

      .then(function (response) {
        console.log("data: ", response.data.first.content);
        console.log("tổng: ", response.data.second);

        dispatch(
          dataExploreSlice.actions.getDataExploreSuccess([
            ...dataExplore,
            ...response.data.content,
          ])
        );
      })
      .catch(function (error) {
        dispatch(dataExploreSlice.actions.getDataExploreFailure());
        console.log(error);
      });
  };
  useEffect(() => {
    dispatch(dataExploreSlice.actions.getDataExploreRequest());
    fetchData();
  }, [counter, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>

      {dataExplore.length > 0 && <ListView data={dataExplore}></ListView>}
      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
          loading...
        </Stack>
      )}
      {!isLoading && dataExplore.length === 0 && (
        <h3>Không tìm thấy dữ liệu</h3>
      )}

      <Footer></Footer>
    </>
  );
}

export default Explore;
