const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/loginUser", userController.loginUser);
router.get("/getCurrentUser", userController.getCurrentUser);
router.get("/logoutUser", userController.logoutUser);
router.post("/sendToken", userController.setResetToken);
router.put("/resetPassword/:resetToken", userController.resetPassword);
router.put("/activateAccount/:id", userController.activateAccount);

module.exports = router;
