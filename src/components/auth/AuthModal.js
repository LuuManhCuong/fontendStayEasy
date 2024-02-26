import React, { useState } from "react";
import ButtonCustom from "./ButtonCustom";
import Dropdown from "react-bootstrap/Dropdown";

export default function AuthModal({setIsLogined}) {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isLoginModal, setisLoginModal] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  // method check email is valid
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // method show modal
  const toggleOpenPopup = () => {
    setisOpenModal(true);
  };
  
  // method hide modal
  const toggleClosePopup = () => {
    setisOpenModal(false);
    setMessage("","","");
  };

  const setMessage = (loginError, signUpError, signUpSuccess) => {
    setErrorLoginMessage(loginError);
    setErrorMessage(signUpError);
    setSuccessMessage(signUpSuccess);
  }

  // method signup
  const signup = () => {
    if (!username == "" && !password == "" && !confirmPassword == "") {
      if (isValidEmail(username)) {
        if (password === confirmPassword) {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            email: username,
            password: password,
            role: "USER",
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
            .then((response) => {
              if (response.ok) {
                return response.text();
              }
              throw Error(response.status);
            })
            .then((result) => {
              setMessage("","","Đăng kí thành công thành công. Mời bạn đăng nhập!");
              setisLoginModal(true);
            })
            .catch((error) => {
              console.error("error", error);
              setErrorMessage("error");
            });
        } else {
          setErrorMessage("Mật khẩu không khớp!");
        }
      } else {
        setErrorMessage("Email không hợp lệ!");
      }
    } else {
      setErrorMessage("Hãy nhập đầy đủ thông tin!");
    }
  };

  // method login
  const login = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.setItem("accesstoken", result.access_token);
        localStorage.setItem("user", result.user.email);
        setIsLogined(true);
        setMessage("","","");
        toggleClosePopup();
        alert("Đăng nhập thành công");
      })
      .catch((error) => {
        console.error("error", error);
        setErrorLoginMessage("Tên tài khoản hoặc mật khẩu sai!");
      });
  };

  return (
    <>
      <Dropdown.Menu>
        <Dropdown.Item>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
            </svg>
            <button className="text-2xl py-2 px-4" onClick={()=>{
                setisLoginModal(true);
                toggleOpenPopup();
                }}>
              Log in
            </button>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
            </svg>
            <button className="text-2xl py-2 px-4" onClick={()=>{
                setisLoginModal(false);
                toggleOpenPopup();
                }}>
              Sign Up
            </button>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
      {/* modal start */}
      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
          {/* close modal when click out of modal area */}
          <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={toggleClosePopup}></div>
          {/* header area start */}
          <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
            <div className="items-center font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
              {/* close modal button */}
              <button className="absolute z-100 -mr-2 text-gray-500 hover:text-gray-700" onClick={toggleClosePopup}>
                <svg xmlns="http://www.w3.org/2000/svg" height="" width="15" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <h2 className="text-3xl justify-center text-center font-semibold">
                {isLoginModal?"Đăng nhập":"Đăng ký"}
              </h2>
            </div>
            {/* header area end */}
            <hr />
            {/* body area start */}
            <div className="px-10 py-4 overflow-auto max-h-[88%] z-50">
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
              <h1 className="font-semibold mb-4">Chào mừng đến Stayeasy</h1>
              {/* form start */}
              <form>
                {/* Username */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                    Tên tài khoản<span className="text-red-500"> (*)</span>
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
                {!isLoginModal?<div className="mb-6">
                  <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                    Nhập lại mật khẩu<span className="text-red-500"> (*)</span>
                  </label>
                  <input type="password" id="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>:null}
                
                {/* button */}
                <div className="flex items-center justify-between">
                  <button onClick={isLoginModal?login:signup} type="button"
                    className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                    {isLoginModal?"Đăng nhập":"Đăng ký"}
                  </button>
                </div>
              </form>

              {/* switch modal */}
              <div className="justify-center text-center my-3">
                {isLoginModal?"Bạn chưa có tài khoản?":"Bạn đã có tài khoản?"}
                <button className="text-[#FF002C]" 
                    onClick={()=>{setisLoginModal(!isLoginModal);setMessage("","","");}}>
                    {isLoginModal?"Đăng ký":"Đăng nhập"}
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