import React from 'react'
import style from './boxchat.module.css'
import HeaderInbox from '../../components/HeaderInbox/HeaderInbox'
import InboxDetail from "../../components/InboxDetail/InboxDetail";
import InboxListMessage from "../../components/InboxListMessage/InboxListMessage";
export default function Inbox({children}) {
  return (
    <>
      <HeaderInbox></HeaderInbox>
      <div className={style.box_message}>
        <InboxListMessage></InboxListMessage>
        
        {children}

        <InboxDetail  ></InboxDetail>
      </div>
    </>
  )
}
