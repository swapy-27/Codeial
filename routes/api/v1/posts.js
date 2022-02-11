const express = require('express')

const router = express.Router();

const postController = require('../../../controllers/api/v1/post_api')

router.get('/',postController.index)

router.delete('/:id',postController.delete)
module.exports=router