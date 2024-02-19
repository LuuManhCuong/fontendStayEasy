import React from "react";
import "./filter.scss";
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

function Filter() {
  return (
    <div className="filter">
      <div className="filter-category">
        <CabinIcon></CabinIcon>cabin
      </div>
      <div className="filter-category">
        <SouthAmericaIcon></SouthAmericaIcon>đảo
      </div>
      <div className="filter-category">
        <BeachAccessIcon></BeachAccessIcon>bãi biển
      </div>
      <div className="filter-category">
        <AcUnitIcon></AcUnitIcon>tuyết
      </div>

      <div className="filter-category">
        <CastleIcon></CastleIcon> lâu đài
      </div>
      <div className="filter-category">
        <FestivalIcon></FestivalIcon>cắm trại
      </div>
      <div className="filter-category">
        <PoolIcon></PoolIcon>hồ bơi
      </div>
      <div className="filter-category">
        <LandscapeIcon></LandscapeIcon>cảnh đẹp
      </div>
      <div className="filter-category">
        <BalconyIcon></BalconyIcon>kiến trúc
      </div>
      <div className="filter-category">
        <ForestIcon></ForestIcon>nông trại
      </div>
      <div className="filter-category">
        <BeachAccessIcon></BeachAccessIcon>nhiệt đới
      </div>
    </div>
  );
}

export default Filter;
