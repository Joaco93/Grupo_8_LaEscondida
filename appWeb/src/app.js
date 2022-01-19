const express = require('express');
const path = require('path');
const cors = require('cors');
const {body, validationResult} = require('express-validator');
const methodOverride = require('method-override');
const rutasMain = require('./routes/main');
const rutasUser = require('./routes/users');
const session = require('express-session');
const cookies = require('cookie-parser');


//var logMiddleware = require('./middlewares/logMiddleware');
//const userLoggedMiddleware = require("./middlewares/userLoggedMidleware")
const { use } = require('./routes/users');

const app = express();

app.use(express.static('../public'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));	
app.use (cookies());
app.use (session({secret:"Secret", resave:false, saveUninitialized:false,}));

app.set('view engine','ejs');

app.use('/',rutasMain);
app.use('/',rutasUser)

app.use('/productDetail',rutasMain);

app.use('/productCart',rutasMain);

app.use('/register',rutasMain);

app.use('/login',rutasMain);

app.use ('/contact', rutasMain);

app.get('/productCart', (req,res)=> res.render(path.resolve(__dirname, "../views", "productCart.ejs")))

// Middlewares

//app.use(logMiddleware);
//app.use(userLoggedMiddleware);


app.use((req, res,next) => {
	res.status(404).render('not-found.');
});

app.listen(3030,() => console.log("iniciando servidor 3030!!"));


