import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import offerAPI from "../../../Utils/Offer";
import UpdateOffer from "../../Modals/Offers/UpdateOffer";
import DeleteOffer from "../../Modals/Offers/DeleteOffer";
import CreateOrder from "../../Modals/Orders/CreateOrder";

function OffersTableRow({ offer, fetchOffers }) {
    const [data, setData] = useState([]);
    const [openOrders, setOpenOrders] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await offerAPI.getOfferOrder(offer.id);
            setData(response.data);
        } catch (err) {
            setOpenOrders(false);
            toast.error(err.response.data.message);
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
                <TableCell align="left">{offer.type === "total" ? parseFloat(offer.value) + " total" : parseFloat(offer.value) + "/" + offer.unit}</TableCell>
                <TableCell align="left" sx={{
                    maxWidth: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    <Tooltip title={offer.description} placement="top-start">
                        <span style={{ display: "block", width: "100%" }}>{offer.description}</span>
                    </Tooltip>
                </TableCell>
                <TableCell align="left">{new Date(offer.deadline).toLocaleDateString("en-GB")}</TableCell>
                <TableCell align="left">{offer.isAccepted ? "Acceptată" : "Neacceptată"}</TableCell>
                <TableCell align="left">{offer.request.client.name}</TableCell>
                <TableCell align="center">
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
                <TableCell align="center">
                    <CreateOrder offerId={offer.id} fetchOffers={fetchOffers} />
                </TableCell>
                <TableCell align="left">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                        <UpdateOffer offer={offer} fetchOffers={fetchOffers} />
                        <DeleteOffer offer={offer} fetchOffers={fetchOffers} />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
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
                                        <TableCell sx={{ fontWeight: "bold" }}>Valoare</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Dată finalizare</TableCell>
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
                                            <TableCell>{parseFloat(data.value)}</TableCell>
                                            <TableCell>{parseFloat(data.quantity)} {data.unit}</TableCell>
                                            <TableCell>{new Date(data.deadline).toLocaleDateString("en-GB")}</TableCell>
                                            <TableCell>{data.isCompleted ? new Date(data.finishDate).toLocaleDateString("en-GB") : "Comanda este în desfășurare"}</TableCell>
                                            <TableCell>{data.description}</TableCell>
                                            <TableCell>{data.isCompleted ? "Finalizată" : ((data.quantity - data.remainingQuantity) / data.quantity * 100).toFixed(2) + "%"}</TableCell>
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