const path = require("path");
const fileJson = require('../data/jsonUsers');
const bcrypt = require('bcrypt');

const controlador = {
    // Formulario de registro
    register: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/register.ejs"))
    },

    //Formulario de login
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/login.ejs"))
    },
    createUser: (req, res) => {

        let users = fileJson.getUsers();
        let newUser = {
            id: 0,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            fechaDeNacimiento: req.body.birth,
            avatar: ""
        }
       
        if (users.length > 0) {
            let lastId = users[users.length - 1].id;
            lastId++;
            newUser.id = lastId;
        } else {
            newUser.id++;
        }

        if (req.file) {
            newUser.avatar = req.file.filename;
        } 

        users.push(newUser);
        fileJson.setUsers(users);
        res.redirect('/');
    }, 
    //Proceso de login
    loginProcess: (req,res) => { 
        let userToLogin = user.findByEmail(req.body.email);
        if(userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user) {
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
    
        return res.render('users/login', {
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
    profile: (req,res) => {
        res.render(path.resolve('../views/users/profile.ejs'));
    }
}
module.exports = controlador;