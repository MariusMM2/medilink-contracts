const bcrypt = require("bcrypt");

const User = require("../models/user.model");

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

        // const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {
        //   expiresIn: 86400 // expires in 24 hours (60 = 1 minute)
        // });
        // res.header('Authorization', 'Bearer '+ token);
        // res.cookie("userData", token, {expire: 43200000 + Date.now()});

        res.json({
          status: 200,
          message: 'User successfully created!',
          user
          // token
        });

      }).catch((err) => {
        res.send({
          error: err
        });
      });
    } else {
      res.json({
        status: 400,
        message: "Registration failed! A user with this email already exists!"
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

        // const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {
        //   expiresIn: 86400 // expires in 24 hours (60 = 1 minute)
        // });
        // res.header('Authorization', 'Bearer '+ token);
        // res.cookie("userData", token, {expire: 43200000 + Date.now()});

        res.json({
          status: 200,
          message: `Logged in as: ${user.firstName} ${user.lastName}!`,
          id: user.id
          // token
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
