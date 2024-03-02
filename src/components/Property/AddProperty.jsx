import React, { useEffect } from "react";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import * as ProvinceService from "../../Services/ProvinceService";
import SelectAddress from "./SelectAddress";
import Utilies from "../utilies/Utilies";
import Category from "../category/Category";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../Services/firebaseService";
import { v4 } from "uuid";
import axios from "axios";

export default function AddProperty() {
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

  const [userName, setUserName] = useState();
  const [detailAddress, setDetailAddress] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  // console.log(imageUrls);

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
    price: "",
    thumbnail: "",
    address: {
      province: "",
      district: "",
      ward: "",
      detailAddress: "",
    },
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

  console.log("data trước khi lưu: ", data);

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

  // image upload

  // console.log("image", imageUpload);
  // console.log(imageUrls);

  const imageListRef = ref(storage, "images/");

  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      if (imageUpload === null) resolve();
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
        .then(async (snapshot) => {
          let url = await getDownloadURL(snapshot.ref);
          resolve(url);
          // getDownloadURL(snapshot.ref)
          //   .then((url) => {
          //     setImageUrls((prev) => [...prev, url]);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        })
        .catch((error) => {
          console.log("error: ", error);
          reject(error);
        });
    });
  };

  //
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  // save property
  const saveProperty = async (thumbnailUrl) => {
    const dataThum = { ...data, thumbnail: thumbnailUrl };
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/stayeasy/property/add`,
        dataThum
      );

      if (response.status === 200) {
        console.log("Property added successfully:", response.data);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };
  // end save property

  const uploadAndSave = async (e) => {
    e.preventDefault();
    const thumbnailUrl = await uploadFile();
    await saveProperty(thumbnailUrl);
  };

  return (
    <div className="mx-4 my-4">
      <form>
        <div className="space-y-12">
          <div className="font-medium text-gray-900 block">TẠO TÀI SẢN MỚI</div>

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
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="price"
                id="price"
                className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block pl-5 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>

            {/* detail */}
            {/* CATEGORIES */}
            <Category />

            {/* UILITIS */}

            <Utilies />

            {/* PRICE */}
            <div className="sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Giá
              </label>
              <input
                onChange={change}
                type="text"
                name="price"
                id="price"
                className="block mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* thumnail */}
            <div className="col-span-2">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ảnh đại diện
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="block relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(event) => {
                          setImageUpload(event.target.files[0]);
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="block leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* property image */}
            <div className="col-span-4">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Hình ảnh
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="block relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 block">or drag and drop</p>
                  </div>
                  <p className="block leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={uploadAndSave}
            type="submit"
            className="block rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
