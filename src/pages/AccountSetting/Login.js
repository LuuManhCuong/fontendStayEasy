import React, { useState } from 'react';
import CommonHeader from '../../components/header/CommonHeader';
import Footer from '../../components/footer/Footer';
import ButtonCustom from "../../components/Auth/ButtonCustom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import { grouptSelector } from "../../redux-tookit/selector";

export default function Login() {
  const dispatch = useDispatch();

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

  // method check email is valid
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

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
  const validateFirstForm = ()=>{
    if (!username == "" && !password == "" && !confirmPassword == "") {
      if (isValidEmail(username)) {
        if (password === confirmPassword) {
          setIsSecondForm(true);
        } else {
          setErrorMessage("Mật khẩu không khớp!");
        }
      } else {
        setErrorMessage("Email không hợp lệ!");
      }
    } else {
      setErrorMessage("Hãy nhập đầy đủ thông tin!");
    }
  }

  // method signup
  const signup = () => {
    if (!firstName == "" && !lastName == "") {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
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
          setisLogin(true);
        })
        .catch((error) => {
          console.error("error", error);
          setErrorMessage("error");
        }); 
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
        localStorage.setItem("access_token", JSON.stringify(result.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(result.refresh_token));
        localStorage.setItem("user", JSON.stringify(result.user));

        dispatch(counterSlice.actions.increase());
        dispatch(grouptSlice.actions.openLoginForm());
        
        setMessage("", "", "");
        alert("Đăng nhập thành công");
      })
      .catch((error) => {
        console.error("error", error);
        setErrorLoginMessage("Tên tài khoản hoặc mật khẩu sai!");
      });
  };

  return (
    <>
      <CommonHeader/>
      {/* Body */}
      <div className='flex justify-center max-[768px]:mt-[2rem] mt-[8rem] py-[4.5rem]'>
        <div className='flex flex-col justify-center w-[59rem] rounded-2xl border border-black'>
          <div className='text-center'>
            <h1 className='text-[1.7rem] font-bold py-[1.7rem]'>{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
            <hr className='m-0'/>
          </div>

          {/* title */}
          <div className='px-14 py-8'>
            {/* error message */}
            {!errorMessage == "" ? (
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative" role="alert">
                <span class="block sm:inline">{errorMessage}</span>
              </div>
            ) : ("")}

            {/* error login message */}
            {!errorLoginMessage == "" ? (
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative"role="alert">
                <span class="block sm:inline">{errorLoginMessage}</span>
              </div>
            ) : ("")}

            {/* success message */}
            {!successMessage == "" ? (
              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative" role="alert">
                <span class="block sm:inline">{successMessage}</span>
              </div>
            ) : ("")}
            <h1 className='text-4xl py-[1.7rem]'>Chào mừng đến Stayeasy</h1>

            {/* form start */}
            <form>
              {isLogin || !isSecondForm?
                <>
                {/* Username */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                    Tên tài khoản<span className="text-red-500"> (*)</span>
                  </label>
                  <input type="email" id="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"value={username}onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                {/* Password */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                    Mật khẩu<span className="text-red-500"> (*)</span>
                  </label>
                  <input type="password" id="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {/* confirmPassword */}
                {!isLogin ? (
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                      Nhập lại mật khẩu
                      <span className="text-red-500"> (*)</span>
                    </label>
                    <input type="password" id="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                  </div>
                ) : null}
                </>
              :
              //second form register
                <>
                {/* firstName */}
                <div className='flex justify-between mb-6 w-full'>
                  <div className="w-[45%]">
                    <label htmlFor="firstName" className="block text-gray-800 font-medium mb-2">
                      Họ<span className="text-red-500"> (*)</span>
                    </label>
                    <input type="text" id="firstName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"value={firstName}onChange={(e) => setFirstName(e.target.value)} required/>
                  </div>
                  {/* lastName */}
                  <div className="w-[45%]">
                    <label htmlFor="lastName" className="block text-gray-800 font-medium mb-2">
                      Tên<span className="text-red-500"> (*)</span>
                    </label>
                    <input type="text" id="lastName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                  </div>
                </div>
                </>
                }
              {/* button */}
              <div className="flex items-center justify-between">
                <button onClick={isLogin ? login : isSecondForm ? signup : validateFirstForm} type="button" className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                  {isLogin ? "Đăng nhập" : isSecondForm ? "Đăng ký" : "Tiếp tục"}
                </button>
              </div>
            </form>

            {/* switch modal */}
            <div className="justify-center text-center my-3">
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
              <button className="text-[#FF002C]"
                onClick={() => {
                  setisLogin(!isLogin);
                  setMessage("", "", "");
                  setInputDefalut();
                  if(isLogin){setIsSecondForm(false);}
                }}>
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
  )
}