import { useState } from "react"
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import OffersTableRow from "./OffersTableRow";

function OffersTable({ offers }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Preț</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Comenzi</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? offers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : offers
                        ).map((offer) => (
                            <OffersTableRow key={offer.id} offers={offer}></OffersTableRow>
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
                                count={offers.length}
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
                                ActionsComponent={TablePaginationActions} />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default OffersTable;