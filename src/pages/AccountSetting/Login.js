import React, { useState } from "react";

import CommonHeader from "../../components/header/CommonHeader";
import Footer from "../../components/footer/Footer";
import ButtonCustom from "../../components/Auth/ButtonCustom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../../service/AuthService";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setisLogin] = useState(true);
  const [isSecondForm, setIsSecondForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  //Set message
  const setMessage = (loginError, signUpError, signUpSuccess) => {
    setErrorLoginMessage(loginError);
    setErrorMessage(signUpError);
    setSuccessMessage(signUpSuccess);
  };

  //Set message
  const setInputDefalut = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  var data = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
    firstName: firstName,
    lastName: lastName,
    toggleClosePopup: null,
    setIsLogined: null,
    setErrorMessage: setErrorMessage,
    setSuccessMessage: setSuccessMessage,
    setErrorLoginMessage: setErrorLoginMessage,
    setMessage: setMessage,
    setisLogin: setisLogin,
    setIsSecondForm: setIsSecondForm,
    dispatch: dispatch,
    navigate: navigate,
    location: location,
  };

  // validate form
  const validateFirstForm = () => {
    if (!firstName == "" && !lastName == "") {
      setMessage("", "", "");
      setIsSecondForm(true);
    } else {
      setErrorMessage("Vui lòng nhập thông tin!");
    }
  };

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
            {/* error message */}
            {!errorMessage == "" ? (
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{errorMessage}</span>
              </div>
            ) : (
              ""
            )}

            {/* error login message */}
            {!errorLoginMessage == "" ? (
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{errorLoginMessage}</span>
              </div>
            ) : (
              ""
            )}

            {/* success message */}
            {!successMessage == "" ? (
              <div
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative"
                role="alert"
              >
                <span class="block sm:inline">{successMessage}</span>
              </div>
            ) : (
              ""
            )}
            <h1 className="text-4xl py-[1.7rem]">Chào mừng đến Stayeasy</h1>

            {/* form start */}
            <form>
              {isLogin || isSecondForm ? (
                <>
                  {/* Username */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-800 font-medium mb-2"
                    >
                      Tên tài khoản<span className="text-red-500"> (*)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-gray-800 font-medium mb-2"
                    >
                      Mật khẩu<span className="text-red-500"> (*)</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* confirmPassword */}
                  {!isLogin ? (
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block text-gray-800 font-medium mb-2"
                      >
                        Nhập lại mật khẩu
                        <span className="text-red-500"> (*)</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                //second form register
                <>
                  {/* firstName */}
                  <div className="flex justify-between mb-6 w-full">
                    <div className="w-[45%]">
                      <label
                        htmlFor="firstName"
                        className="block text-gray-800 font-medium mb-2"
                      >
                        Họ<span className="text-red-500"> (*)</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    {/* lastName */}
                    <div className="w-[45%]">
                      <label
                        htmlFor="lastName"
                        className="block text-gray-800 font-medium mb-2"
                      >
                        Tên<span className="text-red-500"> (*)</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              {/* button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={
                    isLogin
                      ? () => {
                          login(data);
                        }
                      : isSecondForm
                      ? () => {
                          signup(data);
                        }
                      : validateFirstForm
                  }
                  type="button"
                  className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                  {isLogin
                    ? "Đăng nhập"
                    : isSecondForm
                    ? "Đăng ký"
                    : "Tiếp tục"}
                </button>
              </div>
              {/* button */}
              {isSecondForm ? (
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => {
                      setIsSecondForm(false);
                    }}
                    type="button"
                    className="mt-4 items-center bg-gray-600 hover:bg-[#4a4546] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-[50%]"
                  >
                    Quay lại
                  </button>
                </div>
              ) : (
                ""
              )}
            </form>

            {/* switch modal */}
            <div className="justify-center text-center my-3">
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
              <button
                className="text-[#FF002C]"
                onClick={() => {
                  setisLogin(!isLogin);
                  setMessage("", "", "");
                  setInputDefalut();
                  if (isLogin) {
                    setIsSecondForm(false);
                  }
                }}
              >
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
