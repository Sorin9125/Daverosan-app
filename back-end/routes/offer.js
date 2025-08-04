const express = require("express");
const router = express.Router();
const { offerController } = require("../controllers");

router.post("/createOffer/:id", offerController.createOffer);
router.get("/getAllOffers", offerController.getAllOffers);
router.get("/getOfferById/:id", offerController.getOfferById);
router.put("/updateOffer/:id", offerController.updateOffer);
router.delete("/deleteOffer/:id", offerController.deleteOffer);
router.get("/getOfferOrder/:id", offerController.getOfferOrder);

module.exports = router;