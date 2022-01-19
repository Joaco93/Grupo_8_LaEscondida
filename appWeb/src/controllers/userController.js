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