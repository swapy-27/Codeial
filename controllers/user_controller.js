const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
   try{ let user = await User.findById(req.params.id)
       
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        })
   }catch(err){
       console.log(err)
   }
}


//Handling update form in userprofile
module.exports.update = async function (req, res) {

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('***Multer Error', err)
                }
                if (req.body.name) {
                    user.name = req.body.name;
                }
                if (req.body.email) {
                    user.email = req.body.email
                }
                if (req.file) {
                    let curr_path = User.avatarPath + '/' + req.file.filename;
                    
                    // unlinking or possibly deleting the filr from local storage 
                    try {
                        fs.unlinkSync(curr_path);
                      } catch (err) {
                        console.log('hiiiii')
                      }

                    //this is saving the path of the uploaded file into the avatar field in database 
                    user.avatar = curr_path;
                }
                user.save();
                return res.redirect('back');
            })
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', "Unauthorized");
        return res.status(401).secd('Unauthorized');
    }
}


module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }

    res.render('user_sign_In', {
        title: "sign_in"
    })


}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    res.render('user_sign_Up', {
        title: "sign_out"
    })
}

//get the signUp data
module.exports.create = async function (req, res) {
try{
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        await User.create(req.body, function (err, user) {
            if (err) {
                console.log('error in creating user while signing up');
                return;
            }
            return res.redirect('/user/sign-in');
        })

    }

    return res.redirect('back');
}catch(err){
    console.log(err);
    return;
}
}

module.exports.createSession = function (req, res) {
    req.flash('sucess', 'User is Logged in sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {

    req.logOut();
    req.flash('sucess', 'User is Logged out sucessfully');
    return res.redirect('/');
}


