const path = require ("path");
const fs = require("fs")


const controlador = {
    // Formulario de registro
    register: (req,res)=>{
        res.render(path.resolve(__dirname,"../views", "users", "register.ejs"))
    },

    //Formulario de login
    login: (req,res) => { 
        res.render(path.resolve(__dirname,"../views", "users", "login.ejs"))
    },
}

module.exports = controlador ;