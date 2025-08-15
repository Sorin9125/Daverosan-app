import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API

const offerAPI = {
    createOffer: async (offer, requestId) => {
        const response = await axios.post(`${BACKEND_URL}/offer/createOffer/${requestId}`, offer, {
            withCredentials: true,
        });
        return response;
    },
    getAllOffers: async () => {
        const response = await axios.get(`${BACKEND_URL}/offer/getAllOffers`, {
            withCredentials: true,
        });
        return response;
    },
    updateOffer: async (newOffer, id) => {
        const response = await axios.put(`${BACKEND_URL}/offer/updateOffer/${id}`, newOffer, {
            withCredentials: true,
        });
        return response;
    },
    deleteOffer: async (id) => {
        const response = await axios.delete(`${BACKEND_URL}/offer/deleteOffer/${id}`, {
            withCredentials: true,
        });
        return response;
    },
    getOfferOrder: async (id) => {
        const response = await axios.get(`${BACKEND_URL}/offer/getOfferOrder/${id}`, {
            withCredentials: true,
        });
        return response;
    }
}

export default offerAPI;