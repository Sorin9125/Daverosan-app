const express = require("express");
const router = express.Router();
const { productionNoteController } = require("../controllers");
const uploadExcel = require("../middlewares/upload");

router.post("/createProductionNote/:id", productionNoteController.createProductionNote);
router.get("/getAllProductionNotes", productionNoteController.getAllProductionNotes);
router.get("/getProductionNoteById/:id", productionNoteController.getProductionNoteById);
router.put("/updateProductionNote/:id", productionNoteController.updateProductionNote);
router.delete("/deleteProductionNote/:id", productionNoteController.deleteProductionNote);
router.patch("/finishProductionNote/:id", productionNoteController.finishProductionNote)
router.post("/uploadExcel/:id", uploadExcel.single("file"), productionNoteController.uploadFromFile);

module.exports = router;