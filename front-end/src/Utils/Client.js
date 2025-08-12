import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API;

const clientAPI = {
    createClient: async (client) => {
        const response = await axios.post(`${BACKEND_URL}/client/createClient`, client, {
            withCredentials: true,
        });
        return response;
    },
    getAllClients: async () => {
        const response = await axios.get(`${BACKEND_URL}/client/getAllClients`, {
            withCredentials: true,
        });
        return response;
    },
    updateClient: async (id, newClient) => {
        const response = await axios.put(`${BACKEND_URL}/client/updateClient/${id}`, newClient, {
            withCredentials: true,
        });
        return response;
    },
    deleteClient: async (id) => {
        const response = await axios.delete(`${BACKEND_URL}/client/deleteClient/${id}`, {
            withCredentials: true,
        });
        return response;
    },
    getRequests: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/client/getClientRequests/${id}`, {
            withCredentials: true,
        });
        return response;
    },
    getOrders: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/client/getClientOrders/${id}`, {
            withCredentials: true,
        });
        return response;
    }
}

export default clientAPI;