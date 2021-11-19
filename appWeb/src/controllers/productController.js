const path = require("path");
const fileJson = require('../data/jsonProducts');
const productAux = require('../../public/js/libs/functions/ordenarProducts');
const Sequelize = require("sequelize");
const db = require("../database/models");

const controlador = {
   lista: (req, res) => {
      let products = fileJson.getProducts();
      productAux.ordenarProducts(products);
      console.log(products);
      res.render(path.resolve(__dirname, "../views/products/products.ejs"), { 'products': products});
   },
   create: (req, res) => {
      res.render(path.resolve(__dirname, "../views/products/registerProduct.ejs"));
   },
   createProduct: (req, res) => {
      let newProduct = req.body;      
      newProduct.image = req.file.filename;

      let products = fileJson.getProducts();

      let lastId = products[products.length - 1].id;
      lastId++;
      newProduct.id = lastId;

      products.push(newProduct);
      //productAux.ordenarProducts(products);
      fileJson.setProducts(products);
      
      //res.send("Producto agregado!!");
      res.redirect("/products");
   },
   productDetails: (req, res) => {
      let products = fileJson.getProducts();
      let loQueBuscoElUsuario = req.params;
      let productResult = products.find(products => products.id == loQueBuscoElUsuario.id);      
      
      res.render(path.resolve(__dirname, "../views/products/productId.ejs"), {productResult});
   },
   edit: (req,res) => {
      let products = fileJson.getProducts();
      let idProduct = req.params.id;
     
      let productToEdit =  products[idProduct-1];
      res.render(path.resolve(__dirname, "../views/products/productIdEdit.ejs"), {productToEdit});
   },
   actualizar: (req,res) =>{
      let products = fileJson.getProducts();
      let productEdit = req.body;
      productEdit.id = req.params.id;

         for(let i = 0; i < products.length;i++){
           if(productEdit.id == products[i].id){
               products[i].name = productEdit.name;
               products[i].description = productEdit.description;
               products[i].category = productEdit.category;
               products[i].size = productEdit.size;
               products[i].price = productEdit.price;
           }
         }
         fileJson.setProducts(products);
      //res.send("Se modifico el producto!!");
      res.redirect("/products");
   },
   delete: (req,res) =>{
      let products = fileJson.getProducts();
      let idProduct = req.params.id;
      
      products = products.filter(producto => producto.id != idProduct);
      fileJson.setProducts(products);
      //res.send("Producto eliminado!!");
      res.redirect("/products");
   }
};
module.exports = controlador;
