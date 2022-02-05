const User = require('../models/user');


module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('user_profile', {
            title: "Profile",
            profile_user: user
        })
    })
}



module.exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, function (err, user) {
        res.render('user_profile', {
            title: "Profile",
            profile_user: user
        })
    })
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

}

module.exports.createSession = function (req, res) {
    req.flash('sucess','User is Logged in sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
   
    req.logOut();
    req.flash('sucess','User is Logged out sucessfully');
    return res.redirect('/');
}


