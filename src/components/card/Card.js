import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector, grouptSelector } from "../../redux-tookit/selector";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import axios from "axios";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";
import Slider from "react-slick";
function Card(props) {
  // console.log("property: ", props.item);

  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const counter = useSelector(counterSelector);
  const { reloadLike } = useSelector(grouptSelector);
  const checkin = new Date();
  let timeStamp = checkin.getTime() + 86400000;
  const checkout = new Date(timeStamp);
  const navigate = useNavigate();
  const isActive = props.item.likeList?.some(
    (like) => like?.idUser === user?.id
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);

  // Kiểm tra xem người dùng đã like property này hay chưa => true/false

  const handleLike = (e, idPost) => {
    e.stopPropagation();
    // like
    if (user && !isActive) {
      // console.log("like id: ", idPost, "idUSer: ", user?.id);
      axios
        .post(`http://localhost:8080/api/v1/stayeasy/like`, {
          idPost: idPost,
          idUser: user?.id,
        })
        .then(function (response) {
          dispatch(grouptSlice.actions.reloadLike());
          console.log("res ", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // unlike
    else if (user && isActive) {
      // console.log("unlike id: ", idPost, "idUSer: ", user?.id);
      axios
        .delete(`http://localhost:8080/api/v1/stayeasy/unlike`, {
          params: {
            idPost: idPost,
            idUser: user?.id,
          },
        })
        .then(function (response) {
          dispatch(grouptSlice.actions.reloadLike());
          console.log("res ", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      dispatch(grouptSlice.actions.openLoginForm());
      console.log("chưa đăng nhập");
    }
  };

  

  const handleDetail = () => {
    const checkinString = checkin.toISOString().split("T")[0];
    const checkoutString = checkout.toISOString().split("T")[0];
    console.log(checkinString, checkoutString);

    console.log(checkin, checkout);
    navigate(
      `/explore/detail/${props.item.propertyId}?checkin=${checkinString}&checkout=${checkoutString}`
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: false,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    const handleClick = (e) => {
      e.stopPropagation(); // Chặn sự kiện nổi bọt
      onClick && onClick(e); // Gọi lại hàm onClick nếu có
    };
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          marginRight: "-40px",
          position: "absolute",
          right: "30px",
          top: "55%",
        }}
        onClick={handleClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    const handleClick = (e) => {
      e.stopPropagation(); // Chặn sự kiện nổi bọt
      onClick && onClick(e); // Gọi lại hàm onClick nếu có
    };
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          position: "absolute",
          left: "10px",
          top: "55%",
          zIndex: "1",
        }}
        onClick={handleClick}
      />
    );
  }

  // console.log(props.item);
  return (
    <div
      onClick={() => handleDetail()}
      // to={`/explore/detail/${props.item.propertyId}?checkin=${checkinString}&checkout=${checkoutString}`}
      className="w-full h-auto cursor-pointer flex-initial mb-[2rem]"
      key={props.index}
    >
      <div className="w-full  h-[36rem]  relative">
        <div className="w-full h-[28rem] rounded-[1.6rem] overflow-hidden">
        <Slider {...settings} className="w-full h-full">
            {props.item.imagesList?.map((item, index) => (
              <div key={index} className="h-[280px]">
                <img 
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[1.6rem]"
                  src={item.url}
                  testindex={index}
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>

        <div
          className={`heart-btn flex absolute top-8 right-[30px] text-fav-icon text-5xl ${
            isActive ? "active" : ""
          }`}
          onClick={(e) => handleLike(e, props.item.propertyId)}
        >
          <div className="absolute -top-4 -right-[36px]">

          <p className="text-4xl justify-center w-[30px]">
            <span className="inline-block font-bold max-w-[80%]" style={{ color: 'blue', WebkitTextStroke: '0.2px white' }}>{props.item.likeList?.length}</span>
          </p>
          </div>
          <FontAwesomeIcon
            className="like-icon"
            icon={icon({ name: "heart", family: "classic", style: "solid" })}
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between text-3xl font-semibold font-roboto mt-2 h-10">
            {props.item.propertyName}
            <div className="flex">
                  <p className="text-3xl">{props.item.rating}</p>
                  <FontAwesomeIcon
                    className=" text-black-300 stroke-black ml-[2px]"
                    size="1x"
                    icon={icon({
                      name: "star",
                      family: "classic",
                      style: "solid",
                    })}
                  />
                </div>
          </div>
          <div className="font-roboto font-thin opacity-60 m-0 p-0">{props.item.address}</div>
          <div>
            <b>{props.item.price}</b> / đêm
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
