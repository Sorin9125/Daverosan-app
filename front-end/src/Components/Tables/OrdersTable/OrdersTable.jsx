import { useState } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import OrdersTableRow from "./OrdersTableRow";
import Search from "../Search";

function OrdersTable({ orders, fetchOrders }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders.filter((order) =>
        Object.values(order).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Număr de comandă</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Descriere</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Client</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Note de producție</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Acțiuni</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredOrders
                        ).map((order) => (
                            <OrdersTableRow key={order.id} order={order} fetchOrders={fetchOrders} />
                        ))}
                        {emptyRows > 0 && (
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
                                count={filteredOrders.length}
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

export default OrdersTable;