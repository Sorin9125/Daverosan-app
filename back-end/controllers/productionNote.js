const { productionNoteModel, orderModel } = require("../models");
const readExcelFile = require("read-excel-file/node");
const path = require("path");

const productionNoteController = {
    createProductionNote: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if (!order) {
                return res.status(400).send(`Comanda cu id-ul ${orderId} nu exista`);
            }
            const productionNote = req.body;
            if (order.unit === "buc") {
                productionNote.weight = 1;
            }
            if (!(productionNote.reper && productionNote.scheme && productionNote.weight && productionNote.quantity)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if (!(/^[A-z0-9\-,.!@#$%^&* ]{1,}$/).test(productionNote.reper)) {
                return res.status(400).send("Introduceti o denumire valida");
            }
            if (!(/^[0-9A-z ]{1,}$/).test(productionNote.scheme)) {
                return res.status(400).send("Introduceti un desen valid");
            }
            if (!(/^[0-9]{1,}/).test(productionNote.weight)) {
                return res.status(400).send("Introduceti o greutate valida");
            }
            if (!(/^[0-9]{1,}$/).test(productionNote.quantity)) {
                return res.status(400).send("Introduceti o cantitate valida");
            }
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
            if (!productionNotes) {
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
            if (!productionNote) {
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
            if (!productionNote) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} nu exista`);
            }
            const newProductionNote = req.body;
            if (!(newProductionNote.reper && newProductionNote.scheme && newProductionNote.weight && newProductionNote.quantity)) {
                return res.status(400).send("Completeaza toate campurile printule");
            }
            if (!(/^[A-z0-9\-,.!@#$%^&* ]{1,}$/).test(newProductionNote.reper)) {
                return res.status(400).send("Introduceti o denumire valida");
            }
            if (!(/^[0-9A-z ]{1,}$/).test(newProductionNote.scheme)) {
                return res.status(400).send("Introduceti un desen valid");
            }
            if (!(/^[0-9]{1,}/).test(newProductionNote.cantitate)) {
                return res.status(400).send("Introduceti o cantitate valida");
            }
            if (!(/^[0-9]{1,}/))
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
            if (!productioNote) {
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
    finishProductionNote: async (req, res) => {
        try {
            const productionNoteId = req.params.id;
            const productionNote = await productionNoteModel.findByPk(productionNoteId);
            if (!productionNote) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} nu exista`);
            }
            if (productionNote.isCompleted === true) {
                return res.status(400).send(`Nota de productie cu id-ul ${productionNoteId} este deja finalizata`);
            }
            await productionNote.update({
                isFinished: true
            })
            order = await orderModel.findByPk(productionNote.orderId);
            await order.update({
                remainingQuantity: order.remainingQuantity - productionNote.weight * productionNote.quantity
            })
            if (order.remainingQuantity == 0) {
                order.update({
                    isCompleted: true,
                })
                return res.status(200).send(`Comanda cu id-ul ${productionNote.orderId} a fost finalizata`);
            }
            return res.status(200).send(`Nota de productie cu id-ul ${productionNoteId} a fost finalizata cu succes`);
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    uploadFromFile: async (req, res) => {
        try {
            if (req.file == undefined) {
                return res.status(400).send("Trebuie sa incarci un fisier");
            }
            console.log(req.file)
            const orderId = req.params.id;
            const dir = path.join(__dirname, "..", "files", "uploads", req.file.filename);
            readExcelFile(dir).then(async (rows) => {
                rows.shift();
                let productionNotes = [];
                for (const row of rows) {
                    let productionNote = {
                        reper: row[0],
                        port: row[1],
                        scheme: row[2],
                        quantity: row[3],
                        weight: row[4],
                    };
                    productionNote.orderId = orderId;
                    const order = await orderModel.findByPk(orderId);
                    if (order.unit === "buc") {
                        productionNote.weight = 1;
                    }
                    if (!(productionNote.reper && productionNote.scheme && productionNote.weight && productionNote.quantity)) {
                        return res.status(400).send("Completeaza toate campurile printule");
                    }
                    if (!(/^[A-z0-9\-,.!@#$%^&* ]{1,}$/).test(productionNote.reper)) {
                        return res.status(400).send("Introduceti o denumire valida");
                    }
                    if (!(/^[0-9A-z ]{1,}$/).test(productionNote.scheme)) {
                        return res.status(400).send("Introduceti un desen valid");
                    }
                    if (!(/^[0-9]{1,}/).test(productionNote.weight)) {
                        return res.status(400).send("Introduceti o greutate valida");
                    }
                    if (!(/^[0-9]{1,}$/).test(productionNote.quantity)) {
                        return res.status(400).send("Introduceti o cantitate valida");
                    }
                    productionNotes.push(productionNote);
                }
                productionNoteModel.bulkCreate(productionNotes).then(() => {
                    return res.status(200).send(`Notele de productie pentru comanda ${orderId} au fost adaugate cu succes`);
                }).catch((err) => {
                    console.log(err);
                    return res.status(500).send("Eroare")
                })
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    }
}

module.exports = productionNoteController;