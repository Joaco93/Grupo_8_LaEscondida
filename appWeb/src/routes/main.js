const express = require('express');
const mainController = require('../controllers/mainController');
const rutasProduct = require('./product');
const router = express.Router();

router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/productCart', mainController.productCart);
router.get('/productDetail',mainController.productDetail);
router.get('/contact', mainController.contact);

router.use('/products',rutasProduct);
router.get('/products/create',rutasProduct);
router.get('/products/:id',rutasProduct);
router.get('/products/:id/edit',rutasProduct);

router.post('/products/create',rutasProduct);

router.put('/products/:id',rutasProduct);

router.delete('/products/:id',rutasProduct);

module.exports = router;