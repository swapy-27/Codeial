const express = require('express');

const router = express.Router();

const friendsController = require('../controllers/friends_controller');

router.get('/:id',friendsController.makeFreind);

module.exports=router;