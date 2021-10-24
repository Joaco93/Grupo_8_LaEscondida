const path = require ("path");
const fs = require('fs');

const controlador = {
    lista: (req,res)=> {
        let productsJson = fs.readFileSync(path.resolve(__dirname,'../data/product.json'),{encoding:'utf-8'});
        let products;
        if(productsJson == ""){
           products = [];
        }else{
           products = JSON.parse(productsJson); 
        }
        res.render(path.resolve(__dirname,"../views/products/products.ejs"),{'products':products});
    },
    create: (req,res) =>  {
        res.render(path.resolve(__dirname,"../views/products/registerProduct.ejs"));
    },
    createProduct: (req,res) =>{
      let newProduct = req.body;
      newProduct.image = req.file.filename;

      let productsJson = fs.readFileSync(path.resolve(__dirname,'../data/product.json'),{encoding:'utf-8'});
      let products;
      if(productsJson == ""){
         products = [];
      }else{
         products = JSON.parse(productsJson); 
      }
      let lastId = products[products.length-1].id;
      newProduct.id = lastId++;

      products.push(newProduct);

      productsJson = JSON.stringify(products);
      fs.writeFileSync('./product.json',productsJson);
    }
 };
 module.exports = controlador;
