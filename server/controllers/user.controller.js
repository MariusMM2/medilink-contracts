const bcrypt = require("bcrypt");

const User = require("../models/user.model");

function register(req, res) {
  console.log("req.body: ", req.body);
  const email = req.body.email;
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    if(!user) {
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

}

module.exports = {
  register,
  login
}
