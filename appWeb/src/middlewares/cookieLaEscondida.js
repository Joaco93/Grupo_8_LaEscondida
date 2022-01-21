module.exports = (req,res,next)=>{
    if(req.cookies.LaEscondida){
        req.session.userL = req.cookies.LaEscondida;
    }
    next()
}
