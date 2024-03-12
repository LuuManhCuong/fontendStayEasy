import React, { useState } from 'react'

export const UpdatePassword = ({ title, value, toggleBtn }) => {
    const [isEditting, setEditting] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState();
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [powerOfPasswordMessage, SetPowerOfPasswordMessage] = useState(false);

    const updatePassword = () => {
        return null
    };

    return (
        <>
            <div className="flex justify-between mt-10">
                <p className="text-[1.7rem] text-gray-700 font-medium p-0 m-0">{title}</p>
                <button onClick={()=>{setEditting(!isEditting);}} 
                    className="font-medium text-[1.7rem] ml-3 text-[#008489] hover:underline">
                   {isEditting?"Hủy":" Thay đổi"}
                </button>
            </div>
            {!isEditting?
                <p className="text-gray-500">{value}</p>
            :
                <>
                    <div className="w-full mt-2 mb-4">
                        <label htmlFor="phoneInput" className={`text-2xl`}>Mật khẩu hiện tại</label>
                        <input  type="text" id="phoneInput" 
                            value={oldpassword}
                            onChange={(e) => {
                                setPasswordErrorMessage();
                                setOldPassword(e.target.value);
                            }}
                            className={`border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full`}
                            required/>
                    </div>
                    <div className="w-full mt-2 mb-4">
                        <label htmlFor="phoneInput" className={`text-2xl`}>Mật khẩu mới</label>
                        <input  type="text" id="phoneInput" 
                            value={newpassword}
                            onChange={(e) => {
                                setPasswordErrorMessage();
                                setNewPassword(e.target.value);
                                newpassword>=10?SetPowerOfPasswordMessage(true):SetPowerOfPasswordMessage(false);
                            }}
                            className={`border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full`}
                            required/>
                    </div>
                    <div className="w-full mt-2 mb-4">
                        <label htmlFor="phoneInput" className={`text-2xl`}>Nhập lại mật khẩu</label>
                        <input  type="text" id="phoneInput" 
                            value={confirmpassword}
                            onChange={(e) => {
                                setPasswordErrorMessage();
                                setConfirmPassword(e.target.value);
                            }}
                            onBlur={()=>{
                                if(10<=newpassword<1){
                                setPasswordErrorMessage("Mật khẩu mới của bạn không khớp. Vui lòng thử lại.");}
                            }}
                            className={`border rounded-2xl text-gray-700 px-[1.4rem] py-3 my-2 w-full`}
                            required/>
                    </div>
                    {newpassword &&
                        <div className="flex items-center gap-2 mt-2">
                            <p className={`text-2xl ${powerOfPasswordMessage?"text-[#008489]":"text-[#C13515]"}`}>Độ bảo mật của mật khẩu: {powerOfPasswordMessage?"Mạnh":"Yếu"}</p>
                        </div>
                    }
                    <button onClick={()=>{updatePassword()}} className="px-4 py-3 bg-[#008489] rounded-xl text-white font-medium">Thay đổi mật khẩu</button>
                    {passwordErrorMessage &&
                        <div className='flex mt-4'>
                            <div className='bg-[#FC642D] py-4 px-3 rounded-s-xl'>
                                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" fill="#fff" className="h-[24px] w-[24px] block"><path d="m23.49 20.79c.39.73.12 1.64-.61 2.03-.22.12-.46.18-.71.18h-20.33c-.83 0-1.5-.67-1.5-1.5 0-.25.06-.49.18-.71l10.16-18.94c.39-.73 1.3-1 2.03-.61.26.14.47.35.61.61zm-11.05-18.47c-.05-.09-.12-.16-.2-.2-.24-.13-.55-.04-.68.2l-10.16 18.94c-.04.07-.06.15-.06.24 0 .28.22.5.5.5h20.33c.08 0 .16-.02.24-.06.24-.13.33-.43.2-.68zm-.48 4.68c-.58.02-1.04.51-1.02 1.1l.29 7.42c.01.27.23.48.5.48h.54c.27 0 .49-.21.5-.48l.29-7.42c0-.01 0-.03 0-.04 0-.58-.47-1.06-1.06-1.06-.01 0-.03 0-.04 0zm-.96 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"></path></svg>
                            </div>
                            <div  className='pt-[1.2rem] pb-2 px-3 border-y border-r rounded-e-xl w-full'>
                                <p className="text-2xl font-medium mt-2">{passwordErrorMessage}</p>
                            </div>
                        </div>
                    }
                </>
            }
        </> 
    );
}
