import React, { useEffect, useState } from 'react'
import { Divider } from 'semantic-ui-react';

export default function Room({ data }) {
    const [user, setUser] = useState()
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/stayeasy/chatroom/get-host/${data.userId}`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                setUser(data)
            })
    }, [data.userId])
    return (
        <div>{user ?
            <>
                {/* sửa lại thành thẻ Link để xem chi tiết tin nhắn */}
                <a href={`/inbox/${data.roomChatId}`} className='flex items-center gap-3 py-2 px-4 w-full'>
                    <div class="relative inline-flex items-center justify-center w-[5rem] h-[3.7rem] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400">
                        <span class="font-medium text-3xl text-gray-200 dark:text-gray-300">
                            <img src={user.avatar} />
                        </span>
                    </div>
                    <div className='text-start'>
                        {/* <h4>123</h4> */}
                        <p className='text-xl'><span className='font-medium'>{user.firstName} {user.lastName}</span></p>
                    </div>
                </a>
                <Divider variant="inset" />
            </>


            : <></>}</div>
    )
}
