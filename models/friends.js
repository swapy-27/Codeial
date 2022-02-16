const mongoose= require('mongoose');



const freindsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }

} ,
{
    timestamps:true
})



const Friends = mongoose.model('Friends',freindsSchema);
module.exports = Friends;