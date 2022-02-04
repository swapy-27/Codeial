const mongoose= require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    //post belongs to which user
    //one to one mapping
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    //include the array of ids of all comments in this post schema itself
    //one to many 
    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;