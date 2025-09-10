const { clientModel, requestModel, offerModel, orderModel } = require("../models");

const clientController = {
    createClient: async (req, res) => {
        try {
            const client = req.body;
            if (!(client.name && client.email)) {
                return res.status(400).json({ message: "Completeaza toate campurile printule" });
            }
            if (!(/^[A-z\- ]{3,}$/gm).test(client.name)) {
                return res.status(400).json({ message: "Numele trebuie sa contina doar litere si sa aiba cel putin 3 caractere" });
            }
            if (!(/^[A-z0-9-_.]+@+[a-z]+.+[a-z]$/gm).test(client.email)) {
                return res.status(400).json({ message: "Email-ul nu este valid" });
            }
            if (await clientModel.findOne({
                where: {
                    name: client.name,
                },
            })) {
                return res.status(400).json({ message: "Acest client este deja existent" });
            }
            await clientModel.create(client);
            return res.status(200).json({ message: "Clientul a fost creat cu succes" });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }

    },
    getAllClients: async (req, res) => {
        try {
            const clients = await clientModel.findAll();
            if (!clients) {
                return res.status(400).json({ message: "Nu exista clienti" });
            }
            return res.status(200).json(clients);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    updateClient: async (req, res) => {
        try {
            const clientId = req.params.id;
            const client = await clientModel.findByPk(clientId);
            if (!client) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu exista` });
            }
            const newClient = req.body;
            if (!(newClient.name && newClient.email)) {
                return res.status(400).json({ message: "Completeaza toate campurile printule" });
            }
            if (!(/^[A-z\- ]{3,}$/gm).test(newClient.name)) {
                return res.status(400).json({ message: "Numele trebuie sa contina doar litere si sa aiba cel putin 3 caractere" });
            }
            if (!(/^[A-z0-9-_.]+@+[a-z]+.+[a-z]$/gm).test(newClient.email)) {
                return res.status(400).json({ message: "Email-ul nu este valid" });
            }
            await client.update(newClient);
            return res.status(200).json({ message: `Clientul cu id-ul ${clientId} a fost actualizat cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    deleteClient: async (req, res) => {
        try {
            const clientId = req.params.id;
            const client = await clientModel.findByPk(clientId);
            if (!client) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu exista` });
            }
            await clientModel.destroy({
                where: {
                    id: clientId,
                },
            });
            return res.status(200).json({ message: `clientul cu id-ul ${clientId} a fost sters cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getClientRequests: async (req, res) => {
        try {
            const clientId = req.params.id;
            const clientRequests = await clientModel.findByPk(clientId, {
                include: [requestModel],
            });
            if (!clientRequests) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu exista` });
            }
            if (!clientRequests.requests) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu are nicio cerere de oferta` });
            }
            return res.status(200).json(clientRequests.requests);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getClientOffers: async (req, res) => {
        try {
            const clientId = req.params.id;
            const clientOffers = await clientModel.findByPk(clientId, {
                include: [{
                    model: requestModel,
                    include: [offerModel],
                }],
            })
            if (!clientOffers) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu exista` });
            }
            const offers = clientOffers.requests.map((x) => x.offer).filter((x) => x);
            if (!offers) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu are nicio oferta primita` });
            }
            return res.status(200).json(offers);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getClientOrders: async (req, res) => {
        try {
            const clientId = req.params.id;
            const clientOrders = await clientModel.findByPk(clientId, {
                include: [{
                    model: requestModel,
                    include: [{
                        model: offerModel,
                        include: [orderModel]
                    }]
                }]
            })
            if (!clientOrders) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu exista` });
            }
            const orders = clientOrders.requests.map((x) => x.offer).filter((x) => x).map((x) => x.order).filter((x) => x);
            if (!orders) {
                return res.status(400).json({ message: `Clientul cu id-ul ${clientId} nu are nicio comanda` });
            }
            return res.status(200).json(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    }
}

module.exports = clientController;
