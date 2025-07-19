const express = require("express");
const userController = require("../controllers").userController;
const router = express.Router();

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.get("/loginUser", userController.loginUser);

module.exports = router;
