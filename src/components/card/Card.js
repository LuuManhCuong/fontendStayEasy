import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const [active, setActive] = useState(false);
  const checkin = new Date();
  let timeStamp = checkin.getTime() + 86400000;
  const checkout = new Date(timeStamp);
  const navigate = useNavigate();

  const handleLike = (id) => {
    console.log("like id: ", id);
  };

  const handleDetail = () => {
    const checkinString = checkin.toISOString().split("T")[0];
    const checkoutString = checkout.toISOString().split("T")[0];
    console.log(checkinString, checkoutString);

    console.log(checkin, checkout);
    navigate(
      `/explore/detail/${props.item.propertyId}?checkin=${checkinString}&checkout=${checkoutString}&adults=1&children=0&infants=0&pet=0`
    );
  };

  console.log(props.item);
  return (
    <div
      onClick={handleDetail}
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
          onClick={() => handleLike(props.item.propertyId)}
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
