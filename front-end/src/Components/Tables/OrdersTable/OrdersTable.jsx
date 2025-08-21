import { useState } from "react";
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Box } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import OrdersTableRow from "./OrdersTableRow";
import FieldSearch from "../../Filters/FieldsSearch";
import DateSearch from "../../Filters/DateSearch";
import ExportTable from "../ExportTable";

function OrdersTable({ orders, fetchOrders }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const filteredOrders = orders.filter((order) => {
        const term = searchTerm.toLowerCase();

        const matchesText =
            Object.values(order).some((value) =>
                value?.toString().toLowerCase().includes(term)
            ) ||
            order.offer.request.client.name.toLowerCase().includes(term);

        const requestDate = new Date(order.deadline);

        const normalizedEnd = endDate ? new Date(endDate) : null;
        if (normalizedEnd) {
            normalizedEnd.setHours(23, 59, 59, 999);
        }

        const afterStart = !startDate || requestDate >= startDate;
        const beforeEnd = !endDate || requestDate <= normalizedEnd;

        return matchesText && afterStart && beforeEnd;
    }
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length) : 0;

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
        { header: "Valoare", accessor: "value"},
        { header: "Cantitate", accessor: "quantity" },
        { header: "Termen de finalizare", accessor: "deadline" },
        { header: "Data finalizare", accessor: "finishedDate"},
        { header: "Descriere", accessor: "description" },
        { header: "Status", accessor: "status" },
        { header: "Client", accessor: "clientName" },
    ]

    const exportData = filteredOrders.map((order) => ({
        id: order.id,
        number: order.number,
        value: parseFloat(order.value),
        quantity: `${parseFloat(order.quantity)} ${order.unit}`,
        deadline: new Date(order.deadline).toLocaleDateString("en-GB"),
        finishedDate: order.isCompleted ? new Date(order.finishDate).toLocaleDateString("en-GB") : "Comanda este în desfasurare",
        description: order.description,
        status: order.isComplteted ? "Finalizata" : `${((order.quantity - order.remainingQuantity) / order.quantity * 100).toFixed(2)} %`,
        clientName: order.offer.request.client.name,
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
                <DateSearch startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setPage={setPage} />
            </Box>

            <ExportTable data={exportData} columns={columns} fileName={"comenzi.pdf"} title={"Comenzi"} />

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Număr de comandă</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Valoare</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Dată finalizare</TableCell>
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