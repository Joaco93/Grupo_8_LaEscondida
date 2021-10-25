const path = require("path");
const fs = require('fs');
const fileJson = require('../data/jsonProducts');

const controlador = {
   lista: (req, res) => {
      let products = fileJson.getProducts();
      // falta crear la funcion de ordenar el array products, para cuando se creen nuevos productos
      res.render(path.resolve(__dirname, "../views/products/products.ejs"), { 'products': products });
   },
   create: (req, res) => {
      res.render(path.resolve(__dirname, "../views/products/registerProduct.ejs"));
   },
   createProduct: (req, res) => {
      let newProduct = req.body;
      newProduct.image = req.file.filename;

      let products = fileJson.getProducts();

      let lastId = products[products.length - 1].id;
      newProduct.id = lastId++;

      products.push(newProduct);

      fileJson.setProducts(products);
      res.send("Producto agregado!!");
      res.redirect(path.resolve(__dirname, "../views/products/registerProduct.ejs"));
   },
   productDetails: (req, res) => {
      let products = fileJson.getProducts();
      let loQueBuscoElUsuario = req.params;
      let productResult = products.find(products => products.id == loQueBuscoElUsuario.id);      
      
      res.render(path.resolve(__dirname, "../views/products/productId.ejs"), {productResult});
   },
   edit: (req,res) => {
      let products = fileJson.getProducts();
      res.render(path.resolve(__dirname, "../views/products/productIdEdit.ejs"), {products});
   }
};
module.exports = controlador;
