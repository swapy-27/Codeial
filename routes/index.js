const express = require('express');


const router = express.Router();

const homeController = require('../controllers/home_controller');
console.log('Router is Loaded')

router.get('/',homeController.home);

//for any other further routes acess from here 
// router.use('/routerName',require('./routerfile));

router.use('/user',require('./user'));

router.use('/post',require('./post'));










module.exports=router;