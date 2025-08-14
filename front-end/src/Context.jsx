import { createContext, useState, useEffect } from "react";
import userApi from "./Utils/User";
import { toast } from "react-toastify";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getCurrentUser();
        console.log(response);
        setUser(response.data);
      } catch (err) {
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
      setUser(response.data);
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
      console.log(response);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider