const express = require('express')

const router = express.Router();

router.use('/post',require('./posts'));

router.use('/users',require('./users')); 
module.exports=router