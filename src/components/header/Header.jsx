import React, { useState } from "react";
import "./header.scss";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Avatar from "@mui/material/Avatar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dataExploreSlice } from "../../redux-tookit/reducer/dataExploreSlice";
import { useNavigate } from "react-router-dom";
import { keySearchSelector } from "../../redux-tookit/selector";
import { keySearchSlice } from "../../redux-tookit/reducer/keySearchSlice";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";
function Header({ page }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keySearch } = useSelector(keySearchSelector);
  const today = new Date();

  // const [keySearch, setKeySearch] = React.useState("");
  const [checkin, setCheckin] = React.useState(new Date());
  let timeStamp = today.getTime() + 86400000;
  const [checkout, setCheckout] = React.useState(new Date(timeStamp));
  const [showHistory, setShowHistory] = React.useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [suggest, setSuggest] = useState();

  const [isLogined, setIsLogined] = useState(
    localStorage.getItem("accesstoken") ? true : false
  );

  const [isOpenLoginModal, setisOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setisOpenRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  React.useEffect(() => {
    setCheckout(new Date(checkin.getTime() + 86400000));
  }, [checkin]);

  React.useEffect(() => {
    if (keySearch?.length === 0) {
      setShowHistory(false);
    }
  }, [keySearch]);

  React.useEffect(() => {
    let url;
    if (page === "home") {
      url = `${page}/search?address=${keySearch}&checkin=${checkin}&checkout=${checkout}`;
    } else if (page === "experience") {
      url = `${page}/search?keySearch=${keySearch}`;
    } else {
      url = `${page}/search?keySearch=${keySearch}`;
    }
    axios
      .get(
        `http://localhost:8080/api/v1/stayeasy/explore/search/suggest?keySearch=${keySearch}`
      )
      .then(function (response) {
        setSuggest(response.data);
        console.log("Data suggest: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [keySearch]);

  function handleSearch() {
    setShowHistory(false);
    let url;
    if (page === "home") {
      url = `${page}/search?address=${keySearch}&checkin=${checkin}&checkout=${checkout}`;
    } else if (page === "experience") {
      url = `${page}/search?keySearch=${keySearch}`;
    } else {
      url = `${page}/search?keySearch=${keySearch}`;
    }
    console.log("keysearch: ", keySearch);
    dispatch(dataExploreSlice.actions.getDataExploreRequest());
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/explore/search?keySearch=${keySearch}`)
      .then(function (response) {
        navigate("/explore");
        dispatch(dataExploreSlice.actions.getDataExploreSuccess(response.data));
        // console.log("Data search: ", response.data);
      })
      .catch(function (error) {
        dispatch(dataExploreSlice.actions.getDataExploreFailure());

        console.log(error);
      });
  }

  // method check email is valid
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // method show or hide login modal
  const toggleLoginPopup = () => {
    if (isOpenRegisterModal) {
      setisOpenRegisterModal(!isOpenRegisterModal);
    }
    setisOpenLoginModal(!isOpenLoginModal);
  };

  // method show or hide register modal
  const toggleRegisterPopup = () => {
    if (isOpenLoginModal) {
      setisOpenLoginModal(!isOpenLoginModal);
    }
    setisOpenRegisterModal(!isOpenRegisterModal);
  };

  // method signup
  const signup = () => {
    if (!username == "" && !password == "" && !confirmPassword == "") {
      if (isValidEmail(username)) {
        if (password === confirmPassword) {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            email: username,
            password: password,
            role: "USER",
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
            .then((response) => {
              if (response.ok) {
                return response.text();
              }throw Error(response.status);
            })
            .then((result) => {
              setSuccessMessage("Đăng kí thành công thành công. Mời bạn đăng nhập!");
              setErrorMessage("");
              setisOpenLoginModal(true);
              setisOpenRegisterModal(false);
            })
            .catch((error) => {
              console.error("error", error);
              setErrorMessage("error!");});
        } else {
          setErrorMessage("Mật khẩu không khớp!");
        }
      } else {
        setErrorMessage("Email không hợp lệ!");
      }
    } else {
      setErrorMessage("Hãy nhập đầy đủ thông tin!");
    }
  };

  // method login
  const login = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.setItem("accesstoken", result.access_token);
        localStorage.setItem("user", result.user.email);
        setisOpenLoginModal(false);
        setIsLogined(true);
        alert("Đăng nhập thành công");
      })
      .catch((error) => {
        console.error("error", error);
        alert("Tên tài khoản hoặc mật khẩu sai!");
      });
  };

  // method logout
  const logout = () => {
    console.log("Bearer " + localStorage.getItem("accesstoken") != null);
    if (localStorage.getItem("accesstoken") != null) {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("accesstoken")
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/v1/auth/logout", requestOptions)
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("user");
            setIsLogined(false);
            alert("Đăng xuất thành công");
            return response.text();
          }
          throw Error(response.status);
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
          alert("Loi roi!");
        });
    } else {
      alert("Ban chua dang nhap!");
    }
  };

  return (
    <header className="header">
      <Row className="heading">
        <Col className="logo l10sdlqs atm_9s_glywfm atm_9s_1ulexfb__qky54b dir dir-ltr">
          <svg width="102" height="32">
            <path
              d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
              fill="currentcolor"
            ></path>
            <path
              d="M41.6847 24.1196C40.8856 24.1196 40.1505 23.9594 39.4792 23.6391C38.808 23.3188 38.2327 22.8703 37.7212 22.2937C37.2098 21.7172 36.8263 21.0445 36.5386 20.3078C36.2509 19.539 36.123 18.7062 36.123 17.8093C36.123 16.9124 36.2829 16.0475 36.5705 15.2787C36.8582 14.51 37.2737 13.8373 37.7852 13.2287C38.2966 12.6521 38.9039 12.1716 39.6071 11.8513C40.3103 11.531 41.0455 11.3708 41.8765 11.3708C42.6756 11.3708 43.3788 11.531 44.0181 11.8833C44.6574 12.2037 45.1688 12.6841 45.5843 13.2927L45.6802 11.7232H48.6209V23.7992H45.6802L45.5843 22.0375C45.1688 22.6781 44.6254 23.1906 43.9222 23.575C43.2829 23.9274 42.5158 24.1196 41.6847 24.1196ZM42.4519 21.2367C43.0272 21.2367 43.5386 21.0765 44.0181 20.7882C44.4656 20.4679 44.8172 20.0515 45.1049 19.539C45.3606 19.0265 45.4884 18.4179 45.4884 17.7452C45.4884 17.0725 45.3606 16.4639 45.1049 15.9514C44.8492 15.4389 44.4656 15.0225 44.0181 14.7022C43.5706 14.3818 43.0272 14.2537 42.4519 14.2537C41.8765 14.2537 41.3651 14.4139 40.8856 14.7022C40.4382 15.0225 40.0866 15.4389 39.7989 15.9514C39.5432 16.4639 39.4153 17.0725 39.4153 17.7452C39.4153 18.4179 39.5432 19.0265 39.7989 19.539C40.0546 20.0515 40.4382 20.4679 40.8856 20.7882C41.3651 21.0765 41.8765 21.2367 42.4519 21.2367ZM53.6392 8.4559C53.6392 8.80825 53.5753 9.12858 53.4154 9.38483C53.2556 9.64109 53.0319 9.86531 52.7442 10.0255C52.4565 10.1856 52.1369 10.2497 51.8173 10.2497C51.4976 10.2497 51.178 10.1856 50.8903 10.0255C50.6026 9.86531 50.3789 9.64109 50.2191 9.38483C50.0592 9.09654 49.9953 8.80825 49.9953 8.4559C49.9953 8.10355 50.0592 7.78323 50.2191 7.52697C50.3789 7.23868 50.6026 7.04649 50.8903 6.88633C51.178 6.72617 51.4976 6.66211 51.8173 6.66211C52.1369 6.66211 52.4565 6.72617 52.7442 6.88633C53.0319 7.04649 53.2556 7.27072 53.4154 7.52697C53.5433 7.78323 53.6392 8.07152 53.6392 8.4559ZM50.2191 23.7672V11.6911H53.4154V23.7672H50.2191V23.7672ZM61.9498 14.8623V14.8943C61.79 14.8303 61.5982 14.7982 61.4383 14.7662C61.2466 14.7342 61.0867 14.7342 60.895 14.7342C60 14.7342 59.3287 14.9904 58.8812 15.535C58.4018 16.0795 58.178 16.8483 58.178 17.8413V23.7672H54.9817V11.6911H57.9223L58.0182 13.517C58.3379 12.8763 58.7214 12.3958 59.2648 12.0435C59.7762 11.6911 60.3835 11.531 61.0867 11.531C61.3105 11.531 61.5342 11.563 61.726 11.595C61.8219 11.6271 61.8858 11.6271 61.9498 11.6591V14.8623ZM63.2283 23.7672V6.72617H66.4247V13.2287C66.8722 12.6521 67.3836 12.2036 68.0229 11.8513C68.6622 11.531 69.3654 11.3388 70.1645 11.3388C70.9635 11.3388 71.6987 11.4989 72.3699 11.8193C73.0412 12.1396 73.6165 12.588 74.128 13.1646C74.6394 13.7412 75.0229 14.4139 75.3106 15.1506C75.5983 15.9194 75.7261 16.7522 75.7261 17.6491C75.7261 18.546 75.5663 19.4109 75.2787 20.1796C74.991 20.9484 74.5755 21.6211 74.064 22.2297C73.5526 22.8063 72.9453 23.2867 72.2421 23.6071C71.5389 23.9274 70.8037 24.0875 69.9727 24.0875C69.1736 24.0875 68.4704 23.9274 67.8311 23.575C67.1918 23.2547 66.6804 22.7742 66.2649 22.1656L66.169 23.7352L63.2283 23.7672ZM69.3973 21.2367C69.9727 21.2367 70.4841 21.0765 70.9635 20.7882C71.411 20.4679 71.7626 20.0515 72.0503 19.539C72.306 19.0265 72.4339 18.4179 72.4339 17.7452C72.4339 17.0725 72.306 16.4639 72.0503 15.9514C71.7626 15.4389 71.411 15.0225 70.9635 14.7022C70.5161 14.3818 69.9727 14.2537 69.3973 14.2537C68.822 14.2537 68.3106 14.4139 67.8311 14.7022C67.3836 15.0225 67.032 15.4389 66.7443 15.9514C66.4886 16.4639 66.3608 17.0725 66.3608 17.7452C66.3608 18.4179 66.4886 19.0265 66.7443 19.539C67 20.0515 67.3836 20.4679 67.8311 20.7882C68.3106 21.0765 68.822 21.2367 69.3973 21.2367ZM76.9408 23.7672V11.6911H79.8814L79.9773 13.2607C80.3289 12.6841 80.8084 12.2357 81.4157 11.8833C82.023 11.531 82.7262 11.3708 83.5253 11.3708C84.4203 11.3708 85.1874 11.595 85.8267 12.0115C86.4979 12.4279 87.0094 13.0365 87.361 13.8053C87.7126 14.574 87.9043 15.5029 87.9043 16.56V23.7992H84.708V16.9764C84.708 16.1436 84.5162 15.4709 84.1326 14.9904C83.7491 14.51 83.2376 14.2537 82.5664 14.2537C82.0869 14.2537 81.6714 14.3498 81.2878 14.574C80.9362 14.7982 80.6486 15.0865 80.4248 15.503C80.2011 15.8873 80.1052 16.3678 80.1052 16.8483V23.7672H76.9408V23.7672ZM89.5025 23.7672V6.72617H92.6989V13.2287C93.1464 12.6521 93.6578 12.2036 94.2971 11.8513C94.9364 11.531 95.6396 11.3388 96.4387 11.3388C97.2378 11.3388 97.9729 11.4989 98.6442 11.8193C99.3154 12.1396 99.8907 12.588 100.402 13.1646C100.914 13.7412 101.297 14.4139 101.585 15.1506C101.873 15.9194 102 16.7522 102 17.6491C102 18.546 101.841 19.4109 101.553 20.1796C101.265 20.9484 100.85 21.6211 100.338 22.2297C99.8268 22.8063 99.2195 23.2867 98.5163 23.6071C97.8131 23.9274 97.0779 24.0875 96.2469 24.0875C95.4478 24.0875 94.7446 23.9274 94.1053 23.575C93.466 23.2547 92.9546 22.7742 92.5391 22.1656L92.4432 23.7352L89.5025 23.7672ZM95.7035 21.2367C96.2788 21.2367 96.7903 21.0765 97.2697 20.7882C97.7172 20.4679 98.0688 20.0515 98.3565 19.539C98.6122 19.0265 98.7401 18.4179 98.7401 17.7452C98.7401 17.0725 98.6122 16.4639 98.3565 15.9514C98.1008 15.4389 97.7172 15.0225 97.2697 14.7022C96.8222 14.3818 96.2788 14.2537 95.7035 14.2537C95.1281 14.2537 94.6167 14.4139 94.1373 14.7022C93.6898 15.0225 93.3382 15.4389 93.0505 15.9514C92.7628 16.4639 92.6669 17.0725 92.6669 17.7452C92.6669 18.4179 92.7948 19.0265 93.0505 19.539C93.3062 20.0515 93.6898 20.4679 94.1373 20.7882C94.6167 21.0765 95.0962 21.2367 95.7035 21.2367Z"
              fill="currentcolor"
            ></path>
          </svg>
        </Col>

        <Col className="nav">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "active nav-item" : "nav-item"
            }
          >
            Chỗ ở
          </NavLink>
          <NavLink
            to="/experience"
            className={(navData) =>
              navData.isActive ? "active nav-item" : "nav-item"
            }
          >
            Trải nghiệm
          </NavLink>
          <NavLink
            to="/explore"
            className={(navData) =>
              navData.isActive ? "active nav-item" : "nav-item"
            }
          >
            Khám phá
          </NavLink>
        </Col>

        <Col className="action">
          <NavLink
            to="/host/home"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            Cho thuê chỗ ở qua Airbnb
          </NavLink>

          {/* Menu */}
          <div className="account">
            <Dropdown>
              <Dropdown.Toggle
                className="account-btn"
                variant="dark"
                id="dropdown-basic"
              >
                <svg
                  className="ml-3"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="17.25"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#000000"
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                  />
                </svg>
                <Avatar
                  className="avatar ml-3"
                  alt="avatar"
                  src="https://mui.com/static/images/avatar/2.jpg"
                />
              </Dropdown.Toggle>

              {isLogined ? (
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 512 512"
                      >
                        <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                      </svg>
                      <button className="text-2xl py-2 px-4">Tin nhắn</button>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="17.5"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                      </svg>
                      <button className="text-2xl py-2 px-4">Thông báo</button>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="17.5"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                      <button className="text-2xl py-2 px-4">Tài khoản</button>
                    </div>
                  </Dropdown.Item>
                  <hr />
                  <Dropdown.Item>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 512 512"
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                      <button className="text-2xl py-2 px-4" onClick={logout}>
                        Đăng xuất
                      </button>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 512 512"
                      >
                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                      </svg>
                      <button
                        className="text-2xl py-2 px-4"
                        onClick={toggleLoginPopup}
                      >
                        Log in
                      </button>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 512 512"
                      >
                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                      </svg>
                      <button
                        className="text-2xl py-2 px-4"
                        onClick={toggleRegisterPopup}
                      >
                        Sign Up
                      </button>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        </Col>
      </Row>

      {page === "home" ? (
        <div className="search-wrap">
          <div className="search-address">
            <label htmlFor="keySearch">Địa điểm</label>
            <input
              type="text"
              className="search-text"
              value={keySearch}
              onChange={(e) =>
                dispatch(keySearchSlice.actions.setKeySearch(e.target.value))
              }
              id="keySerch"
              name="keySearch"
              placeholder="Tìm kiếm địa điểm..."
            ></input>
          </div>
          <div className="checkin">
            <label htmlFor="">Nhận phòng</label>
            <DatePicker
              className="search-text"
              selected={checkin}
              onChange={(date) => setCheckin(date)}
              minDate={today}
            />
          </div>
          <div className="checkout">
            <label htmlFor="">Trả phòng</label>
            <DatePicker
              className="search-text"
              selected={checkout}
              onChange={(date) => setCheckout(date)}
              minDate={checkin.getTime() + 86400000}
            />
          </div>
          <SearchIcon
            onClick={() => handleSearch()}
            className="search-btn"
          ></SearchIcon>
        </div>
      ) : page === "explore" ? (
        <div className="search-wrap">
          <div className="search-address">
            <label htmlFor="keySearch">{page}</label>
            <input
              type="text"
              className="search-text"
              value={keySearch}
              onChange={(e) => {
                //                 dispatch(keySearchSlice.actions.setKeySearch(e.target.value))

                dispatch(keySearchSlice.actions.setKeySearch(e.target.value));

                setShowHistory(true);
              }}
              id="keySerch"
              name="keySearch"
              placeholder="Tìm kiếm..."
            />
            {showHistory & (suggest?.length > 0) ? (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Gợi ý</h2>
                <ul className="suggest">
                  {suggest.map((e, i) => (
                    // <li key={i}> {e.propertyName} </li>
                    <Link
                      className="suggest-item"
                      key={i}
                      to={`/explore/detail/${e.propertyId}`}
                      onClick={() => {
                        setShowHistory(false);
                        // dispatch(keySearchSlice.actions.setKeySearch(""));
                      }}
                    >
                      <img src={e.thumbnail} alt="thumbnail" />
                      <h3>{e.propertyName}</h3>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}

            {suggest?.length === 0 ? (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Không tìm thấy thông tin</h2>
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            className="clear"
            onClick={() => {
              dispatch(keySearchSlice.actions.setKeySearch(""));
              dispatch(counterSlice.actions.increase());
            }}
          >
            <HighlightOffIcon className="clear-btn"></HighlightOffIcon>
          </div>
          <SearchIcon
            onClick={() => handleSearch()}
            className="search-btn"
          ></SearchIcon>
        </div>
      ) : (
        <div className="search-wrap">
          <div className="search-address">
            <label htmlFor="keySearch">{page}</label>
            <input
              type="text"
              className="search-text"
              value={keySearch}
              onChange={(e) => {
                dispatch(keySearchSlice.actions.setKeySearch(e.target.value));

                setShowHistory(true);
              }}
              id="keySerch"
              name="keySearch"
              placeholder="Tìm kiếm..."
            />
            {showHistory && (
              <div
                tabindex="1"
                className="search-history"
                onBlur={() => {
                  setShowHistory(false);
                }}
              >
                <h2>Gợi ý</h2>
                <ul className="history-item">
                  <li>kết quả 1</li>
                  <li>kết quả 2</li>
                  <li>kết quả 3</li>
                </ul>

                <h2>Lịch sử tìm kiếm</h2>
                <ul className="history-item">
                  <li>kết quả 1</li>
                  <li>kết quả 2</li>
                  <li>kết quả 3</li>
                </ul>
              </div>
            )}
          </div>

          <div
            className="clear"
            onClick={() => dispatch(keySearchSlice.actions.setKeySearch(""))}
          >
            <HighlightOffIcon className="clear-btn"></HighlightOffIcon>
          </div>
          <SearchIcon
            onClick={() => handleSearch()}
            className="search-btn"
          ></SearchIcon>
        </div>
      )}

      {/* modal Login start */}
      {isOpenLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
          <div
            className="absolute inset-0 bg-gray-900 opacity-50"
            onClick={toggleLoginPopup}
          ></div>
          {/* header area start */}
          <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
            <div className="items-center font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
              <button
                className="absolute z-100 -mr-2 text-gray-500 hover:text-gray-700"
                onClick={toggleLoginPopup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height=""
                  width="15"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <h2 className="text-3xl justify-center text-center font-semibold">
                Đăng nhập
              </h2>
            </div>
            {/* header area end */}
            <hr />
            {/* body area start */}
            <div className="px-10 py-4 overflow-auto max-h-[88%] z-50">
              {/* success message */}
              {!successMessage == "" ? (
                <div className="bg-[#d4edda] rouned-xl p-3 my-3">
                  <span className="text-green-500">{successMessage}</span>
                </div>
              ) : null}
              
              {/* body title */}
              <h1 className="font-semibold mb-4">Chào mừng đến Airbnb</h1>
              {/* form login start */}
              <form>
                {/* username */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-800 font-medium mb-2"
                  >
                    Tên tài khoản<span className="text-red-500"> (*)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-required
                  />
                </div>
                {/* Password */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-800 font-medium mb-2"
                  >
                    Mật khẩu<span className="text-red-500"> (*)</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* Login button */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={login}
                    type="button"
                    className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>

              {/* open signup modal */}
              <div className="justify-center text-center my-3">
                Bạn chưa có tài khoản?
                <button
                  onClick={toggleRegisterPopup}
                  className="text-[#FF002C]"
                >
                  {" "}
                  Đăng ký
                </button>
              </div>
              {/* form login end  */}

              {/* line */}
              <div className="flex items-center justify-center my-3">
                <div className="border-t border-gray-300 w-full"></div>
                <div className="mx-4 text-gray-500">hoặc</div>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              {/* other login function area start */}
              <ButtonCustom />
              {/* other login function end */}
            </div>
            {/* body area end */}
          </div>
          {/* modal end */}
        </div>
      )}

      {/* modal Rgister start */}
      {isOpenRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
          <div
            className="absolute inset-0 bg-gray-900 opacity-50"
            onClick={toggleRegisterPopup}
          ></div>

          {/* header area start */}
          <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
            <div className="items-center font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
              {/* close modal button */}
              <button
                className="absolute z-100 -mr-2 text-gray-500 hover:text-gray-700"
                onClick={toggleRegisterPopup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height=""
                  width="15"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <h2 className="text-3xl justify-center text-center font-semibold">
                Đăng kí
              </h2>
            </div>
            {/* header area end */}
            <hr />
            {/* body area start */}
            <div className="px-10 py-4 overflow-auto max-h-[88%] z-50">
              {/* error message */}
              {!errorMessage == "" ? (
                <div className="bg-[#f8d7da] rouned-xl p-3 my-3">
                  <span className="text-red-500">{errorMessage}</span>
                </div>
              ) : null}

              {/* success message */}
              {!successMessage == "" ? (
                <div className="bg-[#d4edda] rouned-xl p-3 my-3">
                  <span className="text-green-500">{successMessage}</span>
                </div>
              ) : null}

              {/* body title */}
              <h1 className="font-semibold mb-4">Welcome to Airbnb</h1>
              {/* form signup start */}
              <form>
                {/* Username */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-800 font-medium mb-2"
                  >
                    Tên tài khoản<span className="text-red-500"> (*)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {/* Password */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-800 font-medium mb-2"
                  >
                    Mật khẩu<span className="text-red-500"> (*)</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* confirmPassword */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-800 font-medium mb-2"
                  >
                    {" "}
                    Nhập lại mật khẩu<span className="text-red-500"> (*)</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {/* button signup */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={signup}
                    type="button"
                    className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>

              {/* open login modal */}
              <div className="justify-center text-center my-3">
                Bạn chưa đã có tài khoản?
                <button onClick={toggleLoginPopup} className="text-[#FF002C]">
                  {" "}
                  Đăng nhập
                </button>
              </div>
              {/* form login end  */}

              {/* line */}
              <div className="flex items-center justify-center my-3">
                <div className="border-t border-gray-300 w-full"></div>
                <div className="mx-4 text-gray-500">hoặc</div>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              {/* other login function area start */}
              <ButtonCustom />
              {/* other login function end */}
            </div>
            {/* body area end */}
          </div>
          {/* modal end */}
        </div>
      )}
    </header>
  );
}

const ButtonCustom = () => {
  return (
    <>
      {/* Facebook */}
      <button
        type="submit"
        className="relative flex items-center justify-center font-medium py-3 px-4 rounded-xl hover:bg-gray-200 w-full border border-black"
      >
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#1877f2"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M20.667 0H3.333C1.493 0 0 1.493 0 3.333v17.334C0 22.507 1.493 24 3.333 24h9.062v-9.294H9.083v-3.612h3.312V8.844c0-3.287 2.007-5.083 4.945-5.083 1.405 0 2.615.105 2.97.152v3.438h-2.038c-1.595 0-1.905.758-1.905 1.872v2.448h3.818l-.498 3.612h-3.32V24h6.498c1.84 0 3.333-1.493 3.333-3.333V3.333C24 1.493 22.507 0 20.667 0z" />
          </svg>
        </div>
        <span>Tiếp tục với Facebook</span>
      </button>
      {/* Google */}
      <button
        type="submit"
        className="relative flex items-center justify-center font-medium mt-4 py-3 px-4 rounded-xl hover:bg-gray-200 w-full border border-black"
      >
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-8">
          <svg viewBox="0 0 48 48" width="24" height="24">
            <clipPath id="g">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
            </clipPath>
            <g class="colors" clip-path="url(#g)">
              <path fill="#FBBC05" d="M0 37V11l17 13z" />
              <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </g>
          </svg>
        </div>
        <span>Tiếp tục với Google</span>
      </button>
      {/* Apple */}
      <button
        type="submit"
        className="relative flex items-center justify-center font-medium mt-4 py-3 px-4 rounded-xl hover:bg-gray-200 w-full border border-black"
      >
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-8">
          <svg viewBox="0 0 170 170" fill="currentColor" width="24" height="24">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z" />
          </svg>
        </div>
        <span>Tiếp tục với Apple</span>
      </button>
      {/* Mail */}
      <button
        type="submit"
        className="relative flex items-center justify-center font-medium mt-4 py-3 px-4 rounded-xl hover:bg-gray-200 w-full border border-black"
      >
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-8">
          <svg
            viewBox="0 0 8 6"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z" />
          </svg>
        </div>
        <span>Tiếp tục với Email</span>
      </button>
    </>
  );
};

export default Header;
