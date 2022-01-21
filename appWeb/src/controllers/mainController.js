const path = require ("path")
const fs = require("fs")

const controlador = {
   home: (req,res)=> {
       res.render(path.resolve(__dirname,"../views/home.ejs"))
   },
   productCart: (req,res)=>{
       res.render(path.resolve(__dirname,"../views/products/productCart.ejs"));
   },
   productDetail: (req,res) =>{
       res.render(path.resolve(__dirname,"../views/products/productDetail.ejs"));
   },
   contact: (req,res) =>{
    res.render(path.resolve(__dirname,"../views/contact.ejs"));
   },
   notFound: (req,res) =>{
    res.render(path.resolve(__dirname,"../views/not-found.ejs"));
   }
};
module.exports = controlador;