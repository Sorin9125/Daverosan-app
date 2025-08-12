import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

function Offers({ clientID }) {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        axios.get(`${BACKEND_URL}/client/getClientOffers/${id}`, {
            withCredentials: true,
        })
        .then(response => {
            if(!ignore) {
                setOffers(response.data);
            }
        })
        .catch(err => console.error(err))
        .finnaly(() => {
            if(!ignore) {
                setLoading(false);
            }
        })
        return () => { ignore == true; };
    }, [clientID])

    if(loading) {
        <CircularProgress
            size={24}
            sx={{
                mt: 1,
            }}
        />
    }

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Preț</TableCell>
                        <TableCell>Termen de finalizare</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        offers.length > 0 ? offers.map((offer) => (
                            <TableRow key={offer.id}>
                                <TableCell>{offer.id}</TableCell>
                                <TableCell>{offer.price}</TableCell>
                                <TableCell>{offer.deadline}</TableCell>
                                <TableCell>{offer.isAccepted ? "Acceptată" : "Neacceptată"}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4}>Acest client nu are oferte</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Offers;