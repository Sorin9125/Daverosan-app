import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import requestAPI from "../../../Utils/Request";

function RequestsTableRow({ request }) {
    const [data, setData] = useState([]);
    const [openOffers, setOpenOffers] = useState(false);

    const fetchOffer = async () => {
        try {
            const response = await requestAPI.getRequestOffer(request.id);
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
                <TableCell>
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
                <TableCell align="left">Muie Dinamo</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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