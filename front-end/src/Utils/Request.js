import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API;

const requestAPI = {
    createRequest: async (clientId, request) => {
        const response = await axios.post(`${BACKEND_URL}/request/createRequest/${clientId}`, request, {
            withCredentials: true,
        });
        return response;
    },
    getRequests: async () => {
        const response = await axios.get(`${BACKEND_URL}/request/getAllRequests`, {
            withCredentials: true,
        });
        return response;
    },
    updateRequest: async (id, newRequest) => {
        const response = await axios.put(`${BACKEND_URL}/request/updateRequest/${id}`, newRequest, {
            withCredentials: true,
        });
        return response;
    },
    deleteRequest: async (id) => {
        const respone = await axios.delete(`${BACKEND_URL}/request/deleteRequest/${id}`, {
            withCredentials: true,
        });
        return respone;
    },
    getRequestOffer: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/request/getRequestOffer/${id}`, {
            withCredentials: true,
        })
        return response;
    },
}

export default requestAPI;