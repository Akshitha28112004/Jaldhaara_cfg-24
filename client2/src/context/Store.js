import { useContext, useEffect, useState } from "react";
import { CounterContext } from "./CounterContext";
import { jwtDecode } from "jwt-decode";

function Store({ children }) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); 
        console.log("from console",token);
    } 
  }, []);

  return (
    <CounterContext.Provider value={{ user, setUser}}>
      {children}
    </CounterContext.Provider>
  );
}

export default Store;