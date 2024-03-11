import { useState } from "react";
import { useDispatch } from "react-redux";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

export const NameUpdateForm = ({ title, user, description, isnull, setIsDisabled, isDisable }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState();
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState();
    
    const [isEditing, setIsEditing] = useState(false);
  
    const accessToken = localStorage.getItem("access_token");
  
    const dispatch = useDispatch();
  
    const updateName = () => {
      if(firstName===""||lastName===""){
        alert("Nhập thông tin đi ba!😒");
      }else{
        const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
      const raw = JSON.stringify({
        "id": user?.id,
        "firstName": firstName,
        "lastName": lastName
      });
  
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      fetch(`http://localhost:8080/api/v1/stayeasy/user/update`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          dispatch(counterSlice.actions.increase());
          setIsDisabled(0);
          setIsEditing(!isEditing);
        })
        .catch((error) => console.error(error));
      }
    };
  
    const handleEditToggle = () => {
      setIsEditing(!isEditing);
    };  
    
    return (
      <>
        <div className={isDisable===0||isDisable===1?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
          {isEditing ? (
              <>
                  <div className="flex justify-between">
                    <p className="text-[1.7rem] p-0 m-0">{title}</p>
                    <button onClick={()=>{
                        handleEditToggle();
                        setIsDisabled(0);
                        setFirstName(user?.firstName);
                        setLastName(user?.lastName);
                    }} className="underline font-medium text-2xl">Hủy</button>
                  </div>
                  <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>
                  <div className="flex py-4 gap-4">
                  <div className="relative w-1/2">
                    <label htmlFor="firstNameInput" className={`absolute top-2 left-6 text-xl ${firstNameErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Họ</label>
                    <input type="text" id="firstNameInput" 
                        value={firstName} 
                        onChange={(e) => {
                          e.target.value==""?setFirstNameErrorMessage("Không được để trống!"):setFirstNameErrorMessage();
                          setFirstName(e.target.value);
                        }}
                        className={`border ${firstNameErrorMessage?"border-red-800 bg-[#fff8f6]":""} rounded-2xl text-gray-700 px-[1.4rem] pt-10 pb-2 w-full`}
                        required/>
                    {firstNameErrorMessage &&
                      <div className="flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                        <p className="text-xl text-[#C13515]">{firstNameErrorMessage}</p>
                      </div>
                    }
                  </div>
                  <div className="relative w-1/2">
                    <label htmlFor="firstNameInput" className={`absolute top-2 left-6 text-xl ${lastNameErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Tên</label>
                    <input type="text" id="lastNameInput" 
                        value={lastName} onChange={(e)=>{
                          e.target.value==""?setLastNameErrorMessage("Không được để trống!"):setLastNameErrorMessage();
                          setLastName(e.target.value);
                        }}
                        className={`border ${lastNameErrorMessage?"border-red-800 bg-[#fff8f6]":""} rounded-2xl text-gray-700 px-[1.4rem] pt-10 pb-2 w-full`}
                        required/>
                    {lastNameErrorMessage &&
                      <div className="flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                        <p className="text-xl text-[#C13515]">{lastNameErrorMessage}</p>
                      </div>
                    }
                  </div>
                </div>
                <button onClick={()=>{updateName()}} className="px-5 py-3 bg-black rounded-2xl text-white font-medium">
                  Lưu
                </button>
              </>
            ) : (
              <div className="flex justify-between">
                <div className="flex flex-col w-[80%]">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <p className="text-gray-500 text-[1.5rem]">{user?.firstName + " " + user?.lastName}</p>
                </div>
                <div className="justify-start">
                  <button onClick={()=>{handleEditToggle();setIsDisabled(1)}} className="underline font-medium text-2xl ml-16">
                    {isnull ? "Thêm" : "Sửa"}
                  </button>
                </div>
              </div>
            )}
        </div>
      </>
    );
  };