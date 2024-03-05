import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const[ready,setReady] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext.Provider value={{ user, setUser,ready }}>
      {children}
    </UserContext.Provider>
  );
}