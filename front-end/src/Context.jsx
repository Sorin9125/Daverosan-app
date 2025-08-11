import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const userContext = createContext({});

const BACKEND_URL = import.meta.env.VITE_API

function Context(props) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <userContext.Provider value={{ user: userData, setUser: setUserData, loading, setLoading }}>
      {props.children}
    </userContext.Provider>
  );
}

export default Context;