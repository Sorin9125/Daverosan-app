const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
          user.password &&
          user.email
        )
      ) {
        return res.status(400).josn({ message: "Completeaza toate campurile printule!" });
      }
      if (!(/^[A-z]{3,}$/gm).test(user.firstName)) {
        return res.status(400).json({ message: "Prenumele trebuie sa contina doar litere" });
      }
      if (!(/^[A-z]{3,}$/gm).test(user.lastName)) {
        return res.status(400).json({ message: "Numele trebuie sa contina doar litere" });
      }
      if (
        !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/gm).test(user.password)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Parola trebuie sa contina cel putin o litera mare, o cifra si 6 caractere!"
          });
      }
      if (!(/^[A-z1-9]+@daverosan.ro$/gm).test(user.email)) {
        return res.status(400).json({ message: "Email-ul trebuie sa fie organizational!" });
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
          .josn({ message: `Utilizatorul cu email-ul ${user.email} deja exista` });
      }
      user.password = await hashPassword(user.password);
      await userModel.create(user);
      jwt.sign({ email: user.email },
        process.env.JWT_SECRET,
        (err, token) => {
          if(err) {
            return res.status(400).json({ message: "Eroare la generare jwt "});
          }
          res.cookie("token", token, {
            httpOnly: true,
            expiresIn: process.env.COOKIE_AGE,
          })
          res.status(200).json(user);
        }
      )
      return res.status(200).json({ message: "Utilizatorul a fost creat cu succes" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare!");
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.findAll();
      if (!users) {
        return res.status(400).json({ message: "Nu exista utilizatori!" });
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
          .json({ message: `Utilizatorul cu id-ul ${userId} nu exista` });
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
        return res.status(404).json({ message: `User-ul cu id-ul ${userId} nu exista` });
      }
      const newUser = req.body;
      console.log(newUser);
      const isCorrect = await bcrypt.compare(newUser.password, user.password);
      console.log(isCorrect);
      if (
        !(
          newUser.firstName &&
          newUser.lastName &&
          newUser.password &&
          newUser.email
        )
      ) {
        return res.status(400).json({ message: "Completeaza toate campurile printule!" });
      }
      if (!isCorrect) {
        console.log(await hashPassword(newUser.password));
        return res
          .status(400)
          .json(
            {
              message: "Pentru a actualiza parola trebuie sa introduceti parola corecta!"
            });
      }
      if (!newUser.firstName.match(/^[A-z]{3,}$/gm)) {
        return res.status(400).json({ message: "Prenumele trebuie sa contina doar litere" });
      }
      if (!newUser.lastName.match(/^[A-z]{3,}$/gm)) {
        res.status(400).json({ message: "Numele trebuie sa contina doar litere" });
      }
      if (
        !newUser.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/gm
        )
      ) {
        return res
          .status(400)
          .json({
            message:
              "Parola trebuie sa contina cel putin o litera mare, o cifra si 6 caractere!"
          });
      }
      if (!newUser.email.match(/^[A-z1-9]+@daverosan.ro$/gm)) {
        return res.status(400).json({ message: "Email-ul trebuie sa fie organizational!" });
      }
      newUser.password = await hashPassword(newUser.password);
      await user.update(newUser);
      return res.status(200).josn({ message: "Utilizatorul a fost actualizat cu succes" });
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
        return res.staus(400).json({ message: `User-ul cu id-ul ${userId} nu exista` });
      }
      await userModel.destroy({
        where: {
          id: userId,
        },
      });
      return res
        .status(200)
        .json({ message: `User-ul cu id-ul ${userId} a fost sters cu succes` });
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
          .json({
            message:
              `User-ul cu mail-ul ${user.email} nu exista. Va rog sa va inregistrati`
          });
      }
      const isCorrect = await bcrypt.compare(
        user.password,
        existingUser.password
      );
      if (!isCorrect) {
        return res.status(400).json({ message: "Parola incorecta" });
      } else {
        jwt.sign(
          {email: existingUser.email},
          process.env.JWT_SECRET,
          (err, token) => {
            if(err) {
              console.log(err);
              return res.status(400).json({message: "Eroare la generarea jwt"})
            }
            res.cookie("token", token, {
              httpOnly: true,
              expiresIn: process.env.COOKIE_AGE
            })
            return res.status(200).json({ user: {
              id: existingUser.id,
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
              email: existingUser.email
            }});
          }
        )
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare");
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      console.log(req.cookies);
      const token = req.cookies.token;
      if(!token) {
        return res.status(400).json({ message: "Schimba semaforul "});
      }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
          if(err) {
            return res.status(400).json({ message: "De unde l-ai luat?" });
          }
          const user = await userModel.findOne({
            where: {
              email: decoded.email,
            },
            attributes: ["id", "firstName", "lastName", "email" ],
          });
          if(!user) {
            return res.status(400).json({ message: "User-ul nu exista" });
          }
          return res.status(200).json(user);
        }
      )
    } catch (err) {
      return res.status(500).send("Eroare")
    }
  },
  logoutUser: async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
      })
      return res.status(200).json({ message: "Delogarea efectuată cu succes "});
    } catch (err) {
      return res.status(500).send("Eroare");
    }
  }
};

module.exports = userController;
