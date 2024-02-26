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
  const { counter } = useSelector(counterSelector);
  const { dataExplore, isLoading } = useSelector(dataExploreSelector);
  const [page, setPage] = useState(0);

  const fetchData = () => {
    axios
      // .get("http://localhost:8080/explore")
      .get(
        `http://localhost:8080/api/v1/stayeasy/explore/search?keySearch=${keySearch}&page=${page}&size=${8}`
      )

      .then(function (response) {
        console.log("data: ", response.data);
        console.log("tổng page: ", response.data.size);
        console.log("total recoe: ", response.data.totalElements);

        dispatch(
          dataExploreSlice.actions.getDataExploreSuccess([
            ...dataExplore,
            ...response.data.properties.content,
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
  }, [counter, page, keySearch]);

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
