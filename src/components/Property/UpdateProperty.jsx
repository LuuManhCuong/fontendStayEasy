/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { useState } from "react";
import {
  PhotoIcon,
  XMarkIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import Utilies from "../utilies/Utilies";
import Category from "../category/Category";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Services/firebaseService";
import axios from "axios";
import { counterSelector } from "../../redux-tookit/selector";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ToastMessage from "./ToastMessage";
import Rule from "./Rule";

export default function UpdateProperty() {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const [property, setProperty] = useState({
    owner: {},
    propertyName: "",
    description: "",
    numGuests: "",
    numBathRoom: "",
    numBedRoom: "",
    serviceFee: "",
    price: "",
    discount: "",
    imagesList: [
      {
        url: "",
      },
    ],
    categories: [
      {
        categoryId: "",
      },
    ],
    rulesList: [
      {
        rulesId: "",
      },
    ],
    propertyUtilitis: [
      {
        utilitiesId: "",
      },
    ],
  });

  const {
    owner,
    propertyName,
    description,
    numGuests,
    price,
    discount,
    imagesList,
    numBathRoom,
    numBedRoom,
    serviceFee,
    categories,
    rulesList,
    propertyUtilitis,
  } = property;

  const [ownerName, setOwnerName] = useState("");
  useEffect(() => {
    setOwnerName(`${owner.lastName} ${owner.firstName}`);
  }, [owner]);

  // get user
  const counter = useSelector(counterSelector);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [userId, setUserId] = useState(user.id);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);

  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const newUrls2 = imagesList.map((image) => image.url);
    setUrls([...newUrls2]);
  }, [imagesList]);

  // handle remove url
  const handleRemoveImage = (index) => {
    const newUrls1 = [...urls];
    // remove image at index
    newUrls1.splice(index, 1);

    setUrls(newUrls1);
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);

      const currentUrl = URL.createObjectURL(newImage);
      setUrls((prev) => [...prev, currentUrl]);
    }
  };

  // category
  const [selectedCategory, setselectedCategory] = useState([]);

  const handleCategories = (newCategory) => {
    setselectedCategory(newCategory);
  };

  useEffect(() => {
    setselectedCategory([...categories.map((item) => item.categoryId)]);
  }, [categories]);

  // Utilities - get all util id
  const [selectUtils, setSelectUtils] = useState([]);

  useEffect(() => {
    setSelectUtils([...propertyUtilitis.map((item) => item.utilitiesId)]);
  }, [propertyUtilitis]);

  const handleUtilsChange = (newUtils) => {
    setSelectUtils(newUtils);
  };

  // rules
  const [selectRules, setSelectRules] = useState([]);

  useEffect(() => {
    setSelectRules([...rulesList.map((item) => item.rulesId)]);
  }, [rulesList]);

  // input handle change
  const change = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  // Images upload
  const uploadMultipleFiles = async (images) => {
    const storageRef = ref(storage); // Thay 'storage' bằng đường dẫn đến thư mục bạn muốn lưu trữ ảnh

    try {
      const uploadPromises = images.map(async (file) => {
        const imageRef = ref(storageRef, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
      });

      const downloadUrls = await Promise.all(uploadPromises);
      setImages((url) => [...url, downloadUrls]);
      return downloadUrls;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const [status, setStatus] = useState();

  // save property
  const saveProperty = async (
    urls,
    userId,
    selectedCategory,
    selectRules,
    selectUtils
  ) => {
    const dataThum = {
      ...property,
      ownerId: userId,
      thumbnail: urls[0],
      imagesList: [...urls.map((url) => ({ url }))],
      categories: [
        ...selectedCategory.map((id) => ({
          categoryId: id,
        })),
      ],
      rulesList: [
        ...selectRules.map((id) => ({
          rulesId: id,
        })),
      ],
      propertyUtilitis: [
        ...selectUtils.map((id) => ({
          utilitiesId: id,
        })),
      ],
    };
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/stayeasy/property/edit/${propertyId}`,
        dataThum
      );

      if (response.status === 200) {
        setStatus(response.status);
        // console.log("data update: ", response.data);
      }
    } catch (error) {
      console.log("error!", error);
    }
  };
  // end save property

  const [isLoading, setIsLoading] = useState(false);
  // submit
  const uploadAndSave = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await uploadMultipleFiles(images);
      await saveProperty(
        urls,
        userId,
        selectedCategory,
        selectRules,
        selectUtils
      );
    } catch (error) {
      alert("Đã xãy ra lỗi.");
    } finally {
      setIsLoading(false);
    }
  };

  // get property by id
  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/stayeasy/property/${propertyId}`
    );
    setProperty(result.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // /////

  useEffect(() => {
    if (status === 200) {
      const timeoutId = setTimeout(() => {
        navigate("/host/property/list");
      }, 1000);

      // Cleanup effect để tránh lỗi memory leak
      return () => clearTimeout(timeoutId);
    }
  }, [status, navigate]);

  if (isLoading) {
    return (
      <div className="mx-4 my-4">
        <p>Đang tải...</p>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
    );
  }

  if (status === 200) {
    return (
      <div className="flex justify-center">
        <ToastMessage />
      </div>
    );
  }

  return (
    <div className="mx-4 mt-3 mb-4">
      <form>
        <div>
          <div className="font-medium mt-8 flex items-center text-gray-900 text-[2rem]">
            <span>Cập nhật tài sản</span>
          </div>
          <hr />

          {/* row 1 */}
          <div className="mt-8 mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* property name */}
            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block font-medium leading-6 text-gray-900"
              >
                Tên tài sản
              </label>
              <input
                value={propertyName}
                onChange={change}
                required
                type="text"
                name="propertyName"
                id="propertyName"
                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
              />
            </div>

            {/* description */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block font-medium leading-6 text-gray-900"
              >
                Mô tả
              </label>
              <div className="mt-2">
                <textarea
                  value={description}
                  required
                  onChange={change}
                  id="description"
                  name="description"
                  rows={3}
                  className="block pl-5 w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black  sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            {/* detail */}
            {/* CATEGORIES */}
            <Category
              value={selectedCategory}
              valueOptions={handleCategories}
              onChange={change}
            />

            {/* UILITIS */}
            <Utilies
              value={selectUtils}
              Utils={handleUtilsChange}
              onChange={change}
            />

            {/* rule */}
            <Rule
              onChange={change}
              value={selectRules}
              Rules={(newRule) => setSelectRules(newRule)}
            />

            {/* NUMGUEST */}
            <div className="sm:col-span-1">
              <label
                htmlFor="numguest"
                className="block font-medium leading-6 text-gray-900"
              >
                Số người
              </label>
              <input
                value={numGuests}
                min={0}
                required
                onChange={change}
                type="number"
                name="numGuests"
                id="numGuests"
                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="numguest"
                className="block font-medium leading-6 text-gray-900"
              >
                Phòng ngủ
              </label>
              <input
                value={numBedRoom}
                min={0}
                required
                onChange={change}
                type="number"
                name="numBedRoom"
                id="numBedRoom"
                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="numguest"
                className="block font-medium leading-6 text-gray-900"
              >
                phòng tắm
              </label>
              <input
                value={numBathRoom}
                min={0}
                required
                onChange={change}
                type="number"
                name="numBathRoom"
                id="numBathRoom"
                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
              />
            </div>

            <div className="col-span-4 gap-y-8 grid h-160">
              {/* PRICE */}
              <div>
                <label
                  htmlFor="price"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Giá
                </label>
                <div className="flex">
                  <div className="ring-1 ring-inset ring-gray-300 bg-gray-300 h-[4rem] mt-3 w-14 rounded-s-md justify-center flex items-center">
                    $
                  </div>
                  <input
                    value={price}
                    min={0}
                    required
                    onChange={change}
                    type="number"
                    name="price"
                    id="price"
                    className="block rounded-s-none focus:ring-1 focus:ring-black focus:ring-1 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {/* phí vệ sinh */}
                <div className="w-[50%]">
                  <label
                    htmlFor="discount"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Phí vệ sinh
                  </label>
                  <div className="flex">
                    <div className="bg-gray-300 ring-1 ring-inset ring-gray-300 w-14 flex items-center justify-center h-[4rem] mt-3 rounded-s-md">
                      %
                    </div>
                    <input
                      required
                      onChange={change}
                      min={0}
                      value={serviceFee}
                      type="number"
                      name="serviceFee"
                      id="serviceFee"
                      className="block bg-white rounded-l-none mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                    />
                  </div>
                </div>

                {/* DISCOUNT */}
                <div className="w-[50%]">
                  <label
                    htmlFor="discount"
                    className="block font-medium leading-6 text-gray-900"
                  >
                    Khuyến mãi
                  </label>
                  <div className="flex">
                    <div className="bg-gray-300 ring-1 ring-inset ring-gray-300 w-14 flex items-center justify-center h-[4rem] mt-3 rounded-s-md">
                      %
                    </div>
                    <input
                      value={discount}
                      min={0}
                      required
                      onChange={change}
                      type="number"
                      name="discount"
                      id="discount"
                      className="block rounded-s-none mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* property image */}
            <div className="col-span-2 h-60">
              <label
                htmlFor="cover-photo"
                className="block font-medium leading-6 text-gray-900"
              >
                Hình ảnh
              </label>
              <div className="mt-3 h-[12.5rem] flex flex-col items-center justify-center rounded-lg ring-inset ring-1 ring-gray-300 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="my-4 flex flex-col items-center leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="block items-center flex relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 h-10 outline-2 outline"
                    >
                      <span className="px-4">Chọn ảnh</span>
                      <input
                        required
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <p className="block leading-5 text-gray-600">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* image preview  */}
            {urls.map((url, index) => (
              <div key={index} className="relative sm:col-span-2">
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-pink-600 absolute right-0"
                >
                  <XMarkIcon className="w-7 text-white" />
                </button>
                <img className="h-96 border w-full" src={url} alt="preview" />
              </div>
            ))}
          </div>
          <hr />
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <Link to="/property/list">
            <button
              type="submit"
              className="block rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-[#ff385c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
            >
              Hủy
            </button>
          </Link>
          <button
            onClick={uploadAndSave}
            type="submit"
            className="block bg-indigo-600 text-white rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
