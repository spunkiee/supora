const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./server/routes/auth");
const ticketRoutes = require("./server/routes/ticket");
const contactRoutes = require("./server/routes/contact");
// const { authorize } = require("./server/middelwares/auth");

const app = express();

const { NODE_PORT, NODE_ENV, DATABASE_URL } = process.env;
const PORT = process.env.PORT || NODE_PORT || 8000;

const isDevelopment = NODE_ENV === "development";

if (isDevelopment) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (isDevelopment) {
  // production
  // app.use(cors({ origin: CLIENT_URL, optionsSuccessStatus: 200 }));
  app.use(cors());
}

app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api", authRoutes);
app.use("/api", ticketRoutes);
app.use("/api", contactRoutes);
// app.use("/api/users", authorize, userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

mongoose
  .connect(DATABASE_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `DB connected and the server is runnning at ${PORT}-${NODE_ENV}`
      );
    });
  })
  .catch((err) => {
    console.error("Db connection failed", err);
  });
