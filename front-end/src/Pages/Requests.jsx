import { useCallback, useEffect, useState } from "react";
import RequestsTable from "../Components/Tables/RequestTable/RequestsTable";
import requestAPI from "../Utils/Request";
import { Typography } from "@mui/material";

function Request() {
    const [requestData, setRequestData] = useState([]);

    const fetchRequests = useCallback(() => {
        const getRequests = async () => {
            try {
                const response = await requestAPI.getRequests();
                setRequestData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getRequests();
    }, [])

    useEffect(fetchRequests, [fetchRequests]);

    return (
        <>
            <Typography sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4
            }}
                component="h1" variant="h4" fontWeight="bold" gutterBottom
            >Cereri de ofertă</Typography>
            <RequestsTable requests={requestData}/>
        </>
    )
}

export default Request;