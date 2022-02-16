const Post = require('../models/post');
const Comment = require('../models/comment')
const Like = require('../models/like');

module.exports.toggleLike = async function (req, res) {
    console.log("hoiiii",req.query);
    try {
        //likes/toggle/?id='jfdvjh'&type='Post'

        let likeable;
        let deleted = false;


        if (req.query.type = 'Post') {
            likeable= await Post.findOne({id:req.query.id});
        } else {
            likeable= await Comment.findOne({id:req.query.id});
        }

        //check if like already exist

        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        //if like exists then delete the like
        if (existingLike) {
            
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted=true;

        } else {
            //else create new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })

            likeable.likes.push(newLike._id);
            likeable.save();

        }


        if(req.xhr){
        return res.status(200).json({
            message: 'Request successful',
            data: {
                deleted: deleted
            }
        })
    }
    return res.redirect('back');
        


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error while creating like'
        })
    }





}