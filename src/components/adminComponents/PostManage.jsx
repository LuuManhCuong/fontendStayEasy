import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function PostManage() {
  const [data, setData] = useState([]);
  const [keySearch, setKeySearch] = useState("");
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
          console.log(res.status);
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

  const handleSearch = () => {
    console.log("keySearch: ", keySearch);
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/admin/property/search?keySearch=${keySearch}`
      )
      .then(function (response) {
        console.log("response: ", response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };

  return (
    <div className="mx-4">
      <div className="mb-4">
        <h2>Danh sách phòng</h2>
        <div className="flex justify-start border-2 border-black w-[30%] rounded-full p-2">
        <input
              type="text"
              className="search-text pl-4 rounded-lg w-[90%]"
              value={keySearch}
              onChange={(e) => {
                setKeySearch(e.target.value);
              }}
              id="keySerch"
              name="keySearch"
              placeholder="Tìm kiếm"
            />
          <SearchIcon
            onClick={handleSearch}
            className="cursor-pointer p-2 bg-primary text-white rounded-full"
            style={{ width: "30px", height: "30px" }}
          ></SearchIcon>
        </div>
       
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Property Info</th>
            <th scope="col">Owner</th>
            <th scope="col">Address</th>
            <th scope="col">Price</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((index) => (
            <tr key={index.propertyId}>
              <td scope="row" className="p-4">
                <div className="flex justify-start items-center">
                  <div>
                    <img
                      src={index.thumbnail}
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="ml-6">
                    <p className="text-3xl font-semibold m-0">{index.propertyName}</p>
                  </div>
                </div>
              </td>
              <td scope="row" className="align-middle">
              <div className="flex justify-start items-center">
                  <div className="w-[5rem] h-[5rem] rounded-full overflow-hidden">
                    <img
                      src={index.owner.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-6">
                    <p className="text-3xl font-semibold m-0">{`${index.owner.firstName} ${index.owner.lastName}`}</p>
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
                <button
                  onClick={() => handleDelete(index.propertyId)}
                  className="bg-danger text-white p-2 rounded text-3xl "
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
