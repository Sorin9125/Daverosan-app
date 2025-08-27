import { Fragment } from "react";
import { toast } from "react-toastify";
import { TableRow, TableCell, Box, Button } from "@mui/material";
import UpdateProductionNote from "../../Modals/ProductionNotes/UpdateProductionNote"
import DeleteProductionNote from "../../Modals/ProductionNotes/DeleteProductionNote";
import productionNotesAPI from "../../../Utils/ProductionNotes";

function ProductionNotesRow({ productionNote, fetchProductionNotes, selectedOrder }) {

    const finishProductionNote = async (id) => {
        try {
            const response = await productionNotesAPI.finishProducionNote(id);
            toast.success(response.data.message);
            fetchProductionNotes();
            fetchProductionNotes();
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return (
        <Fragment>
            <TableRow sx={{
                "& > *": { borderBottom: "unset" },
                "&: hover": { backgroundColor: "action.hover" }
            }} key={productionNote.id}>
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                    {productionNote.id}
                </TableCell>
                <TableCell align="left">{productionNote.reper}</TableCell>
                <TableCell align="left">{productionNote.scheme}</TableCell>
                <TableCell align="left">{productionNote.quantity}</TableCell>
                <TableCell align="center">{productionNote.order.unit === "buc" ? "Comanda este în bucăți" : parseFloat(productionNote.weight)}</TableCell>
                <TableCell align="center">{productionNote.isFinished ? "Finalizată" : "Nefinalizată"}</TableCell>
                <TableCell align="center">
                    {!productionNote.isFinished ? (
                        <Button
                            onClick={() => finishProductionNote(productionNote.id)}
                            aria-label="finish production note"
                            size="small"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                backgroundColor: "primary.main",
                                color: "#fff",
                                fontWeight: "bold",
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                "&:hover": {
                                    backgroundColor: "primary.dark",
                                }
                            }}>
                            Finalizează
                        </Button>
                    ) : (
                        "Nota de producție este deja finalizată"
                    )

                    }

                </TableCell>
                <TableCell align="center">{productionNote.order.number}</TableCell>
                <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                        <UpdateProductionNote productionNote={productionNote} fetchProductionNotes={fetchProductionNotes} selectedOrder={selectedOrder} />
                        <DeleteProductionNote productionNote={productionNote} fetchProductionNotes={fetchProductionNotes} />
                    </Box>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
export default ProductionNotesRow;