import { useState, useEffect, useCallback } from "react";
import { Typography, Button, Box } from "@mui/material";
import ClientsTable from "../Components/Tables/ClientsTable/ClientsTable";
import { toast } from "react-toastify";
import clientAPI from "../Utils/Client";
import FormModal from "../Components/Modal/ClientModal";

function Client() {
    const [clientData, setClientData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [client, setClient] = useState(null);

    const fetchClients = useCallback(() => {
        const getClients = async () => {
            try {
                const response = await clientAPI.getAllClients();
                setClientData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getClients();
    }, []);

    useEffect(fetchClients, [fetchClients]);

    const createClient = () => {
        setClient(null)
        setModalOpen(true);
    };

    const updateClient = (client) => {
        setClient(client);
        setModalOpen(true)
    }

    const deleteClient = async (id) => {
        try {
            const response = await clientAPI.deleteClient(id);
            toast.success(response.data.message);
            fetchClients();
        } catch (err) {
            console.error(err.response.data.message);
        }
    }

    const handleClient = async (clientData) => {
        if (client) {
            try {
                const response = await clientAPI.updateClient(client.id, clientData);
                toast.success(response.data.message)
            } catch (err) {
                toast.error(err.response.data.message);
            }
        } else {
            try {
                const response = await clientAPI.createClient(clientData);
                toast.success(response.data.message);
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }
        setModalOpen(false);
        fetchClients(0);
    }

    return (
        <>  <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4
        }}>
            <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                Clienți
            </Typography>
            <FormModal actionName={"Creează client"}/>
            </Box>

            <ClientsTable
                clients={clientData}
            />
        </>
    );
}

export default Client;
