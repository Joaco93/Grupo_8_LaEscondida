const path = require("path");
const fileJson = require('../data/jsonUsers');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const controlador = {
    // Formulario de registro
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/register.ejs"))
    },

    //Formulario de login
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/login.ejs"))
    },
    createUser: function (req, res) {
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
        res.redirect("/");
    }
    ,
    perfil: function (req, res) {
        db.Usuarios.findByPk(req.params.id)
            .then(function (usuario) {
                res.render(path.resolve(__dirname, "../views/users/profile.ejs"), { usuario: usuario });
            }).catch((error) => {
                console.log(error)
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
    //Proceso de login
    loginProcess: (req, res) => {
        let userToLogin = user.findByEmail(req.body.email);
        if (userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Contraseña incorrecta'
                    }
                }
            });
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