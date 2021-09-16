const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.listen(3030,() => console.log("iniciando servidor 3030!!"));

app.get('/',(req,res) => {
    res.sendFile(path.resolve('./views/home.html'));
});

app.get('/productDetail',(req,res) => {
    res.sendFile(path.resolve('./views/productDetail.html'));
});

app.get('/productCart',(req,res) => {
    res.sendFile(path.resolve('./views/productCart.html'));
});

app.get('/register',(req,res) => {
    res.sendFile(path.resolve('./views/register.html'));
});

app.get('/login',(req,res) => {
    res.sendFile(path.resolve('./views/login.html'));
});

app.get('*', (req, res) => {
	res.status(404).send('404 not found.');
});