import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

export const AddressUpdateForm = ({ title, description, data , isnull, setIsDisabled, isDisable }) => {
    const dispatch = useDispatch();
    const user = useContext(UserContext).user;

    const [isEditing, setIsEditing] = useState(false);
    const [addressErrorMessage, setAddressErrorMessage] = useState();

    const [address, setAddress] = useState(user?.address);

    const accessToken = localStorage.getItem("access_token");

    const updateAddress = () => {
        if(!address||address===""){
            setAddressErrorMessage("Không được bỏ trống");
        }else{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const raw = JSON.stringify({
        "id": user?.id,
        "address": address
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
            console.log(result);
            dispatch(counterSlice.actions.increase());
            setIsDisabled(0)
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
        <div className={isDisable===0||isDisable===4?"mt-4 mb-10":"pointer-events-none opacity-50 mt-4 mb-10"}>
          {isEditing ? (
                <>
                  <div className="flex justify-between">
                    <p className="text-[1.7rem] p-0 m-0">{title}</p>
                    <button onClick={()=>{handleEditToggle();setAddress();setAddressErrorMessage();setIsDisabled(0)}} className="underline font-medium text-2xl">Hủy</button>
                  </div>
                  <p className="text-gray-500 text-[1.5rem] p-0 m-0">{description}</p>
                  <div className="relative py-4 w-full">
                    <label htmlFor="phoneInput" className={`absolute top-8 left-6 text-xl ${addressErrorMessage?"text-[#C13515] font-bold":"text-gray-500"}`}>Số điện thoại</label>
                    <input  type="text" id="phoneInput" 
                        value={address}
                        onChange={(e) => {
                            setAddressErrorMessage();
                            setAddress(e.target.value);
                        }}
                        onBlur={()=>{
                            if(10<=address<1){
                                setAddressErrorMessage("Số điện thoại Phải từ 0-11 số!");
                            }
                        }}
                        className={`border ${addressErrorMessage?"border-red-800 bg-[#fff8f6]":""} rounded-2xl text-gray-700 px-[1.4rem] pt-10 pb-2 w-full`}
                        required/>
                    </div>
                    {addressErrorMessage &&
                        <div className="flex items-center gap-2 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Error" role="img" focusable="false" fill="#C13515" className="block h-[12px] w-[12px] mb-[0.7rem]"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path></svg>
                            <p className="text-xl text-[#C13515]">{addressErrorMessage}</p>
                        </div>
                    }
                    <button onClick={()=>{updateAddress()}} className="px-5 py-3 bg-black rounded-2xl text-white font-medium">Lưu</button>
                </>
            ) : (
              <div className="flex justify-between">
                <div className="flex flex-col w-[80%]">
                  <p className="text-[1.7rem] p-0 m-0">{title}</p>
                  <p className="text-gray-500 text-[1.5rem]">{data}</p>
                </div>
                <div className="justify-start">
                  <button onClick={()=>{handleEditToggle();setIsDisabled(4)}} className="underline font-medium text-2xl ml-16">
                    {isnull ? "Thêm" : "Sửa"}
                  </button>
                </div>
              </div>
            )}
        </div>
    </>
  )
}
