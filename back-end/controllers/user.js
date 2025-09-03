const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mailgun = require("mailgun.js");
const FormData = require("form-data");
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API,
  url: "https://api.eu.mailgun.net"
});
const { v4: uuidv4 } = require("uuid");

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
      if (
        !(
          user.firstName &&
          user.lastName &&
          user.password &&
          user.email
        )
      ) {
        return res.status(400).json({ message: "Completeaza toate campurile printule!" });
      }
      if (!(/^[A-z]{3,}$/gm).test(user.firstName)) {
        return res.status(400).json({ message: "Prenumele trebuie sa contina doar litere" });
      }
      if (!(/^[A-z]{3,}$/gm).test(user.lastName)) {
        return res.status(400).json({ message: "Numele trebuie sa contina doar litere" });
      }
      if (
        !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/gm).test(user.password)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Parola trebuie sa contina cel putin o litera mare, o cifra si 6 caractere!"
          });
      }
      if (!(/^[A-z1-9./-_]+@daverosan.ro$/gm).test(user.email)) {
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
          .json({ message: `Utilizatorul cu email-ul ${user.email} deja exista` });
      }
      user.password = await hashPassword(user.password);
      await userModel.create(user);
      jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: "Eroare la generarea jwt" })
          }
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: process.env.COOKIE_AGE,
            secure: (process.env.SITE_MODE != "dev")
          })
          return res.status(200).json({
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        }
      )
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
              message: "Pentru a actualiza datele trebuie sa introduceti parola corecta!"
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
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/gm
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
      return res.status(200).json({ message: "Utilizatorul a fost actualizat cu succes" });
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
          { email: existingUser.email },
          process.env.JWT_SECRET,
          (err, token) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ message: "Eroare la generarea jwt" })
            }
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: process.env.COOKIE_AGE,
              secure: (process.env.SITE_MODE != "dev"),
            })
            return res.status(200).json({
              user: {
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
              }
            });
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
      const token = req.cookies.token;
      if (!token) {
        return res.status(400).json({ message: "Schimba semaforul " });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({
        where: {
          email: decoded.email,
        },
        attributes: ["id", "firstName", "lastName", "email"],
      });
      if (!user) {
        return res.status(400).json({ message: "User-ul nu exista" });
      }
      return res.status(200).json(user.toJSON());
    } catch (err) {
      return res.status(500).send("Eroare")
    }
  },
  logoutUser: async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
      })
      return res.status(200).json({ message: "Delogarea a fost efectuată cu succes " });
    } catch (err) {
      return res.status(500).send("Eroare");
    }
  },
  setResetToken: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await userModel.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(400).json({ message: `User-ul cu adresa de mail ${email} nu exista. Va rog sa va inregistrati!` });
      }
      const resetToken = uuidv4();
      user.update({ resetToken });
      user.save();
      const data = {
        from: "Daverosan IT support <postmaster@daverosan.space>",
        to: email,
        subject: "Resetare parola",
        html: `<html lang="en">
						<body>
							<div>
								Apasă  
								<a href="${process.env.ORIGIN_SITE}/reset-password/${resetToken}" target="_blank">aici</a>
								pentru a reseta parola!
							</div>	
						</body>
					</html>`,
      }
      await mg.messages.create("daverosan.space", data);
      return res.status(200).json({ message: "Codul pentru resetare a fost trimis cu succes" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare");
    }
  },
  resetPassword: async (req, res) => {
    try {
      const resetToken = req.params.resetToken;
      console.log(resetToken);
      const user = await userModel.findOne({
        where: {
          resetToken: resetToken,
        }
      });
      if (!user) {
        return res.status(400).json({ message: "Schimba semaforul" });
      }
      let password = req.body.password;
      if (!password) {
        return res.status(400).json("Completeaza toate campurile printule");
      }
      if (
        !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/gm).test(password)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Parola trebuie sa contina cel putin o litera mare, o cifra si 6 caractere!"
          });
      }
      password = await hashPassword(password);
      const doesExist = await bcrypt.compare(
        password,
        user.password
      );
      if (doesExist) {
        return res.status(400).json({ message: "Parola nu poate sa fie cea anterioara" });
      } else {
        user.update({
          password: password,
          resetToken: null
        });
        res.status(200).json("Parola a fost actualizata cu succes");
        jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET,
          (err, token) => {
            if (err) {
              console.log(err);
              return res.status(400).json({ message: "Eroare la generarea jwt" })
            }
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: process.env.COOKIE_AGE,
              secure: (process.env.SITE_MODE != "dev"),
            })
            return res.status(200).json({
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              }
            });
          }
        )
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Eroare");
    }
  }
};

module.exports = userController;
