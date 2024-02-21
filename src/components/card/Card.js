import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Card(props) {
    const [active, setActive] = useState(false);
    const checkin = new Date()
    let timeStamp = checkin + 86400000;
    const checkout = new Date(timeStamp);
    const navigate = useNavigate();
    const handleActive = (event) => {
      setActive(!active);
      event.stopPropagation()
    }
    const handleDetail = () => {
      navigate(`/detail/${props.item.propertyId}?checkin=${checkin}&checkout=${checkout}&adults=1&children=0&infants=0&pet=0`);
    }
    return (
      <div onClick={handleDetail} className="w-full h-auto cursor-pointer flex-initial mb-[2rem]" key={props.index}>
        <div className="w-full h-[20rem] rounded-[1.6rem] relative overflow-hidden">
          <img className='w-full h-full object-cover' src={props.item.thumbnail} alt="" />
          <div className={`flex absolute top-3 right-3 text-fav-icon text-4xl ${active ? 'active' : ''}`} onClick={handleActive}>
          <FontAwesomeIcon icon={icon({name: 'heart', family: 'classic', style: 'solid'})} />
          </div>
        </div>
        <div>{props.item.address}</div>
        <div>
          <b>{props.item.price}</b> / đêm
        </div>
      </div>
  );
}
export default Card;
