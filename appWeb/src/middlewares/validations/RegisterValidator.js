const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");

validacionesUser = [
  body("name")
    .notEmpty().withMessage("Escribe tu nombre y apellido").bail()
    .isLength({ min: 3 }).withMessage("Debes poner mínimamente 3 caracteres"),
  body("email")
    .notEmpty().withMessage("Escribe tu correo electrónico").bail()
    .isEmail().withMessage("No es un mail valido!!").bail(),
  body("password")
      .notEmpty().withMessage("Debes ingresar una contraseña").bail()
      .isAlphanumeric().withMessage("La contraseña debe tener letras como numeros!!").bail()
      .isLength({ min: 8, max: 12 }).withMessage("Tu contraseña debe tener mínimo 8 y un máximo de 12 caracteres"),
  body("repassword").notEmpty().withMessage("Debes completar este campo").bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas deben ser iguales');
      }
      return true;
    }),
  body("birth").notEmpty().withMessage("Debes colocar tu fecha de nacimiento"),                 
]

module.exports = validacionesUser;