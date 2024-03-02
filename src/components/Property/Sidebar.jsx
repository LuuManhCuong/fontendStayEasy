import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [itemId, setItemId] = useState(1);

    const title = [
        {id: 1, name: "Thống kê", link: "/property/statistic"},
        {id: 2, name: "Xem tài sản", link: "/property/list"}
    ]
  return (
    <div>
        <ul className="border">
        {title.map((index) => (
            <Link to={index.link}>
                <li key={index.id} className={`p-3 ${itemId === index.id && "bg-danger"}`}
                onClick={() => setItemId(index.id)}
                >{index.name}</li>
            </Link>
        ))}
        </ul>
       
    </div>
  );
}