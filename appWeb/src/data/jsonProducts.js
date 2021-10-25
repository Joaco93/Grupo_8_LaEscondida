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
    edit: function (data,file,id) {
        const directory = path.resolve(__dirname,"../data","product.json")
        let products = this.all();
        products.map(product => {
            if(product.id == id ){
                product.name = parseInt(data.name),
                product.description = data.description,
                product.category = data.category,
                product.size = data.size,
                product.price = data.price
                return product
            }
        })
        fs.writeFileSync(directory,JSON.stringify(products,null,2));
        return true;
    },
    delete: function (id) {
        const directory = path.resolve(__dirname,"../data","product.json")
        let productos = this.all();
        let deleted = this.one(id);
        fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products",deleted.image))
        productos = productos.filter(producto => producto.id != deleted.id )
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;
    }
};