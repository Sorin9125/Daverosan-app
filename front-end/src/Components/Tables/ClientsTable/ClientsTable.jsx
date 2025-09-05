import { useState } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Box } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import ClientsTableRow from "./ClientsTableRow";
import FieldSearch from "../../Filters/FieldsSearch";
import ExportTable from "../ExportTable";

function ClientsTable({ clients, fetchClients }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter((client) =>
        Object.values(client).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredClients.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Nume", accessor: "name" },
        { header: "Email", accessor: "email" },
    ];

    const exportData = filteredClients.map((client) => ({
        id: client.id,
        name: client.name,
        email: client.email,
    }));

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

            <ExportTable title={"Clienti"} columns={columns} data={exportData} fileName={"Clienti.pdf"} />

            <TableContainer component={Paper} sx={{ borderRadius: "0 12px 0 0", boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Nume</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Email</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Cereri</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Oferte</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Comenzi</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Acțiuni</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredClients
                        ).map((client) => (
                            <ClientsTableRow key={client.id} client={client} fetchClients={fetchClients} />
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
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={filteredClients.length}
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
    );
}

export default ClientsTable;
