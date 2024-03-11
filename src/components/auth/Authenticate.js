import React, { useContext, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import { grouptSelector } from "../../redux-tookit/selector";
import { login, signup } from "../../redux-tookit/actions/authActions";
import { UserContext } from "../UserContext";

// Component show menu when not authenticate yet
// Show Popup for Login and register
export default function AuthModal() {
  const dispatch = useDispatch();

  const isAuthenticated = useContext(UserContext).isAuthenticated;
  const user = useContext(UserContext).user;

  const { isOpenLoginModal } = useSelector(grouptSelector);

  const [isLoginModal, setisLoginModal] = useState(true);
  const [isSecondForm, setIsSecondForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

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
    setPassword("");
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
    password: password,
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
              <form>
                {isLoginModal || isSecondForm ? (
                  <>
                    {/* Username */}
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                        Email<span className="text-red-500"> (*)</span>
                      </label>
                      <input type="email" id="email"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    {/* Password */}
                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                        Mật khẩu<span className="text-red-500"> (*)</span>
                      </label>
                      <input type="password" id="password"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {/* confirmPassword */}
                    {!isLoginModal ? (
                      <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                          Nhập lại mật khẩu <span className="text-red-500"> (*)</span>
                        </label>
                        <input type="password" id="password"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                      </div>
                    ) : null}
                  </>
                ) : (
                  //second form register
                  <>
                    {/* firstName */}
                    <div className="flex justify-between mb-6 w-full">
                      <div className="w-[45%]">
                        <label htmlFor="firstName" className="block text-gray-800 font-medium mb-2">
                          Họ<span className="text-red-500"> (*)</span>
                        </label>
                        <input type="text" id="firstName"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                      </div>
                      {/* lastName */}
                      <div className="w-[45%]">
                        <label htmlFor="lastName" className="block text-gray-800 font-medium mb-2">
                          Tên<span className="text-red-500"> (*)</span>
                        </label>
                        <input type="text" id="lastName"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
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
              </form>

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
