const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async  function (req, res) {
    console.log(req.body);
    if (!req.body.content) {
        console.log('content cant be empty');

    }
    else {
      let post = await   Post.create({
            content: req.body.content,
            user: req.user._id
        })
        console.log(post);
    }
    return res.redirect('back');
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        //.id means converting the object id's into string
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleteing a post ');
        return;
    }

}

