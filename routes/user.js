const express = require('express');
const router = express.Router();
const passport= require ('passport');
const userController = require('../controllers/user_controller');



router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.post('/create',userController.create);

router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);

//authenticating using google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//catching callback by google api and creating session for user
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.createSession)


//use passport as a middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
    ),userController.createSession);

    
router.get('/sign-out',userController.destroySession);


module.exports=router;