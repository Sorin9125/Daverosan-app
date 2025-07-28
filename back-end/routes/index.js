const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const clientRouter = require("./client.js");
const requestRouter = require("./request.js");

router.use("/user", userRouter);
router.use("/client", clientRouter);
router.use("/request", requestRouter);

module.exports = router;