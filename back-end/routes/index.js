const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const clientRouter = require("./client.js");
const requestRouter = require("./request.js");
const offerRouter = require("./offer.js");
const orderRouter = require("./order.js");
const productionNoteRouter = require("./productionNote.js");

router.use("/user", userRouter);
router.use("/client", clientRouter);
router.use("/request", requestRouter);
router.use("/offer", offerRouter);
router.use("/order", orderRouter);
router.use("/productionNote", productionNoteRouter);

module.exports = router;