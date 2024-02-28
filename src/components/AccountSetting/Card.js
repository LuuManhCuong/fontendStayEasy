import React from 'react'
import {Link} from "react-router-dom";

export default function Card({svg, title, description, href}) {
  return (
    <>
      <div className='p-4 w-[32%] border border-black rounded-3xl shadow-xl'>
        <Link to={href}>
          <svg xmlns="http://www.w3.org/2000/svg" height="26" width="30" viewBox="0 0 576 512">
            <path d={svg}/>
          </svg>
          <h3 className='mt-5'>{title}</h3>
          <p>{description}</p>
        </Link>
      </div>
    </>
  )
}