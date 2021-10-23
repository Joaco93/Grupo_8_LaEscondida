const express = require('express');
const productController = require('../controllers/productController').default;

const router = express.Router();

router.get('/products', productController.list);
router.get('/products/create',productController.create);
router.get('/products/:id',productController.buscarProducto);
router.get('/products/:id/edit',productController.edit);
router.post('/products',productController.createProduct);
router.put('/products',productController.editProduct);
router.delete('/products/:id',productController.delete);