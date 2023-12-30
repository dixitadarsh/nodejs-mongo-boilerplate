const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
const { createUser,loginUser }  = require('../utils/validators');
const { fetchUser }  = require('../middleware/fetchuser');

router.route('/createuser').post(createUser, userController.createUser);
router.route('/login').post(loginUser, userController.loginUser);
router.route('/getuser').post(fetchUser, userController.getuser);

module.exports = router