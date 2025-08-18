import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import orderAPI from "../../../Utils/Order";
import UpdateOrder from "../../Modals/Orders/UpdateOrder";
import DeleteOrder from "../../Modals/Orders/DeleteOrder";
import CreateProductionNote from "../../Modals/ProductionNotes/CreateProductionNote";

function OrdersTableRow({ order, fetchOrders }) {
    const [data, setData] = useState([]);
    const [openProductionNotes, setOpenProductinNotes] = useState(false);

    const fetchProductionNotes = async () => {
        try {
            const response = await orderAPI.getOrderProductionNotes(order.id);
            setData(response.data);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <Fragment>
            <TableRow sx={{
                "& > *": { borderBottom: "unset" },
                "&: hover": { backgroundColor: "action.hover" }
            }} key={order.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                    {order.id}
                </TableCell>
                <TableCell align="left">{order.number}</TableCell>
                <TableCell align="left">{order.quantity} {order.unit}</TableCell>
                <TableCell align="left">{new Date(order.deadline).toLocaleDateString()}</TableCell>
                <TableCell align="left" sx={{
                    maxWidth: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    <Tooltip title={order.description} placement="top-start">
                        <span style={{ display: "block", width: "100%" }}>{order.description}</span>
                    </Tooltip>
                </TableCell>
                <TableCell align="left">{order.isCompleted ? "Finalizată" : "Nefinalizată"}</TableCell>
                <TableCell align="left">{order.offer.request.client.name}</TableCell>
                <TableCell align="center">
                    <Button
                        aria-label="expand row"
                        size="small"
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: openProductionNotes ? "error.main" : "primary.main",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            "&:hover": {
                                backgroundColor: openProductionNotes ? "error.dark" : "primary.dark",
                            }
                        }}
                        onClick={() => { setOpenProductinNotes(!openProductionNotes); fetchProductionNotes(); }}
                    >
                        {openProductionNotes ? "Ascunde" : 'Generează'}
                    </Button>
                </TableCell>
                <TableCell align="center">
                    <CreateProductionNote order={order}/>
                </TableCell>
                <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                        <UpdateOrder order={order} fetchOrders={fetchOrders} />
                        <DeleteOrder order={order} fetchOrders={fetchOrders} />
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={openProductionNotes} timeout="auto" unmountOnExit>
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