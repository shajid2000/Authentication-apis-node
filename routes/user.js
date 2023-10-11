const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const { getUserDetail, updateUser } = require('../controllers/userController');

router.route('/userDetail').get(getUserDetail)
router.route('/:id').patch(updateUser);

module.exports = router;
