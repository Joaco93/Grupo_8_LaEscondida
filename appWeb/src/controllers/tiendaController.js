const product = require('../models/Product');
const user = requiere('../models/Usuario')
const fs = require ("fs")
const db = require("../database/models");
const {Op,where} = require("sequelize");
const Sequelize = require("sequelize")

const controlador = {
    products: (req,res)=>{
        res.render(path.resolve(__dirname,"../views/products/products"), {list:product.allWithExtra(), user: req.session.userLogged})

    },
    guardar: (req,res) => {
        //return res.send ({data:req.body, file:req.file})
        console.log (req.params)
        let result = product.new(req.body,req.file)
        return result == true ? res.redirect("/tienda") : res.send("Error al cargar la información")
    },
    edicion: (req,res)=>{
        res.render(path.resolve(__dirname,"../views","products", "edicion.ejs"),{product:product.one(req.params.id),brands:brand.all(),})
    },
    edicionImagen: (req,res)=>{
        res.render(path.resolve(__dirname,"../views","products", "edicionImagen.ejs"),{product:product.one(req.params.id),brands:brand.all(),})
    },
    actualizar: (req,res) => {
        let result = product.edit(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/tienda") : res.send("Error al cargar la información")
    },
    actualizarImagen: (req,res) => {
        let result = product.editImage(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/tienda") : res.send("Error al cargar la informacion")
    },
    detalle: (req,res)=>{
        res.render(path.resolve(__dirname,"../views","products", "detalle.ejs"), {product:product.one(req.params.id), user: req.session.userLogged})
    },
    eliminar: (req,res) => {
        let result = product.delete(req.params.id);
        return result == true ? res.redirect("/tienda") : res.send("Error al cargar la informacion")
    } 

};


module.exports = controlador ;

