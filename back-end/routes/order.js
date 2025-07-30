const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers");

router.post("/createOrder/:id", orderController.createOrder);
router.get("/getAllOrders", orderController.getAllOrders);
router.get("/getOrderById/:id", orderController.getOrderById);
router.put("/updateOrder/:id", orderController.updateOrder);
router.delete("/deleteOrder/:id", orderController.deleteOrder);
router.get("/getOrderProductionNotes/:id", orderController.getOrderProductionNotes);

module.exports = router;