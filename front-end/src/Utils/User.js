import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API;

const userApi = {
    createUser: async (user) => {
        const response = await axios.post(`${BACKEND_URL}/user/createUser`, user, {
            withCredentials: true,
        });
        return response;
    },
    loginUser: async (user) => {
        const response = await axios.post(`${BACKEND_URL}/user/loginUser`, user, {
            withCredentials: true,
        });
        return response;
    },
    updateUser: async (id, newUser) => {
        const response = await axios.put(`${BACKEND_URL}/user/udpateUser/${id}`, newUser, {
            withCredentials: true,
        });
        return response;
    },
    deleteUser: async (id) => {
        const response = await axios.delete(`${BACKEND_URL}/user/deleteUser/${id}`, {
            withCredentials: true,
        });
        return response;
    },
    logoutUser: async () => {
        const response = await axios.get(`${BACKEND_URL}/user/logoutUser`, {
            withCredentials: true,
        });
        return response;
    }
}

export default userApi;