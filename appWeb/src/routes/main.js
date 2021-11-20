const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const rutasProduct = require('./product');
const rutasUser = require('./users');

router.get('/', mainController.home);
router.get('/login',rutasUser);
router.get('/register',rutasUser);
router.get('/productCart', mainController.productCart);
router.get('/productDetail',mainController.productDetail);
router.get('/contact', mainController.contact);

router.get('/products',rutasProduct);
router.get('/products/create',rutasProduct);
router.get('/products/:id',rutasProduct);
router.get('/products/:id/edit',rutasProduct);


router.post('/register',rutasUser);
router.post ('products/create', rutasProduct)

router.put('/products/:id',rutasProduct);

router.delete('/products/:id',rutasProduct);

module.exports = router;