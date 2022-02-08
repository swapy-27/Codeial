const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function (req, res) {
    try {
        //try executing this
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

        let users = await User.find({});


        return res.render('home', {
            title: "SocialRealm | Home",
            posts: posts,
            users: users

        });
    } catch (err) {
        // if any error occurs do this
        console.log('Error:', err)
        return;
    }

}

