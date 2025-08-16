import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, } from "@mui/material";
import { Fragment, useState } from "react";
import requestAPI from "../../../Utils/Request";
import offerAPI from "../../../Utils/Offer";
import orderAPI from "../../../Utils/Order";

function ClientsTableRow({ clients }) {
  const [requestData, setRequestData] = useState([]);
  const [openRequests, setOpenRequests] = useState(false);
  const [offerData, setOfferData] = useState([]);
  const [openOffers, setOpenOffers] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [openOrders, setOpenOrders] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getRequests();
      setRequestData(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  const fetchOffers = async () => {
    try {
      const response = await offerAPI.getAllOffers();
      console.log(response.data);
      setOfferData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAllOrders();
      console.log(response.data);
      setOrderData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <TableRow sx={{
        "& > *": { borderBottom: "unset" },
        "&: hover": { backgroundColor: "action.hover" }
      }} key={clients.id}>
        <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
          {clients.id}
        </TableCell>
        <TableCell align="left">{clients.name}</TableCell>
        <TableCell align="left">{clients.email}</TableCell>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            color="black"
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
        <TableCell align="left">Muie dinamo</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRequests} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                Cereri de ofertă
              </Typography>
              <Table size="small" aria-label="requests">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Descriere</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Dată primită</TableCell>
                    <TableCell sx={{ fontWeight: "bold"}}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requestData.map((request) => (
                    <TableRow key={request.id} sx={{
                      backgroundColor: "background.paper",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}>
                      <TableCell component="th" scope="row">
                        {request.id}
                      </TableCell>
                      <TableCell>{request.description}</TableCell>
                      <TableCell align="right">{new Date(request.sentAt).toLocaleDateString()}</TableCell>
                      <TableCell align="left">{request.isOffered ? "Ofertată" : "Neofertată"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          <Collapse in={openOffers} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                Oferte
              </Typography>
              <Table size="small" aria-label="offers">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Preț</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offerData.map((offer) => {
                    <TableRow key={offer.id} sx={{
                      backgroundColor: "background.paper",
                      "&:hover": { backgroundColor: "action.hover" }, 
                    }}>
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
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold", mb: 2 }}>
                Comenzi
              </Typography>
              <Table size="small" aria-label="orders">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Număr de comandă</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Descriere</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.map((order) => {
                    <TableRow key={order.id} sx={{
                      backgroundColor: "background.paper",
                      "&:hover": { backgroundColor: "action.hover" }, 
                    }}>
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
