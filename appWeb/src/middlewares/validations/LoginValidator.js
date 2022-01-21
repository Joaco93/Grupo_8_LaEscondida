const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");

validacionesLogin = [
	body("email")
		.notEmpty().withMessage("Escribe tu correo electrónico").bail()
		.isEmail().withMessage("No es un mail valido!!").bail(),
	body("password")
		.notEmpty().withMessage("Debes ingresar una contraseña").bail()
		.isAlphanumeric().withMessage("La contraseña debe tener letras como numeros!!").bail()
		.isLength({ min: 8, max: 12 }).withMessage("Tu contraseña debe tener mínimo 8 y un máximo de 12 caracteres")
]

module.exports = validacionesLogin;
