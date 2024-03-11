//

// import { Fragment, useState } from "react";
// import { Listbox, Transition } from "@headlessui/react";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Utilies() {

//   return (
//     <div className="sm:col-span-2">

//     </div>
//   );
// }

import React, { useEffect, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Utilies() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(data);

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
    <div className="col-span-2">
      <div className="block font-medium leading-6 text-gray-900">Tiện ích</div>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button className="mt-3 border inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-2 h-16 text-gray-900 ring-1 ring-inset ring-gray-300">
            Thêm tiện ích
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* utilitis 1 */}
          <Menu.Items className="border bg-white w-full absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {data.map((index) => (
                <Menu.Item key={index} className=" p-4 h-14 flex items-center">
                  <div className="flex justify-between items-center">
                    <span>{index.utilitiesName}</span>
                    <div className="flex gap-3 items-center">
                      <button className="border border-1 border-black w-6 h-6 rounded-md">
                        <MinusIcon />
                      </button>
                      <button>1</button>
                      <button className="border border-1 border-black w-6 h-6 rounded-md">
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </Menu.Item>
              ))}
              <Menu.Item>
                <Link>khac</Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
