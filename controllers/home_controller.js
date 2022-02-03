const Post = require('../models/post');
const User = require('../models/user');
// const User = require('../models/user');
module.exports.home = function (req, res) {

    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('error in dislpayiong the posts')
    //         return res.redirect('back');
    //     }
    //     return res.render('home',{
    //         title:"SocialRealm | Home",
    //         p: posts
    //     });
    // })



    //populate the user

    Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .exec(function (err, posts) {
            User.find({},function(err,users){
                return res.render('home', {
                    title: "SocialRealm | Home",
                    p: posts,
                    users:users
                });
            })
            
        });

}

