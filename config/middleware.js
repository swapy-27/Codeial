module .exports.setFlash = function (req,res,next){

    res.locals.flash=  {
        'sucess': req.flash('sucess'),
        'error':req.flash('error')
    }

    next();
}