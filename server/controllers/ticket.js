const uniqid = require("uniqid");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/ticket");

const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "ramashishkhush@gmail.com",
    pass: "WvfcazLKZ2J7DP39",
  },
});

exports.addTicket = (req, res) => {
  const { title, description, category, name, email } = req.body;
  const id = uniqid.time("TK-");

  const newTicket = new Ticket({
    title,
    description,
    name,
    id,
    email,
    category,
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
    subject: "Query under review",
    html: `
      <div>
        <h2>Hello ${name}</h2>
        <h4>We received your query with reference id: ${id}. Please keep a note of this id.</h4>
        <h4>Thank You for writing to us. We will get back to you soon.</h4>
        <hr />
        <a href="${process.env.CLIENT_URL}" target="_blank">
          ${process.env.CLIENT_URL}
        </a>
      </div>
    `,
  };

  newTicket.save((err, __) => {
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

exports.listTickets = (req, res) => {
  const { token } = req.body;

  const { email } = jwt.decode(token);
  // const email = "ramashishkhush@gmail.com";

  console.log(email);

  Ticket.find({ email }, { _id: 0, __v: 0 }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: "Something went wrong!!" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "No Ticket found" });
    }

    return res.json(result);
  });
};
