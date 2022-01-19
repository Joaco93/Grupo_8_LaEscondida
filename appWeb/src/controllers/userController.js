const path = require("path");
const fileJson = require('../data/jsonUsers');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const {validationResult} = require("express-validator")

const controlador = {
    // Formulario de registro
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/register.ejs"))
    },

    processLogin: (req, res) => {
        let errores = validationResult(req);
        const { email, pass, recordar } = req.body;

        if (!errores.isEmpty()) {
            return res.render('users/login', {
                errores: errores.mapped(),
                data: req.body
            })
        } else {

            db.User.findOne({
                where: {
                    email
                }
            })
            .then((user) => {
                if (user && bcrypt.compareSync(pass.trim(), user.password)) {
                    req.session.userL = {
                        id: user.id,
                        name: user.name,
                        lastName: user.apellido,
                        email: user.email,
                        img: user.avatar,
                        admin: user.admin
                    }
                    if (recordar) {
                        res.cookie('LaEscondida', req.session.userL, {
                            maxAge: 1000 * 60 * 60 * 24 * 100000
                        })
                    }
                    return res.redirect('/home')

                } else {
                    return res.render('users/login', {
                        errores: {
                            pass: {
                                msg: 'Credenciales inválidas'
                            }
                        },
                        data: req.body

                    })
                }
            })
            .catch((error) => {
                res.send(error)
            })
        }

        return res.render('users/login/:id', {
            errors: {
                email: {
                    msg: 'El email ingresado no está registrado'
                }
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    profile: (req, res) => {
        res.render(path.resolve('../views/users/profile.ejs'));
    },
    contact: (req, res) => {
        res.render(path.resolve('../views/contact.ejs'));
    }
}
module.exports = controlador;