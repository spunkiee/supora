const express = require("express");
const router = express.Router();

const { addTicket, listTickets } = require("../controllers/ticket");

router.post("/add-ticket", addTicket);

router.post("/list-tickets", listTickets);

module.exports = router;
