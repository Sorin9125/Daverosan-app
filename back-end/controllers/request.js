const { requestModel, clientModel } = require("../models");

const requestController = {
    createRequest: async (req, res) => {
        try {
            const clientId = req.params.id;
            const client = await clientModel.findByPk(clientId);
            if (!client) {
                return res.status(400).send(`Clientul cu id-ul ${clientId} nu exista`);
            }
            const request = req.body;
            if (!(request.sentAt && request.description)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if (!(/^[A-Za-z0-9\-_!@#$%<>?\/":;| ]+$/gm).test(request.description)) {
                return res.status(400).send("Introduceti o descriere valida");
            }
            await client.createRequest(request);
            return res.status(200).send(`Cererea clientului ${client.name} a fost creata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getAllRequests: async (req, res) => {
        try {
            const requests = await requestModel.findAll();
            if (!requests) {
                return res.status(400).send("Nu exista cereri de oferta");
            }
            return res.status(200).json(requests);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getRequestById: async (req, res) => {
        try {
            const requestId = req.params.id;
            const request = await requestModel.findByPk(requestId);
            if (!request) {
                return res.status(400).send(`Cererea de oferta cu id-ul ${requestId} nu exista`);
            }
            return res.status(200).json(request)
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    updateRequest: async (req, res) => {
        try {
            const requestId = req.params.id;
            const request = await requestModel.findByPk(requestId);
            if (!request) {
                return res.status(400).send(`Cererea de oferta cu id-ul ${requestId} nu exista`);
            }
            const newRequest = req.body;
            if (!(newRequest.sentAt && newRequest.description)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if (!(/^[A-Za-z0-9\-_!@#$%<>?\/":;| ]+$/gm).test(newRequest.description)) {
                return res.status(400).send("Introduceti o descriere valida");
            }
            await request.update(newRequest);
            return res.status(200).send(`Cererea de oferta cu id-ul ${requestId} a fost actualizata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    deleteRequest: async (req, res) => {
        try {
            const requestId = req.params.id;
            const request = await requestModel.findByPk(requestId);
            if (!request) {
                return res.status(400).send(`Cererea de oferta cu id-ul ${requestId} nu exista`);
            }
            await requestModel.destroy({
                where: {
                    id: requestId,
                },
            });
            return res.status(200).send(`Cererea de oferta cu id-ul ${requestId} a fost stersa cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    }
}

module.exports = requestController;