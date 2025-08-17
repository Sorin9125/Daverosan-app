import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, } from "@mui/material";
import { Fragment, useState } from "react";
import offerAPI from "../../../Utils/Offer";

function OffersTableRow({ offer }) {
    const [data, setData] = useState([]);
    const [openOrders, setOpenOrders] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await offerAPI.getOfferOrder(offer.id);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <TableRow sx={{
                "& > *": { borderBottom: "unset" },
                "&: hover": { backgroundColor: "action.hover" }
            }} key={offer.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                    {offer.id}
                </TableCell>
                <TableCell align="left">{offer.price}</TableCell>
                <TableCell align="left">{new Date(offer.deadline).toLocaleDateString()}</TableCell>
                <TableCell align="left">{offer.isAccepted ? "Acceptată" : "Neacceptată"}</TableCell>
                <TableCell align="left">{offer.request.client.name}</TableCell>
                <TableCell>
                    <Button
                        aria-label="expand row"
                        size="small"
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: openOrders ? "error.main" : "primary.main",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            "&:hover": {
                                backgroundColor: openOrders ? "error.dark" : "primary.dark",
                            }
                        }}
                        onClick={() => { setOpenOrders(!openOrders); fetchOrders(); }}
                    >
                        {openOrders ? "Ascunde" : 'Generează'}
                    </Button>
                </TableCell>
                <TableCell align="left">Muie dinamo</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={openOrders} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                                Comenzi
                            </Typography>
                            <Table size="small" aria-label="orders">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Număr de comandă</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Descriere</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        <TableRow key={data.id} sx={{
                                            backgroundColor: "background.paper",
                                            "&:hover": { backgroundColor: "action.hover" },
                                        }}>
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>{data.number}</TableCell>
                                            <TableCell>{data.quantity} {data.unit}</TableCell>
                                            <TableCell>{new Date(data.deadline).toLocaleDateString()}</TableCell>
                                            <TableCell>{data.description}</TableCell>
                                            <TableCell>{data.isCompleted}</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default OffersTableRow;