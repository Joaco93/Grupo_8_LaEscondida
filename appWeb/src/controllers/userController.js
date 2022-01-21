const path = require("path");
const fileJson = require('../data/jsonUsers');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const { validationResult } = require("express-validator")

const controlador = {
    // Formulario de registro
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/register.ejs"))
    },
    createUser: function (req, res) {
        const validaciones = validationResult(req);
        if (validaciones.errors.length > 0) {
            res.render(path.resolve(__dirname, "../views/users/register.ejs"), {
                errors: validaciones.mapped(),
                oldData: req.body
            })
        }
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((resultado) => {
                if (resultado != null) {
                    console.log(resultado)
                    res.render(path.resolve(__dirname, "../views/users/register.ejs"), {
                        errors: {
                            email: {
                                msg: 'Este mail esta registrado'
                            }
                        },
                        oldData: req.body
                    })
                } else {
                    let img;
                    if (req.body.avatar === undefined) {
                        img = "Sin avatar";
                    } else {
                        img = req.body.imageAvatar;
                    }
                    db.Usuarios.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        avatar: img,
                        fechaNacimiento: req.body.birth
                    }).catch((error) => {
                        console.log(error)
                    })
                    res.redirect("/login");
                }
            }).catch((e) => {
                console.log(e);
            })




    },
    //Formulario de login
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/login.ejs"))
    },
    processLogin: function (req, res) {
        console.log(req.body);
        res.send("ingresaste");
        const validaciones = validationResult(req);
        console.log(validaciones);
        if (validaciones.errors.length > 0) {
            res.render(path.resolve(__dirname, "../views/users/login.ejs"), {
                errors: validaciones.mapped(),
                oldData: req.body
            })
        }
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((user) => {
                if (user) {
                    let isPasswordOk = bcrypt.compareSync(req.body.password, user.password)
                    if (isPasswordOk) {
                        
                        delete user.password
                        req.session.userlogged = user;

                        if(req.body.remember_user){
                            res.cookies('userEmail', req.body.email, {maxAge : (1000 * 30)* 3});
                        }
                        return res.redirect('/profile')

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
                }
                })
            .catch((error) => {
                res.send(error)
            })


        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'El email ingresado no está registrado'
                }
            }
        })
    },
    edit: function (req, res) {
        db.Usuarios.findByPk(req.params.id)
            .then(function (usuario) {
                res.render(path.resolve(__dirname, "../views/users/actualizarUser.ejs"), { usuario: usuario });
            }).catch((error) => {
                console.log(error)
            })
    },
    actualizar: function (req, res) {
        let img;
        if (req.body.avatar === undefined) {
            img = "Sin avatar";
        } else {
            img = req.body.imageAvatar;
        }
        db.Usuarios.update({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: img,
            fechaNacimiento: req.body.birth
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect("/users/" + req.params.id);
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    profile: (req, res) => {
        res.render(path.resolve('../views/users/profile.ejs'),{
            usuario : req.session.userlogged
        });
    },
    contact: (req, res) => {
        res.render(path.resolve('../views/contact.ejs'));
    }
}
module.exports = controlador;