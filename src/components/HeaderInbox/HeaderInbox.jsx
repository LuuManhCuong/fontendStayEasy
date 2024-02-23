import React, { useEffect, useState } from "react";
import style from "./header.module.css";
export default function HeaderInbox() {
  const idUser = localStorage.getItem("id_user");
  const [user, setUser] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/stayeasy/user/${idUser}`)
      .then((data) => data.json())
      .then((data) => {
        console.log("daataa: ", data);
        setUser(data);
      });
  }, [idUser]);
  return (
    <header>
      <a href="/" className={style.header_logo}>
        <img src="/images/logo.png" alt=""></img>
      </a>
      <div className={style.header_profile}>
        <a href="/">Airbnb your home</a>
        <i className={`${style.global_icon} fa-solid fa-globe`}></i>
        <button className={style.profile_btn}>
          <i className={`${style.global_menu} fa-solid fa-bars`}></i>
          <div className={style.profile_avt}>
            <img src={`${user ? user.avatar : ""}`} alt=""></img>
          </div>
        </button>
      </div>
    </header>
  );
}
