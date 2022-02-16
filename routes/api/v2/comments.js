const express = require('express')

const router = express.Router();

const commentController = require('../../../controllers/api/v2/comment_api')
router.get('/',commentController.index)

module.exports=router;