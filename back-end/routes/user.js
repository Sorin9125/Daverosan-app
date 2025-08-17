const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/loginUser", userController.loginUser);
router.get("/getCurrentUser", userController.getCurrentUser);
router.get("/logoutUser", userController.logoutUser);

module.exports = router;
