const express= require ('express');
const Router = express.Router();

const LikeController = require('../controllers/likes_controller');

Router.get('/toggle',LikeController.toggleLike);


module.exports=Router;