const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

//verifying user who sends api requests
module.exports.createSession = async function (req, res) {
    console.log(req.body)
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: 'Invalid Username or Password'
            })
        }
        return res.status(200).json({
            message: 'Sign In successful,here is your token please keep it safe!',
            data: {
                //creating a web token for person who logged in
                token: jwt.sign(user.toJSON(), 'codial', { expiresIn: '100000' })
            }
        })
    } catch (err) {
        console.log('****', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
