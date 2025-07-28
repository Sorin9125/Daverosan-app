const express = require("express");
const router = express.Router();
const { clientController } = require("../controllers");

router.post("/createClient", clientController.createClient);
router.get("/getAllClients", clientController.getAllClients);
router.get("/getClientById/:id", clientController.getClientById);
router.put("/updateClient/:id", clientController.updateClient);
router.delete("/deleteClient/:id", clientController.deleteClient);
router.get("/getClientRequests/:id", clientController.getClientRequests);

module.exports = router;