const path = require ("path")
const fs = require("fs")

const controlador = {
   home: (req,res)=> {
       res.render(path.resolve(__dirname,"../views/home.ejs"))
   },
   login: (req,res)=>{
       res.render(path.resolve(__dirname,"../views/users/login.ejs"))
   },
   register: (req,res)=>{
       res.render(path.resolve(__dirname,"../views/users/register.ejs"))
   },
   productCart: (req,res)=>{
       res.render(path.resolve(__dirname,"../views/products/productCart.ejs"));
   },
   productDetail: (req,res) =>{
       res.render(path.resolve(__dirname,"../views/products/productDetail.ejs"));
   }
};
module.exports = controlador;