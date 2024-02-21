import Carousal from "@itseasy21/react-elastic-carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { getPropertyById, getPropertyImageById } from "../../redux/actions/PropertyAction";
import NumGuest from "../../components/numguest/NumGuest";
function Detail() {
  const { detail } = useSelector(state => state.propertyReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  var currentURL = window.location.href;
  var url = new URL(currentURL);

  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);

  const today = new Date();
  let timeStamp = today.getTime() + 86400000;

  const [totalGuests, setTotalGuests] = useState(1);
  const [checkin, setCheckin] = useState(urlParams.get('checkin') ? new Date(urlParams.get('checkin')) : today);
  const [checkout, setCheckout] = useState(urlParams.get('checkout') ? new Date(urlParams.get('checkout')) : new Date(timeStamp));
  const [adults, setAdults] = useState(parseInt(urlParams.get('adults')));
  const [children, setChildren] = useState(parseInt(urlParams.get('children')));
  const [infants, setInfants] = useState(parseInt(urlParams.get('infants')));
  const [pet, setPet] = useState(parseInt(urlParams.get('pet')));
  const [totalDays, setTotalDays] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  

  useEffect(() => {
    // Tính số ngày giữa checkin và checkout
    const newTotalDays = Math.ceil((checkout.getTime() - checkin.getTime()) / 86400000); // Đảm bảo rằng giá trị totalDays đã được tính toán đúng

    // Cập nhật totalDaysState
    setTotalDays(newTotalDays);
  }, [checkin, checkout]);  

  const onChangeCheckin = (date) => {
    setCheckin(date);
    url.searchParams.set('checkin', date);
    window.history.replaceState({}, '', url);
    
  }

  const onChangeCheckout = (date) => {
    setCheckout(date);
    url.searchParams.set('checkout', date);
    window.history.replaceState({}, '', url);
    
  }

  const onChangeDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  const onChangeTotalFinal = () => {
    console.log('truoc',adults, children, infants, pet);
    setTotalGuests(adults + children + infants + pet);
    console.log('sau',adults, children, infants, pet);
    console.log(totalGuests);
  }

  useEffect(() => {
    setCheckout(new Date(checkin.getTime() + 86400000));
  }, [checkin]);

  useEffect(() => {
    const action = getPropertyById(id);
    dispatch(action);
  }, []);
  const style = {
    width: "1200px",
    height: "500px",
    objectFit: "contain",
  };
  const styleImg = {
    width: "100%",
    height: "600px",
    objectFit: "contain",
  }

  return (
    <div className="w-full box-border pl-20 pr-20">
      <div className="w-full h-[500px] flex justify-center" key={id}>
        <Carousal style={style}>
          {detail.imagesList?.map(item => <img style={styleImg} key={item.id} src={item.url} />)}
        </Carousal>
      </div>
      <div className="w-full flex justify-between ml-24 mr-24">
        {/* left */}
        <div className="w-[55%] pl-6 box-border">
          {/* info */}
          <div className="pt-6 pb-6 border-b-2">
            <div className="text-4xl font-medium">
              <p>{detail.propertyName}</p>
            </div>
            <div className="text-3xl font-medium mt-2">
              <p>{detail.address}</p>
            </div>
            <div className="flex mt-2 text-[17px] font-normal justify-between w-[38rem]">
              <p>
                {detail.numGuests} khách
              </p>
              <span>-</span>
              <p>
                {detail.numBedrooms} phòng ngủ
              </p>
              <span>-</span>
              <p>
                {detail.numBeds} giường
              </p>
              <span>-</span>
              <p>
                {detail.numBathrooms} phòng tắm
              </p>
            </div>
            <div className="rating text-lg font-semibold flex pt-4">
              <p className="text-4xl">{detail.rating}</p>
              <FontAwesomeIcon className=" text-yellow-300 stroke-black ml-[2px]" size="2x" icon={icon({name: 'star', family: 'classic', style: 'solid'})} />
            </div>
          </div>

          {/* info-host */}
            <div className="w-full pt-6 pb-6 flex justify-items-center border-b-2">
              <div className="w-[4.8rem] h-[4.8rem]">
                <img src={detail.owner?.avatar} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-semibold">
                  <p className="text-[17px]">Hosted by {detail.owner?.firstName} {detail.owner?.lastName}</p>
                </div>
                <div className="text-base">
                  <p className="text-[17px]">Chủ nhà siêu cấp 4 năm kinh nghiệm đón tiếp khách</p>
                </div>
              </div>
            </div>

          {/* info-service */}
            <div className="w-full h-[25rem] pt-6 pb-6 flex flex-col border-b-2 justify-between">
                <div className="flex justify-items-center">
                    <FontAwesomeIcon className="stroke-slate-950 p-[0.8rem]" color="white" size="2x" icon={icon({name: 'puzzle-piece', family: 'classic', style: 'solid'})} />
                    <div className="ml-3">
                        <p>Hủy miễn phí trước</p>
                        <p>Được hoàn tiền đầy đủ nếu bạn thay đổi kế hoạch.</p>
                    </div>
                </div>
                <div className="flex">
                    <FontAwesomeIcon className="stroke-slate-950 p-[0.8rem]" color="white" size="2x" icon={icon({name: 'puzzle-piece', family: 'classic', style: 'solid'})} />
                    <div className="ml-3">
                        <p>Không gian riêng để làm việc</p>
                        <p>Một căn phòng có Wi-fi, rất phù hợp để làm việc.</p>
                    </div>
                </div>
                <div className="flex">
                    <FontAwesomeIcon className="stroke-slate-950 p-[0.8rem]" color="white" size="2x" icon={icon({name: 'puzzle-piece', family: 'classic', style: 'solid'})} />
                    <div className="ml-3">
                        <p>Tự nhận phòng</p>
                        <p>Tự nhận phòng bằng cách nhập mã số vào cửa.</p>
                    </div>
                </div>
            </div>

          {/* info-detail */}
            <div className="w-full pt-6 pb-6 border-b-2 ">
              <div>
                <p className="text-[17px]">{detail.description}</p>
              </div>
          </div>
            
        </div>
        {/* end-left */}

        {/* right */}
        <div className="w-[40%]">
          <div className="w-[350px] h-[450px] rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px]">
              <div className="p-5 pt-4">
                  <div className="flex justify-items-center">
                      <p className="text-[2.4rem] font-semibold">${detail.price}</p>
                      <span className="pt-[6px] ml-1 text-[17px]">/ đêm</span>
                  </div>
                  <div className="pt-6 pb-6 flex flex-col relative h-[20rem]">
                    <div className="flex border-solid border-2 border-black/30 rounded-t-2xl overflow-hidden p-2 justify-between">
                        <div className="checkin w-[45%] ml-4 border-r-2 overflow-hidden">
                          <label htmlFor="">Nhận phòng</label>

                          <DatePicker
                            className="search-text"
                            selected={checkin}
                            onChange={onChangeCheckin}
                            minDate={today}
                          />
                        </div>
                        <div className="checkout w-[40%]">
                          <label htmlFor="">Trả phòng</label>

                          <DatePicker
                            className="search-text"
                            selected={checkout}
                            onChange={onChangeCheckout}
                            minDate={checkin.getTime() + 86400000}
                          />
                        </div>
                    </div>
                    <div onClick={onChangeDropdown} className="h-[5.8rem] border-solid border-2 border-black/30 rounded-b-2xl p-2 flex justify-between relative">
                        <div className="ml-4">
                          <p className="mb-0 font-medium text-lg">KHÁCH</p>
                          <p className="text-2xl">{totalGuests} khách</p>
                        </div>
                        <div className="text-4xl mr-2 mt-3 h-9 w-9">
                          {showDropdown 
                          ? <FontAwesomeIcon icon={icon({name: 'chevron-up', family: 'classic', style: 'solid'})} /> 
                          : <FontAwesomeIcon icon={icon({name: 'chevron-down', family: 'classic', style: 'solid'})} />}
                        </div>
                    </div>
                    <div className="absolute w-[290px] h-[42rem] border-checkout-bg border-[1px] rounded-2xl top-[13.5rem] bg-white left-0 z-10">
                            <div className="flex justify-between p-2">
                              <NumGuest type="adult" totalGuest={adults} setTotalGuest={setAdults} onChangeTotalFinal={onChangeTotalFinal} />
                            </div>
                            <div className="flex justify-between p-2">
                              <NumGuest type="children" totalGuest={children} setTotalGuest={setChildren} onChangeTotalFinal={onChangeTotalFinal} />
                              </div>
                            <div className="flex justify-between p-2">
                              <NumGuest type="infants" totalGuest={infants} setTotalGuest={setInfants} onChangeTotalFinal={onChangeTotalFinal} />
                              </div>
                            <div className="flex justify-between p-2">
                              <NumGuest type="pet" totalGuest={pet} setTotalGuest={setPet} onChangeTotalFinal={onChangeTotalFinal} />
                              </div>
                        </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <button className="h-[4.8rem] bg-red-600 rounded-xl" type="submit"><p className="text-white font-medium text-3xl pt-2">Đặt phòng</p></button>
                  </div>
                  <div className="pt-6 pb-4 border-b-2" >
                    <div className="flex justify-between text-lg">
                      <p className="text-[17px]">{detail.price} x {totalDays}</p>
                      <p className="text-[17px]">{detail.price*totalDays}</p>
                    </div>
                    <div className="flex justify-between text-lg">
                      <p className="text-[17px]">Phí dịch vụ StayEasy</p>
                      <p className="text-[17px]">$10</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg pt-6 font-semibold">
                      <p className="text-[17px]">Tổng trước thuế</p>
                      <p className="text-[17px]">$60</p>
                    </div>
              </div>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;