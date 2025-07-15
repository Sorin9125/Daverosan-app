const userModel = require("../models").userModel;

const userController = {
    createUser: async (req, res) => {
        try {
            const user = req.body;
            console.log(user);
            if(!(user.firstName && user.lastName && user.phoneNumber)) {
                res.status(400).send("Completeaza toate campurile printule!");
            }
            if(user.firstName.match("/[A-z]{3,}/gm")) {
                res.status(400).send("Prenumele trebuie sa contina doar litere");
            }
            if(user.lastName.match("[A-z]{3,}/gm")) {
                res.status(400).send("Numele trebuie sa contina doar litere");
            }
            if(user.phoneNumber.match("[0-9]{10}/gm")) {
                res.status(400).send("Numarul de telefon nu este valid");
            }
            await userModel.create(user);
            res.status(200).send("Utilizatorul a fost creat cu succes");
        } catch(err) {
            console.log(err);
            res.status(500).send("Eroare!");
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.findAll();
            if(!users) {
                res.status(400).send("Nu exista utilizatori!");
            }
            res.status(200).json(users);
        } catch(err) {
            res.status(500).send("Eroare!")
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findByPk(userId);
            if(!user) {
                res.status(400).send(`Utilizatorul cu id-ul ${userId} nu exista`);
            }
            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            res.status(500).send("Eroare!");
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            let user = await userModel.findByPk(userId);
            if(!user) {
                res.status(404).send(`User-ul cu id-ul ${userId} nu exista`);
            }
            const newUser = req.body
            if(!(newUser.firstName && newUser.lastName && newUser.phoneNumber)) {
                res.status(400).send("Completeaza toate campurile printule!");
            }
            if(newUser.firstName.match("[A-z]{3,}/gm")) {
                res.status(400).send("Prenumele trebuie sa contina doar litere");
            }
            if(newUser.lastName.match("[A-z]{3,}/gm")) {
                res.status(400).send("Numele trebuie sa contina doar litere");
            }
            if(newUser.phoneNumber.match("[0-9]{10}/gm")) {
                res.status(400).send("Numarul de telefon nu este valid");
            }
            await user.update(newUser);
            res.status(200).json(user);
        } catch(err) {
            console.log(err);
            res.status(500).send("Eroare!");
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await userModel.findByPk(userId);
            if(!user) {
                res.staus(400).send(`User-ul cu id-ul ${userId} nu exista`);
            }
            await userModel.destroy({
                where: {
                    id: userId,
                },
            });
            res.status(200).send(`User-ul cu id-ul ${userId} a fost sters cu succes`);
        } catch(err) {
            console.log(err);
            res.status(500).send("Eroare");
        }
    }
}

module.exports = userController; 