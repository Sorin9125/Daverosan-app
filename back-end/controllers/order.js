const { orderModel, offerModel, requestModel, productionNoteModel } = require("../models");

const orderController = {
    createOrder: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await offerModel.findByPk(offerId);
            if (!offer) {
                return res.status(400).send(`Oferta cu id-ul ${offerId} nu exista`);
            }
            if (await orderModel.findOne({
                where: {
                    offerId: offerId,
                },
            })) {
                return res.status(400).send(`Oferta cu id-ul ${offerId} a fost deja acceptata`);
            }
            const order = req.body;
            if (!(order.quantity && order.unit && order.description && order.deadline && order.number)) {
                return res.status(400).send("Completeaza toate campurile printule")
            }
            if (!(/^[0-9\,.]{1,}$/).test(order.quantity)) {
                return res.status(400).send("Intrduceti o cantitate valida");
            }
            if (!(/[buc]|[kg]/).test(order.unit)) {
                return res.status(400).send("Unitatile de masura valide sunt buc si kg");
            }
            if (!(/^[A-Za-z0-9\-_!@#$%<>?\/":;|., ]{1,}$/).test(order.description)) {
                return res.status(400).send("Introduceti o descriere valida");
            }
            if (!(/^[A-z0-9]{1,}$/).test(order.number)) {
                return res.status(400).send("Introduceti un numar de comanda valid");
            }
            const request = await requestModel.findByPk(offer.requestId);
            if(new Date(order.deadline).getTime() < new Date(request.sentAt).getTime()) {
                return res.status(400).send("Cum termini inainte sa incepi");
            }
            await offer.update({
                isAccepted: true,
            });
            order.remainingQuantity = order.quantity;
            await offer.createOrder(order);
            return res.status(200).send(`Comanda pentru cererea ${offer.requestId} a fost creata`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderModel.findAll();
            if (!orders) {
                return res.status(400).send("Nu exista comenzi");
            }
            return res.status(200).json(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getOrderById: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if (!order) {
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu exista`);
            }
            return res.status(200).json(order);
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
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu exista`);
            }
            const newOrder = req.body;
            if (!(newOrder.quantity && newOrder.unit && newOrder.description && newOrder.deadline && newOrder.number)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if (!(/^[0-9\,.]{1,}$/).test(newOrder.quantity)) {
                return res.status(400).send("Intrduceti o cantitate valida");
            }
            if (!(/[buc]|[kg]/).test(newOrder.unit)) {
                return res.status(400).send("Unitatile de masura valide sunt buc si kg");
            }
            if (!(/^[A-Za-z0-9\-_!@#$%<>?\/":;|., ]{1,}$/).test(newOrder.description)) {
                return res.status(400).send("Introduceti o descriere valida");
            }
            if (!(/^[A-z0-9]{1,}$/).test(newOrder.number)) {
                return res.status(400).send("Introduceti un numar de comanda valid");
            }
            const offer = await offerModel.findByPk(order.offerId);
            const request = await requestModel.findByPk(offer.requestId);
            if(new Date(newOrder.deadline).getTime() < new Date(request.sentAt).getTime()) {
                return res.status(400).send("Cum termini inainte sa incepi");
            }
            await order.update(newOrder);
            return res.status(200).send(`Comanda cu id-ul ${orderId} a fost actualizata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if(!order) {
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu exista`);
            }
            await orderModel.destroy({
                where: {
                    id: orderId, 
                },
            });
            return res.status(200).send(`Comanda cu id-ul ${orderId} a fost stearsa cu succes`);
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
            if(!orderProductionNotes) {
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu exista`);
            }
            const productionNotes = orderProductionNotes.productionNote;
            if(!productionNotes) {
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu are note de productie`);
            }
            return res.status(200).json(productionNotes);
        } catch (err) {
            console.log(err);
            return res.status(500).send(`Eroare`);
        }
    }
}

module.exports = orderController;