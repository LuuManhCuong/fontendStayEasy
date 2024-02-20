import Carousal from "@itseasy21/react-elastic-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPropertyById } from "../redux/actions/PropertyAction";
import Header from "../components/header/Header";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.propertyReducer);
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
  };

  return (
    <>
      <Header page={"home"}></Header>
      <div className="w-full box-border pl-20 pr-20">
        <div className="w-full h-[500px] flex justify-center">
          <Carousal style={style}>
            {detail.imagesList?.map((item) => (
              <img style={styleImg} key={item.id} src={item.url} />
            ))}
          </Carousal>
        </div>
        <div className="w-full flex justify-between ml-24 mr-24">
          {/* left */}
          <div className="w-[55%] pl-6 box-border">
            {/* info */}
            <div className="pt-6 pb-6 border-b-2">
              <div className="text-2xl font-medium">
                <p>{detail.propertyName}</p>
              </div>
              <div className="text-xl font-medium mt-2">
                <p>{detail.address}</p>
              </div>
              <div className="flex mt-2 text-[17px] font-normal justify-between w-96">
                <p>{detail.numGuests} khách</p>
                <span>-</span>
                <p>{detail.numBedrooms} phòng ngủ</p>
                <span>-</span>
                <p>{detail.numBeds} giường</p>
                <span>-</span>
                <p>{detail.numBathrooms} phòng tắm</p>
              </div>
              <div className="rating text-lg font-semibold flex pt-4">
                <p>{detail.rating}</p>
                <FontAwesomeIcon
                  className="pt-[2px] text-yellow-300 stroke-black ml-[2px]"
                  size="lg"
                  icon={icon({
                    name: "star",
                    family: "classic",
                    style: "solid",
                  })}
                />
              </div>
            </div>

            {/* info-host */}
            <div className="w-full pt-6 pb-6 flex justify-items-center border-b-2">
              <div className="w-12 h-12">
                <img src={detail.owner?.avatar} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-semibold">
                  <p>
                    Hosted by {detail.owner?.firstName} {detail.owner?.lastName}
                  </p>
                </div>
                <div className="text-base">
                  <p>Chủ nhà siêu cấp 4 năm kinh nghiệm đón tiếp khách</p>
                </div>
              </div>
            </div>

            {/* info-service */}
            <div className="w-full h-64 pt-6 pb-6 flex flex-col border-b-2 justify-between">
              <div className="flex justify-items-center">
                <FontAwesomeIcon
                  className="stroke-slate-950 p-2"
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
                  className="stroke-slate-950 p-2"
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
                  className="stroke-slate-950 p-2"
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
                <p>{detail.description}</p>
              </div>
            </div>
          </div>
          {/* end-left */}

          {/* right */}
          <div className="w-[40%]">
            <div className="w-[350px] h-[450px] rounded-2xl shadow-checkout-shadow border-[#e9eaee] border-[1px]">
              <div className="p-5">
                <div className="flex justify-items-center">
                  <p className="text-2xl font-semibold">${detail.price}</p>
                  <span className="pt-[6px] ml-1 text-[16px]">/ đêm</span>
                </div>
                <div className="pt-6 pb-6 flex flex-col justify-between">
                  <input type="text" className="border-black border-[1px]" />
                  <input
                    type="text"
                    className="border-black border-[1px] mt-3"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <button className="h-12 bg-red-600 rounded-xl" type="submit">
                    <p className="text-white font-medium">Đặt phòng</p>
                  </button>
                </div>
                <div className="pt-6 pb-4 border-b-2">
                  <div className="flex justify-between text-lg">
                    <p>{detail.price} x 5 đêm</p>
                    <p>$50</p>
                  </div>
                  <div className="flex justify-between text-lg">
                    <p>Phí dịch vụ StayEasy</p>
                    <p>$10</p>
                  </div>
                </div>
                <div className="flex justify-between text-lg pt-6 font-semibold">
                  <p>Tổng trước thuế</p>
                  <p>$60</p>
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
