const bcrypt = require("bcrypt"); // for hashing
const jwt = require('jsonwebtoken');

const User = require("../models/user.model");
const Config = require("../config/config");

function register(req, res) {
  console.log("req.body: ", req.body);
  // const email = req.body.email;
  // search if a user with that email already exists in the database
  User.findOne({ where: { email: req.body.email } }).then(userDB => { // look in the email column for the email received from the register page
    // if there is not already a user with that email in the database
    console.log('userDB' + userDB);
    if(!userDB) {
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

function readUser(req, res) {
  // find a contract in the database based on the id from the url
  User.findOne({
    where: {
      id: req.params.id
    }}).then(user => {
    // console.log(contract);
    if(!user) {
      res.json({
        status: 400,
        message: "There is no contract with this id in the database!"
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
    // console.log("contracts: ", contracts);
    if(!users) {
      res.json({
        status: 400,
        message: "There are no contracts in the database!"
      });
    }
    res.send(users);
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}

// function updateUser(req, res) {
//
//   console.log("----- req.body: ", req.body);
//
//   // check if there is already a contract with the same name in the database
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(user => {
//     // if there is a contract found with this name and if the it is a different than the one that is being modified
//
//     // console.log("contract.id.toString()", contract.id.toString())
//     // console.log("req.params.id.toString()", req.params.id.toString())
//     if(user && (user.id.toString() !== req.params.id.toString()) ) {
//       // console.log("contract.id.toString()", contract.id.toString())
//       // console.log("req.params.id.toString()", req.params.id.toString())
//
//       res.json({
//         status: 400,
//         message: "Update failed! An user with the updated id already exists!"
//       });
//     } else {
//
//       User.update(req.body, {where: {id: req.params.id}}).then(() => {
//         res.json({
//           status: 200,
//           message: "Successfully updated!"
//         });
//       }).catch((err) => {
//         res.json({
//           status: 400,
//           message: "Update failed!",
//           error: err
//         });
//       });
//     }
//
//   }).catch((err) => {
//     res.send({
//       error: err
//     });
//   });
//
//
// }

function updateUser(req, res) {
  console.log("--------------updateUser: ");
  console.log("req.body: ", req.body);

  // check if there is already a contract with the same name in the database
  User.findOne({
    where: {
      id: req.body.id
    }
  }).then(user => {
      User.update(req.body, {where: {id: req.params.id}}).then(() => {
        res.json({
          status: 200,
          message: "Successfully updated!"
        });
      }).catch((err) => {
        res.json({
          status: 400,
          message: "Update failed!",
          error: err
        });
      });
  }).catch((err) => {
    res.send({
      error: err
    });
  });
}


module.exports = {
  register,
  login,
  readUser,
  readAllUsers,
  updateUser,
};
