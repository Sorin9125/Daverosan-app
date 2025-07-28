const { requestModel, offerModel } = require("../models");

const offerController = {
    createOffer: async (req, res) => {
        try {
            const requestId = req.params.id;
            const request = await requestModel.findByPk(requestId);
            if(!request) {
                return res.status(400).send(`Cererea de oferta cu id-ul ${requestId} nu exista`);
            }
            const offer = req.body;
            if(!(offer.deadline && offer.price)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if(!(/^[0-9]$/).test(offer.price)) {
                return res.status(400).send("Introduceti o valoare valida");
            }
            offer.isAccepted = false;
            await request.createOffer(offer);
            return res.status(200).send(`Oferta pentru cererea cu id-ul ${requestId} fost creata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getAllOffers: async (req, res) => {
        try {
            const offers = await offerModel.findAll();
            if(!offers) {
                return res.status(400).send("Nu exista oferte");
            }
            return res.status(200).json(offers);
        } catch (err) {
            console.log(offers);
            return res.status(500).send("Eroare");
        }
    }
}