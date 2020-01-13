const bcrypt = require("bcrypt"); // for hashing
const jwt = require('jsonwebtoken');

const User = require("../models/user.model");
const Config = require("../config/config");
const { sendConfirmEmail, sendForgotPasswordEmail } = require("../emails/mail");

function register(req, res) {
  const email = req.body.email;
  // search if a user with that email already exists in the database
  User.findOne({
    where: {
      email
    }
  }).then(userDB => {
    // if there is not already a user with that email in the database
    if(!userDB) {
      // hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      req.body.password = hashedPassword;
      req.body.notificationEmail = req.body.email;
      req.body.role = 'User';

      User.create(req.body).then(user => {
        console.log("created: ", user);

        const token = jwt.sign(user.dataValues, Config.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours = 86400 seconds
        });

        const url = `http://localhost:3000/api/users/confirmation/${token}`;
        sendConfirmEmail(user.dataValues.email, `${user.dataValues.firstName} ${user.dataValues.lastName}`, url);

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

function confirmEmail(req, res) {

  const user = jwt.verify(req.params.token, Config.JWT_SECRET);

  user.emailVerified = true;
  user.active = true;

  User.update(user, {where: {id: user.id}}).then(() => {
    res.json({
      status: 200,
      message: "Successfully updated user!"
    });
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}

function login(req, res) {
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

        if(user.dataValues.emailVerified === true && user.dataValues.active === true) {

          const token = jwt.sign(user.dataValues, Config.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours = 86400 seconds
          });

          user.dataValues.loggedTries = 0;
          User.update(user.dataValues, {where: {id: user.dataValues.id}});

          res.json({
            status: 200,
            message: `Logged in as: ${user.firstName} ${user.lastName}!`,
            user,
            token
          });

        } else if(user.dataValues.emailVerified === false) {
          res.json({
            status: 402,
            message: "Email not verified!"
          });
        } else if(user.dataValues.active === false) {
          res.json({
            status: 403,
            message: "Your account is not active!"
          });
        }

      } else {

        user.dataValues.loggedTries++;
        console.log("loggedtries: ", user.dataValues.loggedTries);
        User.update(user.dataValues, {where: {id: user.dataValues.id}});

        if(user.dataValues.loggedTries === 5) {
          user.dataValues.loggedTries = 0;
          user.dataValues.active = false;
          User.update(user.dataValues, {where: {id: user.dataValues.id}});

          setTimeout(function () {
            user.dataValues.active = true;
            User.update(user.dataValues, {where: {id: user.dataValues.id}});
          },300000); // after 5 minutes
          res.json({
            status: 404,
            message: "You have failed to login for 5 times. Now you have to wait!"
          });
        } else {
          res.json({
            status: 400,
            message: "Incorrect password!",
            loggedTries: user.dataValues.loggedTries
          });
        }
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

function forgotPassword(req, res) {
  const email = req.body.email;
  // find the email from the user's input
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    // if a user is found
    if(user) {
      console.log("user", user);
      const token = jwt.sign(user.dataValues, Config.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours = 86400 seconds
      });
      const url = `http://localhost:3000/api/users/resetPwd/${token}`;
      sendForgotPasswordEmail(user.dataValues.email, `${user.dataValues.firstName} ${user.dataValues.lastName}`, url);
    } else {
      res.json({
        status: 401,
        message: "This email does not exist, please write a valid email!"
      });
    }
  }).catch((err) => {
    res.send({
      error: err
    });
  });

}

function changePassword(req, res) {
  const newPassword = req.body.password;
  const user = jwt.verify(req.params.token, Config.JWT_SECRET);
  user.password = newPassword;
  User.update(user, {where: {id: user.id}}).then(() => {
    res.json({
      status: 200,
      message: "Successfully updated user's password!"
    });
  }).catch((err) => {
    res.send({
      error: err
    });
  });

}

function readUser(req, res) {
  // find a user in the database based on the id from the url
  User.findOne({
    where: {
      id: req.params.id
    }}).then(user => {
    if(!user) {
      res.json({
        status: 400,
        message: "There is no user with this id in the database!"
      });
    }
    res.send(user);
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}

function readAllUsers(req, res) {
  User.findAll().then(users => {
    if(!users) {
      res.json({
        status: 400,
        message: "There are no users in the database!"
      });
    }
    res.send(users);
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}

function updateUser(req, res) {
    User.update(req.body, {where: {id: req.params.id}}).then(() => {
      res.json({
        status: 200,
        message: "Successfully updated user!"
      });
    }).catch((err) => {
      res.json({
        status: 400,
        message: "Update failed!",
        error: err
      });
    });
}

module.exports = {
  register,
  confirmEmail,
  login,
  forgotPassword,
  changePassword,
  readUser,
  readAllUsers,
  updateUser,
};
