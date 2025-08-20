import { Fragment } from "react";
import { TableRow, TableCell, Box } from "@mui/material";
import UpdateProductionNote from "../../Modals/ProductionNotes/UpdateProductionNote"
import DeleteProductionNote from "../../Modals/ProductionNotes/DeleteProductionNote";

function ProductionNotesRow({ productionNote, fetchProductionNotes, selectedOrder }) {

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
                <TableCell align="center">{productionNote.order.number}</TableCell>
                <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                        <UpdateProductionNote productionNote={productionNote} fetchProductionNotes={fetchProductionNotes} selectedOrder={selectedOrder}/>
                        <DeleteProductionNote productionNote={productionNote} fetchProductionNotes={fetchProductionNotes} />
                    </Box>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
export default ProductionNotesRow;