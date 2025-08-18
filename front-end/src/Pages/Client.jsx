import { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import ClientsTable from "../Components/Tables/ClientsTable/ClientsTable";
import clientAPI from "../Utils/Client";
import CreateClient from "../Components/Modals/Client/CreateClient";

function Client() {
    const [clientData, setClientData] = useState([]);

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
            <CreateClient fetchClients={fetchClients}/>
            </Box>

            <ClientsTable clients={clientData} fetchClients={fetchClients} />
        </>
    );
}

export default Client;
