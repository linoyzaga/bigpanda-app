const { Router } = require('express');
const CommentsController = require('../controllers/comments.controller');
const router = new Router();

router.route('/').get(CommentsController.getComments);
router.route('/').post(CommentsController.postComment);

module.exports = router;
