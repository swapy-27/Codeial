
const User = require('../models/user');
const Friends = require('../models/friends');



// if somone add somebody as freind 

// freinds/:id

module.exports.makeFreind = async function (req, res) {
    try {
        let friend = await Friends.create({
            userId: req.user.id,
            friendId: req.params.id
        })

        let user = await User.findById(friend.userId);
        
        user.friends.push(friend);
        user.save();
        
        return res.redirect('back')
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}