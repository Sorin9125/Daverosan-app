import { Table, TableHead, TableBody, TableRow,TableCell, Button, Collapse, Box, Typography,  } from "@mui/material";
import { Fragment, useState } from "react";
import requestAPI from "../../../Utils/Request";
import offerAPI from "../../../Utils/Offer";
import orderAPI from "../../../Utils/Order";

function ClientsTableRow({ clients }) {
  const [data, setData] = useState([]);
  const [openRequests, setOpenRequests] = useState(false);
  const [openOffers, setOpenOffers] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getRequests();
      console.log(response.data);
      setData(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  const fetchOffers = async () => {
    try {
      const response = await offerAPI.getAllOffers();
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAllOrders();
      console.log(response);
      setData(response.data);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} key={clients.id}>
        <TableCell component="th" scope="row">
          {clients.id}
        </TableCell>
        <TableCell align="right">{clients.name}</TableCell>
        <TableCell align="right">{clients.email}</TableCell>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => { setOpenRequests(!openRequests); fetchRequests(); }}
          >
            {openRequests ? "Ascunde" : 'Generează'}
          </Button>
        </TableCell>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => { setOpenOffers(!openOffers); fetchOffers(); }}
          >
            {openOffers ? "Ascunde" : 'Generează'}
          </Button>
        </TableCell>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => { setOpenOrders(!openOrders); fetchOrders(); }}
          >
            {openOrders ? "Ascunde" : 'Generează'}
          </Button>
        </TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRequests} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Cereri de ofertă
              </Typography>
              <Table size="small" aria-label="requests">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Descriere</TableCell>
                    <TableCell align="right">Dată primită</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell component="th" scope="row">
                        {request.id}
                      </TableCell>
                      <TableCell>{request.description}</TableCell>
                      <TableCell align="right">{request.sentAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          <Collapse in={openOffers} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Oferte
              </Typography>
              <Table size="small" aria-label="offers">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Preț</TableCell>
                    <TableCell>Termen de finalizare</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((offer) => {
                    <TableRow key={offer.id}>
                      <TableCell>{offer.id}</TableCell>
                      <TableCell>{offer.price}</TableCell>
                      <TableCell>{new Date(offer.deadline).toLocaleDateString()}</TableCell>
                      <TableCell>{offer.isAccepted ? "Acceptată" : "Neacceptată"}</TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          <Collapse in={openOrders} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Comenzi
              </Typography>
              <Table size="small" aria-label="orders">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Număr de comandă</TableCell>
                      <TableCell>Cantitate</TableCell>
                      <TableCell>Termen de finalizare</TableCell>
                      <TableCell>Descriere</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((order) => {
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.number}</TableCell>
                        <TableCell>{order.quantity} {order.unit}</TableCell>
                        <TableCell>{new Date(order.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>{order.description}</TableCell>
                        <TableCell>{order.isCompleted}</TableCell>
                      </TableRow>
                    })}
                  </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default ClientsTableRow;
