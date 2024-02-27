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
  const [isLoading, setIsLoading] = useState(true);
  const [dataExplore, setDataExplore] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [size, setSize] = useState(8);
  // console.log("datarender: ", dataExplore);
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/explore/search?keySearch=${keySearch}&page=${page}&size=${size}`
      )
      .then(function (response) {
        setTotalPage(() => Math.ceil(response.data.totalCount / size));

        setIsLoading(false);
        setDataExplore((prev) => {
          return [...prev, ...response.data.properties];
        });
      })
      .catch(function (error) {
        setIsLoading(true);
        console.log(error);
      });
  };
  useEffect(() => {
    if (page <= totalPage) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>

      {dataExplore?.length > 0 && <ListView data={dataExplore}></ListView>}
      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
          loading...
        </Stack>
      )}
      {!isLoading && dataExplore?.length === 0 && (
        <h3>Không tìm thấy dữ liệu</h3>
      )}

      <Footer></Footer>
    </>
  );
}

export default Explore;
