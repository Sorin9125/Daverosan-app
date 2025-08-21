import { useState, useEffect } from "react";
import userApi from "../Utils/User";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";

function Context({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getCurrentUser();
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await userApi.loginUser(userData);
      setUser(response.data.user);
    } catch (err) {
      toast.error(err.response.data.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await userApi.logoutUser();
      toast.success(response.data.message);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await userApi.createUser(userData);
      setUser(response.data.user);
    } catch (err) {
      toast.error(err.response.data.message);
      setUser(null)
    } finally {
      setLoading(false);
    }
  }

  return(
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Context