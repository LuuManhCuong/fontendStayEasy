import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listView/ListView";
import Filter from "../components/filter/Filter";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataHomeSelector } from "../redux-tookit/selector";
import axios from "axios";
import { dataHomeSlice } from "../redux-tookit/reducer/dataHomeSlice";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const dispatch = useDispatch();
  const { dataHome, isLoading, hasMore } = useSelector(dataHomeSelector);

  const fetchMoreData = () => {
    axios
      .get(`http://localhost:8080/api/property`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    fetchMoreData();
  }, []);

  return (
    <>
      <Header page="home" />
      <Filter page="home" />

      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      {dataHome.length > 0 && (
        <InfiniteScroll
          dataLength={dataHome.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LinearProgress color="secondary" />}
        >
          <ListView data={dataHome} />
        </InfiniteScroll>
      )}
      {!isLoading && dataHome.length === 0 && <h3>Không tìm thấy dữ liệu</h3>}

      <Footer />
    </>
  );
}
export default Home;
