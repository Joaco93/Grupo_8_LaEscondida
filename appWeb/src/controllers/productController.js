const path = require("path");
const fileJson = require('../data/jsonProducts');
const productAux = require('../../public/js/libs/functions/ordenarProducts');
const Sequelize = require("sequelize");
const db = require("../database/models");


const controlador = {
   lista: (req, res) => {
      let categorias = db.Categorias.findAll();
      let products = db.Productos.findAll();

      Promise.all([categorias, products])
         .then(function ([categorias, products]) {
            productAux.ordenarProducts(products);
            res.render(path.resolve(__dirname, "../views/products/products.ejs"), { products: products, categorias: categorias });
         }).catch((error) => {
            console.log(error)
         })

   },
   create: (req, res) => {
      db.Categorias.findAll()
         .then(function (categorias) {
            res.render(path.resolve(__dirname, "../views/products/registerProduct.ejs"), { categorias: categorias });
         }).catch((error) => {
            console.log(error);
         })
   },
   createProduct: (req, res) => {
      let img;
      if (req.body.avatar === undefined) {
         img = "Sin imagen";
      } else {
         img = req.body.product_image;
      }
      db.Productos.create({
         name: req.body.name,
         description: req.body.descripcion,
         avatar: img,
         Categoria_id: req.body.category,
         size: req.body.size,
         price: req.body.price
      }).catch((error) => {
         console.log(error)
      })

      res.redirect("/products");
   },
   productDetails: (req, res) => {
      let categorias = db.Categorias.findAll();
      let productResult = db.Productos.findByPk(req.params.id);
      Promise.all([categorias, productResult])
         .then(function ([categorias, productResult]) {
            res.render(path.resolve(__dirname, "../views/products/productId.ejs"), { categorias, productResult });
         })

   },
   edit: (req, res) => {
      let categorias = db.Categorias.findAll();
      let productToEdit = db.Productos.findByPk(req.params.id);
      Promise.all([categorias, productToEdit])
         .then(function ([categorias, productToEdit]) {
            res.render(path.resolve(__dirname, "../views/products/productIdEdit.ejs"), { categorias, productToEdit });
         }).catch((error) => {
            console.log(error)
         })

   },
   actualizar: (req, res) => {
      let img;
      if (req.body.avatar === undefined) {
         img = "Sin imagen";
      } else {
         img = req.body.product_image;
      }
      db.Productos.update({
         name: req.body.name,
         description: req.body.descripcion,
         avatar: img,
         Categoria_id: req.body.category,
         size: req.body.size,
         price: req.body.price
      }, {
         where: {
            id: req.params.id
         }
      }).catch((error) => {
         console.log(error)
      })
      res.redirect("/products/" + req.params.id);
   },
   delete: (req, res) => {
      db.Productos.destroy({
         where: {
            id: req.params.id
         }
      })
      res.redirect("/products");
   },
   search: (req, res) => {
      const search = req.body.buscador;
      console.log(search);
      try {
         db.Productos.findAll()
            .then(function (resultados) {
               res.render(path.resolve(__dirname, "../views/products/searchProducts.ejs"), { resultados })
            })
      }
      catch (error) {
         console.log(error)
      }
   },
};
module.exports = controlador;
