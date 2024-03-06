import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";
// import ListView from "../components/listview/ListView";
import ListView from "../components/listview/ListView";

import {
  dataExploreSelector,
  grouptSelector,
  keySearchSelector,
} from "../redux-tookit/selector";
import axios from "axios";
import dataExploreSlice from "../redux-tookit/reducer/dataExploreSlice";
import { useNavigate } from "react-router-dom";
import { keySearchSlice } from "../redux-tookit/reducer/keySearchSlice";

function SearchResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reloadLike } = useSelector(grouptSelector);

  const { page, keySearch } = useSelector(keySearchSelector);
  const [dataSearch, setDataSearch] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log("keysearch: ", keySearch);
    // console.log("page: ", page);
    let url;
    if (page === "home") {
      // url = `${page}/search?address=${keySearch}&checkin=${checkin}&checkout=${checkout}`;
    } else if (page === "experience") {
      url = `${page}/search?keySearch=${keySearch}`;
    } else if (page === "explore" && keySearch.length > 0) {
      url = `${page}/search?keySearch=${keySearch}&page=${0}&size=${50}`;
      searchExplore(url);
    }
  }, [keySearch, page, reloadLike]);
  // method search explore data
  function searchExplore(url) {
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/${url}`)
      .then(function (response) {
        navigate("/search/result");
        setDataSearch(response.data.properties);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);

        console.log(error);
      });
  }
  return (
    <>
      <Header page="explore"></Header>
      <Filter></Filter>
      <h3>
        {dataSearch?.length} Kết quả tìm kiếm cho từ khóa: {keySearch}
      </h3>
      {dataSearch?.length > 0 && <ListView data={dataSearch}></ListView>}
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
      {/* {!isLoading && dataSearch?.length === 0 && (
        <h3>Không tìm thấy dữ liệu</h3>
      )} */}

      <Footer></Footer>
    </>
  );
}

export default SearchResult;
