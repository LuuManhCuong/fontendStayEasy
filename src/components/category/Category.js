import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Category({ valueOptions, value }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  const handleCategories = (index) => {
    valueOptions((prev) => {
      const isR = prev.includes(index.categoryId);
      if (isR) {
        return prev.filter((categoryId) => categoryId !== index.categoryId);
      } else {
        return [...prev, index.categoryId];
      }
    });
  };

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/category`
    );
    setData(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // CATEGORY
  // const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    // <div className="sm:col-span-1">
    //   <Listbox value={selected} onChange={setSelected}>
    //     {({ open }) => (
    //       <>
    //         <Listbox.Label className="block font-medium leading-6 text-gray-900">
    //           Danh mục
    //         </Listbox.Label>
    //         <div className="relative mt-3">
    //           <Listbox.Button className="relative h-16 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-black sm:leading-6">
    //             <span className="flex items-center block">
    //               {selectedOptions ? (`${selectedOptions}`) : (<p>chọn</p>)}
    //             </span>

    //             <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
    //               <ChevronUpDownIcon
    //                 className="h-5 w-5 text-gray-400"
    //                 aria-hidden="true"
    //               />
    //             </span>
    //           </Listbox.Button>

    //           <Transition
    //             show={open}
    //             as={Fragment}
    //             leave="transition ease-in duration-100"
    //             leaveFrom="opacity-100"
    //             leaveTo="opacity-0"
    //           >
    //             <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //               {data.map((util) => (
    //                 <Listbox.Option
    //                   key={util.categoryId}
    //                   className={({ active }) =>
    //                     classNames(
    //                       active ? "bg-indigo-600 text-white" : "text-gray-900",
    //                       "relative h-14 cursor-default select-none py-2 pl-3 pr-9"
    //                     )
    //                   }
    //                   value={util}
    //                   onClick={() => {
    //                     if (selectedOptions.includes(util)) {
    //                       setSelectedOptions((prev) =>
    //                         prev.filter((option) => option !== util)
    //                       );
    //                     } else if (selectedOptions.length < 3) {
    //                       setSelectedOptions((prev) => [
    //                         ...prev,
    //                         util.categoryName,
    //                       ]);
    //                     }
    //                     valueOptions((prev) => [...prev, util.categoryId]);
    //                   }}
    //                 >
    //                   {({ selected, active }) => (
    //                     <>
    //                       <div className="flex items-center">
    //                         <span
    //                           className={classNames(
    //                             selected ? "font-semibold" : "font-normal",
    //                             "ml-3 h-10 pt-2 block truncate"
    //                           )}
    //                         >
    //                           {util.categoryName}
    //                         </span>
    //                       </div>

    //                       {selected ? (
    //                         <span
    //                           className={classNames(
    //                             active ? "text-white" : "text-indigo-600",
    //                             "absolute inset-y-0 right-0 flex items-center pr-4"
    //                           )}
    //                         >
    //                           <CheckIcon
    //                             className="h-5 w-5"
    //                             aria-hidden="true"
    //                           />
    //                         </span>
    //                       ) : null}
    //                     </>
    //                   )}
    //                 </Listbox.Option>
    //               ))}
    //             </Listbox.Options>
    //           </Transition>
    //         </div>
    //       </>
    //     )}
    //   </Listbox>
    // </div>
    <div className="col-span-1">
      <div className="font-medium leading-6 text-gray-900">Danh mục</div>
      <div
        className="hover:cursor-pointer flex mt-3 items-center justify-center h-16 rounded-md p-2 px-4 ring-1 ring-gray-300 bg-white"
        onClick={handleOpen}
      >
        {value.length > 0 ? `Đã chọn ${count}` : "--- Chọn ---"}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Box className="rounded-lg bg-white absolute w-[40%] p-4">
          <div className="flex itemsl-center justify-between">
            <div className="font-medium">Danh mục</div>

            <div className="mb-3 flex justify-end" onClick={handleClose}>
              <button className="border-2 border border-red-800 rounded-lg">
                <XMarkIcon className="w-8" color="#FF385C" />
              </button>
            </div>
          </div>

          <div
            className="border-y py-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4"
            variant="h5"
          >
            {data.map((index) => (
              <div
                key={index.categoryId}
                onClick={() => handleCategories(index)}
                className={`${
                  value.includes(index.categoryId)
                    ? "bg-danger text-white"
                    : ""
                } hover:cursor-pointer border flex items-center gap-3 p-3 rounded-lg`}
              >
                <span>
                  <XMarkIcon className="w-8" />
                </span>
                <span>{index.categoryName}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={handleClose}
              className="bg-indigo-600 text-white py-2 px-3 font-medium rounded-lg"
            >
              Lưu
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
