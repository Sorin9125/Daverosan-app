const { requestModel, offerModel } = require("../models");

const offerController = {
    createOffer: async (req, res) => {
        try {
            const requestId = req.params.id;
            const request = await requestModel.findByPk(requestId);
            if(!request) {
                return res.status(400).send(`Cererea de oferta cu id-ul ${requestId} nu exista`);
            }
            if(await offerModel.findOne({
                where: {
                    requestId: requestId,
                },
            })) {
                return res.status(400).send(`Cererea cu id-ul ${requestId} a primit deja un raspuns`);
            }
            const offer = req.body;
            if(!(offer.deadline && offer.price)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if(new Date(offer.deadline).getTime() < new Date(request.sentAt).getTime()) {
                return res.status(400).send("Cum o termini daca nu ai primit-o?")
            }
            if(!(/^[0-9]{1,}$/).test(offer.price)) {
                return res.status(400).send("Introduceti o valoare valida");
            }
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
    },
    getOfferById: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await offerModel.findByPk(offerId);
            if(!offer) {
                return res.status(400).send(`Oferta cu id-ul ${offerId} nu exista`);
            }
            return res.status(200).json(offer);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    },
    updateOffer: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await offerModel.findByPk(offerId);
            if(!offer) {
                return res.status(400).send(`Oferta cu id-ul ${offerId} nu exista`);
            }
            const newOffer = req.body;
            if(!(newOffer.deadline && newOffer.price)) {
                return res.status(400).send("Completeaza toate campurile printurle");
            }
            const request = await requestModel.findByPk(offer.requestId);
            if(new Date(newOffer.deadline).getTime() < new Date(request.sentAt).getTime()) {
                return res.status(400).send("Cum termini inainte sa incepi?");
            }
            if(!(/^[0-9]{1,}$/).test(newOffer.price)) {
                return res.status(400).send("Introduceti o valoare valida");
            }
            await offer.update(newOffer);
            return res.status(200).send(`Oferta cu id-ul ${offerId} a fost actualizata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    deleteOffer: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await offerModel.findByPk(offerId);
            if(!offer) {
                return res.status(400).send(`Oferta cu id-ul ${offerId} nu exista`);
            }
            await offerModel.destroy({
                where: {
                    id: offerId,
                },
            });
            return res.status(200).send(`Oferta cu id-ul ${offerId} a fost stearsa cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
}

module.exports = offerController;