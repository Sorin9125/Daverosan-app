const { orderModel, offerModel, requestModel, productionNoteModel, clientModel } = require("../models");

const orderController = {
    createOrder: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await offerModel.findByPk(offerId);
            if (!offer) {
                return res.status(400).json({ message: `Oferta cu id-ul ${offerId} nu exista` });
            }
            if (await orderModel.findOne({
                where: {
                    offerId: offerId,
                },
            })) {
                return res.status(400).json({ message: `Oferta cu id-ul ${offerId} a fost deja acceptata` });
            }
            const order = req.body;
            if (!(order.quantity && order.description && order.deadline && order.number && order.value)) {
                return res.status(400).json({ message: "Completeaza toate campurile printule" });
            }
            if (!(/^[0-9\,.]{1,}$/).test(order.quantity)) {
                return res.status(400).json({ message: "Intrduceti o cantitate valida" });
            }
            if (!(/^[A-Za-z0-9\-_!@#$%<>?\/":;|.,+= ]{1,}$/).test(order.description)) {
                return res.status(400).json({ message: "Introduceti o descriere valida" });
            }
            if (!(/^[A-z0-9-]{1,}$/).test(order.number)) {
                return res.status(400).json({ message: "Introduceti un numar de comanda valid" });
            }
            if (!(/^[0-9.]{1,}$/).test(order.value)) {
                return res.status(400).json({ message: "Introduceti o valoare valida" });
            }
            const request = await requestModel.findByPk(offer.requestId);
            if (new Date(order.deadline).getTime() < new Date(request.sentAt).getTime()) {
                return res.status(400).json({ message: "Cum termini inainte sa incepi" });
            }
            await offer.update({
                isAccepted: true,
            });
            await offer.save();
            order.remainingQuantity = order.quantity;
            order.unit = offer.unit;
            await offer.createOrder(order);
            return res.status(200).json({ message: `Comanda pentru cererea ${offer.requestId} a fost creata` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderModel.findAll({
                include: [{
                    model: offerModel,
                    attributes: [],
                    include: [{
                        model: requestModel,
                        attributes: [],
                        include: [{
                            model: clientModel,
                            attributes: ["name"],
                        }],
                        raw: true,
                        nest: true,
                    }]
                }],
                nest: true,
                raw: true,
            });
            if (!orders) {
                return res.status(400).json({ message: "Nu exista comenzi" });
            }
            return res.status(200).json(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if (!order) {
                return res.status(400).json({ message: `Comanda cu id-ul ${orderId} nu exista` });
            }
            const newOrder = req.body;
            if (!(newOrder.quantity && newOrder.unit && newOrder.description && newOrder.deadline && newOrder.number && newOrder.value)) {
                return res.status(400).json({ message: "Completeaza toate campurile printule" });
            }
            if (!(/^[0-9\,.]{1,}$/).test(newOrder.quantity)) {
                return res.status(400).json({ message: "Intrduceti o cantitate valida" });
            }
            if (!(/^[A-Za-z0-9\-_!@#$%<>?\/":;|.,+=() ]{1,}$/).test(newOrder.description)) {
                return res.status(400).json({ message: "Introduceti o descriere valida" });
            }
            if (!(/^[A-z0-9-]{1,}$/).test(newOrder.number)) {
                return res.status(400).json({ message: "Introduceti un numar de comanda valid" });
            }
            if (!(/^[0-9.]{1,}$/).test(newOrder.value)) {
                return res.status(400).send({ message: "Introduceti o valoare valida" });
            }
            const offer = await offerModel.findByPk(order.offerId);
            const request = await requestModel.findByPk(offer.requestId);
            if (new Date(newOrder.deadline).getTime() < new Date(request.sentAt).getTime()) {
                return res.status(400).json({ message: "Cum termini inainte sa incepi" });
            }
            await order.update(newOrder);
            await order.save();
            return res.status(200).json({ message: `Comanda cu id-ul ${orderId} a fost actualizata cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if (!order) {
                return res.status(400).json({ message: `Comanda cu id-ul ${orderId} nu exista` });
            }
            const offer = await offerModel.findByPk(order.offerId);
            await offer.update({
                isAccepted: !offer.isAccepted,
            })
            await orderModel.destroy({
                where: {
                    id: orderId,
                },
            });
            return res.status(200).json({ message: `Comanda cu id-ul ${orderId} a fost stearsa cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getOrderProductionNotes: async (req, res) => {
        try {
            const orderId = req.params.id;
            const orderProductionNotes = await orderModel.findByPk(orderId, {
                include: [productionNoteModel]
            })
            if (!orderProductionNotes) {
                return res.status(400).json({ message: `Comanda cu id-ul ${orderId} nu exista` });
            }
            const productionNotes = orderProductionNotes.productionNotes;
            if (!productionNotes) {
                return res.status(400).json({ message: `Comanda cu id-ul ${orderId} nu are note de productie` });
            }
            return res.status(200).json(productionNotes);
        } catch (err) {
            console.log(err);
            return res.status(500).send(`Eroare`);
        }
    }
}

module.exports = orderController;