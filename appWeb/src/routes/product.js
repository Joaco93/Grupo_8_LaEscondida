const express = require('express');
const productController = require('../controllers/productController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
           cb(null,path.join(__dirname,'../../public/images/bebidas'));
    },
    filename: (req,file,cb) =>{
        const newFileName = 'product-'+Date.now()+ path.extname(file.originalname);
        cb(null,newFileName);
    }
})

const upload = multer({storage:storage});

router.get('/products', productController.lista);
router.get('/products/create',productController.create);
router.get('/products/:id',productController.productDetails);
router.get('/products/:id/edit',productController.edit);

router.post('/products/create',upload.single("product-image"),productController.createProduct);
module.exports = router;