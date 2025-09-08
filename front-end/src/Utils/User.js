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
        const response = await axios.put(`${BACKEND_URL}/user/updateUser/${id}`, newUser, {
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
    },
    getCurrentUser: async () => {
        const response = await axios.get(`${BACKEND_URL}/user/getCurrentUser`, {
            withCredentials: true,
        })
        return response;
    },
    sendResetToken: async (email) => {
        const response = await axios.post(`${BACKEND_URL}/user/sendToken`, email, {
            withCredentials: true,
        });
        return response;
    },
    resetPassword: async (password, resetToken) => {
        const response = await axios.put(`${BACKEND_URL}/user/resetPassword/${resetToken}`, password, {
            withCredentials: true,
        });
        return response;
    },
    activateAccount: async (verificationCode, id) => {
        const response = await axios.put(`${BACKEND_URL}/user/activateAccount/${id}`, verificationCode, {
            withCredentials: true,
        });
        return response;
    },
    getUserById: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/user/getUserById/${id}`, {
            withCredentials: true,
        });
        return response;
    }
}

export default userApi;