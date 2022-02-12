const express = require('express')

const router = express.Router();
const passport = require('passport');
const postController = require('../../../controllers/api/v1/post_api')

router.get('/', postController.index)

router.delete('/:id', passport.authenticate('jwt', { session: false }), postController.delete)
module.exports = router