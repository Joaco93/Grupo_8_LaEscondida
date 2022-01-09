const path = require("path");
const { body } = require("express-validator");
const db = require("../database/models");
module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Escribe tu nombre y apellido")
    .isLength({ min: 8 })
    .withMessage("Debes poner mínimamente 8 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("Escribe tu correo electrónico")
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido")
    .custom((value, { req }) => {
      return db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("E-mail ya está registrado");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Tienes  que  escribir  una  contraseña")
    .isLength({ min: 8, max:12 })
    .withMessage("Tu contraseña debe tener mínimo 8 y un máximo de 12 caracteres"),
  body("repassword")
  .notEmpty()
  .withMessage("Este campo es requerido")
  .isLength({ min: 8, max:12 })
  .withMessage("Tu contraseña debe tener mínimo 8 y un máximo de 12 caracteres"),
  body("repassword").custom((value,{req})=>{
    if (value !== req.body.pass){
      return false
    }else{
      return true
    }
    }).withMessage("Las contraseñas no coiniciden"),
  body("birth")
  .notEmpty()
  .withMessage("este campo es obligatorio"),  

  body("image-avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];