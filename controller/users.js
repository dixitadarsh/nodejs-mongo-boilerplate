const { loggerInfo, loggerError } = require("../utils/logger");
const user = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { api } = require('../utils/api');

/**
 * @route   - /createUser
 * @desc    - create new User/ Signup, No Login Requried
 * @method  - POST
 */
module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    loggerInfo(req.body, "MODULE - CREATEUSER");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      name,
      password: hash,
      email,
    });
    const okresp = {
      msg: "User created successfully",
      data: newUser,
    }
    api.ok(res,okresp);
  } catch (error) {
    loggerError(error, "MODULE - CREATEUSER");
    api.serverError(res);
  }
};

/**
 * @route   - /login
 * @desc    - login User, No Login Required
 * @method  - POST
 */
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    loggerInfo(req.body, "MODULE - LOGINUSER");
    const loggedInUser = await user.findOne({ email: email });
    if(!loggedInUser){
      api.badRequest(res,'No user found with provided email.');
    } else {
      const checkPass = await bcrypt.compare(password, loggedInUser.password);
      if (checkPass) {
        const token = jwt.sign(
          {
            user: {
              id: loggedInUser.id,
            },
          },
          process.env.jwt_secretkey
        );
        const okresp = {
          msg: "User logged in successfully",
          token: token,
        }
        api.ok(res,okresp);
      } else {
        api.badRequest(res,'The password you have entered is wrong. Please use valid password');
      }
    }
  } catch (error) {
    loggerError(error, "MODULE - LOGINUSER");
    api.serverError(res);
  }
};

/**
 * @route   - /getUserDetails
 * @desc    - Gte user by id, Login Required
 * @method  - POST
 */
module.exports.getuser = async (req, res) => {
  try {
    const { id } = req.user;
    loggerInfo(req.user, "FOLDER: controller -> FILE: users.js -> MODULE - getuser -> LINE : 86");
    const loggedInUser = await user.findById(id).select("-password");
    const okresp = {
      msg: "user fetched successfully",
      data: loggedInUser,
    }
    api.ok(res,okresp);
  } catch (error) {
    loggerError(error, "MODULE - GET USER");
    api.serverError(res);
  }
};
