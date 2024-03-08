import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListProperty() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/stayeasy/property`
      );

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("da xay ra loi: ", error);
    }
  };

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
    <div className="mx-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Danh sách phòng</h2>
        <Link to="/property/add">
          <button type="button" className="bg-success text-white p-2 rounded">
            Thêm phòng
          </button>
        </Link>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Property Id</th>
            <th scope="col">Property name</th>
            <th scope="col">Address</th>
            <th scope="col">Price</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((index) => (
            <tr key={index.propertyId}>
              <th scope="row">{index.propertyId}</th>
              <td>{index.propertyName}</td>
              <td>{index.address}</td>
              <td>{index.price}</td>
              <td>
                {/* <Link to={`/property/list-property/delete/${index.propertyId}`}> */}
                <button
                  onClick={() => handleDelete(index.propertyId)}
                  className="bg-danger text-white me-3 p-2 rounded"
                >
                  Xóa
                </button>
                {/* </Link> */}
                <Link to={`/property/update/${index.propertyId}`}>
                  <button className="bg-warning text-white p-2 rounded">
                    Sửa
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
