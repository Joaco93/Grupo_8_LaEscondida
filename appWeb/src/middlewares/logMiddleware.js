const fs = require("fs");

function logMMiddleware(req, res, next){
        fs.appendFileSync("log.txt", "Se ingresó en la página " + req.url);
        next();
}
module.exports = logMiddleware;