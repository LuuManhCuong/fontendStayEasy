import React from "react";
import { useState } from "react";

export default function AddProperty() {
  const [propertyName, setPropertyName] = useState();
  const [address, setAddress] = useState();
  const [price, setPrice] = useState();

  const saveProperty = async (e) => {
    e.preventDefault();

    let data = { propertyName, address, price };

    // console.log("data body: ",data);

    try {
      const response = await fetch(`http://localhost:8080/api/property/add`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Property added successfully:", result);
      } else {
        console.error("Failed to add property. Status:", response.status);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div className="mx-4 my-2">
      <h2> Thêm tài sản</h2>

      <form className="row g-3">
        {/* owner */}
        <div className="col-md-6">
          <label htmlFor="owner" className="form-label">
            Chủ sở hữu
          </label>
          <input
            type="text"
            className="form-control"
            id="owner"
            name="owner"
            // value={propertyName}
            // onChange={(e) => setPropertyName(e.target.value)}
          />
        </div>

        {/* name */}
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Tên tài sản
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </div>
        {/* address */}

        <div className="col-md-12 d-flex">
          {/* tỉnh / thành phố */}
          <div className="col-md-3">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <select
              className="form-select overflow-y-auto"
              aria-label="Disabled select example"
              disabled=""
            >
              <option selected="">Tỉnh/Thành phố</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
              <option value={3}>Three</option>
              <option value={3}>Three</option>
              <option value={3}>Three</option>
            </select>
          </div>
          {/* quận/ huyện */}
          <div className="col-md-3">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              placeholder="Quận/Huyện"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* phường/xã */}
          <div className="col-md-3">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              placeholder="Phường/Xã"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* địa chỉ cụ thể */}
          <div className="col-md-3">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              placeholder="Địa chỉ cụ thể"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* price */}
        <div className="col-6">
          <label className="form-label">Giá</label>
          <div className="col-6 input-group">
            <span className="input-group-text">$</span>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            />
            <span className="input-group-text">.00</span>
          </div>
        </div>

        {/* description */}
        <div className="col-6">
          <label htmlFor="descripton" className="form-label">
            Mô tả
          </label>
          <textarea
            type="text"
            className="form-control"
            id="descripton"
            name="descripton"
            // value={descripton}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* num guest */}

        <div className="col-12">
          <button
            onClick={(e) => saveProperty(e)}
            type="submit"
            className="bg-primary text-white p-2 rounded"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}
