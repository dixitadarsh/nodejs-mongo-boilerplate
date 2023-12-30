const { check, validationResult } = require("express-validator");
const { api } = require('./api');
/**
 * @desc : validation to check if given data in req body is proper or not , express validaators returns data in an array 
 * @method: not() - works with immidiate next fn to tell that next function should not be 
 * @method: isEmpty() - checks if given value is empty or not 
 * @method: withMessage() - writes msg for given error 
 * @method: bail() - Stops running validations if any of the previous ones have failed. 
 * @method: isLength() - checks min or max length. 
 */

exports.createUser = [
  check("name").not().isEmpty().withMessage("User name can not be empty!").bail().isLength({ min: 3 }).withMessage("Minimum 3 characters required!").bail(),
  check("email").not().isEmpty().withMessage("Please provide email").isEmail().withMessage("Invalid email address!").bail(),
  check("password").trim().not().isEmpty().withMessage("Invalid password").isLength({ min: 8 }).withMessage("Min length should be 8 characters").bail(),
  (req,res, next) => {
    // validationResult(req) => Extracts the validation errors of an express request 
    const errors = validationResult(req);
    //errors.isEmpty() =>  returns — true if there are no errors, false otherwise
    if (!errors.isEmpty())
      return api.invalid(res,errors.array()); // if error found return res with error
    next(); // else call next
  },
];

exports.loginUser = [
  check("email").not().isEmpty().withMessage("Please provide email").isEmail().withMessage("Invalid email address!").bail(),
  check("password").trim().not().isEmpty().withMessage("Invalid password").isLength({ min: 8 }).withMessage("Min length should be 8 characters").bail(),
  (req, res, next) => {
    // validationResult(req) => Extracts the validation errors of an express request 
    const errors = validationResult(req);
    //errors.isEmpty() =>  returns — true if there are no errors, false otherwise
    if (!errors.isEmpty())
      console.log(errors.array());
      return api.invalid(res,errors.array()); // if error found return res with error
    next(); // else call next
  },
];

