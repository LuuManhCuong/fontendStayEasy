import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listView/ListView";
import Filter from "../components/filter/Filter";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataHomeSelector } from "../redux-tookit/selector";
import axios from "axios";
import { dataHomeSlice } from "../redux-tookit/reducer/dataHomeSlice";
import { counterSlice } from "../redux-tookit/reducer/counterSlice";

function Home() {
  const dispatch = useDispatch();
  const { dataHome, isLoading } = useSelector(dataHomeSelector);

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
  }, []);

  return (
    <>
      <Header page="home"></Header>
      <Filter page="home"></Filter>

      {isLoading && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      {dataHome.length > 0 && <ListView data={dataHome}></ListView>}
      {!isLoading && dataHome.length === 0 && <h3>Không tìm thấy dữ liệu</h3>}

      <Footer></Footer>
    </>
  );
}

export default Home;
