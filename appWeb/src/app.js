const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const {body, validationResult} = require('express-validator');
const methodOverride = require('method-override');
const rutasMain = require('./routes/main');

const app = express();

app.use(express.static('../public'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));	

app.set('view engine','ejs');

app.use('/',rutasMain);

app.use('/productDetail',rutasMain);

app.use('/productCart',rutasMain);

app.use('/register',rutasMain);

app.use('/login',rutasMain);

app.use((req, res,next) => {
	res.status(404).render('not-found.');
});

app.listen(3030,() => console.log("iniciando servidor 3030!!"));


