import OffersTable from "../Components/Tables/OffersTable/OffersTable";
import { useState, useEffect, useCallback } from "react";
import offerAPI from "../Utils/Offer";
import { Typography } from "@mui/material";

function Offers() {
    const [offersData, setOffersData] = useState([]);

    const fetchOffers = useCallback(() => {
        const getOffers = async () => {
            try {
                const response = await offerAPI.getAllOffers();
                setOffersData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getOffers();
    }, [])

    useEffect(fetchOffers, [fetchOffers])

    return (
        <>
            <Typography sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4
            }}
                component="h1" variant="h4" fontWeight="bold" gutterBottom
            >Oferte</Typography>
            <OffersTable offers={offersData}></OffersTable>
        </>
    )
}

export default Offers;