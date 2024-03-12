import React, { useEffect, Fragment, useState, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  CheckIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { Link } from "react-router-dom";
import BasicModal from "../Property/Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Utilies() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(data);
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);

  const handleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  // const handleClickOutside = (e) => {
  //   if (containerRef.current && !containerRef.current.contains(e.target)) {
  //     setShow(false);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/util`
    );
    setData(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    // <>
    //   <div className="col-span-2">
    // <div className="block font-medium leading-6 text-gray-900">
    //   Tiện ích
    // </div>
    //     <Menu as="div" className="relative inline-block text-left w-full">
    //       <div>
    //         <Menu.Button className="mt-3 border inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-2 h-16 text-gray-900 ring-1 ring-inset ring-gray-300">
    //           Thêm tiện ích
    //           <ChevronDownIcon
    //             className="-mr-1 h-5 w-5 text-gray-400"
    //             aria-hidden="true"
    //           />
    //         </Menu.Button>
    //       </div>

    //       <Transition
    //         as={Fragment}
    //         enter="transition ease-out duration-100"
    //         enterFrom="transform opacity-0 scale-95"
    //         enterTo="transform opacity-100 scale-100"
    //         leave="transition ease-in duration-75"
    //         leaveFrom="transform opacity-100 scale-100"
    //         leaveTo="transform opacity-0 scale-95"
    //       >
    //         {/* utilitis 1 */}
    //         <Menu.Items
    //           onMouseDown={(e) => e.stopPropagation()}
    //           className="border bg-white w-full absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    //         >
    //           <div className="py-1">
    //             {data.map((index) => (
    //               <Menu.Item
    //                 key={index}
    //                 className=" p-4 h-14 flex items-center"
    //               >
    // <div className="flex justify-between items-center">
    //   <span>{index.utilitiesName}</span>
    //   <div className="flex gap-3 items-center">
    //     <button className="border border-1 border-black w-6 h-6 rounded-md">
    //       <MinusIcon />
    //     </button>
    //     <button>1</button>
    //     <button className="border border-1 border-black w-6 h-6 rounded-md">
    //       <PlusIcon />
    //     </button>
    //   </div>
    // </div>
    //               </Menu.Item>
    //             ))}
    //             <Menu.Item>
    //               <Link>
    //                 <BasicModal />
    //               </Link>
    //             </Menu.Item>
    //           </div>
    //         </Menu.Items>
    //       </Transition>
    //     </Menu>
    //   </div>
    // </>
    <div className="col-span-2 relative">
      <div className="block font-medium leading-6 text-gray-900">Tiện ích</div>
      <div
        onClick={handleShow}
        ref={containerRef}
        className="rounded-lg ring-1 ring-gray-300 w-full text-center h-16 mt-3 flex items-center justify-center gap-4"
      >
        <span>Thêm tiện ích</span>
        {show ? (
          <span>
            <ChevronDownIcon className="w-7" />
          </span>
        ) : (
          <span>
            <ChevronUpIcon className="w-7" />
          </span>
        )}
      </div>

      {/* body */}

      {show === true && (
        <div className="bg-white ring-1 ring-gray-300 mt-2 rounded-lg absolute w-full">
          {data.map((index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-3"
            >
              <span>{index.utilitiesName}</span>
              <div className="flex gap-3 items-center">
                <div className="border border-1 border-black w-6 h-6 rounded-md">
                  <MinusIcon />
                </div>
                <div>1</div>
                <div className="border border-1 border-black w-6 h-6 rounded-md">
                  <PlusIcon />
                </div>
              </div>
            </div>
          ))}
          <div className="px-3 pb-3 border-t pt-3">
            <BasicModal />
          </div>
        </div>
      )}
    </div>
  );
}
