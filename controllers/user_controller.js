const User = require('../models/user');

module.exports.profile = function (req, res) {
    var user_id=req.cookies.user_id
    if (user_id){
        User.findById(user_id,function(err,user){
            res.render('user_profile', {
                title: "Profile",
                 email:user.email,
                 name:user.name
            })
        })
    }else{
        return  res.redirect('/user/sign-in');
    }

}
module.exports.signIn = function (req, res) {
    res.render('user_sign_In', {
        title: "Profile"
    })
}
module.exports.signUp = function (req, res) {
    res.render('user_sign_Up', {
        title: "Profile"
    })
}



//get the signUp data
module.exports.create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in signing up');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/user/sign-in');
            })

        }
        else {
            return res.redirect('back');
        }
    })
}

//sign In and create session for user
module.exports.createSession = function (req, res) {
    //find the user
    User.findOne({email:req.body.email},function(err,user){

        if (err){
            console.log('error finding user while signing in');
            return;
        }
        //handle user found
        if (user){
             //handle password ehich don't match
            if (req.body.password!=user.password){
                return res.redirect('back');
            }

            res.cookie('user_id',user._id);

            return res.redirect('/user/profile');
             //handle session creation

        }
        else{
            //handle user not found
            return res.redirect('back');
        }
    })


}

module.exports.signOut = function(req,res){
    console.log(req.body);
    if (req.cookies.user_id){
        res.clearCookie('user_Id');
        return res.redirect('/user/sign-in');
    }
    else{
        return res.redirect('back');
    }
}
