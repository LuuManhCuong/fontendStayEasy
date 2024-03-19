import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { updateInformation } from "../../redux-tookit/actions/userActions";
import { Alert } from "../Alert/Alert";
import { verifyPhone } from "../../redux-tookit/actions/authActions";

import ReactInputVerificationCode from 'react-input-verification-code';


export const PhoneUpdateForm = ({ title, description, isnull, setIsDisabled, isDisable }) => {
  const dispatch = useDispatch();
  const user = useContext(UserContext).user;

  const [isEditing, setIsEditing] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState();

  const [phone, setPhone] = useState(user?.phone);

  const [isValidate, setIsValidate] = useState(false);

  useEffect(()=>{
    if(!user){
      return;
    }
    setPhone(user.phone);
  }, [user]);

  const raw = JSON.stringify({
    "id": user?.id,
    "phone": phone
  });

  const handleUpdatePhone = () => {
    if(code!=codeConfirm){
      setCodeErrorMessage("Code không đúng!");
    }else{
      dispatch(updateInformation('số điện thoại', raw, setIsDisabled, setIsEditing, isEditing));
      setCodeErrorMessage();
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  // test phone code
  const [code, setCode] = useState();
  const [codeConfirm, setCodeConfirm] = useState();

  const [isSendCode, setIsSendCode] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState();

  const generateRandomNumber = () => {
      const min = 1000;
      const max = 9999;
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      setCode(randomNum);
  };

  useEffect((e)=>{generateRandomNumber();},[]);

  const sendCode = () => {
    setCodeErrorMessage();
    if(!phone||phone===""){
      Alert(1500, 'Thay đổi số điện thoại', 'Nhập thông tin đi ba!😒', 'error', 'OK');
    }else if(phone.length>12||phone.length<9){
      setPhoneErrorMessage("Số điện thoại không hợp lệ");
    }
    else{
      dispatch(verifyPhone({ phone: phone, code: code }, setIsSendCode, setCodeErrorMessage));
    }
  }
  
  return (
    <>
      <div className={isDisable===0||isDisable===3?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
        {isEditing ? (
              <>
                <div className="flex justify-between">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <button onClick={()=>{
                    handleEditToggle();
                    setPhone(user?.phone);
                    setPhoneErrorMessage();
                    setCodeErrorMessage();
                    setIsDisabled(0);
                    setIsValidate(false);
                    setIsSendCode(false);
                  }} className="underline font-medium text-2xl">Hủy</button>
                </div>
                <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>
                <div className="relative py-4 w-full">
                  <label htmlFor="phoneInput" className={`absolute top-8 left-6 text-xl ${phoneErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Số điện thoại</label>
                  <PhoneInput
                    country={"vn"}
                    inputProps={{
                      autoFocus: true,
                      enableAreaCodes:false,
                    }}
                    enableAreaCodeStretch
                    enableSearch={true}
                    value={phone}
                    inputStyle={{width:"100%", paddingLeft:"5.5rem", paddingRight:"5.5rem", paddingTop:"1.5rem", paddingBottom:"1.5rem", borderRadius:"1rem"}}
                    onChange={(e) => {
                      setPhoneErrorMessage();
                      setPhone(e);
                      if(e!==""&&!(/^\d+$/.test(e))){
                        setPhoneErrorMessage("Số điện thoại không được chứa ký tự!");
                        setIsValidate(false);
                      }else{setIsValidate(true);}
                    }}/>
                </div>
                {/* error phone message */}
                {phoneErrorMessage &&
                    <div className="flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                        <p className="text-xl text-[#C13515]">{phoneErrorMessage}</p>
                    </div>
                }

                {/* form code verify */}
                {isSendCode &&
                  <div className="py-4 w-full">
                    <ReactInputVerificationCode 
                      value={codeConfirm}
                      onChange={(e) => {
                        setCodeErrorMessage();
                        setCodeConfirm(e);
                      }}/>
                    <div className="">Chưa nhận được mã?   <button className="pt-2 underline font-medium" onClick={()=>{isSendCode?sendCode():console.log("Lỗi");}}>Gửi lại</button>
                    </div>
                  </div>
                }
                {/* error code verify message */}
                {codeErrorMessage &&
                    <div className="flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                        <p className="text-xl text-[#C13515]">{codeErrorMessage}</p>
                    </div>
                }
                <button onClick={()=>{isSendCode?handleUpdatePhone():sendCode()}} className="px-5 py-3 bg-black rounded-2xl text-white font-medium">{isSendCode?"Lưu":"Gửi mã"}</button>
              </>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col w-[80%]">
                <p className="text-[1.7rem] p-0 m-0">{title}</p>
                <p className="text-gray-500 text-[1.5rem]">
                  {user?.phone
                  ?'+' + user?.phone.slice(0, 2) + ' ' + user?.phone.slice(2, 5) + ' ' + user?.phone.slice(5, 8) + ' ' + user?.phone.slice(8)
                  :"Chưa cung cấp"}
                </p>
              </div>
              <div className="justify-start">
                <button onClick={()=>{handleEditToggle();setIsDisabled(3)}} className="underline font-medium text-2xl ml-16">
                  {isnull ? "Thêm" : "Sửa"}
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};