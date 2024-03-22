import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { logout } from "../../redux-tookit/actions/authActions";

// Component show menu when authenticated
export default function Authenticated() {
  const navigate = useNavigate();

  // method logout
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <>
      <Dropdown.Menu className="w-[23rem] h-[fit] border-white rounded-full shadow-lg">
        <Dropdown.Item>
          <Link to={"/inbox"} className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">Tin nhắn</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/trips" className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">Chuyến đi</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="flex items-center">
            <BookmarkIcon height={20} width={17.5} />
            <Link to="/property/list">
              <button className="text-2xl py-2 px-4">Sản phẩm của tôi</button>
            </Link>
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
          <Link className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">
              Danh sách yêu thích
            </p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link className="w-full">
            <p className="text-2xl font-medium px-2 mt-2">Thông báo</p>
          </Link>
        </Dropdown.Item>
        <hr />
        <Dropdown.Item>
          <Link to="/account-settings" className="w-full">
            <p className="text-2xl px-2 mt-2">Cho thuê chỗ ở qua Stayeasy</p>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/account-settings" className="w-full">
            <p className="text-2xl px-2 mt-2">Tài khoản</p>
          </Link>
        </Dropdown.Item>
        <hr />
        <Dropdown.Item>
          <div className="w-full">
            <p className="text-2xl mt-2 px-2">Trung tâm trợ giúp</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div
            onClick={() => {
              handleLogout();
            }}
            className="w-full"
          >
            <p className="text-2xl mt-2 px-2">Đăng xuất</p>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
}
