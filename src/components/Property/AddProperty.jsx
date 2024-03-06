/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import * as ProvinceService from "../../Services/ProvinceService";
import SelectAddress from "./SelectAddress";
import Utilies from "../utilies/Utilies";
import Category from "../category/Category";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Services/firebaseService";
import axios from "axios";
import { counterSelector } from "../../redux-tookit/selector";
import { useSelector } from "react-redux";

export default function AddProperty() {
  // get user
  const counter = useSelector(counterSelector);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userName, setUserName] = useState(
    `${user.lastName} ${user.firstName}`
  );
  const [userId, setUserId] = useState(user.id);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);

  // State
  // province - district - ward
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  // convert from object to array
  const ArrayProVince = Object.values(provinces);
  const ArrayDistrict = Object.values(districts);
  const ArrayWard = Object.values(wards);

  const [detailAddress, setDetailAddress] = useState();

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
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

      setUrls((prev) => [...prev, URL.createObjectURL(newImage)]);
    }
  };

  // get provinceName - districtName - wardName
  useEffect(() => {
    const selectProvince = provinces.find((p) => p.province_id === province);
    const selectDistrict = districts.find((d) => d.district_id === district);
    const selectWard = wards.find((w) => w.ward_id === ward);

    if (selectProvince) {
      setProvinceName(selectProvince.province_name);
    }
    if (selectDistrict) {
      setDistrictName(selectDistrict.district_name);
    }

    if (selectWard) {
      setWardName(selectWard.ward_name);
    }
  }, [province, provinces, districts, district, wards, ward]);

  // property data body
  const [data, setData] = useState({
    propertyName: "",
    description: "",
    thumbnail: "",
    numGuests: "",
    price: "",
    discount: "",
    address: {
      province: "",
      district: "",
      ward: "",
      detailAddress: "",
    },
    ownerId: "",
    imagesList: [
      {
        url: "",
      },
    ],
    categoryIds: [],
  });

  //  get full address
  useEffect(() => {
    const fullAddress = `${detailAddress}, ${wardName}, ${districtName}, ${provinceName}`;
    setData((prevData) => ({
      ...prevData,
      address: fullAddress,
    }));
  }, [provinceName, districtName, wardName, detailAddress]);

  // input handle change
  const change = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // get province
  useEffect(() => {
    const resultProvince = async () => {
      const result = await ProvinceService.resProvince();
      if (result.status === 200) {
        setProvinces(result?.data.results);
      }
    };
    resultProvince();
  }, []);

  // get district
  useEffect(() => {
    const resultDistrict = async () => {
      const result = await ProvinceService.resDistrict(province);

      if (result.status === 200) {
        setDistricts(result.data?.results);
      }
    };

    province && resultDistrict(province);
  }, [province, district]);

  // get ward
  useEffect(() => {
    const resultWard = async () => {
      const result = await ProvinceService.resWard(district);

      if (result.status === 200) {
        setWards(result.data?.results);
      }
    };

    district && resultWard(district);
  }, [district, ward]);

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
      return downloadUrls;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // save property
  const saveProperty = async (listImage, userId) => {
    const dataThum = {
      ...data,
      ownerId: userId,
      thumbnail: listImage[0],
      imagesList: [...listImage.map((url) => ({ url }))],
      categoryIds: [...selectedOptions.map((id) => id)],
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/stayeasy/property/add`,
        dataThum
      );

      if (response.status === 200) {
        // alert("add successfully!");
        console.log("oke");
      }
    } catch (error) {
      console.log("error!");
    }
  };
  // end save property

  // category
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  console.log("loading: ", isLoading);

  // submit
  const uploadAndSave = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const listImage = await uploadMultipleFiles(images);
      await saveProperty(listImage, userId, selectedOptions);
    } catch (error) {
      alert("Đã xãy ra lỗi.");
    } finally {
      setIsLoading(false);
      alert("oke")
    }
  };

  if (isLoading) {
    return <p>Loading....</p>
  }

  return (
    <div className="mx-4 mt-3 mb-4">
      <form>
        <div className="space-y-12">
          <div className="font-medium text-gray-900 text-[2rem]">
            TẠO TÀI SẢN MỚI
          </div>

          {/* row 1 */}
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* owner */}
            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block font-medium leading-6 text-gray-900"
              >
                Chủ sở hữu
              </label>
              <input
                disabled
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                name="username"
                id="username"
                className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>

            {/* property name */}
            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên tài sản
              </label>
              <input
                onChange={change}
                type="text"
                name="propertyName"
                id="propertyName"
                className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>

            {/* address */}
            {/* province / city */}
            <SelectAddress
              label="Tỉnh / Thành phố"
              value={province}
              setValue={setProvince}
              option={ArrayProVince}
              type="province"
              onChange={change}
            />

            {/* District */}
            <SelectAddress
              label="Quận / Huyện"
              value={district}
              setValue={setDistrict}
              option={ArrayDistrict}
              type="district"
              onChange={change}
            />

            {/* wards */}
            <SelectAddress
              value={ward}
              setValue={setWard}
              option={ArrayWard}
              type="ward"
              label="Xã / Thị trấn"
              onChange={change}
            />

            {/* detail address */}
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Địa chỉ cụ thể
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setDetailAddress(e.target.value)}
                  type="text"
                  name="detailAddress"
                  id="detailAddress"
                  className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* description */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mô tả
              </label>
              <div className="mt-2">
                <textarea
                  onChange={change}
                  id="description"
                  name="description"
                  rows={3}
                  className="block pl-5 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            {/* detail */}
            {/* CATEGORIES */}
            <Category
              valueOptions={(newOption) => setSelectedOptions(newOption)}
            />

            {/* UILITIS */}

            <Utilies />

            {/* NUMGUEST */}
            <div className="sm:col-span-2">
              <label
                htmlFor="numguest"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Số người
              </label>
              <input
                onChange={change}
                type="number"
                name="numGuests"
                id="numGuests"
                className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>

            <div className="col-span-3 gap-y-8 grid h-60">
              {/* PRICE */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Giá
                </label>
                <div className="flex">
                  <div className="ring-1 ring-inset ring-gray-300 bg-gray-300 h-[4rem] mt-3 w-14 rounded-s-md justify-center flex items-center">
                    $
                  </div>
                  <input
                    onChange={change}
                    type="number"
                    name="price"
                    id="price"
                    className="block rounded-s-none focus:ring-1 focus:ring-black focus:ring-1 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* DISCOUNT */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Khuyến mãi
                </label>
                <div className="flex">
                  <div className="bg-gray-300 ring-1 ring-inset ring-gray-300 w-14 flex items-center justify-center h-[4rem] mt-3 rounded-s-md">
                    %
                  </div>
                  <input
                    onChange={change}
                    type="number"
                    name="discount"
                    id="discount"
                    className="block rounded-s-none mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* property image */}
            <div className="col-span-3 h-60">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                <img className="h-96" src={url} alt="preview" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-start gap-x-4">
          <button
            onClick={uploadAndSave}
            type="submit"
            className="block rounded-lg px-3 py-2 font-semibold text-black border shadow-md hover:bg-[#ff385c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Hủy
          </button>
          <button
            onClick={uploadAndSave}
            type="submit"
            className="block rounded-lg bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
