import { useState } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Box } from "@mui/material";
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
        const statusLabel = productionNote.isFinished ? "Finalizata" : "Nefinalizata";
        const topLevelMatch = Object.entries(productionNote).some(([key, value]) => {
            if (typeof value === "string" || typeof value === "number") {
                return value.toString().toLowerCase().includes(term);
            }
            return false;
        });
        const orderMatch =
            productionNote.order &&
            Object.values(productionNote.order).some(
                (val) => val && val.toString().toLowerCase().includes(term)
            );

        const statusMatch = statusLabel.toLowerCase().includes(term);

        return topLevelMatch || orderMatch || statusMatch;
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
        { header: "Reper", accessor: "reper" },
        { header: "Desen", accessor: "scheme" },
        { header: "cantitate", accessor: "quantity" },
        { header: "Greutate", accessor: "weight" },
        { header: "Total unitar", accessor: "total" },
        { header: "Observatii", accessor: "observations" },
        { header: "Status", accessor: "status" },
    ]

    const exportData = filteredProductionNotes.map((productionNote) => ({
        id: productionNote.id,
        reper: productionNote.reper,
        scheme: productionNote.scheme,
        quantity: parseFloat(productionNote.quantity),
        weight: productionNote.order.unit === "buc" ? "Comanda este in bucati" : parseFloat(productionNote.weight),
        status: productionNote.isFinished ? "Finalizata" : "Nefinalizata",
        total: parseFloat(productionNote.quantity * productionNote.weight).toFixed(2) + " " + productionNote.order.unit,
        observations: productionNote.observations,
    }));

    const aboveTableInfo = [
        `Termen de finalizare: ${new Date(filteredProductionNotes[0]?.order.deadline).toLocaleDateString("en-GB")}`,
        `Cantitate totala: ${parseFloat(filteredProductionNotes[0]?.order.quantity)} ${filteredProductionNotes[0]?.order.unit}`
    ]

    const belowTableInfo = [
        `Cerinte calitate: ${filteredProductionNotes[0]?.order.observations ? filteredProductionNotes[0]?.order.observations : ""}`
    ]

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

            <ExportTable
                data={exportData}
                columns={columns}
                fileName={selectedOrder ? `nota-de-productie-comanda-${filteredProductionNotes[0]?.order.number}` : "note-de-productie"}
                title={selectedOrder ? `Nota de productie\nComanda ${filteredProductionNotes[0]?.order.number}` : "Note de productie"}
                aboveTableInfo={selectedOrder ? aboveTableInfo : ""}
                belowTableInfo={selectedOrder ? belowTableInfo:  ""}
            />

            <TableContainer component={Paper} sx={{ borderRadius: "0 12px 0 0", boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Reper</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Desen</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Greutate</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Total unitar</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Observații</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Acțiuni</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Comandă</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredProductionNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredProductionNotes
                        ).map((productionNote) => (
                            <ProductionNotesRow key={productionNote.id} productionNote={productionNote} fetchProductionNotes={fetchProductionNotes}/>
                        ))}
                        {
                            emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    borderRadius: "0 0 12px 12px",
                }}>
                <TablePagination
                    component="div"
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
                        "& .MuiTablePagination-toolbar": {
                            width: "100%",
                            justifyContent: "flex-start",
                        },
                        "& .MuiTablePagination-spacer": {
                            flex: "0 0 0",
                        },
                        "& .MuiTablePagination-actions": {
                            marginLeft: 0,
                        },
                    }}
                />
            </Box>
        </>
    )
}

export default ProductionNotesTable;