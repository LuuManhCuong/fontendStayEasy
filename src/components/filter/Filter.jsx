import React, { useState } from "react";
import "./filter.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CabinIcon from "@mui/icons-material/Cabin";
import FestivalIcon from "@mui/icons-material/Festival";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CastleIcon from "@mui/icons-material/Castle";
import PoolIcon from "@mui/icons-material/Pool";
import LandscapeIcon from "@mui/icons-material/Landscape";
import BalconyIcon from "@mui/icons-material/Balcony";
import ForestIcon from "@mui/icons-material/Forest";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataCategorySelector } from "../../redux-tookit/selector";
import axios from "axios";
import { dataCategorySlice } from "../../redux-tookit/reducer/dataCategorySlice";
import { dataHomeSlice } from "../../redux-tookit/reducer/dataHomeSlice";

function Filter() {
  const dispatch = useDispatch();
  const { dataCategory } = useSelector(dataCategorySelector);
  const [activeIndex, setActiveIndex] = useState(null);
  console.log("active: ", activeIndex);

  const handleClick = (categoryId) => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/property/category/${categoryId}`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());

        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(dataCategorySlice.actions.getDataCategoryRequest());
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/category`)
      .then(function (response) {
        dispatch(dataCategorySlice.actions.getDataCategorySuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataCategorySlice.actions.getDataCategoryFailure());

        console.log(error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className={`filter-category `}>
          <CabinIcon></CabinIcon>cabin
        </div>
        <div className={`filter-category `}>
          <SouthAmericaIcon></SouthAmericaIcon>đảo
        </div>
        <div className={`filter-category `}>
          <BeachAccessIcon></BeachAccessIcon>bãi biển
        </div>
        <div className={`filter-category `}>
          <AcUnitIcon></AcUnitIcon>tuyết
        </div>
        <div className={`filter-category `}>
          <CastleIcon></CastleIcon> lâu đài
        </div>
        <div className={`filter-category `}>
          <FestivalIcon></FestivalIcon>cắm trại
        </div>
        <div className={`filter-category `}>
          <PoolIcon></PoolIcon>hồ bơi
        </div>
        <div className={`filter-category `}>
          <LandscapeIcon></LandscapeIcon>cảnh đẹp
        </div>
        <div className={`filter-category `}>
          <BalconyIcon></BalconyIcon>kiến trúc
        </div>
        <div className={`filter-category `}>
          <ForestIcon></ForestIcon>nông trại
        </div>
        <div className={`filter-category`}>
          <BeachAccessIcon></BeachAccessIcon>nhiệt đới
        </div>
        {dataCategory.map((item, index) => {
          return (
            <div
              key={index}
              className={`filter-category`}
              onClick={() => handleClick(item.categoryId)}
            >
              {item.categoryName}
            </div>
          );
        }
        )}
      </Slider>
    </div>
  );
}

export default Filter;
