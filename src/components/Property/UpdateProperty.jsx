import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateProperty() {
  const navigate = useNavigate();

  const { propertyId } = useParams();

  const [property, setProperty] = useState({
    propertyName: "",
    address: "",
    price: "",
  });

  const { propertyName, address, price } = property;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const loadData = async() => {
    const result = await axios.get(`http://localhost:8080/api/property/${propertyId}`);
    setProperty(result.data);
  }

  useEffect(() => {
    loadData();
  },[])


  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:8080/api/property/edit/${propertyId}`,
      property
    );
    setProperty(res.data);
    navigate("/property/list-property");
  };

  return (
    <div className="mx-4 my-2">
      <h2> Cập nhật tài sản</h2>

      <form className="row g-3" onSubmit={(e) => onSubmit(e)}>
        <div className="col-md-6">
          <label htmlFor="propertyName" className="form-label">
            Tên tài sản
          </label>
          <input
            type="text"
            className="form-control"
            id="propertyName"
            name="propertyName"
            value={propertyName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={address}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="price" className="form-label">
            Giá
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="bg-primary text-white p-2 rounded">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
