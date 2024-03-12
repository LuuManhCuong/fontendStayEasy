import axios from "axios";
import React from "react";
import "./common.scss";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";

export default function PostManage() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState();
  const [dataCalendar, setDataCalendar] = useState([]);
  // console.log("active: ", active);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/property`
      );

      if (response.status === 200) {
        setData(response.data);
        // console.log(response.data);
        setActive(response.data[0].propertyId);
      }
    } catch (error) {
      console.error("da xay ra loi: ", error);
    }
  };

  // useEffect(() => {
  //   if (active) {
  //     axios
  //       .get(
  //         `http://localhost:8080/api/v1/stayeasy/admin/booking?propertyId=${active}`
  //       )
  //       .then(function (response) {
  //         // console.log("data: ", response.data);
  //         setDataCalendar(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [active]);

  // get data
  useEffect(() => {
    fetchData();
  }, []);

  // handle delete property
  const handleDelete = (propertyId) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");

    // If the user confirms, proceed with the deletion
    if (isConfirmed) {
      fetch(
        `http://localhost:8080/api/v1/stayeasy/property/delete/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            alert(`Xóa không thành công: ${propertyId}`);
            throw new Error(`Xóa không thành công: ${res.status}`);
          }
          // console.log(res.status);
          // Update the state with the new property list
          fetchData();
          // alert(`Xóa thành công: ${propertyId}`);
        })
        .catch((e) => console.error("Lỗi khi xóa: ", e));
    } else {
      // If the user cancels, show a message
      alert(`Đã hủy xóa: ${propertyId}`);
    }
  };

  return (
    <>
    <div className="px-4">
      <h1>Danh sách phòng</h1>
      <table className="bg-white w-full rounded-xl">
        <thead>
          <tr>
            <th className="p-4" scope="col">Property Info</th>
            <th className="py-4" scope="col">Address</th>
            <th className="py-4" scope="col">Price</th>
            <th className="py-4" scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((index) => (
            <tr key={index.propertyId}>
              <td scope="row" className="p-4 justify-center">
                  <div>
                    <img src={index.thumbnail} alt="" style={{ width: "100px", height: "100px" }}/>
                    <p className="text-3xl font-semibold mt-2">{index.propertyName}</p>
                </div>
              </td>
              <td className="align-middle">
                <div className="flex w-full h-full justify-start items-center">
                  <p className="text-3xl m-0">{index.address}</p>
                </div>
              </td>
              <td className="align-middle">
                <div className="flex w-full h-full justify-start items-center">
                  <p className="text-3xl m-0">{index.price}</p>
                </div>
              </td>
              <td className="align-middle">
                <button onClick={() => handleDelete(index.propertyId)} className="bg-danger text-white p-2 rounded text-3xl">
                  <td scope="row" className="p-4">
                    <div className="flex justify-start items-center">
                      <div>
                        <img src={index.thumbnail} alt="" style={{ width: "100px", height: "100px" }}/>
                      </div>
                      <div className="ml-6">
                        <p className="text-3xl font-semibold m-0">
                          {index.propertyName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="flex w-full h-full justify-start items-center">
                      <p className="text-3xl m-0">{index.address}</p>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="flex w-full h-full justify-start items-center">
                      <p className="text-3xl m-0">{index.price}</p>
                    </div>
                  </td>
                  <td className="align-middle">
                    {/* <Link to={`/property/list-property/delete/${index.propertyId}`}> */}
                    <button onClick={() => handleDelete(index.propertyId)} className="bg-danger text-white p-2 rounded text-3xl">
                      Xóa
                    </button>
                  </td>
                </button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
    <Col xs={4}>
      <Calendar propertyId={active}></Calendar>
    </Col>
    </>
  );
}
