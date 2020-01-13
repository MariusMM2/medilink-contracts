const sgMail = require("@sendgrid/mail");
const Config = require("../config/config");

sgMail.setApiKey(Config.SENDGRID_API_KEY);

const sendConfirmEmail = (email, name, link) => {
  sgMail.send({
    to: email,
    from: "razvan1598@gmail.com",
    subject: "Thanks for joining in!",
    html: `Welcome to the Medilink Contracts Manager, ${name}! <br>
        Please click on the link below to verify your email.<br><a href=${link}>Click here to verify your email!</a>`
  });
};

const sendForgotPasswordEmail = (email, name, link) => {
  sgMail.send({
    to: email,
    from: "razvan1598@gmail.com",
    subject: "Forgot password",
    html: `Hi ${name}! <br>
        Click the link below to change your Medilink Contracts Manager account password <br>
        <a href=${link}>Click here to reset your password!</a>`
  });
};

module.exports = {
  sendConfirmEmail,
  sendForgotPasswordEmail
};
