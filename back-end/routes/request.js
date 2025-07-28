const express = require("express");
const router = express.Router();
const { requestController } = require("../controllers");

router.post("/createRequest/:name", requestController.createRequest);
router.get("/getAllRequests", requestController.getAllRequests);
router.get("/getRequestById/:id", requestController.getRequestById);
router.put("/updateRequest/:id", requestController.updateRequest);
router.delete("/deleteRequest/:id", requestController.deleteRequest);

module.exports = router;