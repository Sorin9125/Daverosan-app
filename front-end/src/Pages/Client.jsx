import { useState, useEffect, useCallback } from "react";
import ClientsTable from "../Components/Tables/ClientsTable/ClientsTable";
import ClientModal from "../Components/Modal/ClientModal";
import { toast } from "react-toastify";
import clientAPI from "../Utils/Client";

function Client() {
    const [clientData, setClientData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [client, setClient] = useState(null)

    const fetchClients = useCallback(() => {
        const getClients = async () => {
            try {
                const respone = await clientAPI.getAllClients();
                setClientData(respone.data);
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
        <>
            <ClientsTable
                clients={clientData}
                createClient={createClient}
                udpateClient={updateClient}
                deleteClient={deleteClient}
            />
            <ClientModal 
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleClient}
                client={client}
            />
        </>
    );
}

export default Client;
