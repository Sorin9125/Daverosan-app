const { productionNoteModel, orderModel } = require("../models");
const readExcelFile = require("read-excel-file/node");
const path = require("path");

const productionNoteController = {
    createProductionNote: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await orderModel.findByPk(orderId);
            if (!order) {
                return res.status(400).json({ message: `Comanda cu id-ul ${orderId} nu exista` });
            }
            const productionNote = req.body;
            if (!(productionNote.reper && productionNote.scheme && productionNote.quantity)) {
                return res.status(400).json({ message: "Completeaza toate campurile printule" });
            }
            if (!(/^[A-z0-9\-,.!@#$%^&*/() ]{1,}$/).test(productionNote.reper)) {
                return res.status(400).json({ message: "Introduceti o denumire valida" });
            }
            if (!(/^[0-9A-z.,\/\- ]{1,}$/).test(productionNote.scheme)) {
                return res.status(400).json({ message: "Introduceti un desen valid" });
            }
            if (!(/^[0-9.]{1,}$/).test(productionNote.quantity)) {
                return res.status(400).json({ message: "Introduceti o cantitate valida" });
            }
            await order.createProductionNote(productionNote);
            return res.status(200).json({ message: "Nota de productie a fost creata cu succes" });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare!");
        }
    },
    getAllProductionNotes: async (req, res) => {
        try {
            const orderNumber = req.params.orderNumber;
            const productionNotes = await productionNoteModel.findAll({
                include: {
                    model: orderModel,
                    where: { number: orderNumber },
                    attributes: ["number", "unit", "deadline"],
                }
            });
            if (!productionNotes) {
                return res.status(400).josn({ message: "Nu exista note de productie" });
            }
            return res.status(200).json(productionNotes);
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
                return res.status(400).json({ message: `Nota de productie cu id-ul ${productionNoteId} nu exista` });
            }
            const newProductionNote = req.body;
            if (!(newProductionNote.reper && newProductionNote.scheme && newProductionNote.quantity)) {
                return res.status(400).json({ message: "Completeaza toate campurile printule" });
            }
            if (!(/^[A-z0-9\-,.!@#$%^&*()/ ]{1,}$/).test(newProductionNote.reper)) {
                return res.status(400).json({ message: "Introduceti o denumire valida" });
            }
            if (!(/^[0-9A-z,.\/\- ]{1,}$/).test(newProductionNote.scheme)) {
                return res.status(400).json({ message: "Introduceti un desen valid" });
            }
            if (!(/^[0-9]{1,}/).test(newProductionNote.quantity)) {
                return res.status(400).json({ message: "Introduceti o cantitate valida" });
            }
            if (!(/^[0-9.]{1,}/).test(newProductionNote.weight)) {
                return res.status(400).json({ message: "Introduceti o cantintate valida" })
            }
            await productionNote.update(newProductionNote);
            return res.status(200).json({ message: `Nota de productie cu id-ul ${productionNoteId} a fost actualizata cu succes` });
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
                return res.status(400).json({ mesage: `Nota de productie cu id-ul ${productionNoteId} nu exista` });
            }
            const order = await orderModel.findByPk(productioNote.orderId);
            if (productioNote.isFinished) {
                await order.update({
                    remainingQuantity: order.remainingQuantity + productioNote.weight * productioNote.quantity,
                })
            }
            await productionNoteModel.destroy({
                where: {
                    id: productionNoteId,
                },
            });
            return res.status(200).json({ message: `Nota de productie cu id-ul ${productionNoteId} a fost stearsa cu succes` });
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
                return res.status(400).json({ message: `Nota de productie cu id-ul ${productionNoteId} nu exista` });
            }
            if (productionNote.isCompleted == true) {
                return res.status(400).json({ message: `Nota de productie cu id-ul ${productionNoteId} este deja finalizata` });
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
                    finishDate: new Date(),
                })
                return res.status(200).json({ message: `Comanda cu id-ul ${productionNote.orderId} a fost finalizata` });
            }
            return res.status(200).json({ message: `Nota de productie cu id-ul ${productionNoteId} a fost finalizata cu succes` });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Eroare");
        }
    },
    uploadFromFile: async (req, res) => {
        try {
            if (req.file == undefined) {
                return res.status(400).json({ message: "Trebuie sa incarci un fisier" });
            }
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
                        return res.status(400).josn({ message: "Completeaza toate campurile printule" });
                    }
                    if (!(/^[A-z0-9\-,.!@#$%^&*()/ ]{1,}$/).test(productionNote.reper)) {
                        return res.status(400).json({ message: "Introduceti o denumire valida" });
                    }
                    if (!(/^[0-9A-z,.\/\- ]{1,}$/).test(productionNote.scheme)) {
                        return res.status(400).json({ message: "Introduceti un desen valid" });
                    }
                    if (!(/^[0-9]{1,}/).test(productionNote.weight)) {
                        return res.status(400).json({ message: "Introduceti o greutate valida" });
                    }
                    if (!(/^[0-9]{1,}$/).test(productionNote.quantity)) {
                        return res.status(400).json({ message: "Introduceti o cantitate valida" });
                    }
                    productionNotes.push(productionNote);
                }
                productionNoteModel.bulkCreate(productionNotes).then(() => {
                    return res.status(200).json({ message: `Notele de productie pentru comanda ${orderId} au fost adaugate cu succes` });
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