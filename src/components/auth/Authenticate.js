import React, { useState } from "react";
import ButtonCustom from "./ButtonCustom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import { grouptSelector } from "../../redux-tookit/selector";
import { login, signup } from "../../redux-tookit/actions/authActions";

// Component show menu when not authenticate yet
// Show Popup for Login and register
export default function AuthModal() {
  const dispatch = useDispatch();

  const { isOpenLoginModal } = useSelector(grouptSelector);

  const [isLoginModal, setisLoginModal] = useState(true);
  const [isSecondForm, setIsSecondForm] = useState(false);

  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  function togglePasswordVisibility(index) {
    index===0?setIsLoginPasswordVisible((prevState) => !prevState):
    index===1?setIsRegisterPasswordVisible((prevState) => !prevState):
    setIsConfirmPasswordVisible((prevState) => !prevState)
  }

  // method show modal
  const toggleOpenPopup = () => {
    dispatch(grouptSlice.actions.openLoginForm());
  };

  // method hide modal
  const toggleClosePopup = () => {
    dispatch(grouptSlice.actions.openLoginForm());
    setMessage("", "", "");
  };

  //Set message
  const setMessage = (loginError, signUpError, signUpSuccess) => {
    setErrorLoginMessage(loginError);
    setErrorMessage(signUpError);
    setSuccessMessage(signUpSuccess);
  };

  //Set message
  const setInputDefalut = () => {
    setUsername("");
    setLoginPassword("");
    setRegisterPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
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

  var data = {
    username: username,
    loginPassword: loginPassword,
    registerPassword: registerPassword,
    confirmPassword: confirmPassword,
    firstName: firstName,
    lastName: lastName,
    toggleClosePopup: toggleClosePopup,
    setErrorMessage: setErrorMessage,
    setSuccessMessage: setSuccessMessage,
    setErrorLoginMessage: setErrorLoginMessage,
    setMessage: setMessage,
    setisLogin: setisLoginModal,
    setIsSecondForm: setIsSecondForm,
    dispatch: dispatch,
    location: null,
  };

  const handleLogin = () => {
    dispatch(login(data));
  };

  const handleSignup = () => {
    dispatch(signup(data));
  };

  return (
    <>
      <Dropdown.Menu className="w-[23rem] h-[fit] border-white rounded-full shadow-lg px-0">
        <Dropdown.Item>
          <div className="w-full" onClick={() => {
                setisLoginModal(true);
                toggleOpenPopup();
              }}>
            <p className="text-2xl font-medium mt-2 px-2">Đăng nhập</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="w-full" onClick={() => {
              setisLoginModal(false);
              toggleOpenPopup();
            }}>
            <p className="text-2xl mt-2 px-2">Đăng ký</p>
          </div>
        </Dropdown.Item>
        <hr/>
        <Dropdown.Item>
          <div className="w-full" onClick="">
            <p className="text-2xl mt-2 px-2">Cho thuê chỗ ở qua Stayeasy</p>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="w-full" onClick="">
            <p className="text-2xl mt-2 px-2">Trung tâm trợ giúp</p>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
      {/* modal start */}
      {isOpenLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto">
          {/* close modal when click out of modal area */}
          <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={toggleClosePopup}></div>
          {/* header area start */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden z-50 max-[2700px]:max-w-[37%] max-[1440px]:max-w-[50%] max-[1100px]:max-w-[53%] max-[970px]:max-w-[57%] max-[470px]:max-w-[70%] w-full h-[90%]">
            <div className="items-center font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
              {/* close modal button */}
              <button className="absolute -mr-2 text-gray-500 hover:text-gray-700" onClick={toggleClosePopup}>
                <svg xmlns="http://www.w3.org/2000/svg" height="" width="15" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <h2 className="text-3xl justify-center text-center font-semibold">
                {isLoginModal ? "Đăng nhập" : "Đăng ký"}
              </h2>
            </div>
            {/* header area end */}

            <hr />
            {/* body area start */}
            <div className="px-10 py-4 overflow-auto max-h-[88%] max-h-[200px]:max-h-[30%] z-50">
              {/* error message */}
              {!errorMessage == "" ? (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative" role="alert">
                  <span class="block sm:inline">{errorMessage}</span>
                </div>
              ) : ("")}

              {/* error login message */}
              {!errorLoginMessage == "" ? (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative" role="alert">
                  <span class="block sm:inline">{errorLoginMessage}</span>
                </div>
              ) : ("")}

              {/* success message */}
              {!successMessage == "" ? (
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative" role="alert">
                  <span class="block sm:inline">{successMessage}</span>
                </div>
              ) : ("")}

              {/* body title */}
              <h1 className="font-semibold mb-4 max-[413px]:text-center">Chào mừng đến Stayeasy</h1>

              {/* form start */}
              <>
                {isLoginModal || isSecondForm ? (
                  <>
                    {/* Username */}
                    <div className="mb-4">
                      <label className="block text-gray-800 font-medium mb-2">Email<span className="text-red-500"> (*)</span></label>
                      <input type="text"
                      value={username}
                      className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}/>
                    </div>
                    {!isLoginModal ? (
                      <>
                        <div className="mb-6">
                          <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                            Mật khẩu<span className="text-red-500"> (*)</span>
                          </label>
                          <div className="relative">
                            <input type={isRegisterPasswordVisible ? "text" : "password"}
                            value={registerPassword} required
                            className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                            onChange={(e) => {
                              setRegisterPassword(e.target.value);
                            }}/>
                            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(1)}}>
                                {isRegisterPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                                )}
                            </button>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                            Nhập lại mật khẩu <span className="text-red-500"> (*)</span>
                          </label>
                          <div className="relative">
                            <input type={isConfirmPasswordVisible ? "text" : "password"}
                            value={confirmPassword} required
                            className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                            }}/>
                            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(2)}}>
                                {isConfirmPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                                )}
                            </button>
                          </div>
                        </div>
                      </>
                    ) : 
                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                        Mật khẩu<span className="text-red-500"> (*)</span>
                      </label>
                      <div className="relative">
                        <input type={isLoginPasswordVisible ? "text" : "password"}
                        value={loginPassword}
                        className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                        }}/>
                        <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(0)}}>
                            {isLoginPasswordVisible ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                            )}
                        </button>
                      </div>
                    </div>
                    }
                  </>
                ) : (
                  //second form register
                  <>
                    {/* firstName */}
                    <div className="flex justify-between mb-6 w-full">
                      <div className="w-[45%]">
                        <label htmlFor="firstName" className="block text-gray-800 font-medium mb-2">Họ<span className="text-red-500"> (*)</span></label>
                        <input type="email" id="email"
                        value={firstName}
                        required
                        className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}/>
                      </div>
                      {/* lastName */}
                      <div className="w-[45%]">
                        <label htmlFor="lastName" className="block text-gray-800 font-medium mb-2">Tên<span className="text-red-500"> (*)</span></label>
                        <input type="email" id="email"
                          value={lastName}
                          required
                          className="border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full"
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}/>
                      </div>
                    </div>
                  </>
                )}
                {/* button */}
                <div className="flex items-center justify-between">
                  <button onClick={isLoginModal
                        ? () => { handleLogin() }
                        : isSecondForm
                        ? () => { handleSignup() }
                        : validateFirstForm
                    } type="button"
                    className="bg-[#da0964] hover:bg-[#ff002bda] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                    {isLoginModal
                      ? "Đăng nhập"
                      : isSecondForm
                      ? "Đăng ký"
                      : "Tiếp tục"}
                  </button>
                </div>
                {/* button */}
                {isSecondForm ? (
                  <div className="flex justify-center items-center">
                    <button onClick={() => {setIsSecondForm(false)}}type="button"
                      className="mt-4 items-center bg-gray-600 hover:bg-[#4a4546] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-[50%]">
                      Quay lại
                    </button>
                  </div>
                ) : ("")}
              </>

              {/* switch modal */}
              <div className="justify-center text-center my-3">
                {isLoginModal
                  ? "Bạn chưa có tài khoản?"
                  : "Bạn đã có tài khoản?"}
                <button
                  className="text-[#FF002C]"
                  onClick={() => {
                    setisLoginModal(!isLoginModal);
                    setMessage("", "", "");
                    setInputDefalut();
                    if (isLoginModal) {
                      setIsSecondForm(false);
                    }
                  }}>
                  {isLoginModal ? "Đăng ký" : "Đăng nhập"}
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
      )}
    </>
  );
}