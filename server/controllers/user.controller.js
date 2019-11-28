const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user.model");
const Config = require("../config/config");

function register(req, res) {
  console.log("req.body: ", req.body);
  const email = req.body.email;
  //
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    // if there is not already a user with that email in the database
    if(!user) {
      // hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      req.body.password = hashedPassword;
      console.log(req.body);

      User.create(req.body).then(user => {
        console.log("created: ", user);

        res.json({
          status: 200,
          message: 'User successfully created!',
          user
        });

      }).catch((err) => {
        res.send({
          error: err
        });
      });
    } else {
      res.json({
        status: 400,
        message: "A user with this email already exists!"
      });
    }
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}

function login(req, res) {
  console.log("req.body: ", req.body);
  const email = req.body.email;
  // find the email from the user's input
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    // if a user is found
    if(user) {
      // verify if the password from the user's input is the same with the hashed password from the database
      if(bcrypt.compareSync(req.body.password, user.password)) {
        console.log("user: ", user);
        console.log("user.dataValues: ", user.dataValues);

        const token = jwt.sign(user.dataValues, Config.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours = 86400 seconds
        });

        res.cookie("token", token, {
          expire: Date.now() + 43200000,  // 43200000 milliseconds = 12 hours
          secure: false, // set to true if your using https
          httpOnly: true
        });

        res.json({
          status: 200,
          message: `Logged in as: ${user.firstName} ${user.lastName}!`,
          user
        });
      } else {
        res.json({
          status: 400,
          message: "Incorrect password!"
        });
      }

    } else {
      res.json({
        status: 401,
        message: "This email does not exist, please sign up!"
      });
    }
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}

module.exports = {
  register,
  login
}
