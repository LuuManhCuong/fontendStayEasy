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

  const handleLike = (event, id) => {
    event.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
    console.log("like id: ", id);
    setActive(!active);
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
      <div className="w-full  2lg:h-[36rem] lg:h-[36rem] md:h-[36rem] sm:h[36rem] ssm:h[36rem] relative">
        <div className="w-full 2lg:h-[28rem] lg:h-[28rem] md:h-[28rem] sm:h[28rem] ssm:h[28rem] rounded-[1.6rem] overflow-hidden">
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
          onClick={(event) => handleLike(event, props.item.propertyId)}
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
