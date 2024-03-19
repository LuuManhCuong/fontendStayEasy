import React, { useState } from "react";

import CommonHeader from '../../components/header/CommonHeader';
import Footer from '../../components/footer/Footer';
import ButtonCustom from "../../components/auth/ButtonCustom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { login, signup } from "../../redux-tookit/actions/authActions";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  
  const registerState = {
    setIsLogin: setIsLogin
  }

  const loginState = {
    navigate: navigate,
    location: location
  }

  return (
    <>
      <CommonHeader />
      {/* Body */}
      <div className="flex justify-center max-[768px]:mt-[2rem] mt-[8rem] py-[4.5rem]">
        <div className="flex flex-col justify-center w-[59rem] rounded-2xl border border-black">
          <div className="text-center">
            <h1 className="text-[1.7rem] font-bold py-[1.7rem]">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </h1>
            <hr className="m-0" />
          </div>

          {/* title */}
          <div className="px-14 py-8">

            {/* form start */}
              {isLogin ? (
                <LoginForm state={loginState}/>
                ) : (
                <RegisterForm state={registerState}/>
              )}
                

            {/* switch modal */}
            <div className="justify-center text-center my-3">
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
              <button
                className="text-[#FF002C]"
                onClick={() => {setIsLogin(!isLogin)}}>
                {isLogin ? "Đăng ký" : "Đăng nhập"}
              </button>
            </div>

            {/* line */}
            <div className="flex items-center justify-center my-3">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="mx-4 text-gray-500">hoặc</div>
              <div className="border-t border-gray-300 w-full"></div>
            </div>
            {/* other login function area start */}
            <ButtonCustom />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
