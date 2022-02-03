const Post = require('../models/post');
const Comment = require('../models/comment');
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

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        console.log('error in destroy post')
        if(err){
            console.log('error in destroy post')
        
        }
        //.id means converting the object id's into string
        if(post.user == req.user.id){
            console.log('error in destroy postsss')
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back')
        }
    })
}