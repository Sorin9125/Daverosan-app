import { Table, TableHead, TableBody, TableRow, TableCell, Button, Collapse, Box, Typography, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import clientAPI from "../../../Utils/Client";
import UpdateClient from "../../Modals/Client/UpdateClient";
import DeleteClient from "../../Modals/Client/DeleteClient";
import CreateRequest from "../../Modals/Requests/CreateRequest";

function ClientsTableRow({ client, fetchClients }) {
  const [requestData, setRequestData] = useState([]);
  const [openRequests, setOpenRequests] = useState(false);
  const [offerData, setOfferData] = useState([]);
  const [openOffers, setOpenOffers] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [openOrders, setOpenOrders] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await clientAPI.getRequests(client.id);
      setRequestData(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  const fetchOffers = async () => {
    try {
      const response = await clientAPI.getOffers(client.id);
      setOfferData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await clientAPI.getOrders(client.id);
      setOrderData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Fragment>
        <TableRow sx={{
          "& > *": { borderBottom: "unset" },
          "&: hover": { backgroundColor: "action.hover" }
        }} key={client.id}>
          <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
            {client.id}
          </TableCell>
          <TableCell align="left">{client.name}</TableCell>
          <TableCell align="left">{client.email}</TableCell>
          <TableCell align="center">
            <Button
              aria-label="expand row"
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: openRequests ? "error.main" : "primary.main",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 2,
                px: 2,
                py: 1,
                "&:hover": {
                  backgroundColor: openRequests ? "error.dark" : "primary.dark",
                },
              }}
              onClick={() => { setOpenRequests(!openRequests); fetchRequests(); }}
            >
              {openRequests ? "Ascunde" : 'Generează'}
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button
              aria-label="expand row"
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: openOffers ? "error.main" : "primary.main",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 2,
                px: 2,
                py: 1,
                "&:hover": {
                  backgroundColor: openOffers ? "error.dark" : "primary.dark",
                }
              }}
              onClick={() => { setOpenOffers(!openOffers); fetchOffers(); }}
            >
              {openOffers ? "Ascunde" : 'Generează'}
            </Button>
          </TableCell>
          <TableCell align="center">
            <Button
              aria-label="expand row"
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: openOrders ? "error.main" : "primary.main",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 2,
                px: 2,
                py: 1,
                "&:hover": {
                  backgroundColor: openOrders ? "error.dark" : "primary.dark",
                }
              }}
              onClick={() => { setOpenOrders(!openOrders); fetchOrders(); }}
            >
              {openOrders ? "Ascunde" : 'Generează'}
            </Button>
          </TableCell>
          <TableCell align="center">
              <CreateRequest clientId={client.id}/>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                <UpdateClient client={client} fetchClients={fetchClients} />
                <DeleteClient client={client} fetchClients={fetchClients} />
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
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
                        <TableCell align="left" sx={{
                          maxWidth: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          <Tooltip title={request.description} placement="top-start">
                            <span style={{ display: "block", width: "100%" }}>{request.description}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="left">{new Date(request.sentAt).toLocaleDateString("en-GB")}</TableCell>
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
                    {offerData.map((offer) => (
                      <TableRow key={offer.id} sx={{
                        backgroundColor: "background.paper",
                        "&:hover": { backgroundColor: "action.hover" },
                      }}>
                        <TableCell>{offer.id}</TableCell>
                        <TableCell>{parseFloat(offer.value)}</TableCell>
                        <TableCell>{new Date(offer.deadline).toLocaleDateString("en-GB")}</TableCell>
                        <TableCell>{offer.isAccepted ? "Acceptată" : "Neacceptată"}</TableCell>
                      </TableRow>
                    ))}
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
                      <TableCell sx={{ fontWeight: "bold" }}>Valoare</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Cantitate</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Termen de finalizare</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Dată finalizare</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Descriere</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData.map((order) => (
                      <TableRow key={order.id} sx={{
                        backgroundColor: "background.paper",
                        "&:hover": { backgroundColor: "action.hover" },
                      }}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.number}</TableCell>
                        <TableCell>{parseFloat(order.value)}</TableCell>
                        <TableCell>{parseFloat(order.quantity)} {order.unit}</TableCell>
                        <TableCell>{new Date(order.deadline).toLocaleDateString("en-GB")}</TableCell>
                        <TableCell>{order.isCompleted ? new Date(order.finishDate).toLocaleDateString("en-GB") : "Comanda este în desfășurare"}</TableCell>
                        <TableCell align="left" sx={{
                          maxWidth: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          <Tooltip title={order.description} placement="top-start">
                            <span style={{ display: "block", width: "100%" }}>{order.description}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{order.isCompleted ? "Finalizată" : "Nefinalizată"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    </>

  );
}

export default ClientsTableRow;
