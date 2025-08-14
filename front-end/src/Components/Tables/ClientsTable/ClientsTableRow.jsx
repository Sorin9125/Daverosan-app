import Offers from "./ExpandableTables/Offers";
import Requests from "./ExpandableTables/Request"
import Orders from "./ExpandableTables/Orders"
import { TableHead, TableRow, TableCell, IconButton, Collapse, Box, Typography, Menu, MenuItem, Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material'
import clientAPI from "../../../Utils/Client";

function ClientsTableRow({ client, refresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const updateClient = async (newClient) => {
    await clientAPI.updateClient(client.id, newClient);
    refresh();
  }

  const deleteClient = async () => {
    await clientAPI.deleteClient(client.id);
    refresh();
  }

  return (
    <>
      <TableRow>
        <TableCell>{client.id}</TableCell>
        <TableCell>{client.name}</TableCell>
        <TableCell>{client.email}</TableCell>
        <TableCell>
          <Button variant="contained" size="small">Adaugă o cerere</Button>
        </TableCell>
        <TableCell>
          <IconButton variant="contained" onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => setEditModal(true)}>Actualizează client</MenuItem>
            <MenuItem onClick={deleteClient}>Șterge client</MenuItem>
          </Menu>
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={3} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box m={1}>
              <Typography variant="subtitle2">Orders</Typography>
              {open && <OrdersTable clientId={client.id} />}

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2">Offers</Typography>
              {open && <OffersTable clientId={client.id} />}

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2">Requests</Typography>
              {open && <RequestsTable clientId={client.id} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ClientsTableRow;