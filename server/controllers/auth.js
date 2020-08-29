const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const _ = require("lodash");

const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "ramashishkhush@gmail.com",
    pass: "WvfcazLKZ2J7DP39",
  },
});

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }

    if (user) {
      return res.status(400).json({
        error: "Email already exists!!",
      });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const activateLink = `${process.env.CLIENT_URL}/auth/activate/${token}`;

    const emailData = {
      to: [
        {
          address: email,
          name,
        },
      ],
      from: {
        address: process.env.EMAIL_FROM,
        name: "Supora Team",
      },
      subject: "Account Activation Link",
      html: `
        <div>
          <h1>Please use the following link to activate the account.</h1>
          <a href="${activateLink}" target="_blank">
            ${activateLink}
          </a>
          <hr />
          <p>This email contains sensitive information</p>
          <a href="${process.env.CLIENT_URL}" target="_blank">
            ${process.env.CLIENT_URL}
          </a>
        </div>
      `,
    };

    transport.sendMail(emailData, (err, info) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json({
        message: `Email has been successfully sent to ${email}. Follow the instructions in the email to activate your account.`,
      });
    });
  });
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;

  if (token) {
    return jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
      if (err) {
        return res.status(401).json({
          error: "The link has expired.",
        });
      }

      const { name, email, password } = jwt.decode(token);

      const newUser = new User({ name, email, password });

      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Something went error.",
          });
        }

        if (user) {
          return res.status(400).json({
            error: "The account has already been activated.",
          });
        }

        newUser.save((err, userData) => {
          if (err) {
            return res.status(400).json({
              error: "Something went error.",
            });
          }

          res.json({
            message: `Hey ${name}, Your account has been activated!!`,
          });
        });
      });
    });
  }

  return res.status(401).json({
    error: "The token is invalid",
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with the email specified doesn't exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Password is incorrect",
      });
    }

    const { _id, name, role, email } = user;

    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: {
        _id,
        name,
        role,
        email,
      },
      message: "Signed in successfully",
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exist.",
      });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    const link = `${process.env.CLIENT_URL}/auth/password/reset/${token}`;

    const emailData = {
      from: {
        address: process.env.EMAIL_FROM,
        name: "Supora Team",
      },
      to: email,
      subject: "Password Reset Link",
      html: `
        <h1>Please use the following link to reset your password:</h1>
        <a href="${link}" target="_blank">${link}</a>
      `,
    };

    return user.updateOne({ resetPasswordLink: token }).exec((err, sucess) => {
      if (err) {
        return res.status(400).json({
          error: "There was an error in saving the reset password link",
        });
      }

      transport
        .sendMail(emailData)
        .then(() => {
          return res.json({
            message: `Email has been successfully sent to ${email}`,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: "There was an error in sending the email.",
          });
        });
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    return jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err) => {
        if (err) {
          return res.status(400).json({
            error: "Expired link. Try again.",
          });
        }

        User.findOne({ resetPasswordLink }).exec((err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Somethig went wrong. Try later",
            });
          }

          const updateFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updateFields);

          user.save((err) => {
            if (err) {
              return res.status(400).json({
                error: "error in resetting the password",
              });
            }

            return res.json({
              message: "Great! The password has reset.",
            });
          });
        });
      }
    );
  }
  return res.status(400).json({
    error: "We have not received the reset password link",
  });
};
