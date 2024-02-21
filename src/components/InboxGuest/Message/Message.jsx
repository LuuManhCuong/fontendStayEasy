import style from '../inboxGuest.module.css'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
export default function Message({ data }) {
    const [user, setUser] = useState()
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/user/${data.userId}`)
            .then(data => data.json())
            .then(user => {
                setUser(user)
            })
    }, [data])
    return (
        <li>
            <div className={style.inbox_avater}>
                <img src={`${user ? user.avatar : ''}`} alt="" />
            </div>
            <div className={style.inbox_content}>
                <div className={style.inbox_infor}>
                    <h3>{user ? user.firstName+" "+user.lastName : ''}</h3>
                    <span>{moment(data.createAt, 'YYYY-MM-DDTHH:mm:ss').fromNow()}</span>
                </div>
                <div className={style.inbox_mess}>
                    <p>{data.content}</p>
                </div>
            </div>
        </li>
    )
}
