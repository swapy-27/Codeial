const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content:{
        type:String,
        required:true
    },

    //comment belong to which user
    //one to one mapping
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
    //comment belongs to which post 
    //one to one mapping
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})



const Comment = mongoose.model('Comment',commentSchema);
module.exports=Comment;