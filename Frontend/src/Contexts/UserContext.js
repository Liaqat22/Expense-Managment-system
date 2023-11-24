import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const User = createContext()

function UserProvider({children}) {
    const [auth , setAuth] = useState({
        user : null
    })
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
          const parseData = JSON.parse(data);
          setAuth({
            ...auth,
            user: parseData.user,
          });
        }
      }, []);
    return (
        <div>
          <User.Provider value={[auth , setAuth]} >
            {children}
          </User.Provider>
        </div>
      )
}
const useAuth =()=> useContext(User)


export { UserProvider, User, useAuth }
