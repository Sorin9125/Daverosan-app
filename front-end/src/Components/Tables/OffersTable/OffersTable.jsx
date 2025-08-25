import { useState } from "react"
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Box } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import OffersTableRow from "./OffersTableRow";
import FieldsSearch from "../../Filters/FieldsSearch"
import DateSearch from "../../Filters/DateSearch"
import ExportTable from "../ExportTable";

function OffersTable({ offers, fecthOffers }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const filteredOffers = offers.filter((offer) => {
        const term = searchTerm.toLowerCase();
        const statusLabel = offer.isAccepted ? "Acceptata" : "Neacceptata";
        const matchesText =
            Object.values(offer).some((value) =>
                value?.toString().toLowerCase().includes(term)
            ) ||
            offer.request.client.name.toLowerCase().includes(term) ||
            statusLabel.toLowerCase().includes(term);
        const requestDate = new Date(offer.deadline);
        const normalizedEnd = endDate ? new Date(endDate) : null;
        if (normalizedEnd) {
            normalizedEnd.setHours(23, 59, 59, 999);
        }
        const afterStart = !startDate || requestDate >= startDate;
        const beforeEnd = !endDate || requestDate <= normalizedEnd;
        return matchesText && afterStart && beforeEnd;
    });

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredOffers.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { header: "id", accessor: "id" },
        { header: "Valoare", accessor: "value" },
        { header: "Termen de finalizare", accessor: "deadline" },
        { header: "Status", accessor: "status" },
        { header: "Client", accessor: "clientName" },
    ]

    const exportData = filteredOffers.map((offer) => ({
        id: offer.id,
        value: parseFloat(offer.value),
        deadline: new Date(offer.deadline).toLocaleDateString("en-GB"),
        status: offer.isAccepted ? "Neaccepatata" : "Acceptata",
        clientName: offer.request.client.name,
    }));

    return (
        <>
            <Box sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <FieldsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
                <DateSearch startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setPage={setPage} />
            </Box>

            <ExportTable fileName={"oferte.pdf"} data={exportData} title={"Oferte"} columns={columns} />

            <TableContainer component={Paper} sx={{ borderRadius: "0 12px 0 0", boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Preț</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Client</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Comenzi</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Acțiuni</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredOffers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredOffers
                        ).map((offer) => (
                            <OffersTableRow key={offer.id} offer={offer} fetchOffers={fecthOffers} />
                        ))}
                        {emptyRows > 0 && (
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
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={filteredOffers.length}
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
            </Box>

        </>
    )
}

export default OffersTable;