import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./cart.scss";
import { useSelector } from "react-redux";
import { counterSelector } from "../../redux-tookit/selector";

function Card(props) {
  const [active, setActive] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const counter = useSelector(counterSelector);
  const checkin = new Date();
  let timeStamp = checkin.getTime() + 86400000;
  const checkout = new Date(timeStamp);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);
  // console.log("user", user);

  const handleLike = (e, idPost) => {
    e.stopPropagation();
    if (user) {
      console.log("like id: ", idPost, "idUSer: ", user?.id);
    } else {
      console.log("chưa đăng nhập");
    }
  };

  const checkinString = checkin.toISOString().split("T")[0];
  const checkoutString = checkout.toISOString().split("T")[0];

  const handleDetail = () => {
    console.log(checkinString, checkoutString);

    console.log(checkin, checkout);
    navigate(
      `/explore/detail/${props.item.propertyId}?checkin=${checkinString}&checkout=${checkoutString}`
    );
  };

  // console.log(props.item);
  return (
    <div
      onClick={() => handleDetail()}
      // to={`/explore/detail/${props.item.propertyId}?checkin=${checkinString}&checkout=${checkoutString}`}
      className="w-full h-auto cursor-pointer flex-initial mb-[2rem]"
      key={props.index}
    >
      <div className="w-full h-[28rem] relative">
        <div className="w-full h-[20rem] rounded-[1.6rem] overflow-hidden">
          <img
            loading="lazy"
            className="w-full h-full object-cover"
            src={props.item.thumbnail}
            alt=""
          />
        </div>
        <div
          className={`heart-btn flex absolute top-3 right-3 text-fav-icon text-4xl ${
            active ? "active" : ""
          }`}
          onClick={(e) => handleLike(e, props.item.propertyId)}
        >
          <FontAwesomeIcon
            icon={icon({ name: "heart", family: "classic", style: "solid" })}
          />
        </div>
        <div className="p-2">
          <div className="text-3xl font-bold">{props.item.propertyName}</div>
          <div>{props.item.address}</div>
          <div>
            <b>{props.item.price}</b> / đêm
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
