const { loggerInfo } = require("../utils/logger");
const jwt = require("jsonwebtoken");

exports.fetchUser = (req, res, next) => {
  const token = req.headers["auth-token"];
  loggerInfo(token, "MIDDLEWARE - FETCHUSER - AUTH TOKEN");
  if (!token) {
    res.status(401).send({ msg: "Please authenticate using a valid token" });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.jwt_secretkey);
    if (!verifyToken) {
      res.status(401).send({
        status: 401,
        msg: "Unauthorized token",
      });
    } else {
      req.user = verifyToken.user;
      next();
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      msg: "something went wrong",
      data: [],
    });
  }
};
