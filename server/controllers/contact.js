const uniqid = require("uniqid");
const nodemailer = require("nodemailer");
const Contact = require("../models/contact");

const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "ramashishkhush@gmail.com",
    pass: "WvfcazLKZ2J7DP39",
  },
});

exports.contactUs = (req, res) => {
  const { name, email, phone, interest } = req.body;
  const id = uniqid.time();

  const newContact = new Contact({
    name,
    email,
    phone,
    id,
    interest,
  });

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
    subject: "Received your detailes",
    html: `
      <div>
        <h2>Hello ${name}</h2>
        <h4>Thank You for showing interest towards <b>Supora</b>. We received your application, will get back to you soon.</h4>
        <h4>This is a auto generated mail. Please do not reply to this.</h4>
        <hr />
        <a href="${process.env.CLIENT_URL}" target="_blank">
          ${process.env.CLIENT_URL}
        </a>
      </div>
    `,
  };

  newContact.save((err, __) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong.",
      });
    }

    res.json({
      message: `Hey ${name}, We will get back to you soon`,
    });

    transport.sendMail(emailData);
  });
};
