import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function AdminDarhBoard() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"))

  const getToken = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${accessToken}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:8080/api/v1/token", requestOptions)
    .then((response) => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status >= 200 && status < 300) {
        alert("Lấy dữ liệu token thành công");
      } else {
        // Lấy và hiển thị thông điệp lỗi từ body
        alert(body.message || "Có lỗi xảy ra!");
      }
    })
    .catch((error) => {
      console.error("error", error);
      alert("Có lỗi xảy ra khi lấy token!");
    });
  }

  return (
    <>
      <Header></Header>
      <>
        <button onClick={()=>{getToken();}}>Click me</button>
      </>
      <Footer></Footer>
    </>
  );
}

export default AdminDarhBoard;
