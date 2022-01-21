const path = require("path");
const { check, body } = require("express-validator");
const db = require("../database/models");
module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Escribe tu nombre y apellido")
    .isLength({ min: 8 })
    .withMessage("Debes poner mínimamente 8 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("Escribe tu correo electrónico")
    .isEmail()
    .custom((value => {
      return db.User.findOne({
        where: {
          email: value
        }
      })
      .then((user) => {
        if (user) {
          return Promise.reject("Este email ya está registrado");
        }
      })
    }),
  body("password")
    .notEmpty()
    .isLength({ min: 8, max:12 })
    .withMessage("Tu contraseña debe tener mínimo 8 y un máximo de 12 caracteres"))
]