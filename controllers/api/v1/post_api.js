const Post = require('../../../models/post')
const Comment = require ('../../../models/comment')

module.exports.index = async  function(req,res){

    let posts = await Post.find({})
    //populate the user and comments
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.status(200).json({
        message: 'Lists of Posts',
        posts:posts
    })
}


module.exports.delete= async function(req,res){
    let post = await Post.findById(req.params.id);
    post.remove();

    await Comment.deleteMany({ post: req.params.id });

    return res.status(200).json({
        message:'Task completed boss! posts and comments deleted'
    })
}