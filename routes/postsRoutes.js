var express = require('express');
var router = express.Router();
var postsController = require('../controllers/postsController.js');

/*
 * GET
 */
router.get('/', postsController.list);

/*
 * GET
 */
router.get('/:id', postsController.show);

/*
 * POST
 */
router.post('/', postsController.create);

/*
 * PUT
 */
router.put('/:id', postsController.update);

/*
 * DELETE
 */
router.delete('/:id', postsController.remove);

module.exports = router;
