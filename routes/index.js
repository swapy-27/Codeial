
const express = require('express');

//router helps in distributing tasks likw which link should go to which controller
const router = express.Router();

const homeController = require('../controllers/home_controller');
console.log('Router is Loaded')

router.get('/',homeController.home);

//for any other further routes acess from here 
// router.use('/routerName',require('./routerfile));

router.use('/user',require('./user'));

router.use('/post',require('./post'));

router.use('/comment',require('./comment'));

router.use('/likes',require('./likes'))

router.use('/friends',require('./friends'))
module.exports=router;