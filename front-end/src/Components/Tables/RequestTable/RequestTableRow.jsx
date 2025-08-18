import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import requestAPI from "../../../Utils/Request";
import UpdateRequest from "../../Modals/Requests/UpdateRequest";
import DeleteRequest from "../../Modals/Requests/DeleteRequest";
import CreateOffer from "../../Modals/Offers/CreateOffer";

function RequestsTableRow({ request, fetchRequests }) {
    const [data, setData] = useState([]);
    const [openOffers, setOpenOffers] = useState(false);

    const fetchOffer = async () => {
        try {
            const response = await requestAPI.getRequestOffer(request.id);
            setData(response.data);
        } catch (err) {
            setOpenOffers(false);
            toast.error(err.response.data.message);
        }
    }

    return (
        <Fragment>
            <TableRow sx={{
                "& > *": { borderBottom: "unset" },
                "&: hover": { backgroundColor: "action.hover" }
            }} key={request.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                    {request.id}
                </TableCell>
                <TableCell align="left" sx={{
                    maxWidth: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    <Tooltip title={request.description} placement="top-start">
                        <span style={{ display: "block", width: "100%" }}>{request.description}</span>
                    </Tooltip>
                </TableCell>
                <TableCell align="left">{new Date(request.sentAt).toLocaleDateString()}</TableCell>
                <TableCell align="left">{request.isOffered ? "Ofertă trimisă" : "Ofertă netrimisă"}</TableCell>
                <TableCell align="left">{request.client.name}</TableCell>
                <TableCell align="center">
                    <Button
                        aria-label="expand row"
                        size="small"
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: openOffers ? "error.main" : "primary.main",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            "&:hover": {
                                backgroundColor: openOffers ? "error.dark" : "primary.dark",
                            }
                        }}
                        onClick={() => { setOpenOffers(!openOffers); fetchOffer(); }}
                    >
                        {openOffers ? "Ascunde" : 'Generează'}
                    </Button>
                </TableCell>
                <TableCell align="center">
                    <CreateOffer requestID={request.id}/>
                </TableCell>
                <TableCell align="left">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                        <UpdateRequest request={request} fetchRequests={fetchRequests} />
                        <DeleteRequest request={request} fetchRequests={fetchRequests} />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={openOffers} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                                Oferte
                            </Typography>
                            <Table size="small" aria-label="offers">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Preț</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
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
                                            <TableCell>{data.price}</TableCell>
                                            <TableCell>{new Date(data.deadline).toLocaleDateString()}</TableCell>
                                            <TableCell>{data.isAccepted ? "Acceptată" : "Neacceptată"}</TableCell>
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

export default RequestsTableRow;