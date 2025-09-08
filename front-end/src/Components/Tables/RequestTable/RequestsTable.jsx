import { useState } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Box } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import RequestsTableRow from "./RequestTableRow";
import FieldSearch from "../../Filters/FieldsSearch";
import DateSearch from "../../Filters/DateSearch";
import ExportTable from "../ExportTable";

function RequestsTable({ requests, fetchRequests }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const filteredRequests = requests.filter((request) => {
        const term = searchTerm.toLowerCase();
        const statusLabel = request.isOffered ? "Oferta trimisa" : "Oferta netrimisa"
        const matchesText =
            Object.values(request).some((value) =>
                value?.toString().toLowerCase().includes(term)
            ) ||
            request.client.name.toLowerCase().includes(term) ||
            statusLabel.toLowerCase().includes(term);

        const requestDate = new Date(request.sentAt);

        const normalizedEnd = endDate ? new Date(endDate) : null;
        if (normalizedEnd) {
            normalizedEnd.setHours(23, 59, 59, 999);
        }

        const afterStart = !startDate || requestDate >= startDate;
        const beforeEnd = !endDate || requestDate <= normalizedEnd;

        return matchesText && afterStart && beforeEnd;
    });

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRequests.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Descriere", accessor: "description" },
        { header: "Data primita", accessor: "sentAt" },
        { header: "Status", accessor: "status" },
        { header: "Client", accessor: "clientName" },
    ];

    const exportData = filteredRequests.map((request) => ({
        id: request.id,
        description: request.description,
        sentAt: new Date(request.sentAt).toLocaleDateString("en-GB"),
        status: request.isOffered ? "Oferta trimisa" : "Oferta netrimisa",
        clientName: request.client.name,
    }))

    return (
        <>
            <Box sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <FieldSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
                <DateSearch startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setPage={setPage} />
            </Box>

            <ExportTable data={exportData} columns={columns} fileName={"cereri.pdf"} title={"Cereri de oferta"} />

            <TableContainer component={Paper} sx={{ borderRadius: "0 12px 0 0", boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Descriere</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Dată primită</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Client</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Oferte</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Acțiuni</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredRequests
                        ).map((request) => (
                            <RequestsTableRow key={request.id} request={request} fetchRequests={fetchRequests} />
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
                }}
            ><TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={filteredRequests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                        select: {
                            inputProps: {
                                "aria-label": "rows per page",
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
                /></Box>
        </>
    )
};

export default RequestsTable;