const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Config = require("../config/config");


const auth = function(req, res, next) {
  try {
    // console.log("req: ", req);
    // console.log("res: ", res);
    console.log("have been here");
    // const token = req.header("Authorization").replace("Bearer ", "");
    // if(!token) {
    //   res.status(401).send({error: "There is no token!"});
    // }
    const { token } = req.cookies;
    console.log("req.cookies: ", req.cookies);
    console.log("req.signedCookies: ", req.signedCookies);
    console.log("token: ", token);
    console.log("req.headers: ", req.headers);

    // let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    // if (token.startsWith('Bearer ')) {
    //   // Remove Bearer from string
    //   token = token.slice(7, token.length);
    // }
    // console.log("token: ", token);

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
