const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    db.Usuarios.findOne({
        where: {
            email: emailInCookie
        }
    }).then((userFromCookie) =>{
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        }
    }).catch((e) => {
       console.log(e);
    })
    if(req.session && req.session.userLogged){
       req.locals.isLogged = true;
       res.locals.userLogged = req.locals.userLogged;
    }
    next();	
}

module.exports = userLoggedMiddleware;