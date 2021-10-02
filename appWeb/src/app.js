const express = require('express');
const path = require('path');
const rutasMain = require('./routes/main');

const app = express();
app.use(express.static('../public'));
app.set('view engine','ejs');

app.listen(3030,() => console.log("iniciando servidor 3030!!"));

app.use('/',rutasMain);

app.use('/productDetail',rutasMain);

app.use('/productCart',rutasMain);

app.use('/register',rutasMain);

app.use('/login',rutasMain);

app.get('*', (req, res) => {
	res.status(404).send('404 not found.');
});