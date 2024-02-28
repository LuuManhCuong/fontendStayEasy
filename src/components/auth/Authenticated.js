import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

// Component show menu when authenticated
export default function Authenticated({ setIsLogined }) {
  // method logout
  const dispatch = useDispatch();
  const logout = () => {
    console.log("Bearer " + localStorage.getItem("access_token") != null);
    if (localStorage.getItem("access_token") != null) {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("access_token")
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/v1/auth/logout", requestOptions)
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            dispatch(counterSlice.actions.descrease());
            setIsLogined(false);
            alert("Đăng xuất thành công");
            return response.text();
          }
          throw Error(response.status);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
          alert("Đăng xuất thất bại!");
        });
    } else {
      alert("Bạn chưa đăng nhập!");
    }
  };

  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
            </svg>
            <button className="text-2xl py-2 px-4">Tin nhắn</button>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="17.5"
              viewBox="0 0 448 512"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
            <button className="text-2xl py-2 px-4">Thông báo</button>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="17.5"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <Link to="/account-settings">
              <button className="text-2xl py-2 px-4">Tài khoản</button>
            </Link>
          </div>
        </Dropdown.Item>
        <hr />
        <Dropdown.Item>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            <button className="text-2xl py-2 px-4" onClick={logout}>
              Đăng xuất
            </button>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
}
