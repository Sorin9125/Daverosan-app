import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const userContext = createContext({});

const BACKEND_URL = import.meta.env.VITE_API

function Context(props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const req = await axios.get(`${BACKEND_URL}/user/getCurrentUser`, {
          withCredentials: true,
        });
        const user = req.data.user;
        if (user && Object.keys(user).length != 0) {
          setUserData(user);
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }

    };

    loadUser();
  }, []);

  return (
    <userContext.Provider value={{ user: userData, setUser: setUserData }}>
      {props.children}
    </userContext.Provider>
  );
}

export default Context;