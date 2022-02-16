const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })


        let user = await User.findById(req.user._id);

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                    userName: user.name
                },
                message: 'post-created!'
            })
        }

        req.flash('sucess', 'Post-published')
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err)
        return res.redirect('back');
    }

}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        //.id means converting the object id's into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post Deleted!'
                })
            }
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleteing a post ');
        return;
    }

}

