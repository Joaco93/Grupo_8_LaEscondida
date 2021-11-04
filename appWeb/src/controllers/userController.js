const path = require("path");
const fileJson = require('../data/jsonUsers');
const bcrypt = require('bcryptjs');

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
    }
}
module.exports = controlador;