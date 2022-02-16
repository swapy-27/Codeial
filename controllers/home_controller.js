const Post = require('../models/post');
const User = require('../models/user');
const Friend = require('../models/friends')

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
        let user = await User.findOne({ id: req.user.id });
        
        let f=[];
       
        for (u of user.friends){
           
            let friend = await Friend.findOne({id:u});
         
            let friend_name= await User.findById(friend.friendId);
           
            f.push(friend_name)
        }
     


        return res.render('home', {
            title: "SocialRealm | Home",
            posts: posts,
            users: users,
            friends:f
        });
    } catch (err) {
        // if any error occurs do this
        console.log('Error:', err)
        return;
    }

}

