const fs = require("fs");
const path = require('path');

const products_db = path.resolve(__dirname,'./product.json');

module.exports = {
    getProducts: ()=>{
        let productsJson = fs.readFileSync(products_db,{encoding:'utf-8'});
        let products;
        if(productsJson == ""){
           products = [];
        }else{
           products = JSON.parse(productsJson); 
        }
    return products
    },
    setProducts: (data) => {
        fs.appendFileSync(
            products_db,
            JSON.stringify(data, null, 2)
        );
    },
};