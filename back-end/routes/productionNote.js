const express = require("express");
const router = express.Router();
const { productionNoteController } = require("../controllers");

router.post("/createProductionNote/:id", productionNoteController.createProductionNote);
router.get("/getAllProductionNotes", productionNoteController.getAllProductionNotes);
router.get("/getProductionNoteById/:id", productionNoteController.getProductionNoteById);
router.put("/updateProductionNote/:id", productionNoteController.updateProductionNote);
router.delete("/deleteProductionNote/:id", productionNoteController.deleteProductionNote);
router.post("/finishProductionNote/:id", productionNoteController.finishProductionNote)

module.exports = router;