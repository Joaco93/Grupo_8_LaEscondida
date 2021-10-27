const path = require("path");
const fs = require('fs');
const fileJson = require('../data/jsonProducts');

const controlador = {
   lista: (req, res) => {
      let products = fileJson.getProducts();
      // falta crear la funcion de ordenar el array products por category, para cuando se creen nuevos productos
      res.render(path.resolve(__dirname, "../views/products/products.ejs"), { 'products': products });
   },
   create: (req, res) => {
      res.render(path.resolve(__dirname, "../views/products/registerProduct.ejs"));
   },
   createProduct: (req, res) => {
      let newProduct = req.body;
      
      newProduct.image = req.file.filename;
      console.log(newProduct);
      let products = fileJson.getProducts();

      let lastId = products[products.length - 1].id;
      lastId++;
      newProduct.id = lastId;

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
      let idProduct = req.params.id;
     
      let productToEdit =  products[idProduct];
      res.render(path.resolve(__dirname, "../views/products/productIdEdit.ejs"), {productToEdit});
   },
   actualizar: (req,res) =>{
      let products = fileJson.getProducts();
      let productEdit = req.body;
      productEdit.id = req.params.id;

         for(let i = 0; i < products.length;i++){
           if(productEdit.id == products[i].id){
               products[i].name = productEdit.name;
               products[i].description = productEdit.descripcion;
               products[i].category = productEdit.category;
               products[i].size = productEdit.size;
               products[i].price = productEdit.price;
           }
         }
         fileJson.setProducts(products);
      res.send("Se modifico el producto!!");
   },
   delete: (req,res) =>{
      let products = fileJson.getProducts();
      let idProduct = req.params.id;
      
      products = products.filter(producto => producto.id != idProduct);
      fileJson.setProducts(products);
      res.send("Producto eliminado!!");
   }
};
module.exports = controlador;
