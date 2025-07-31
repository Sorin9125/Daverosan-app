import axios from "axios";

const clientTable = {
    generateRequests: async (clientId) => {
        try {
            const requests = await axios.get(`${import.meta.env.VITE_API}/client/getClientRequests/${clientId}`);
            return requests.data;
        } catch (err) {
            console.error(err);
        }
    },
    generateOffers: async (clientId) => {
        try {
            const offers = await axios.get(`${import.meta.env.VITE_API}/client/getClientOffers/${clientId}`);
            return offers.data;
        } catch (err) {
            console.error(err);
        }
    },
    generateOrders: async (clientId) => {
        try {
            const orders = await axios.get(`${import.meta.env.VITE_API}/client/getClientOrders/${clientId}`);
            return orders.data;
        } catch (err) {
            console.error(err);
        }
    }
}

export default clientTable;