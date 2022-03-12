const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },

    // this defines the object ID of Liked Object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },

    //this field used for defining the type of the Liked Object since this is dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }

}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema)
module.exports = Like;