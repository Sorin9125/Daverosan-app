import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function Requests({ requests }) {
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Descriere</TableCell>
                        <TableCell>Dată primită</TableCell>
                        <TableCell>Status ofertă</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        requests.length > 0 ? requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.id}</TableCell>
                                <TableCell>{request.description}</TableCell>
                                <TableCell>{request.sentAt}</TableCell>
                                <TableCell>{request.isOffered ? "Trimisă" : "Netrimisă"}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow >
                                <TableCell colSpan={3}>Acest client nu are cereri de ofertă</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Requests;