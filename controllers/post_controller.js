const Post = require('../models/post');

module.exports.create = function(req,res){
    console.log(req.body);
    if(!req.body.content ){
        console.log('content cant be empty');
        
    }
    else{
        Post.create({
            content:req.body.content,
            user:req.user._id
             },function(err,post){
            if(err){
                console.log('error in saving post')
            
            }
        })
    }
    return res.redirect('back');
}

