import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function ProductionNotes({ productionNotes }) {
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Piesă</TableCell>
                        <TableCell>Desen</TableCell>
                        <TableCell>Cantitate</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Opțiuni</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        productionNotes.length > 0 ? productionNotes.map((productionNote) => (
                            <TableRow key={productionNote.id}>
                                <TableCell>{productionNote.id}</TableCell>
                                <TableCell>{productionNote.rerpe}</TableCell>
                                <TableCell>{productionNote.scheme}</TableCell>
                                <TableCell>{productionNote.quantity}</TableCell>
                                <TableCell>{productionNote.isFinished}</TableCell>
                                <TableCell>Butoane tata</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6}>Această comandă nu are notă de producție</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default ProductionNotes;