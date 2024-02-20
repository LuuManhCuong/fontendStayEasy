import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listView/ListView";
import Filter from "../components/filter/Filter";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProperty } from "../redux/actions/PropertyAction";

function Home() {
  const { list } = useSelector((state) => state.propertyReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getProperty();
    dispatch(action);
  }, []);

  return (
    <>
      <Header page="home"></Header>
      <Filter page="home"></Filter>
      <ListView data={list}></ListView>
      <Footer></Footer>
    </>
  );
}

export default Home;
