const { productionNoteModel, orderModel } = require("../models");

const productionNoteController = {
    createProductionNote: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if(!order) {
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu exista`);
            }
            const productionNote = req.body;
            if(!(productionNote.reper && productionNote.scheme && productionNote.pieces && productionNote.quantity)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if(!(/^[A-z0-9\-,.!@#$%^&* ]{1,}$/).test(productionNote.reper)) {
                return res.status(400).send("Introduceti o denumire valida");
            }
            if(!(/^[0-9A-z ]{1,}$/).test(productionNote.scheme)) {
                return res.status(400).send("Introduceti un desen valid");
            }
            if(!(/^[0-9]{1,}/).test(productionNote.pieces)) {
                return res.status(400).send("Introduceti un numar de piese valid");
            }
            productionNote.isFinished = false;
            await order.createProductionNote(productionNote);
            return res.status(200).send("Nota de productie a fost creata cu succes");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare!");
        }
    },
    getAllProductionNotes: async (req, res) => {
        try {
            const productionNotes = await productionNoteModel.findAll();
            if(!productionNotes) {
                return res.status(400).send("Nu exista note de productie");
            }
            return res.status(200).json(productionNotes);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    getProductionNoteById: async (req, res) => {
        try {
            const productionNoteId = req.params.id;
            const productionNote = await productionNoteModel.findByPk(productionNoteId);
            if(!productionNote) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} nu exista`);
            }
            return res.status(200).json(productionNote);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    updateProductionNote: async (req, res) => {
        try {
            const productionNoteId = req.params.id;
            const productionNote = await productionNoteModel.findByPk(productionNoteId);
            if(!productionNote) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} nu exista`);
            }
            const newProductionNote = req.body;
            if(!(newProductionNote.reper && newProductionNote.scheme && newProductionNote.pieces && newProductionNote.quantity)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if(!(/^[A-z0-9\-,.!@#$%^&* ]{1,}$/).test(newProductionNote.reper)) {
                return res.status(400).send("Introduceti o denumire valida");
            }
            if(!(/^[0-9A-z ]{1,}$/).test(newProductionNote.scheme)) {
                return res.status(400).send("Introduceti un desen valid");
            }
            if(!(/^[0-9]{1,}/).test(newProductionNote.pieces)) {
                return res.status(400).send("Introduceti un numar de piese valid");
            }
            await productionNote.update(newProductionNote);
            return res.status(200).send(`Nota de productie cu id-ul ${productionNoteId} a fost actualizata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    deleteProductionNote: async (req, res) => {
        try {
            const productionNoteId = req.params.id;
            const productioNote = await productionNoteModel.findByPk(productionNoteId);
            if(!productioNote) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} nu exista`);
            }
            await productionNoteModel.destroy({
                where: {
                    id: productionNoteId,
                },
            });
            return res.status(200).send(`Nota de productie cu id-ul ${productionNoteId} a fost stearsa cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    },
    completeProductionNote: async (req, res) => {
        try {
            const productionNoteId = req.params.id;
            const productionNote = await productionNoteModel.findByPk(productionNoteId);
            if(!productionNote) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} nu exista`);
            }
            productionNote.isFinished = true;
            order = await orderModel(productionNote.orderId);
            if(order.unit === "kg") {
                order.update({
                    remainingQuantity: order.remainingQuantity - productionNote.pieces * productionNote.quantity
                })
            } else {
                order.update({
                    remainingQuantity: order.remainingQuantity - productionNote.pieces
                })
            }
            if(order.remainingQuantity == 0) {
                order.update({
                    isCompleted: true,
                })
            }
            return res.status(200).send(`Nota de productie cu id-ul ${productionNoteId} a fost finalizata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    }
}

module.exports =productionNoteController;