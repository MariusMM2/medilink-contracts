const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user.model");
const Config = require("../config/config");
const { sendConfirmEmail } = require("../emails/mail");


function register(req, res) {
  console.log("req.body: ", req.body);
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
      console.log(req.body);

      req.body.notificationEmail = req.body.email;

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

        if(user.dataValues.emailVerified === true) {

          const token = jwt.sign(user.dataValues, Config.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours = 86400 seconds
          });

          // res.cookie("token", token, {
          //   expire: Date.now() + 43200000,  // 43200000 milliseconds = 12 hours
          //   secure: false, // set to true if your using https
          //   httpOnly: true
          // });
          //
          // res.header('Authorization', 'Bearer '+ token);


          res.json({
            status: 200,
            message: `Logged in as: ${user.firstName} ${user.lastName}!`,
            user,
            token
          });

        } else {
          res.json({
            status: 402,
            message: "Email not verified!"
          });
        }

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
  confirmEmail,
  login
};
