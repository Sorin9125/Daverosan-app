import { useState } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import ProductionNotesRow from "./ProductionNoteRow";
import FieldSearch from "../../Filters/FieldsSearch";
import ExportTable from "../ExportTable";

function ProductionNotesTable({ productionNotes, fetchProductionNotes, selectedOrder }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProductionNotes = productionNotes.filter((productionNote) => {
        const term = searchTerm.toLowerCase();

        const matchesText =
            Object.values(productionNote).some((value) =>
                value?.toString().toLowerCase().includes(term)
            ) ||
            productionNote.order.number.toLowerCase().includes(term);
        return matchesText;
    }
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProductionNotes.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Numar de comanda", accessor: "number" },
        { header: "Cantitate", accessor: "quantity" },
        { header: "Termen de finalizare", accessor: "deadline" },
        { header: "Descriere", accessor: "description" },
        { header: "Status", accessor: "status" },
        { header: "Client", accessor: "clientName" },
    ]

    // const exportData = filteredOrders.map((order) => ({
    //     id: order.id,
    //     number: order.number,
    //     quantity: `${order.quantity} ${order.unit}`,
    //     deadline: new Date(order.deadline).toLocaleDateString("en-GB"),
    //     description: order.description,
    //     status: order.status ? `${(order.quantity - order.remainingQuantity) / order.quantity * 100} + %` : "Finalizata",
    //     clientName: order.offer.request.client.name,
    // }));

    return (
        <>
            <Box sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <FieldSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
            </Box>

            {/* <ExportTable data={exportData} columns={columns} fileName={"comenzi.pdf"} title={"Comenzi"} /> */}

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Reper</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Desen</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Greutate</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Comandă</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredProductionNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredProductionNotes
                        ).map((productionNote) => (
                            <ProductionNotesRow key={productionNote.id} productionNote={productionNote} fetchProductionNotes={fetchProductionNotes} selectedOrder={selectedOrder}/>
                        ))}
                        {
                            emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={filteredProductionNotes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{
                                    "& .MuiTablePagination-toolbar": { width: "100%" },
                                    "& .MuiTablePagination-spacer": { flex: "0 0 0" },
                                    "& .MuiTablePagination-actions": { marginLeft: "auto" }
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default ProductionNotesTable;