import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";


export const EmailUpdateForm = ({ title, description, data}) => {
    return (
      <>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[80%]">
              <p className="text-[1.7rem] p-0 m-0">{title}</p>
              <p className="text-gray-500 text-[1.5rem]">{data}</p>
            </div>
          </div>
        </div>
      </>
    );
  };