import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API;

const productionNotesAPI = {
    createProductionNote: async (productionNote, orderId) => {
        const response = await axios.post(`${BACKEND_URL}/productionNote/createProductionNote/${orderId}`, productionNote, {
            withCredentials: true,
        });
        return response;
    },
    uploadFromFile: async (orderId, fileData) => {
        const response = await axios.post(`${BACKEND_URL}/productionNote/uploadExcel/${orderId}`, fileData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    getAllProductionNotes: async () => {
        const response = await axios.get(`${BACKEND_URL}/productionNote/getAllProductionNotes/`, {
            withCredentials: true,
        });
        return response;
    },
    updateProductionNote: async (newProductionNote, id) => {
        const response = await axios.put(`${BACKEND_URL}/productionNote/updateProductionNote/${id}`, newProductionNote, {
            withCredentials: true,
        });
        return response;
    },
    deleteProductionNote: async (id) => {
        const response = await axios.delete(`${BACKEND_URL}/productionNote/deleteProductionNote/${id}`, {
            withCredentials: true,
        });
        return response;
    },
    finishProducionNote: async (id) => {
        const response = await axios.put(`${BACKEND_URL}/productionNote/finishProductionNote/${id}`, {}, {
            withCredentials: true,
        });
        return response;
    }
}

export default productionNotesAPI;