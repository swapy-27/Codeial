
const mongoose = require('mongoose');

//multer for file upload
const multer= require('multer');

//path gives the path of current file
const path = require('path');


const AVATAR_PATH = path.join('/uploads/users/avatars');


//creating schema to represent the way in which we want our data to store into database
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,

        },
        avatar:{
            type:String,
        },
        friends:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friends'
        }]

    }, {
    timestamps: true
}
);


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..',AVATAR_PATH))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

//Static functions 
userSchema.statics.uploadedAvatar=multer({
    storage:storage
}).single('avatar');

userSchema.statics.avatarPath=AVATAR_PATH;



const User = mongoose.model('User', userSchema);
module.exports = User;