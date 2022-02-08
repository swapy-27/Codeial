const Comment = require('../models/comment')
const Post = require('../models/post')


module.exports.create = async function (req, res) {
    let post = await Post.findById(req.body.post);

    if (post) {
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
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
            console.log(postId);
            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            return res.redirect('back');
        }
    }
