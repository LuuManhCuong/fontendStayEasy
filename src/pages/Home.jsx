import React from "react";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListView from "../components/listview/ListView";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProperty } from "../redux/actions/PropertyAction";

function Home() {
  const { list } = useSelector(state => state.propertyReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = getProperty();
        dispatch(action);
    }, []);
  return (
    <>
      <Header page="home"></Header>
      <ListView data={list}></ListView>
      <Footer></Footer>
    </>
  );
}

export default Home;
