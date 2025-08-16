import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, } from "@mui/material";
import { Fragment, useState } from "react";
import orderAPI from "../../../Utils/Order";

function OrdersTableRow({ orders }) {
    const [data, setData] = useState([]);
    const [openOrders, setOpenOrders] = useState(false);

    const fetchProductionNotes = async () => {
        try {
            const response = await orderAPI.getOrderProductionNotes(orders.id);
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
            }} key={orders.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                    {orders.id}
                </TableCell>
                <TableCell align="left">{orders.number}</TableCell>
                <TableCell align="left">{orders.quantity} {orders.unit}</TableCell>
                <TableCell align="left">{new Date(orders.deadline).toLocaleDateString()}</TableCell>
                <TableCell align="left">{orders.description}</TableCell>
                <TableCell align="left">{orders.isCompleted? "Finalizată" : "Nefinalizată"}</TableCell>
                <TableCell>
                    <Button
                        aria-label="expand row"
                        size="small"
                        onClick={() => { setOpenOrders(!openOrders); fetchProductionNotes(); }}
                    >
                        {openOrders ? "Ascunde" : 'Generează'}
                    </Button>
                </TableCell>
                <TableCell align="left">Muie dinamo</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openOrders} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                                Comenzi
                            </Typography>
                            <Table size="small" aria-label="orders">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Reper</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Desen</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((productionNote) => {
                                        <TableRow key={productionNote.id} sx={{
                                            backgroundColor: index % 2 === 0 ? "background.paper" : "grey.50",
                                            "&:hover": { backgroundColor: "action.hover" },
                                        }}>
                                            <TableCell>{productionNote.id}</TableCell>
                                            <TableCell>{productionNote.reper}</TableCell>
                                            <TableCell>{productionNote.scheme}</TableCell>
                                            <TableCell>{productionNote.quantity}</TableCell>
                                            <TableCell>{productionNote.isFinished}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default OrdersTableRow;