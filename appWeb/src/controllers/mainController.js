const path = require ("path")
 
const controlador = {
   home: (req,res)=> {
       res.render(path.resolve(__dirname,"../views", "home.ejs"))
   },
   login: (req,res)=>{
       res.render(path.resolve(__dirname,"../views", "users", "login.ejs"))
   },
   register: (req,res)=>{
       res.render(path.resolve(__dirname,"../views", "users", "register.ejs"))
   },
   productCart: (req,res)=>{
       res.render(path.resolve(__dirname,"../views", "product", "productCart.ejs"))

   },
};
module.exports = controlador ;