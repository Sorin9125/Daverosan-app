import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function Orders({ orders }) {
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Număr comandă</TableCell>
                        <TableCell>Cantitate</TableCell>
                        <TableCell>Descriere</TableCell>
                        <TableCell>Termen de finalizare</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.length > 0 ? orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.number}</TableCell>
                                <TableCell>{order.quantity} {order.unit}</TableCell>
                                <TableCell>{order.description}</TableCell>
                                <TableCell>{order.deadline}</TableCell>
                                <TableCell>{order.isCompleted ? "Finalizată" : "Nefinalizată"}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    Acest client nu are comenzi
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Orders;