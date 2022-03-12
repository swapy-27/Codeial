const Comment = require('../models/comment')
const Post = require('../models/post')
const queue= require('../config/kue')
const commentMailer = require('../mailers/comment_mailer');


module.exports.create = async function (req, res) {
    console.log(req.body)
    let post = await Post.findById(req.body.post);
    if (post) {
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();

       
       let newcomment = await Comment.findById(comment._id).populate('user','name email');
     
        commentMailer.newComment(newcomment);

        // let job = queue.create('emails',newcomment).save(function(err){
        //     if (err){
        //         console.log('error in creating a queue');
        //     }
        //     console.log(job.id);
        // })


        // let username= req.

        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment,
                    post:post,
                    userName:req.user.name
                },
                message:"Comment Done!"
            })
        }
    }
   
    res.redirect('back');
}



module.exports.destroy = async function (req, res) {
    let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {

            let postId = comment.post;
            comment.remove();

          
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            return res.redirect('back');
        }
    }
