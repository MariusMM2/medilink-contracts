const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Config = require("../config/config");


const auth = function(req, res, next) {
  try {
    const { token } = req.cookies;

    const decoded = jwt.verify(token, Config.JWT_SECRET);
    console.log(decoded);

    const user = User.findOne({
      where: {
        id: decoded.id,
      }
    });

    if(!user) {
      res.status(401).send({error: "There is no user!"});
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({error: "Please authenticate."});
  }
};

module.exports = auth;
