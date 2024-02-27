import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import ListView from "../components/listView/ListView";
import {
  dataExploreSelector,
  keySearchSelector,
} from "../redux-tookit/selector";

function SearchResult() {
  const { keySearch } = useSelector(keySearchSelector);

  const { dataExplore, isLoading } = useSelector(dataExploreSelector);

  console.log("data render: ", dataExplore);

  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>
      <h3>
        {dataExplore.length} Kết quả tìm kiếm cho từ khóa: {keySearch}
      </h3>
      {dataExplore.length > 0 && <ListView data={dataExplore}></ListView>}
      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
          loading...
        </Stack>
      )}
      {/* {!isLoading && dataExplore.length === 0 && (
        <h3>Không tìm thấy dữ liệu</h3>
      )} */}

      <Footer></Footer>
    </>
  );
}

export default SearchResult;
