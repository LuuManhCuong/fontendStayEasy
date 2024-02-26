import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Slider from "react-slick";
import NumGuest from "../components/numguest/NumGuest";
import { dataDetailSlice } from "../redux-tookit/reducer/dataDetailSlice";
import { dataDetailSelector } from "../redux-tookit/selector";
import Popup from "../components/popup/PopUp";
import { parseISO } from "date-fns";
function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dataDetail } = useSelector(dataDetailSelector);

  const location = useLocation();
  var currentURL = window.location.href;
  var url = new URL(currentURL);
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);

  const today = new Date();
  let timeStamp = today.getTime() + 86400000;

  const [totalGuests, setTotalGuests] = useState(1);
  const [checkin, setCheckin] = useState(
    urlParams.get("checkin") ? new Date(urlParams.get("checkin")) : today
  );
  const [checkout, setCheckout] = useState(
    urlParams.get("checkout")
      ? new Date(urlParams.get("checkout"))
      : new Date(timeStamp)
  );
  const [adults, setAdults] = useState(
    parseInt(urlParams.get("adults")) !== 0
      ? parseInt(urlParams.get("adults"))
      : 1
  );
  const [children, setChildren] = useState(
    parseInt(urlParams.get("children")) !== 0
      ? parseInt(urlParams.get("children"))
      : 0
  );
  const [infants, setInfants] = useState(
    parseInt(urlParams.get("infants")) !== 0
      ? parseInt(urlParams.get("infants"))
      : 0
  );
  const [pet, setPet] = useState(
    parseInt(urlParams.get("pet")) !== 0 ? parseInt(urlParams.get("pet")) : 0
  );
  const [totalDays, setTotalDays] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState(
    dataDetail.imagesList ? [0] : null
  );
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = async () => {
    try {
      dispatch(dataDetailSlice.actions.getDataDetailRequest());
      const response = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/property/${id}`
      );
      dispatch(dataDetailSlice.actions.getDataDetailSuccess(response.data));
      setDataLoaded(true); // Đặt trạng thái tải dữ liệu thành true khi dữ liệu đã được tải hoàn toàn
    } catch (error) {
      dispatch(dataDetailSlice.actions.getDataDetailFailure());
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    url.searchParams.set("adults", adults);
    url.searchParams.set("children", children);
    url.searchParams.set("infants", infants);
    url.searchParams.set("pet", pet);
    window.history.replaceState({}, "", url);
  }, [adults, children, infants, pet]);

  useEffect(() => {
    // Tính số ngày giữa checkin và checkout
    const newTotalDays = Math.ceil(
      (checkout.getTime() - checkin.getTime()) / 86400000
    ); // Đảm bảo rằng giá trị totalDays đã được tính toán đúng
    // Cập nhật totalDaysState
    setTotalDays(newTotalDays);
  }, [checkin, checkout]);

  useEffect(() => {
    setTotalGuests(adults + children);
  }, [adults, children]);

  useEffect(() => {
    setCheckout(new Date(checkin.getTime() + 86400000));
  }, [checkin]);

  const onChangeCheckin = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
    const checkinDate = new Date(formattedDate);

    setCheckin(checkinDate);
    url.searchParams.set("checkin", formattedDate);
    url.searchParams.set(
      "checkout",
      new Date(checkinDate.getTime() + 86400000).toISOString().split("T")[0]
    );
    window.history.replaceState({}, "", url);
  };

  const onChangeCheckout = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
    const checkoutDate = new Date(formattedDate);

    setCheckout(checkoutDate);
    url.searchParams.set("checkout", formattedDate);
    window.history.replaceState({}, "", url);
  };

  const onChangeDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickImage = (image) => {
    setCurrentImage(image);
    if (image) {
      url.searchParams.set("popup", true);
      url.searchParams.set("image", image.imageId);
      window.history.replaceState({}, "", url);
    }
    setOpenPopup(true);
  };

  const styleImg = {
    width: "100%",
    height: "600px",
    objectFit: "contain",
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          marginRight: "-40px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          width: "40px",
          height: "40px",
          marginLeft: "-40px",
        }}
        onClick={onClick}
      />
    );
  }

  if (openPopup == false) {
    url.searchParams.delete("popup");
    url.searchParams.delete("image");
    window.history.replaceState({}, "", url);
  }

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header page={"home"}></Header>
      <Popup
        currentImageInit={currentImage}
        imagesList={dataDetail.imagesList}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></Popup>
      <div className="w-full box-border pl-20 pr-20">
        <div
          className="w-full h-[500px] flex justify-center mb-4 slider_detail"
          key={id}
        >
          <Slider {...settings} className="w-[80%]">
            {dataDetail.imagesList?.map((item, index) => (
              <div key={index} className=" h-[450px]">
                <img
                  style={styleImg}
                  src={item.url}
                  testindex={index}
                  alt=""
                  onClick={() => onClickImage(item)}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full flex justify-between ml-24 mr-24">
          {/* left */}
          <div className="w-[55%] pl-6 box-border">
            {/* info */}
            <div className="pt-6 pb-6 border-b-2">
              <div className="text-4xl font-medium">
                <p>{dataDetail.propertyName}</p>
              </div>
              <div className="text-3xl font-medium mt-2">
                <p>{dataDetail.address}</p>
              </div>
              <div className="flex mt-2 text-[17px] font-normal justify-between w-[38rem]">
                <p>{dataDetail.numGuests} khách</p>
                <span>-</span>
                {dataDetail.propertyUtilitis?.map((item, index) => (
                  <p key={index}>
                    {item.quantity} {item.utilitiesName}
                    {index !== dataDetail.propertyUtilitis.length - 1 ? (
                      <span> -</span>
                    ) : (
                      ""
                    )}
                  </p>
                ))}
              </div>
              <div className="w-[50%] rating text-lg font-semibold flex pt-4">
                <div className="flex">
                  <p className="text-4xl">{dataDetail.rating}</p>
                  <FontAwesomeIcon
                    className=" text-yellow-300 stroke-black ml-[2px]"
                    size="2x"
                    icon={icon({
                      name: "star",
                      family: "classic",
                      style: "solid",
                    })}
                  />
                </div>
                <div>
                  <p className="text-[18px] ml-4 p-2 underline">
                    {dataDetail.feedbackList?.length} đánh giá
                  </p>
                </div>
              </div>
            </div>

            {/* info-host */}
            <div className="w-full pt-6 pb-2 flex justify-items-center border-b-2">
              <div className="w-[6rem] h-[6rem] rounded-[50%] overflow-hidden">
                <img src={dataDetail.owner?.avatar} alt="" />
              </div>
              <div className="p-3">
                <div className="text-base font-semibold">
                  <p className="text-[17px]">
                    Hosted by {dataDetail.owner?.firstName}{" "}
                    {dataDetail.owner?.lastName}
                  </p>
                </div>
                <div className="text-base">
                  <p className="text-[17px]">
                    Chủ nhà siêu cấp 4 năm kinh nghiệm đón tiếp khách
                  </p>
                </div>
              </div>
            </div>

            {/* info-service */}
            <div className="w-full h-[25rem] pt-6 pb-6 flex flex-col border-b-2 justify-between">
              <div className="flex justify-items-center">
                <FontAwesomeIcon
                  className="stroke-slate-950 p-[0.8rem]"
                  color="white"
                  size="2x"
                  icon={icon({
                    name: "puzzle-piece",
                    family: "classic",
                    style: "solid",
                  })}
                />
                <div className="ml-3">
                  <p>Hủy miễn phí trước</p>
                  <p>Được hoàn tiền đầy đủ nếu bạn thay đổi kế hoạch.</p>
                </div>
              </div>
              <div className="flex">
                <FontAwesomeIcon
                  className="stroke-slate-950 p-[0.8rem]"
                  color="white"
                  size="2x"
                  icon={icon({
                    name: "puzzle-piece",
                    family: "classic",
                    style: "solid",
                  })}
                />
                <div className="ml-3">
                  <p>Không gian riêng để làm việc</p>
                  <p>Một căn phòng có Wi-fi, rất phù hợp để làm việc.</p>
                </div>
              </div>
              <div className="flex">
                <FontAwesomeIcon
                  className="stroke-slate-950 p-[0.8rem]"
                  color="white"
                  size="2x"
                  icon={icon({
                    name: "puzzle-piece",
                    family: "classic",
                    style: "solid",
                  })}
                />
                <div className="ml-3">
                  <p>Tự nhận phòng</p>
                  <p>Tự nhận phòng bằng cách nhập mã số vào cửa.</p>
                </div>
              </div>
            </div>

            {/* info-detail */}
            <div className="w-full pt-6 pb-6 border-b-2 ">
              <div>
                <p className="text-[17px]">{dataDetail.description}</p>
              </div>
            </div>
          </div>
          {/* end-left */}

          {/* right */}
          <div className="w-[40%]">
            <div className="w-[350px] h-[450px] rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px]">
              <div className="p-5 pt-4">
                <div className="flex justify-items-center">
                  <p className="text-[2.4rem] font-semibold">
                    ${dataDetail.price}
                  </p>
                  <span className="pt-[6px] ml-1 text-[17px]">/ đêm</span>
                </div>
                <div className="pt-6 pb-6 flex flex-col relative h-[15rem]">
                  <div className="flex border-solid border-2 border-black/30 rounded-t-2xl overflow-hidden p-2 justify-between">
                    <div className="checkin w-[45%] ml-4 border-r-2 overflow-hidden">
                      <label htmlFor="">Nhận phòng</label>

                      <DatePicker
                        className="search-text"
                        selected={checkin}
                        onChange={onChangeCheckin}
                        minDate={today}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>
                    <div className="checkout w-[40%]">
                      <label htmlFor="">Trả phòng</label>

                      <DatePicker
                        className="search-text"
                        selected={checkout}
                        onChange={onChangeCheckout}
                        minDate={new Date(checkin) + 86400000}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>
                  </div>
                  <div
                    onClick={onChangeDropdown}
                    className="h-[5.8rem] border-solid border-2 border-black/30 rounded-b-2xl p-2 flex justify-between relative cursor-pointer"
                  >
                    <div className="ml-4">
                      <p className="mb-0 font-medium text-lg">KHÁCH</p>
                      <p className="text-2xl">
                        {totalGuests} khách{" "}
                        {infants > 0 ? ", " + infants + " em bé" : ""}{" "}
                        {pet > 0 ? ", " + pet + " thú cưng" : ""}
                      </p>
                    </div>
                    <div className="text-4xl mr-2 mt-3 h-9 w-9">
                      {showDropdown ? (
                        <FontAwesomeIcon
                          icon={icon({
                            name: "chevron-up",
                            family: "classic",
                            style: "solid",
                          })}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={icon({
                            name: "chevron-down",
                            family: "classic",
                            style: "solid",
                          })}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={` ${
                      showDropdown ? "" : "hidden"
                    } absolute w-[290px] h-[42rem] border-checkout-bg border-[1px] rounded-2xl top-[13.5rem] bg-white left-0 z-10`}
                  >
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="adult"
                        totalGuest={adults}
                        setTotalGuest={setAdults}
                      />
                    </div>
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="children"
                        totalGuest={children}
                        setTotalGuest={setChildren}
                      />
                    </div>
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="infants"
                        totalGuest={infants}
                        setTotalGuest={setInfants}
                      />
                    </div>
                    <div className="flex justify-between p-2">
                      <NumGuest
                        type="pet"
                        totalGuest={pet}
                        setTotalGuest={setPet}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <button
                    className="h-[4.8rem] bg-red-600 rounded-xl"
                    type="submit"
                  >
                    <p className="text-white font-medium text-3xl pt-2">
                      Đặt phòng
                    </p>
                  </button>
                </div>
                <div className="pt-6 pb-4 border-b-2">
                  <div className="flex justify-between text-lg">
                    <p className="text-[17px]">
                      {dataDetail.price} x {totalDays}
                    </p>
                    <p className="text-[17px]">
                      {dataDetail.price * totalDays}$
                    </p>
                  </div>
                  <div className="flex justify-between text-lg">
                    <p className="text-[17px]">Phí dịch vụ StayEasy</p>
                    <p className="text-[17px]">10$</p>
                  </div>
                </div>
                <div className="flex justify-between text-lg pt-6 font-semibold">
                  <p className="text-[17px]">Tổng trước thuế</p>
                  <p className="text-[17px]">
                    {dataDetail.price * totalDays + 10}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
