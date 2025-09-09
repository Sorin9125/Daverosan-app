import { useState, useEffect } from "react";
import userApi from "../Utils/User";
import AuthContext from "./AuthContext";

function Context({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getCurrentUser();
        setUser(response.data);
        console.log("Am pus user-ul pisco pasta");
      } catch  {
        console.log("Am dat eroare si ti-am tras la muie");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Context