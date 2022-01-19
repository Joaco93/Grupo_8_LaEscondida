const path = require('path');
const { check,body, validationResult } = require('express-validator');
const db = require('../database/models');

const validations = [
	check('email')
		.notEmpty()
		.withMessage('Escribe tu correo electrónico')
		.isEmail()
		.withMessage('Debes escribir un formato de correo válido'),
		body('email')
		.custom(function(value){
			return db.User.findOne({
				where:{
					email:value
				}
			})
		.then(user =>{
			if(!user){
				return Promise.reject("El usuario no se encuentra registrado")
			}
		})
	}),
	body('password')
	.notEmpty()
	.withMessage('Escribe tu contraseña')
	.custom(function(value,{req}){
		return db.User.findOne({
			where:{
				email:req.body.email
			}
		})
		.then(User =>{
			if(bcrypt.compareSync(value, User.dataValues.password)){
				return Promise.reject()
			}
		})
		.catch(()=>{return Promise.reject("Contraseña incorrecta")
		
	})
})

]

module.exports = validations;
