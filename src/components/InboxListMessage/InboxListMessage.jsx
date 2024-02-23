import React, { useEffect, useState } from "react";
import style from "./inboxListMessage.module.css";
import Room from "./Room/Room";
export default function InboxListMessage() {
  const [listRoom, setListRoom] = useState([]);
  const idUser = localStorage.getItem("id_user");
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/stayeasy/chatroom/get/all/room/user/${idUser}`
    )
      .then((data) => data.json())
      .then((data) => {
        setListRoom(data);
      });
  }, [idUser]);

  return (
    <div className={style.inbox_box}>
      <div className={style.inbox_box_top}>
        <h2>Messages</h2>
        <div>
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M14 25h4v4h-4zm-4-3h12v-4H10zm-4-7h20v-4H6zM2 4v4h28V4z"></path>
          </svg>
        </div>
      </div>

      <div className={style.inbox_box_content}>
        <ul>
          {listRoom.map((e) => (
            <Room key={e.roomChatId} data={e}></Room>
          ))}
        </ul>
      </div>
    </div>
  );
}
