import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API;

const orderAPI = {
    createOrder: async (order, offerId) => {
        const response = await axios.post(`${BACKEND_URL}/order/createOrder/${offerId}`, order, {
            withCredentials: true,
        });
        return response;
    },
    getAllOrders: async () => {
        const response = await axios.get(`${BACKEND_URL}/order/getAllOrders`, {
            withCredentials: true,
        });
        return response;
    },
    updateOrder: async(newOrder, id) => {
        const response = await axios.put(`${BACKEND_URL}/order/updateOrder/${id}`, newOrder, {
            withCredentials: true,
        });
        return response;
    },
    deleteOrder: async (id) => {
        const response = await axios.delete(`${BACKEND_URL}/order/deleteOrder/${id}`, {
            withCredentials: true,
        });
        return response;
    },
    getOrderProductionNotes: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/order/getOrderProductionNotes/${id}`, {
            withCredentials: true,
        });
        return response;
    }
}

export default orderAPI;