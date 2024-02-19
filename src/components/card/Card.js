import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Card(props) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const handleActive = (event) => {
    setActive(!active);
    event.stopPropagation();
  };
  const handleDetail = () => {
    navigate(`/detail/${props.item.propertyId}`);
    window.location.reload();
  };
  console.log(props.item);
  return (
    <div
      onClick={handleDetail}
      className="w-[23%] h-96 cursor-pointer"
      key={props.index}
    >
      <div className="w-full h-60 rounded-2xl relative overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={props.item.thumbnail}
          alt=""
        />
        <div
          className={`flex absolute top-3 right-3 text-fav-icon text-2xl ${
            active ? "active" : ""
          }`}
          onClick={handleActive}
        >
          <FontAwesomeIcon
            icon={icon({ name: "heart", family: "classic", style: "solid" })}
          />
        </div>
      </div>
      <div className="mt-2">
        <div>
          <b>{props.item.propertyName}</b>
        </div>
        <div>{props.item.address}</div>
        <div>
          <b>{props.item.price}</b> / đêm
        </div>
      </div>
    </div>
  );
}
export default Card;
