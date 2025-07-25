const { userModel } = require("../models");
const bcrypt = require("bcrypt");

const hashPassword = async (pasword) => {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);

  const hashedPassword = await bcrypt.hash(pasword, salt);

  return hashedPassword;
};

const userController = {
  createUser: async (req, res) => {
    try {
      const user = req.body;
      console.log(user);
      if (
        !(
          user.firstName &&
          user.lastName &&
          user.phoneNumber &&
          user.password &&
          user.email
        )
      ) {
        return res.status(400).send("Completeaza toate campurile printule!");
      }
      if (!(/^[A-z]{3,}$/gm).test(user.firstName)) {
        return res.status(400).send("Prenumele trebuie sa contina doar litere");
      }
      if (!(/^[A-z]{3,}$/gm).test(user.lastName)) {
        return res.status(400).send("Numele trebuie sa contina doar litere");
      }
      if (!(/^[0-9]{10}$/gm).test(user.phoneNumber)) {
        return res.status(400).send("Numarul de telefon nu este valid");
      }
      if (
        !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/gm).test(user.password)
      ) {
        return res
          .status(400)
          .send(
            "Parola trebuie sa contina cel putin o litera mare, o cifra si 6 caractere!"
          );
      }
      if (!(/^[A-z1-9]+@daverosan.ro$/gm).test(user.email)) {
        return res.status(400).send("Email-ul trebuie sa fie organizational!");
      }
      if (
        await userModel.findOne({
          where: {
            email: user.email,
          },
        })
      ) {
        return res
          .status(400)
          .send(`Utilizatorul cu email-ul ${user.email} deja exista`);
      }
      user.password = await hashPassword(user.password);
      await userModel.create(user);
      res.status(200).send("Utilizatorul a fost creat cu succes");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare!");
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.findAll();
      if (!users) {
        return res.status(400).send("Nu exista utilizatori!");
      }
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).send("Eroare!");
    }
  },
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res
          .status(400)
          .send(`Utilizatorul cu id-ul ${userId} nu exista`);
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare!");
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      let user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).send(`User-ul cu id-ul ${userId} nu exista`);
      }
      const newUser = req.body;
      console.log(newUser);
      const isCorrect = await bcrypt.compare(newUser.password, user.password);
      console.log(isCorrect);
      if (
        !(
          newUser.firstName &&
          newUser.lastName &&
          newUser.phoneNumber &&
          newUser.password &&
          newUser.email
        )
      ) {
        return res.status(400).send("Completeaza toate campurile printule!");
      }
      if (!isCorrect) {
        console.log(await hashPassword(newUser.password));
        return res
          .status(400)
          .send(
            "Pentru a actualiza parola trebuie sa introduceti parola corecta!"
          );
      }
      if (!newUser.firstName.match(/^[A-z]{3,}$/gm)) {
        return res.status(400).send("Prenumele trebuie sa contina doar litere");
      }
      if (!newUser.lastName.match(/^[A-z]{3,}$/gm)) {
        res.status(400).send("Numele trebuie sa contina doar litere");
      }
      if (!newUser.phoneNumber.match(/^[0-9]{10}$/gm)) {
        return res.status(400).send("Numarul de telefon nu este valid");
      }
      if (
        !newUser.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/gm
        )
      ) {
        return res
          .status(400)
          .send(
            "Parola trebuie sa contina cel putin o litera mare, o cifra si 6 caractere!"
          );
      }
      if (!newUser.email.match(/^[A-z1-9]+@daverosan.ro$/gm)) {
        return res.status(400).send("Email-ul trebuie sa fie organizational!");
      }
      newUser.password = await hashPassword(newUser.password);
      await user.update(newUser);
      return res.status(200).send("Utilizatorul a fost actualizat cu succes");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare!");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.staus(400).send(`User-ul cu id-ul ${userId} nu exista`);
      }
      await userModel.destroy({
        where: {
          id: userId,
        },
      });
      return res
        .status(200)
        .send(`User-ul cu id-ul ${userId} a fost sters cu succes`);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare");
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = req.body;
      const existingUser = await userModel.findOne({
        where: {
          email: user.email,
        },
      });
      if (!existingUser) {
        return res
          .status(400)
          .send(
            `User-ul cu mail-ul ${user.email} nu exista. Va rog sa va inregistrati`
          );
      }
      const isCorrect = await bcrypt.compare(
        user.password,
        existingUser.password
      );
      if (isCorrect) {
        return res.status(200).send("Autentifcare efectuata cu succes");
      }
      return res.status(400).send("Parola incorecta");
    } catch (err) {
      return res.status(500).send("Eroare");
    }
  },
};

module.exports = userController;
