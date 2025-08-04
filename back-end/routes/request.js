const express = require("express");
const router = express.Router();
const { requestController } = require("../controllers");

router.post("/createRequest/:id", requestController.createRequest);
router.get("/getAllRequests", requestController.getAllRequests);
router.get("/getRequestById/:id", requestController.getRequestById);
router.put("/updateRequest/:id", requestController.updateRequest);
router.delete("/deleteRequest/:id", requestController.deleteRequest);
router.get("/getRequestOffer/:id", requestController.getRequestOffer);

module.exports = router;