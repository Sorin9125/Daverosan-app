import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const userContext = createContext({});

const BACKEND_URL = import.meta.env.VITE_API

function Context(props) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.split("; ").some(row => row.startsWith("token="));
    if(!token) {
      setUserData(null);
      setLoading(false);
      return
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/getCurrentUser`, {
          withCredentials: true,
        });
        setUserData(response.data.user);
      } catch (err) {
        setUserData(null)
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [])

  return (
    <userContext.Provider value={{ user: userData, setUser: setUserData, loading, setLoading }}>
      {props.children}
    </userContext.Provider>
  );
}

export default Context;