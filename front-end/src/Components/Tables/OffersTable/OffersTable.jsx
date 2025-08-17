import { useState } from "react"
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import OffersTableRow from "./OffersTableRow";
import Search from "../Search";

function OffersTable({ offers }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOffers = offers.filter((offer) =>
        Object.values(offer).some((value) =>
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
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell align="left" sx={{ fontWeight: "bold"}}>ID</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Preț</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Status</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Client</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Comenzi</TableCell>
                            <TableCell align="left" sx={{ fontWeight: "bold" }}>Opțiuni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredOffers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredOffers
                        ).map((offer) => (
                            <OffersTableRow key={offer.id} offer={offer}></OffersTableRow>
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
                            <TableCell colSpan={3}>
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
                                    ActionsComponent={TablePaginationActions} />
                            </TableCell>

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default OffersTable;